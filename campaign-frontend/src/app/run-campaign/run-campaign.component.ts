import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Campaign } from '../model/campaign';
import { CampaignService } from '../../app/services/campaign.service';

@Component({
  selector: 'run-campaign.component',
  templateUrl: 'run-campaign.component.html',
  styleUrls: ['run-campaign.component.css'],
})
export class RunCampaignComponent {
  form: FormGroup;
  recipientsAdded = false;
  recipientsAddedStatusId;
  noResults = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private campaignService: CampaignService
  ) {}

  ngOnInit() {
    this.recipientsAdded = false;
    this.form = this.fb.group({
      // year: this.fb.control('', this.yearValidator),
      year: this.fb.control('', [
        Validators.required,
        Validators.maxLength(4),
        this.yearValidator, //
      ]),
    });
  }

  yearValidator(control) {
    if (control.value.trim().length === 0) {
      return null;
    }
    let year = parseInt(control.value);
    let minYear = 1800;
    let maxYear = 2500;
    if (year >= minYear && year <= maxYear) {
      return null;
    } else {
      return {
        year: {
          min: minYear,
          max: maxYear,
        },
      };
    }
  }

  onSubmit(year) {
    this.campaignService
      .runCampaign(this.form.controls['year'].value)
      .subscribe((statusId: string) => {
        if (statusId) {
          console.log(`Status is ${statusId}`);
          this.recipientsAddedStatusId = statusId;
          this.router.navigate(['add-status', statusId]);
        } else {
          this.noResults = true;
        }
      });
  }

  isValid(control) {
    return (
      this.form.controls[control].invalid && this.form.controls[control].touched
    );
  }
}
