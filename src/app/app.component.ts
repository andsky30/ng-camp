import {Component, OnInit} from '@angular/core';
import {CampaignDataService} from "./campaign-data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CampaignDataService]
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private _service: CampaignDataService) {
  }

  private accountBalance: string;

  ngOnInit() {
    this.getAccountBalance();
  }

  getAccountBalance(){
    this._service.getAccountBalance().subscribe(
      res => this.accountBalance = res.toString()
    )
  }
}
