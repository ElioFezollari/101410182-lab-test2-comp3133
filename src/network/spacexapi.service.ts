
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpaceXLaunch } from '../models/mission';

@Injectable({
  providedIn: 'root',
})
export class SpacexapiService {
  private baseUrl = 'https://api.spacexdata.com/v3/launches';

  constructor(private http: HttpClient) {}

  getLaunchById(id: number): Observable<SpaceXLaunch> {
    return this.http.get<SpaceXLaunch>(`${this.baseUrl}/${id}`);
  }

  getLaunches(filters?: {
    launch_year?: number;
    launch_success?: boolean;
    land_success?: boolean;
  }): Observable<SpaceXLaunch[]> {
    let params: any = {};
    if (filters?.launch_year != null) {
      params.launch_year = filters.launch_year;
    }
    if (filters?.launch_success != null) {
      params.launch_success = filters.launch_success;
    }
    if (filters?.land_success != null) {
      params.land_success = filters.land_success;
    }

    return this.http.get<SpaceXLaunch[]>(this.baseUrl, { params });
  }
}
