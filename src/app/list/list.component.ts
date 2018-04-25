import { Component, OnInit } from '@angular/core';
import { CampaignDataService } from '../campaign-data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public campaigns;

  constructor(private _service: CampaignDataService) { }

  ngOnInit() {
    this.getCampaigns();
  }

  getCampaigns(){
    this._service.getCampaigns().subscribe(
      res => this.campaigns = res,
      err => console.error(err),
      () => console.log('done loading campaigns')
    );
  }

}
