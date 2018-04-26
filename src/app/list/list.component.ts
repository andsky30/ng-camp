import {Component, OnInit} from '@angular/core';
import {CampaignDataService} from '../campaign-data.service';
import {Observable} from "rxjs/Observable";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public campaigns;
  public campaign = {
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

  public addForm;
  public nameControl = new FormControl(this.campaign.name, [Validators.required]);
  public keywordsControl = new FormControl(this.campaign.keywords, [Validators.required]);
  public bidControl = new FormControl(this.campaign.bidAmount, [Validators.required]);
  public fundControl = new FormControl(this.campaign.fund, [Validators.required]);
  public statusControl = new FormControl(this.campaign.status, [Validators.required]);
  public townControl = new FormControl(this.campaign.town, [Validators.required]);
  public radiusControl = new FormControl(this.campaign.radius, [Validators.required]);

  constructor(private _service: CampaignDataService, private router: Router) {
  }

  ngOnInit() {
    this.getCampaigns();
    this.addForm = new FormGroup({
      'name': this.nameControl,
      'keywords': this.keywordsControl,
      'bidAmount': this.bidControl,
      "fund": this.fundControl,
      "status": this.statusControl,
      "town": this.townControl,
      "radius": this.radiusControl
    })
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

  changeCampaign(campaign) {
    this.campaign = campaign
  }

  saveChanges() {
    if (this.addForm.valid) {
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
    } else {
      this.validateAllFormFields()
    }
  }

  isFieldValid(field: string) {
    return !this.addForm.get(field).valid && (this.addForm.get(field).touched || this.addForm.get(field).dirty);
  }

  validateAllFormFields() {
    Object.keys(this.addForm.controls).forEach(field => {
      const control = this.addForm.get(field);
      control.markAsTouched({onlySelf: true});
    });
  }


}
