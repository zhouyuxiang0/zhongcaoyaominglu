import { Observable } from 'rxjs';

export interface ChineseMedicine {
  id: number;
  name: string;
  categories: string;
  nature: string;
  taste: string;
  meridianTropism: string;
  createTime: string;
}

export abstract class ChineseMedicineData {
  abstract getChineseMedicines(): Observable<ChineseMedicine[]>;
}
