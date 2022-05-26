import { Component, Input } from '@angular/core';
import { FormLayout } from 'ng-devui/form';
import { CascaderItem } from 'ng-devui/cascader';
@Component({
  selector: 'd-modal-cases',
  templateUrl: './modal-cases.component.html',
})
export class ModalCasesComponent {
  constructor() {}
  @Input() data: any;
  // 名称
  name = '';
  tagName = '';
  des = '';
  layoutDirection: FormLayout = FormLayout.Vertical;

  categories: Array<string | number> = [];

  options = [
    {
      label: '解表',
      value: 1,
    },
    {
      label: '清热',
      value: 2,
    },
    {
      label: '泻下',
      value: 3,
    },
    {
      label: '祛风湿',
      value: 4,
    },
    {
      label: '芳香化湿',
      value: 5,
    },
    {
      label: '利水渗湿',
      value: 6,
    },
    {
      label: '温里',
      value: 7,
    },
    {
      label: '理气',
      value: 8,
    },
    {
      label: '消导',
      value: 9,
    },
    {
      label: '驱虫',
      value: 10,
    },
    {
      label: '止血',
      value: 11,
    },
    {
      label: '活血',
      value: 12,
    },
    {
      label: '化痰止咳平喘',
      value: 13,
    },
    {
      label: '安神',
      value: 14,
    },
    {
      label: '平肝熄风',
      value: 15,
    },
    {
      label: '开窍',
      value: 16,
    },
    {
      label: '补益',
      value: 17,
    },
    {
      label: '固涩',
      value: 18,
    },
    {
      label: '外用',
      value: 19,
    },
  ];
  children1 = [
    {
      label: '发散风寒',
      value: 4,
      isLeaf: true,
    },
    {
      label: '发散风热',
      value: 41,
      isLeaf: true,
    },
  ];
  options3 = [
    {
      name: '解表',
      value: 1,
    },
    {
      name: '发散风寒',
      value: 2,
    },
    {
      name: '性温',
      value: 3,
    },
    {
      name: '味辛',
      value: 4,
    },
  ];
  select3 = [];

  natureOptions = [
    {
      name: '温',
      value: 1,
    },
    {
      name: '凉',
      value: 2,
    },
    {
      name: '寒',
      value: 3,
    },
    {
      name: '微寒',
      value: 4,
    },
    {
      name: '平',
      value: 5,
    },
  ];
  natureSelects = [];

  tasteOptions = [
    {
      name: '辛',
      value: '1',
    },
    {
      name: '甘',
      value: '2',
    },
    {
      name: '苦',
      value: '3',
    },
    {
      name: '咸',
      value: '4',
    },
  ];
  tasteSelects = [];
  meridianTropismOptions = [
    {
      name: '肺',
      value: '1',
    },
    {
      name: '膀胱',
      value: '2',
    },
    {
      name: '胃',
      value: '3',
    },
    {
      name: '肾',
      value: '4',
    },
    {
      name: '心',
      value: '5',
    },
    {
      name: '肝',
      value: '6',
    },
    {
      name: '胆',
      value: '7',
    },
    {
      name: '脾',
      value: '8',
    },
  ];
  meridianTropismSelects = [];

  formChange() {
    if (this.name && this.tagName) {
      this.data.canConfirm(true);
    } else {
      this.data.canConfirm(true);
    }
  }

  onChanges(value: any) {
    console.log(value);
  }

  loadChildren: (val: CascaderItem) => Promise<CascaderItem[]> = (val: CascaderItem) => {
    if (val.value === 1) {
      return new Promise((resolve, rject) => {
        setTimeout(() => {
          resolve(this.children1);
        }, 1000);
      });
    }
  };
}
