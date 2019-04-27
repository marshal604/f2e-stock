import { Component, OnInit, Output, EventEmitter, NgZone } from '@angular/core';

@Component({
  selector: 'yur-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  @Output()
  themeChange = new EventEmitter<string>();
  showTheme: boolean;
  showFeature: boolean;
  themeArr: string[];
  stopSayHiRotate: boolean;
  constructor(private zone: NgZone) {}

  ngOnInit() {
    this.initThemeArr();
  }

  initThemeArr() {
    this.themeArr = ['yur-green-teal-theme', 'yur-blue-cyan-theme'];
  }

  getThemeColor(themeName) {
    return themeName.split('-')[1];
  }

  changeTheme(themeName) {
    this.themeChange.emit(themeName);
  }

  showFeatureDialog() {
    this.showFeature = true;
  }

  hideFeatureDialog() {
    this.showFeature = false;
  }

  showThemeDialog() {
    this.showTheme = true;
  }

  hideThemeDialog() {
    this.showTheme = false;
  }

  onAfterClickSayHi() {
    this.stopSayHiRotate = true;
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this.zone.run(() => (this.stopSayHiRotate = false));
      }, 2_500);
    });
  }
}
