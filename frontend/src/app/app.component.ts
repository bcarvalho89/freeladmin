import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private translate: TranslateService) {

    this.initTranslate();
  }

  initTranslate() {
    this.translate.addLangs(['pt_BR', 'en_US']);
    this.translate.setDefaultLang('pt_BR');

    if (this.translate.getBrowserLang() === 'pt') {
      this.translate.use('pt_BR');
    } else {
      this.translate.use('en_US');
    }
  }
}
