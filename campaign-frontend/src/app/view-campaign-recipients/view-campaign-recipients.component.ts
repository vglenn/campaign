import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Recipient } from '../model/recipient';
import { Campaign } from '../model/campaign';
import { CampaignService } from '../services/campaign.service';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
} from 'rxjs/operators';
import { merge, fromEvent } from 'rxjs';
import { RecipientsDataSource } from '../services/recipients.datasource';

@Component({
  selector: 'course',
  templateUrl: './view-campaign-recipients.component.html',
  styleUrls: ['./view-campaign-recipients.component.css'],
})
export class ViewCampaignRecipientsComponent implements OnInit, AfterViewInit {
  campaign: Campaign;
  recipient: Recipient;
  statusId;

  dataSource: RecipientsDataSource;

  displayedColumns = ['first', 'last', 'email'];

  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // @ViewChild(MatSort, { static: true }) sort: MatSort;
  // @ViewChild('input', { static: true }) input: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private campaignService: CampaignService //  private coursesService: CoursesService
  ) {}

  ngOnInit() {
    this.dataSource = new RecipientsDataSource(this.campaignService);
    this.dataSource.loadRecipients(95568078, '', 'asc', 0, 3);
  }

  ngAfterViewInit() {}
}
