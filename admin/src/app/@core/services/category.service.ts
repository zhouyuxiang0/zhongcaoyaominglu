import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../data/response';

@Injectable()
export class CategoryService {
  constructor(private readonly httpClient: HttpClient) {}
  getMany() {
    return this.httpClient.get<ApiResponse<any[]>>(environment.api.getCategory).pipe(
      map((val) => {
        if (val.statusCode == 200) {
          return val.data;
        } else {
          throwError(val.message);
        }
      })
    );
  }

  add(name: string, parentId: number) {
    return this.httpClient.post<ApiResponse<any>>(environment.api.getCategory, { name, parentId }).pipe(
      map((val) => {
        if (val.statusCode == 200) return val.data;
        throwError(val.message);
      })
    );
  }

  update(id: number, name: string, parentId: number) {
    return this.httpClient.patch<ApiResponse<any>>(`${environment.api.getCategory}/${id}`, { name, parentId: parentId || null }).pipe(
      map((val) => {
        if (val.statusCode == 200) return val.data;
        throwError(val.message);
      })
    );
  }

  del(id: number) {
    return this.httpClient.delete<ApiResponse<any>>(`${environment.api.getCategory}/${id}`).pipe(
      map((val) => {
        if (val.statusCode == 200) return val.data;
        throwError(val.message);
      })
    );
  }
}
