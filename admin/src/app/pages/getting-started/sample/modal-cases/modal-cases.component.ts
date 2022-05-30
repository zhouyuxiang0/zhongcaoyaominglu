import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CascaderItem } from 'ng-devui/cascader';
import { FormLayout } from 'ng-devui/form';
import { SelectComponent } from 'ng-devui/select';
import { from, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { MeridianTropismService } from 'src/app/@core/services/meridian-tropism.service';
import { NatureService } from 'src/app/@core/services/nature.service';
import { TasteService } from 'src/app/@core/services/taste.service';
@Component({
  selector: 'd-modal-cases',
  templateUrl: './modal-cases.component.html',
})
export class ModalCasesComponent implements OnInit {
  constructor(
    private readonly natureService: NatureService,
    private readonly tasteService: TasteService,
    private readonly meridianTropismService: MeridianTropismService
  ) {}
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
  aliasTags = [];
  aliasTagConfig = {
    displayProperty: 'name',
    maxLength: 200,
    minLength: 1,
    maxTags: 100,
    placeholder: '添加别名',
    spellcheck: false,
    caseSensitivity: false,
    isAddBySpace: true,
  };
  aliasCheck(value) {
    return true;
  }
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
    this.natureService.getNatures().subscribe((data) => {
      this.natureDataLoaded = true;
      this.natureSelectComponent.loadFinish();
      this.natureOptions = data.map((v) => ({
        name: v.name,
        value: v.id,
      }));
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
    this.tasteService.getTastes().subscribe((data) => {
      this.tasteDataLoaded = true;
      this.tasteSelectComponent.loadFinish();
      this.tasteOptions = data.map((v) => ({ name: v.name, value: v.id }));
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
    this.meridianTropismService.getMeridianTropism().subscribe((data) => {
      this.meridianTropismDataLoaded = true;
      this.meridianTropismSelectComponent.loadFinish();
      this.meridianTropismOptions = data.map((v) => ({ name: v.name, value: v.id }));
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
