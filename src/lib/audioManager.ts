class AudioManager {
  private static instance: AudioManager;
  private audio: HTMLAudioElement | null = null;
  private isPlaying = false;
  private fadeInterval: ReturnType<typeof setInterval> | null = null;

  private constructor() {}

  static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  init(src: string) {
    if (this.audio) return;

    this.audio = new Audio(src);
    this.audio.loop = true;
    this.audio.volume = 0;

    // Restore state from session
    const wasPlaying = sessionStorage.getItem("audio-playing") === "true";
    if (wasPlaying) {
      this.play();
    }
  }

  async play() {
    if (!this.audio || this.isPlaying) return;

    try {
      await this.audio.play();
      this.isPlaying = true;
      sessionStorage.setItem("audio-playing", "true");
      this.fadeIn();
    } catch {
      // Autoplay blocked — will retry on user interaction
    }
  }

  pause() {
    if (!this.audio || !this.isPlaying) return;

    this.fadeOut(() => {
      this.audio?.pause();
      this.isPlaying = false;
      sessionStorage.setItem("audio-playing", "false");
    });
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  getIsPlaying() {
    return this.isPlaying;
  }

  private fadeIn(duration = 1000) {
    if (!this.audio) return;
    if (this.fadeInterval) clearInterval(this.fadeInterval);

    const targetVolume = 0.3;
    const steps = 30;
    const stepTime = duration / steps;
    const volumeStep = targetVolume / steps;
    let currentStep = 0;

    this.audio.volume = 0;
    this.fadeInterval = setInterval(() => {
      currentStep++;
      if (this.audio) {
        this.audio.volume = Math.min(volumeStep * currentStep, targetVolume);
      }
      if (currentStep >= steps) {
        if (this.fadeInterval) clearInterval(this.fadeInterval);
      }
    }, stepTime);
  }

  private fadeOut(callback?: () => void, duration = 500) {
    if (!this.audio) return;
    if (this.fadeInterval) clearInterval(this.fadeInterval);

    const startVolume = this.audio.volume;
    const steps = 30;
    const stepTime = duration / steps;
    const volumeStep = startVolume / steps;
    let currentStep = 0;

    this.fadeInterval = setInterval(() => {
      currentStep++;
      if (this.audio) {
        this.audio.volume = Math.max(startVolume - volumeStep * currentStep, 0);
      }
      if (currentStep >= steps) {
        if (this.fadeInterval) clearInterval(this.fadeInterval);
        callback?.();
      }
    }, stepTime);
  }
}

export default AudioManager;
