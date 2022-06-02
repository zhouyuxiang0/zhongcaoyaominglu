import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../data/response';

@Injectable()
export class ChineseMedicineService {
  getMany() {
    return this.httpClient.get<ApiResponse<any[]>>(environment.api.getChineseMedicine).pipe(
      map((val) => {
        if (val.statusCode == 200) {
          return val.data;
        } else {
          throwError(val.message);
        }
      })
    );
  }
  constructor(private readonly httpClient: HttpClient) {}
  add(
    name: string,
    alias: string[],
    images: string[],
    categoryId: number,
    natureIds: number[],
    tasteIds: number[],
    meridianTropismIds: number[],
    passages: { title: string; content: string }[]
  ) {
    return this.httpClient
      .post<ApiResponse<any>>(environment.api.getChineseMedicine, {
        name,
        alias,
        images,
        categoryId,
        natureIds,
        tasteIds,
        meridianTropismIds,
        passages,
      })
      .pipe(
        map((val) => {
          if (val.statusCode == 200) return val.data;
          throwError(val.message);
        })
      );
  }

  update(
    id: number,
    name: string,
    alias: string[],
    images: string[],
    categoryId: number,
    natureIds: number[],
    tasteIds: number[],
    meridianTropismIds: number[],
    passages: { title: string; content: string }[]
  ) {
    //
  }
}
