/**
 * Dịch vụ âm thanh & Giọng đọc tiếng Việt (vi-VN)
 * Ứng dụng Hoa Ban AI 2026 - Trường MN Thanh Yên, Điện Biên
 */

export interface SpeechOptions {
  rate?: number;     // 0.8 đến 1.2 (mặc định 0.95 phù hợp mầm non)
  pitch?: number;    // 1.0 đến 1.25 (giọng trong trẻo, vui tươi)
  volume?: number;   // 0 đến 1
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

class AudioService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isMuted: boolean = false;
  private rate: number = 0.95;
  private volume: number = 1.0;
  private audioContext: AudioContext | null = null;
  private cachedAudio = new Map<string, string>();
  private vietnameseVoice: SpeechSynthesisVoice | null = null;
  private listeners: Set<(speaking: boolean) => void> = new Set();
  private isCurrentlySpeaking: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  // Khởi tạo và tìm giọng đọc tiếng Việt chuẩn (vi-VN)
  private initVoices(): void {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    
    // Tìm giọng vi-VN ưu tiên giọng nữ tiếng Việt nếu có
    const viVoices = voices.filter(v => v.lang.startsWith('vi') || v.lang === 'vi_VN' || v.lang === 'vi-VN');
    
    if (viVoices.length > 0) {
      // Ưu tiên giọng tự nhiên như Google Tiếng Việt, Microsoft HoaiMy, Linh, Mai
      const preferred = viVoices.find(v => 
        v.name.toLowerCase().includes('hoaimy') || 
        v.name.toLowerCase().includes('linh') || 
        v.name.toLowerCase().includes('mai') || 
        v.name.toLowerCase().includes('natural') ||
        v.name.toLowerCase().includes('google')
      );
      this.vietnameseVoice = preferred || viVoices[0];
    } else {
      this.vietnameseVoice = null;
    }
  }

  public getAvailableVietnameseVoices(): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    return this.synth.getVoices().filter(v => v.lang.startsWith('vi') || v.lang === 'vi_VN' || v.lang === 'vi-VN');
  }

  public hasVietnameseVoice(): boolean {
    if (!this.synth) return false;
    const voices = this.synth.getVoices();
    return voices.some(v => v.lang.startsWith('vi') || v.lang === 'vi_VN' || v.lang === 'vi-VN');
  }

  public setVietnameseVoice(voice: SpeechSynthesisVoice): void {
    this.vietnameseVoice = voice;
  }

  public getCurrentVoice(): SpeechSynthesisVoice | null {
    if (!this.vietnameseVoice) {
      this.initVoices();
    }
    return this.vietnameseVoice;
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    if (muted) {
      this.stop();
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public setRate(rate: number): void {
    this.rate = Math.max(0.7, Math.min(1.4, rate));
  }

  public getRate(): number {
    return this.rate;
  }

  public setVolume(vol: number): void {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  public getVolume(): number {
    return this.volume;
  }

  public isSpeaking(): boolean {
    return this.isCurrentlySpeaking || (this.synth ? this.synth.speaking : false);
  }

  public subscribeSpeakingState(callback: (speaking: boolean) => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  private notifySpeakingState(speaking: boolean) {
    this.isCurrentlySpeaking = speaking;
    this.listeners.forEach(cb => cb(speaking));
  }

  /**
   * Phát câu nói tiếng Việt chuẩn có dấu
   */
  public speak(text: string, options?: SpeechOptions): Promise<boolean> {
    return new Promise((resolve) => {
      if (this.isMuted || !text.trim()) {
        resolve(false);
        return;
      }

      if (!this.synth) {
        options?.onError?.(new Error('Trình duyệt không hỗ trợ tổng hợp giọng nói'));
        resolve(false);
        return;
      }

      // HỦY CÂU CŨ TRƯỚC ĐỂ KHÔNG CHỒNG TIẾNG
      this.stop();

      // Đảm bảo voice được nạp
      if (!this.vietnameseVoice) {
        this.initVoices();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'vi-VN';
      utterance.rate = options?.rate ?? this.rate;
      utterance.pitch = options?.pitch ?? 1.1; // hơi nâng nhẹ cao độ để thân thiện, vui vẻ với trẻ mầm non
      utterance.volume = options?.volume ?? this.volume;

      if (this.vietnameseVoice) {
        utterance.voice = this.vietnameseVoice;
      }

      utterance.onstart = () => {
        this.notifySpeakingState(true);
        options?.onStart?.();
      };

      utterance.onend = () => {
        this.notifySpeakingState(false);
        this.currentUtterance = null;
        options?.onEnd?.();
        resolve(true);
      };

      utterance.onerror = (e) => {
        this.notifySpeakingState(false);
        this.currentUtterance = null;
        // e.error === 'canceled' hoặc 'interrupted' là bình thường khi người dùng chuyển câu
        if (e.error !== 'canceled' && e.error !== 'interrupted') {
          options?.onError?.(e);
        }
        resolve(false);
      };

      this.currentUtterance = utterance;
      try {
        this.synth.speak(utterance);
      } catch (err) {
        this.notifySpeakingState(false);
        options?.onError?.(err);
        resolve(false);
      }
    });
  }

  public stop(): void {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (err) {
        // im lặng
      }
    }
    this.currentUtterance = null;
    this.notifySpeakingState(false);
  }

  public pause(): void {
    if (this.synth && this.synth.speaking) {
      this.synth.pause();
    }
  }

  public resume(): void {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
    }
  }

  /**
   * Phát các hiệu ứng âm thanh mầm non trong trẻo bằng Web Audio API
   * Hoạt động 100% không lo lỗi file mạng bên ngoài
   */
  public playChime(type: 'correct' | 'encourage' | 'pop' | 'flower' | 'fanfare'): void {
    if (this.isMuted || typeof window === 'undefined') return;

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      if (!this.audioContext) {
        this.audioContext = new AudioCtx();
      }
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }

      const ctx = this.audioContext;
      const now = ctx.currentTime;

      if (type === 'correct') {
        // Âm thanh chúc mừng trong trẻo (Major triad arpeggio: C5 -> E5 -> G5 -> C6)
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.1);
          gain.gain.setValueAtTime(0, now + idx * 0.1);
          gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.1 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.35);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.1);
          osc.stop(now + idx * 0.1 + 0.36);
        });
      } else if (type === 'flower') {
        // Âm hoa ban nở (glissando ngọt ngào)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.25);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'pop') {
        // Tiếng chạm bong bóng vui nhộn
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.08);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === 'encourage') {
        // Âm khuyến khích nhẹ nhàng (A4 -> C5)
        const notes = [440, 523.25];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.12);
          gain.gain.setValueAtTime(0.15, now + idx * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.12 + 0.25);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.12);
          osc.stop(now + idx * 0.12 + 0.26);
        });
      } else if (type === 'fanfare') {
        // Âm hoàn thành trò chơi
        const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.09);
          gain.gain.setValueAtTime(0.2, now + idx * 0.09);
          gain.gain.exponentialRampToValueAtTime(0.005, now + idx * 0.09 + 0.4);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.09);
          osc.stop(now + idx * 0.09 + 0.45);
        });
      }
    } catch (e) {
      // Web Audio không chặn mạch chính
    }
  }
}

export const audioService = new AudioService();
