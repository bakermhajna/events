import { Component } from '@angular/core';
import { IonTabs } from "@ionic/angular/standalone";

@Component({
  selector: 'app-theme-test',
  standalone: true,
  imports: [IonTabs, ],
  templateUrl: './theme-test.component.html',
  styleUrl: './theme-test.component.css'
})
export class ThemeTestComponent {
  items=["item1","item2","item3","item4","item5"]

}
