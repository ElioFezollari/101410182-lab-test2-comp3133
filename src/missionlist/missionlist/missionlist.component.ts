import { Component, OnInit } from '@angular/core';
import { SpacexapiService } from '../../network/spacexapi.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-missionlist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.css']
})
export class MissionListComponent implements OnInit {
  missions: any[] = [];
  allMissions: any[] = [];

  filters = {
    year: null as number | null,
    launchSuccess: null as boolean | null,
    landingSuccess: null as boolean | null
  };

  constructor(private spacexService: SpacexapiService) {}

  ngOnInit(): void {
    this.spacexService.getLaunches().subscribe(data => {
      this.allMissions = data;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    console.log('Applying filters:', this.filters);
  
    this.missions = this.allMissions.filter(mission => {
      const launchYear = new Date(mission.launch_date_utc).getFullYear();
      const launchSuccess = mission.launch_success;
      const landingSuccess = mission.rocket?.first_stage?.cores[0]?.land_success ?? null;
  
      const yearMatches =
        this.filters.year === null || launchYear === this.filters.year;
      const launchMatches =
        this.filters.launchSuccess === null || launchSuccess === this.filters.launchSuccess;
      const landingMatches =
        this.filters.landingSuccess === null || landingSuccess === this.filters.landingSuccess;
  
      return yearMatches && launchMatches && landingMatches;
    });
  
    console.log('Filtered missions:', this.missions.length);  
  }

  resetFilters(): void {
    this.filters = {
      year: null,
      launchSuccess: null,
      landingSuccess: null
    };
    this.applyFilters();
  }
}
