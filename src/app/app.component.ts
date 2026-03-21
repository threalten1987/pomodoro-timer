import { Component } from '@angular/core';
import { PomodoroTimerComponent } from './pomodoro-timer/pomodoro-timer.component';

@Component({
    selector: 'app-root',
    imports: [PomodoroTimerComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pomodoro-timer';
}
