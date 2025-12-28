import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api
  app.get("/resume.pdf", (req, res) => {
    let filePath = path.resolve(__dirname, "..", "dist", "public", "resume.pdf");
    let filename = "resume.pdf";
    if (!fs.existsSync(filePath)) {
      // Fallback to shubham.pdf if resume.pdf is missing
      filePath = path.resolve(__dirname, "..", "dist", "public", "shubham.pdf");
      filename = "shubham.pdf";
    }
    if (fs.existsSync(filePath)) {
      const stat = fs.statSync(filePath);
      const fileSize = stat.size;
      const range = req.headers.range;
      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunkSize = end - start + 1;
        const file = fs.createReadStream(filePath, { start, end });
        res.status(206);
        res.set({
          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": chunkSize,
          "Content-Type": "application/pdf",
        });
        file.pipe(res);
      } else {
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `inline; filename=\"${filename}\"`);
        res.setHeader("Accept-Ranges", "bytes");
        res.setHeader("Content-Length", fileSize);
        fs.createReadStream(filePath).pipe(res);
      }
    } else {
      res.status(404).send("File not found");
    }
  });
  // Ensure HEAD requests return correct headers to satisfy PDF viewers
  app.head("/resume.pdf", (req, res) => {
    let filePath = path.resolve(__dirname, "..", "dist", "public", "resume.pdf");
    let filename = "resume.pdf";
    if (!fs.existsSync(filePath)) {
      filePath = path.resolve(__dirname, "..", "dist", "public", "shubham.pdf");
      filename = "shubham.pdf";
    }
    if (fs.existsSync(filePath)) {
      const stat = fs.statSync(filePath);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `inline; filename=\"${filename}\"`);
      res.setHeader("Accept-Ranges", "bytes");
      res.setHeader("Content-Length", stat.size);
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  });

  app.get("/shubham.pdf", (req, res) => {
    const filePath = path.resolve(__dirname, "..", "dist", "public", "shubham.pdf");
    if (fs.existsSync(filePath)) {
      const stat = fs.statSync(filePath);
      const fileSize = stat.size;
      const range = req.headers.range;
      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunkSize = end - start + 1;
        const file = fs.createReadStream(filePath, { start, end });
        res.status(206);
        res.set({
          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": chunkSize,
          "Content-Type": "application/pdf",
        });
        file.pipe(res);
      } else {
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline; filename=\"shubham.pdf\"");
        res.setHeader("Accept-Ranges", "bytes");
        res.setHeader("Content-Length", fileSize);
        fs.createReadStream(filePath).pipe(res);
      }
    } else {
      res.status(404).send("File not found");
    }
  });
  // HEAD support for shubham.pdf
  app.head("/shubham.pdf", (req, res) => {
    const filePath = path.resolve(__dirname, "..", "dist", "public", "shubham.pdf");
    if (fs.existsSync(filePath)) {
      const stat = fs.statSync(filePath);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "inline; filename=\"shubham.pdf\" ");
      res.setHeader("Accept-Ranges", "bytes");
      res.setHeader("Content-Length", stat.size);
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  });

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  return httpServer;
}
