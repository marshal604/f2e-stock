import { Component } from '@angular/core';

@Component({
  selector: 'yur-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  myTheme = 'yur-green-teal-theme';

  onThemeChange(event: string) {
    this.myTheme = event;
  }
}
