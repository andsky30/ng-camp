import {Component, OnInit} from '@angular/core';
import {CampaignDataService} from '../campaign-data.service';
import {Observable} from 'rxjs/Rx';
import {Router} from "@angular/router";
import {FormControl, FormGroup, FormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {

  public towns = ["Krakow", "Rzeszow", "Wroclaw", "Katowice", "Radom"];

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

  public addForm;

  public nameControl = new FormControl(this.campaign.name, [ Validators.required ]);
  public keywordsControl = new FormControl(this.campaign.keywords, [ Validators.required ]);
  public bidControl = new FormControl(this.campaign.bidAmount, [ Validators.required ]);
  public fundControl = new FormControl(this.campaign.fund, [ Validators.required ]);
  public statusControl = new FormControl(this.campaign.status, [ Validators.required ]);
  public townControl = new FormControl(this.campaign.town, [ Validators.required ]);
  public radiusControl = new FormControl(this.campaign.radius, [ Validators.required ]);

  constructor(private _service: CampaignDataService, private router: Router) {
  }

  ngOnInit(): void {
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

  isFieldValid(field: string) {
    return !this.addForm.get(field).valid && (this.addForm.get(field).touched || this.addForm.get(field).dirty);
  }

  addCampaign() {
    if (this.addForm.valid) {
      this._service.addCampaign(this.campaign).subscribe(
        res => {
          alert("Added successfully!");
          this.router.navigate(['/list']);
          return true;
        },
        error => {
          console.error("Error while saving campaign!");
          return Observable.throw(error);
        }
      )
    } else {
      this.validateAllFormFields();
    }
  }

  validateAllFormFields() {
    Object.keys(this.addForm.controls).forEach(field => {
      const control = this.addForm.get(field);
      control.markAsTouched({onlySelf: true});
    });
  }

}
