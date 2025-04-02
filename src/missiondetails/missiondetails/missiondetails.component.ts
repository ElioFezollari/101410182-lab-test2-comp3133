import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SpacexapiService } from '../../network/spacexapi.service';
import { CommonModule } from '@angular/common';
import { SpaceXLaunch } from '../../models/mission';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-missiondetails',
  templateUrl: './missiondetails.component.html',
  styleUrls: ['./missiondetails.component.css'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule
  ],
})
export class MissionDetailsComponent implements OnInit {
  mission: SpaceXLaunch | null = null;

  constructor(
    private route: ActivatedRoute,
    private spacexService: SpacexapiService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.spacexService.getLaunchById(+id).subscribe((data: SpaceXLaunch) => {
        this.mission = data;
      });
    }
  }
}
