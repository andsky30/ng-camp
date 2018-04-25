import { Component } from '@angular/core';
import {CampaignDataService} from "./campaign-data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CampaignDataService]
})
export class AppComponent {
  title = 'app';
}
