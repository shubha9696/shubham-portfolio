import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

// Web Audio API Synth Engine
class SynthEngine {
  private ctx: AudioContext | null = null;
  private ambientSource1: OscillatorNode | null = null;
  private ambientSource2: OscillatorNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private masterGain: GainNode | null = null;
  private lfo: OscillatorNode | null = null;
  private isAmbientPlaying = false;

  private initCtx() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  // Generate a sci-fi UI hover sound (quick pitch sweep)
  playHover() {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400, this.ctx.currentTime + 0.05);

      gainNode.gain.setValueAtTime(0.015, this.ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.05);

      osc.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {
      // AudioContext blocks
    }
  }

  // Generate a sci-fi UI click sound (high-tech cyber chime)
  playClick() {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      
      // Dual oscillator chime
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(987.77, now); // B5
      
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(1479.98, now); // F#6

      gainNode.gain.setValueAtTime(0.04, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(now + 0.15);
      osc2.stop(now + 0.15);
    } catch (e) {
      // AudioContext blocks
    }
  }

  // Toggle ambient breathing space hum (A1 note space drone)
  toggleAmbient(state: boolean) {
    try {
      this.initCtx();
      if (!this.ctx) return;

      if (state) {
        if (this.isAmbientPlaying) return;

        const now = this.ctx.currentTime;
        
        // Master Gain
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0, now);
        this.masterGain.gain.linearRampToValueAtTime(0.12, now + 2); // Slow fade-in

        // Deep Filter
        this.filterNode = this.ctx.createBiquadFilter();
        this.filterNode.type = "lowpass";
        this.filterNode.frequency.setValueAtTime(120, now);

        // Slow breathing LFO to sweep filter frequency
        this.lfo = this.ctx.createOscillator();
        this.lfo.frequency.setValueAtTime(0.1, now); // 0.1Hz (10 second cycle)
        const lfoGain = this.ctx.createGain();
        lfoGain.gain.setValueAtTime(40, now);
        
        this.lfo.connect(lfoGain);
        if (this.filterNode.frequency) {
          lfoGain.connect(this.filterNode.frequency);
        }
        this.lfo.start();

        // Sub oscillator (A1 - 55Hz)
        this.ambientSource1 = this.ctx.createOscillator();
        this.ambientSource1.type = "sawtooth";
        this.ambientSource1.frequency.setValueAtTime(55, now);

        // Detuned auxiliary oscillator (55.4Hz)
        this.ambientSource2 = this.ctx.createOscillator();
        this.ambientSource2.type = "triangle";
        this.ambientSource2.frequency.setValueAtTime(55.4, now);

        this.ambientSource1.connect(this.filterNode);
        this.ambientSource2.connect(this.filterNode);
        this.filterNode.connect(this.masterGain);
        this.masterGain.connect(this.ctx.destination);

        this.ambientSource1.start();
        this.ambientSource2.start();
        
        this.isAmbientPlaying = true;
      } else {
        if (!this.isAmbientPlaying) return;

        const now = this.ctx.currentTime;
        if (this.masterGain) {
          this.masterGain.gain.cancelScheduledValues(now);
          this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
          this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5); // Fade-out
        }

        setTimeout(() => {
          try {
            this.ambientSource1?.stop();
            this.ambientSource2?.stop();
            this.lfo?.stop();
            this.ambientSource1?.disconnect();
            this.ambientSource2?.disconnect();
            this.lfo?.disconnect();
            this.filterNode?.disconnect();
            this.masterGain?.disconnect();
          } catch (err) {}
        }, 1600);

        this.isAmbientPlaying = false;
      }
    } catch (e) {
      // AudioContext blocks
    }
  }
}

export const synth = new SynthEngine();

export default function AudioController() {
  const [ambientPlaying, setAmbientPlaying] = useState(false);

  // Hook global hover and click sounds
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a") ||
          target.classList.contains("clickable") ||
          target.closest(".clickable"))
      ) {
        synth.playHover();
      }
    };

    const handleMouseClick = () => {
      synth.playClick();
    };

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("click", handleMouseClick);

    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("click", handleMouseClick);
    };
  }, []);

  const toggleMusic = () => {
    const nextState = !ambientPlaying;
    setAmbientPlaying(nextState);
    synth.toggleAmbient(nextState);
  };

  return (
    <button
      onClick={toggleMusic}
      className="fixed bottom-6 left-6 w-10 h-10 rounded-full bg-slate-950 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white hover:border-primary/40 shadow-xl cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 z-[999]"
      title="Toggle Cyber Ambient Soundtrack"
    >
      {ambientPlaying ? <Volume2 className="h-4 w-4 text-primary" /> : <VolumeX className="h-4 w-4" />}
    </button>
  );
}
