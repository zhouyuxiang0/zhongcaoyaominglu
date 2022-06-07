import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CascaderItem, DialogService, EditableTip } from 'ng-devui';
import { CategoryService } from 'src/app/@core/services/category.service';
import { ChineseMedicineService } from 'src/app/@core/services/chinese-medicine.service';
import { MeridianTropismService } from 'src/app/@core/services/meridian-tropism.service';
import { NatureService } from 'src/app/@core/services/nature.service';
import { TasteService } from 'src/app/@core/services/taste.service';
import { ModalCasesComponent } from './modal-cases/modal-cases.component';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss'],
})
export class SampleComponent implements OnInit, AfterViewInit {
  constructor(
    private readonly dialogService: DialogService,
    private readonly chineseMedicineService: ChineseMedicineService,
    private readonly categoryService: CategoryService,
    private readonly natureService: NatureService,
    private readonly tasteService: TasteService,
    private readonly meridianTropismService: MeridianTropismService
  ) {}
  #chineseMedicine = [];
  // 表格筛选
  filterArr = [];
  editableTip = EditableTip.btn;
  options = [];
  categories: Array<string | number> = [];
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
  categoryChange(data) {
    console.log(data);
  }
  tagsInputCheck = (newTag) => {
    console.log(newTag);
    return true;
  };
  tagsInputChange(item) {
    console.log(item);
  }
  ngOnInit(): void {
    this.loadList();
    this.categoryService.getAllParent().subscribe((data) => {
      this.options = data.map((v) => ({ label: v.name, id: v.id }));
    });
    this.natureService.getMany().subscribe((data) => {
      this.dataTableOptions.columns.map((v) => {
        if (v.field == 'nature') v.selectOption = data;
        return v;
      });
    });
  }

  ngAfterViewInit(): void {
    window.dispatchEvent(new Event('resize'));
  }

  loadList() {
    this.chineseMedicineService.getMany().subscribe((val) => {
      this.chineseMedicines = val.map((v) => ({
        id: v.id,
        name: v.name,
        category: v.category.name,
        alias: v.alias,
        nature: v.nature,
        taste: v.taste,
        meridianTropism: v.meridianTropism,
        passage: v.passage,
        createTime: v.date.createTime,
      }));
    });
  }

  deleteItem(rowItem) {
    this.chineseMedicineService.delete(rowItem.id).subscribe((val) => {
      if (val) this.loadList();
    });
  }
  openstandardDialog(dialogtype?: string) {
    const results = this.dialogService.open({
      id: 'dialog-service',
      width: '600px',
      maxHeight: '600px',
      title: '新建',
      content: ModalCasesComponent,
      backdropCloseable: true,
      dialogtype: dialogtype,
      onClose: () => {
        console.log('on dialog closed');
      },
      buttons: [
        {
          cssClass: 'primary',
          text: '确定',
          disabled: true,
          handler: ($event: Event) => {
            console.log('tag created');
            const { name, aliasTags, imgList, categories, natureSelects, tasteSelects, meridianTropismSelects, contents } =
              results.modalContentInstance;
            console.log(name, aliasTags, imgList, categories, natureSelects, tasteSelects, meridianTropismSelects, contents);
            this.chineseMedicineService
              .add(
                name,
                aliasTags.map((v) => v.name),
                imgList.map((v) => v.name),
                categories[1],
                natureSelects.map((v) => v.value),
                tasteSelects.map((v) => v.value),
                meridianTropismSelects.map((v) => v.value),
                contents
              )
              .subscribe((data) => {
                results.modalInstance.hide();
                this.loadList();
              });
          },
        },
        {
          id: 'btn-cancel',
          cssClass: 'common',
          text: '取消',
          handler: ($event: Event) => {
            results.modalInstance.hide();
          },
        },
      ],
      data: {
        canConfirm: (value: boolean) => {
          results.modalInstance.updateButtonOptions([{ disabled: !value }]);
        },
      },
    });
  }
  set chineseMedicines(data: { name: string; category: string }[]) {
    this.dataTableOptions.columns.forEach((v) => {
      this.filterArr.push(
        data.map((d) => ({
          name: d[v.field],
        }))
      );
    });
    this.#chineseMedicine = data;
  }
  get chineseMedicines() {
    return this.#chineseMedicine;
  }

