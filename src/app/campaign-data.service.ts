import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CampaignDataService {

  constructor(private http: HttpClient) {
  }

  getCampaigns() {
    return this.http.get('http://localhost:9000/api/campaigns');
  }

  addCampaign(campaign){
    let body = JSON.stringify(campaign);
    return this.http.post('http://localhost:9000/api/campaigns', body, httpOptions);
  }

  deleteCampaign(id){
    return this.http.delete('http://localhost:9000/api/campaigns/' + id, httpOptions);
  }

  updateCampaign(campaign){
    let body = JSON.stringify(campaign);
    return this.http.put('http://localhost:9000/api/campaigns', body, httpOptions)
  }

  getKeywords(){
    return this.http.get('http://localhost:9000/api/campaign_keywords');
  }

  getTowns(){
    return this.http.get('http://localhost:9000/api/campaign_towns');
  }

  getAccountBalance(){
    return this.http.get('http://localhost:9000/api/account_balance');
  }
}
