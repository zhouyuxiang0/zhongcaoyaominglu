import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormLayout } from 'ng-devui/form';
import { CascaderItem } from 'ng-devui/cascader';
import { SelectComponent } from 'ng-devui/select';
import { from, of, timer } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'd-modal-cases',
  templateUrl: './modal-cases.component.html',
})
export class ModalCasesComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {
    this.options = [
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
  }
  @Input() data: any;
  // 名称
  name = '';
  layoutDirection: FormLayout = FormLayout.Vertical;

  categories: Array<string | number> = [];

  options = [];
  children1 = [];
  imgList = [];
  taskTagConfig = {
    displayProperty: 'name',
    maxLength: 200,
    minLength: 7,
    maxTags: 10,
    placeholder: '添加图片链接',
    spellcheck: false,
    caseSensitivity: false,
    isAddBySpace: true,
  };
  /****************nature ************ */
  @ViewChild('natureOptionsSelect', { static: true }) natureSelectComponent: SelectComponent;
  natureDataLoaded = false;
  natureOptions = [];
  natureSelects = [];
  natureToggleChange($event) {
    if ($event && !this.natureDataLoaded) {
      this.natureSelectComponent.loadStart();
      this.natureChangeSelect();
    }
  }
  natureChangeSelect() {
    timer(500).subscribe(() => {
      this.natureDataLoaded = true;
      this.natureSelectComponent.loadFinish();
      this.natureOptions = [
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
    });
  }
  /*************taste************* */
  @ViewChild('tasteOptionsSelect', { static: true }) tasteSelectComponent: SelectComponent;
  tasteOptions = [];
  tasteSelects = [];
  tasteDataLoaded = false;
  tasteToggleChange($event) {
    if ($event && !this.tasteDataLoaded) {
      this.tasteSelectComponent.loadStart();
      this.tasteChangeSelect();
    }
  }
  tasteChangeSelect() {
    timer(500).subscribe(() => {
      this.tasteDataLoaded = true;
      this.tasteSelectComponent.loadFinish();
      this.tasteOptions = [
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
    });
  }
  /********************meridianTropism********* */
  meridianTropismOptions = [];
  meridianTropismSelects = [];
  @ViewChild('meridianTropismOptionsSelect', { static: true }) meridianTropismSelectComponent: SelectComponent;
  meridianTropismDataLoaded = false;
  meridianTropismToggleChange($event) {
    if ($event && !this.meridianTropismDataLoaded) {
      this.meridianTropismSelectComponent.loadStart();
      this.meridianTropismChangeSelect();
    }
  }
  meridianTropismChangeSelect() {
    timer(500).subscribe(() => {
      this.meridianTropismDataLoaded = true;
      this.meridianTropismSelectComponent.loadFinish();
      this.meridianTropismOptions = [
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
    });
  }

  contents = [
    {
      title: '',
      content: '',
    },
  ];

  formChange() {
    if (
      this.name &&
      this.categories.length > 0 &&
      this.natureSelects.length > 0 &&
      this.tasteSelects.length > 0 &&
      this.meridianTropismSelects.length > 0 &&
      this.contents.filter((v) => !v.content || !v.title).length <= 0
    ) {
      this.data.canConfirm(true);
    } else {
      this.data.canConfirm(false);
    }
  }

  loadChildren: (val: CascaderItem) => Promise<CascaderItem[]> = (val: CascaderItem) => {
    this.children1 = [
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
    if (val.value === 1) {
      return new Promise((resolve, rject) => {
        setTimeout(() => {
          resolve(this.children1);
        }, 1000);
      });
    }
  };

  addContent() {
    this.formChange();
    this.contents.push({
      title: '',
      content: '',
    });
  }

  removeContent(index) {
    this.contents = this.contents.filter((_, i) => i !== index);
  }
  imgCheck(value) {
    return from(fetch(value)).pipe(
      map((value) => {
        return value.status == 200;
      })
    );
  }
}
