import { Component, OnInit } from '@angular/core';
import { SpacexapiService } from '../../network/spacexapi.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SpaceXLaunch } from '../../models/mission';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-missionlist',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
  ],
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.css'],
})
export class MissionListComponent implements OnInit {
  missions: SpaceXLaunch[] = [];

  filters: {
    year: number | null;
    launchSuccess: boolean | null;
    landingSuccess: boolean | null;
  } = {
    year: null,
    launchSuccess: null,
    landingSuccess: null,
  };

  constructor(private spacexService: SpacexapiService) {}

  ngOnInit(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    console.log('Fetching with filters:', this.filters);

    this.spacexService
      .getLaunches({
        launch_year: this.filters.year ?? undefined,
        launch_success: this.filters.launchSuccess ?? undefined,
        land_success: this.filters.landingSuccess ?? undefined,
      })
      .subscribe((data: SpaceXLaunch[]) => {
        this.missions = data;
        console.log('Fetched missions:', this.missions.length);
      });
  }

  resetFilters(): void {
    this.filters = {
      year: null,
      launchSuccess: null,
      landingSuccess: null,
    };
    this.applyFilters();
  }
}
