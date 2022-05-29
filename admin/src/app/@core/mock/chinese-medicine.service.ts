import { Injectable } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import { ChineseMedicine, ChineseMedicineData } from '../data/chinese-medicine';

@Injectable()
export class ChineseMedicineService extends ChineseMedicineData {
  private readonly chineseMedicines: ChineseMedicine[] = [
    {
      id: 1,
      name: '麻黄',
      nature: '温',
      categories: '解表,发散风寒',
      taste: '辛',
      meridianTropism: '肺',
      createTime: '2022-5-27 17:02',
    },
    {
      id: 1,
      name: '麻黄',
      nature: '温',
      categories: '解表,发散风寒',
      taste: '辛',
      meridianTropism: '肺',
      createTime: '2022-5-27 17:02',
    },
    {
      id: 1,
      name: '麻黄',
      nature: '温',
      categories: '解表,发散风寒',
      taste: '辛',
      meridianTropism: '肺',
      createTime: '2022-5-27 17:02',
    },
    {
      id: 1,
      name: '麻黄',
      nature: '温',
      categories: '解表,发散风寒',
      taste: '辛',
      meridianTropism: '肺',
      createTime: '2022-5-27 17:02',
    },
    {
      id: 1,
      name: '麻黄',
      nature: '温',
      categories: '解表,发散风寒',
      taste: '辛',
      meridianTropism: '肺',
      createTime: '2022-5-27 17:02',
    },
    {
      id: 1,
      name: '麻黄',
      nature: '温',
      categories: '解表,发散风寒',
      taste: '辛',
      meridianTropism: '肺',
      createTime: '2022-5-27 17:02',
    },
    {
      id: 1,
      name: '麻黄',
      nature: '温',
      categories: '解表,发散风寒',
      taste: '辛',
      meridianTropism: '肺',
      createTime: '2022-5-27 17:02',
    },
    {
      id: 1,
      name: '麻黄',
      nature: '温',
      categories: '解表,发散风寒',
      taste: '辛',
      meridianTropism: '肺',
      createTime: '2022-5-27 17:02',
    },
    {
      id: 1,
      name: '麻黄',
      nature: '温',
      categories: '解表,发散风寒',
      taste: '辛',
      meridianTropism: '肺',
      createTime: '2022-5-27 17:02',
    },
    {
      id: 1,
      name: '麻黄',
      nature: '温',
      categories: '解表,发散风寒',
      taste: '辛',
      meridianTropism: '肺',
      createTime: '2022-5-27 17:02',
    },
    {
      id: 1,
      name: '麻黄',
      nature: '温',
      categories: '解表,发散风寒',
      taste: '辛',
      meridianTropism: '肺',
      createTime: '2022-5-27 17:02',
    },
    {
      id: 1,
      name: '麻黄',
      nature: '温',
      categories: '解表,发散风寒',
      taste: '辛',
      meridianTropism: '肺',
      createTime: '2022-5-27 17:02',
    },
  ];
  getChineseMedicines(): Observable<ChineseMedicine[]> {
    return observableOf(this.chineseMedicines);
  }
}
