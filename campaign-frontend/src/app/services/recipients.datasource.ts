import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Recipient } from '../../app/model/recipient';
import { CampaignService } from '../../app/services/campaign.service';
import { catchError, finalize } from 'rxjs/operators';

export class RecipientsDataSource implements DataSource<Recipient> {
  private recipientsSubject = new BehaviorSubject<Recipient[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private campaignService: CampaignService) {}

  loadRecipients(
    campaignID: number,
    filter: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number
  ) {
    this.loadingSubject.next(true);
    debugger;
    //this.campaignService.listCampaignRecipients(campaignID, filter, sortDirection,
    //    pageIndex, pageSize).pipe(
    this.campaignService
      // .listCampaignRecipients(campaignID)
      .listCampaignRecipients(75473)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((recipients) => {
        this.recipientsSubject.next(recipients['payload']);
      });
  }

  connect(collectionViewer: CollectionViewer): Observable<Recipient[]> {
    return this.recipientsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.recipientsSubject.complete();
    this.loadingSubject.complete();
  }
}
