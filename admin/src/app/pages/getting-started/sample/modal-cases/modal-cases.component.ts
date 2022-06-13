import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CascaderItem } from 'ng-devui/cascader';
import { FormLayout } from 'ng-devui/form';
import { SelectComponent } from 'ng-devui/select';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryService } from 'src/app/@core/services/category.service';
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
    private readonly meridianTropismService: MeridianTropismService,
    private readonly categoryService: CategoryService
  ) {
    this.categoryService.getAllParent().subscribe((data) => {
      const options = data.map((v) => ({ label: v.name, value: v.id }));
      if (this.data.categories.length > 0) {
        const [tmp, parentCategoryId, childrenCategoryId] = this.data.categories;
        this.loadChildren({ value: parentCategoryId, label: '' }).then((v) => {
          for (let i = 0; i < options.length; i++) {
            const element = options[i];
            if (element.value == this.data.categories[1]) {
              options[i]['children'] = v;
              break;
            }
          }
          this.options = options;
          this.data.categories = [parentCategoryId, childrenCategoryId];
        });
      } else {
        this.options = options;
      }
    });
  }
  ngOnInit(): void {}
  @Input() data: any;
  // 名称
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

  options = [];
  children1 = [];
  taskTagConfig = {
    displayProperty: 'url',
    maxLength: 2000,
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
  natureToggleChange($event) {
    if ($event && !this.natureDataLoaded) {
      this.natureSelectComponent.loadStart();
      this.natureChangeSelect();
    }
  }
  natureChangeSelect() {
    this.natureService.getMany().subscribe((data) => {
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
  tasteDataLoaded = false;
  tasteToggleChange($event) {
    if ($event && !this.tasteDataLoaded) {
      this.tasteSelectComponent.loadStart();
      this.tasteChangeSelect();
    }
  }
  tasteChangeSelect() {
    this.tasteService.getMany().subscribe((data) => {
      this.tasteDataLoaded = true;
      this.tasteSelectComponent.loadFinish();
      this.tasteOptions = data.map((v) => ({ name: v.name, value: v.id }));
    });
  }
  /********************meridianTropism********* */
  meridianTropismOptions = [];
  @ViewChild('meridianTropismOptionsSelect', { static: true }) meridianTropismSelectComponent: SelectComponent;
  meridianTropismDataLoaded = false;
  meridianTropismToggleChange($event) {
    if ($event && !this.meridianTropismDataLoaded) {
      this.meridianTropismSelectComponent.loadStart();
      this.meridianTropismChangeSelect();
    }
  }
  meridianTropismChangeSelect() {
    this.meridianTropismService.getMany().subscribe((data) => {
      this.meridianTropismDataLoaded = true;
      this.meridianTropismSelectComponent.loadFinish();
      this.meridianTropismOptions = data.map((v) => ({ name: v.name, value: v.id }));
    });
  }

  formChange() {
    if (
      this.data.name &&
      this.data.imgList.length > 0 &&
      this.data.categories.length > 0 &&
      this.data.natureSelects.length > 0 &&
      this.data.tasteSelects.length > 0 &&
      this.data.meridianTropismSelects.length > 0 &&
      this.data.contents.filter((v) => !v.content || !v.title).length <= 0
    ) {
      this.data.canConfirm(true);
    } else {
      this.data.canConfirm(false);
    }
  }

  loadChildren: (val: CascaderItem) => Promise<CascaderItem[]> = (val: CascaderItem) => {
    const { label, value } = val;
    return new Promise((resolve, reject) => {
      this.categoryService.getChildrenByParent(value as number).subscribe((data) => {
        return resolve(data.map((v) => ({ label: v.name, value: v.id, isLeaf: true })));
      });
    });
  };

  addContent() {
    this.formChange();
    this.data.contents.push({
      title: '',
      content: '',
    });
  }

  removeContent(index) {
    this.data.contents = this.data.contents.filter((_, i) => i !== index);
  }
  imgCheck(value) {
    return from(fetch(value)).pipe(
      map((value) => {
        console.log(value.status == 200);

        return value.status == 200;
      })
    );
  }
}
