import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RunCampaignComponent } from './run-campaign/run-campaign.component';
import { ViewCampaignRecipientsComponent } from './view-campaign-recipients/view-campaign-recipients.component';
// import { RecipientResolver } from './services/recipient.resolver';

const routes: Routes = [
  {
    path: '',
    component: RunCampaignComponent,
  },
  {
    path: 'add-status/:id',
    component: ViewCampaignRecipientsComponent,
    // resolve: {
    //  campaign: RecipientResolver,
    // },
  },
  {
    path: 'add-status',
    component: ViewCampaignRecipientsComponent,
  },
  { path: '', pathMatch: 'full', redirectTo: 'all' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
