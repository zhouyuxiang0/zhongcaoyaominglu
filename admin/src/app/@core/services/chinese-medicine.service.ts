import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../data/response';

@Injectable()
export class ChineseMedicineService {
  getMany(page: number, size: number, searchDto = {}) {
    return this.httpClient
      .get<ApiResponse<{ list: any[]; total: number }>>(environment.api.getChineseMedicine, {
        params: {
          page,
          size,
          ...searchDto,
        },
      })
      .pipe(
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
    alias: { id?: number; name: string }[],
    images: string[],
    categoryId: number,
    natureIds: number[],
    tasteIds: number[],
    meridianTropismIds: number[],
    passages: { id?: number; title: string; content: string }[]
  ) {
    return this.httpClient
      .patch<ApiResponse<any>>(`${environment.api.getChineseMedicine}/${id}`, {
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

  delete(id: number) {
    return this.httpClient.delete<ApiResponse<any>>(`${environment.api.getChineseMedicine}/${id}`).pipe(
      map((val) => {
        if (val.statusCode == 200) return val.data;
        throwError(val.message);
      })
    );
  }
}
