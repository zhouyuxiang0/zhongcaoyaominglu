import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../data/response';

@Injectable()
export class NatureService {
  constructor(private readonly httpClient: HttpClient) {}
  getMany() {
    return this.httpClient.get<ApiResponse<any[]>>(environment.api.getNature).pipe(
      map((val) => {
        if (val.statusCode == 200) {
          return val.data;
        } else {
          throwError(val.message);
        }
      })
    );
  }
  add(name: string) {
    return this.httpClient.post<ApiResponse<any>>(environment.api.getNature, { name }).pipe(
      map((val) => {
        if (val.statusCode == 200) return val.data;
        throwError(val.message);
      })
    );
  }
}
