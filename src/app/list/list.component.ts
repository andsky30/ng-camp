import {Component, OnInit} from '@angular/core';
import {CampaignDataService} from '../campaign-data.service';
import {Observable} from "rxjs/Observable";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public campaigns;
  public campaign ={
    "name": "",
    "keywords": [
      ""
    ],
    "bidAmount": "",
    "fund": "",
    "status": "",
    "town": "",
    "radius": ""
  };
  public towns = ["Krakow", "Rzeszow", "Wroclaw", "Katowice", "Radom"];

  constructor(private _service: CampaignDataService, private router: Router) {
  }

  ngOnInit() {
    this.getCampaigns();
  }

  getCampaigns() {
    this._service.getCampaigns().subscribe(
      res => this.campaigns = res,
      err => console.error(err),
      () => console.log('done loading campaigns')
    );
  }

  deleteCampaign(id) {
    let conf = confirm("Are you sure?");
    if (conf) {
      this._service.deleteCampaign(id).subscribe(
        res => {
          this.getCampaigns();
          alert("Deleted successfully!");
          return true;
        },
        error => {
          console.error("Error while deleting campaign!");
          return Observable.throw(error);
        }
      )
    }
  }

  changeCampaign(campaign){
    this.campaign = campaign
  }

  saveChanges(){
    this._service.updateCampaign(this.campaign).subscribe(
      res => {
        alert("Saved successfully!");
        this.getCampaigns();
        return true;
      },
      error => {
        console.error("Error while saving campaign!");
        return Observable.throw(error);
      }
    )
  }






}