  loadChildren: (val: CascaderItem) => Promise<CascaderItem[]> = (val: CascaderItem) => {
    const { label, value } = val;
    return new Promise((resolve, reject) => {
      this.categoryService.getChildrenByParent(value as number).subscribe((data) => {
        return resolve(data.map((v) => ({ label: v.name, value: v.id, isLeaf: true })));
      });
    });
  };
  removeContent(item, index) {
    item.passage = item.passage.filter((v, i) => i !== index);
  }
  updatePassage(rowItem) {
    const { id, name } = rowItem;
    console.log(rowItem);

    // this.chineseMedicineService.update()
  }
  // basicDataSource = JSON.parse(JSON.stringify(originSource.slice(0, 6)));
  dataTableOptions = {
    columns: [
      {
        field: 'name',
        header: '名称',
        fieldType: 'text',
        sortable: false,
        filterable: true,
        filterMultiple: true,
        editable: true,
      },
      {
        field: 'alias',
        header: '别名',
        fieldType: 'tagsInput',
        sortable: false,
        filterable: true,
        filterMultiple: true,
        editable: true,
        selectOption: [],
        selected: [],
      },
      {
        field: 'category',
        header: '分类',
        fieldType: 'text',
        sortable: true,
        filterable: true,
        filterMultiple: true,
        editable: false,
      },
      {
        field: 'nature',
        header: '性状',
        fieldType: 'tags',
        sortable: true,
        filterable: true,
        filterMultiple: true,
        editable: true,
        selectOption: [],
        selected: [],
      },
      {
        field: 'taste',
        header: '味',
        fieldType: 'tags',
        sortable: true,
        filterable: true,
        filterMultiple: true,
        editable: true,
        selectOption: [],
        selected: [],
      },
      {
        field: 'meridianTropism',
        header: '归经',
        fieldType: 'tags',
        sortable: true,
        filterable: true,
        filterMultiple: true,
        editable: true,
        selectOption: [],
        selected: [],
      },
      {
        field: 'createTime',
        header: '创建时间',
        fieldType: 'date',
        sortable: true,
        filterable: true,
        filterMultiple: true,
        editable: false,
        selectOption: [],
      },
    ],
  };

  tableWidthConfig = [
    {
      field: '#',
      width: '50px',
    },
    {
      field: 'name',
      width: '150px',
    },
    {
      field: 'category',
      width: '150px',
    },
    {
      field: 'nature',
      width: '150px',
    },
    {
      field: 'taste',
      width: '150px',
    },
    {
      field: 'meridianTropism',
      width: '150px',
    },
    {
      field: 'createTime',
      width: '150px',
    },
  ];

  pager = {
    total: 1,
    pageIndex: 1,
    pageSize: 10,
    pageSizeOptions: [10, 20, 30, 40, 50],
  };
  toggleExpand(rowItem) {
    rowItem.$expand = !rowItem.$expand;
  }
  onEditSelect(item, field) {
    const {} = item;
    if (field == 'nature') {
      //
    }
    // const id = item.id;
    // console.log(JSON.stringify(item), field);
    // item[field + 'edit'] = false;
    // item[field] = this.selectModel.label;
    // const col = this.dataTableOptions.columns.find((v) => v.field === field);
  }
  pageIndexChange(pageIndex) {
    this.checkCount(pageIndex);
  }
  pageSizeChange(pageSize) {
    this.pager.pageIndex = 1;
    this.checkCount(this.pager.pageIndex);
  }
  checkCount(pageIndex) {
    console.log('check number of the function calls and show current pageIndex', pageIndex);
  }
}
