import { Component, OnInit } from '@angular/core';
import { CampaignDataService } from '../campaign-data.service';
import {Observable} from "rxjs/Observable";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  public towns = ["Krakow", "Rzeszow", "Wroclaw", "Katowice", "Radom"];

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

  constructor(private _service: CampaignDataService, private router: Router) { }

  ngOnInit() {
  }

  addCampaign(){
    this._service.addCampaign(this.campaign).subscribe(
      res => {
        alert("Added successfully!");
        this.router.navigate(['/']);
        return true;
      },
      error => {
        console.error("Error while saving campaign!");
      }
    )
  }

}
