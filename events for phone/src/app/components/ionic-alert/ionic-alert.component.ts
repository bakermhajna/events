import { Component } from '@angular/core';
import { AlertController, IonButton } from '@ionic/angular/standalone';


@Component({
  selector: 'app-ionic-alert',
  standalone: true,
  imports: [IonButton],
  template:`
    <ion-button (click)="presentAlert()" >Click Me</ion-button>
  `,
  styleUrl: './ionic-alert.component.css'
})
export class IonicAlertComponent {

  constructor(private alertController: AlertController) {}

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'A Short Title Is Best',
      subHeader: 'A Sub Header Is Optional',
      message: 'A message should be a short, complete sentence.',
      buttons: ['Action'],
    });

    await alert.present();
  }

}
