import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

import { Campaign } from '../../app/model/campaign';
import { Recipient } from '../../app/model/recipient';

interface AddedRecipients {
  isFinished: boolean;
  problems: Problems;
}

interface Problems {
  problems: {
    unsubscribedEmails: [];
    alreadyInCampaignEmails: [];
    passedAccountLimitEmail: [];
    hasProblems: boolean;
  };
}

@Injectable()
export class CampaignService {
  // BASE_URL = 'http://localhost:58630/auth';
  auth_tokenHeader;

  constructor(private http: HttpClient) {}

  runCampaign(year) {
    const getOptions = {
      params: { year },
    };
    return this.http
      .get<string>('http://localhost:3000/runCampaign', getOptions)
      .pipe(
        map((response) => {
          return response['payload'].checkStatusID;
        }),
        catchError(this.handleError)
      );
  }

  getAddRecipientStatus(statusId: string) {
    return this.http
      .get<AddedRecipients>('http://localhost:3000/checkAddStatus', {
        params: new HttpParams()
          .set('campaignID', statusId)
          .set('search', 'Albums of the Year'),
      })
      .pipe(
        map((response: AddedRecipients) => {
          debugger;
          return response;
        }),
        catchError(this.handleError)
      );
  }

  listCampaignRecipients(campaignID: number) {
    return this.http.get<Recipient[]>(
      'http://localhost:3000/listCampaignRecipients',
      {
        params: new HttpParams()
          .set('campaignID', campaignID.toString())
          .set('search', 'Albums of the Year'),
      }
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error.message);
    return throwError('A data error occurred, please try again.');
  }
}
