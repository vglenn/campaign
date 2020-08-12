import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Campaign } from '../model/campaign';
import { Observable } from 'rxjs';
import { CampaignService } from './campaign.service';

@Injectable()
export class RecipientResolver implements Resolve<Campaign> {
  constructor(private campaignService: CampaignService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable {
    return this.campaignService.getAddRecipientStatus(route.params['id']);
  }
}
