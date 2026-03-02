import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

@Component({
  selector: 'app-pomodoro-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pomodoro-timer.component.html',
  styleUrl: './pomodoro-timer.component.css'
})
export class PomodoroTimerComponent implements OnDestroy {
  timeLeft = 25 * 60;
  initialTime = 25 * 60;
  isRunning = false;
  mode: TimerMode = 'work';
  intervalId: any;
  isDarkMode = false;

  modes = [
    { key: 'work' as TimerMode, label: 'Pomodoro', minutes: 25 },
    { key: 'shortBreak' as TimerMode, label: 'Descanso corto', minutes: 5 },
    { key: 'longBreak' as TimerMode, label: 'Descanso largo', minutes: 15 }
  ];

  get displayTime(): string {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  get progress(): number {
    return ((this.initialTime - this.timeLeft) / this.initialTime) * 100;
  }

  get modeLabel(): string {
    return this.modes.find(m => m.key === this.mode)?.label || 'Pomodoro';
  }

  private updateTitle(): void {
    const title = this.isRunning ? `${this.displayTime} - Pomodoro` : 'Pomodoro Timer';
    if (typeof document !== 'undefined') {
      document.title = title;
    }
  }

  startTimer(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.updateTitle();
    this.intervalId = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.updateTitle();
      } else {
        this.stopTimer();
        this.setMode('shortBreak');
      }
    }, 1000);
  }

  stopTimer(): void {
    this.isRunning = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.updateTitle();
  }

  resetTimer(): void {
    this.stopTimer();
    this.timeLeft = this.initialTime;
    this.updateTitle();
  }

  setMode(mode: TimerMode): void {
    this.stopTimer();
    this.mode = mode;
    const config = this.modes.find(m => m.key === mode);
    if (config) {
      this.initialTime = config.minutes * 60;
      this.timeLeft = this.initialTime;
    }
    this.updateTitle();
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }
}
