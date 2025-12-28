// This file acts as the entry point for Vercel's Node.js serverless function.
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

try {
  console.log("Starting server entry point...");
  require("./dist/index.cjs");
  console.log("Server entry point loaded successfully.");
} catch (error) {
  console.error("Failed to load server entry point:", error);
  process.exit(1);
}
