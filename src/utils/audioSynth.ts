/**
 * Web Audio API Acoustic Motif Synthesizer
 * Generates an ambient acoustic guitar / Rhodes piano style plucked sequence
 * without needing external audio files.
 */

class AcousticSynth {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timer: number | null = null;
  private step: number = 0;
  private onNoteCallback: ((noteIndex: number, frequency: number) => void) | null = null;

  // D Minor contemplative acoustic chord progression frequencies
  private sequence = [
    // Bar 1: Dm (D3, A3, F4, A4)
    146.83, 220.00, 349.23, 440.00,
    // Bar 2: F (F3, C4, A4, C5)
    174.61, 261.63, 440.00, 523.25,
    // Bar 3: C (C3, G3, E4, G4)
    130.81, 196.00, 329.63, 392.00,
    // Bar 4: Bb (Bb2, F3, D4, F4)
    116.54, 174.61, 293.66, 349.23,
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setOnNote(callback: (noteIndex: number, frequency: number) => void) {
    this.onNoteCallback = callback;
  }

  private playPluck(freq: number) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Dual oscillator: fundamental triangle + gentle overtone sine (warm acoustic body)
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, now); // 1st harmonic overtone

    // Low-pass filter simulating wooden acoustic resonance
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(350, now + 0.8);

    // Natural decay envelope
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.22, now + 0.015);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 1.3);
    osc2.stop(now + 1.3);
  }

  public start(bpm: number = 76) {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;

    const intervalMs = (60 / bpm / 2) * 1000; // Eighth notes
    this.step = 0;

    const tick = () => {
      const freq = this.sequence[this.step % this.sequence.length];
      this.playPluck(freq);
      if (this.onNoteCallback) {
        this.onNoteCallback(this.step % this.sequence.length, freq);
      }
      this.step++;
      if (this.isPlaying) {
        this.timer = window.setTimeout(tick, intervalMs);
      }
    };

    tick();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public toggle(bpm: number = 76): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start(bpm);
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const acousticSynth = new AcousticSynth();
