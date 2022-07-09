import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CascaderItem, DialogService, ToastService } from 'ng-devui';
import { CategoryService } from 'src/app/@core/services/category.service';
import { ChineseMedicineService } from 'src/app/@core/services/chinese-medicine.service';
import { JoinPipe } from 'src/app/@shared/pipe/join.pipe';
import { MapPipe } from 'src/app/@shared/pipe/map.pipe';
import { ModalCasesComponent } from './modal-cases/modal-cases.component';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  providers: [MapPipe, JoinPipe],
  styleUrls: ['./sample.component.scss'],
})
export class SampleComponent implements OnInit, AfterViewInit {
  constructor(
    private readonly dialogService: DialogService,
    private readonly chineseMedicineService: ChineseMedicineService,
    private toastService: ToastService,
    private readonly categoryService: CategoryService
  ) {
    this.categoryService.getAllParent().subscribe((data) => {
      this.options = data.map((v) => ({ label: v.name, value: v.id }));
      // if (this.categories.length > 0) {
      //   const [tmp, parentCategoryId, childrenCategoryId] = this.categories;
      //   this.loadChildren({ value: parentCategoryId, label: '' }).then((v) => {
      //     for (let i = 0; i < options.length; i++) {
      //       const element = options[i];
      //       if (element.value == this.categories[1]) {
      //         options[i]['children'] = v;
      //         break;
      //       }
      //     }
      //     this.options = options;
      //     this.categories = [parentCategoryId, childrenCategoryId];
      //   });
      // } else {
      //   this.options = options;
      // }
    });
  }
  chineseMedicines = [];
  search = {
    name: '',
    categories: [],
  };
  // categories = [];
  options = [];
  ngOnInit(): void {
    this.loadList();
  }
  loadChildren: (val: CascaderItem) => Promise<CascaderItem[]> = (val: CascaderItem) => {
    const { label, value } = val;
    return new Promise((resolve, reject) => {
      this.categoryService.getChildrenByParent(value as number).subscribe((data) => {
        return resolve(data.map((v) => ({ label: v.name, value: v.id, isLeaf: true })));
      });
    });
  };

  ngAfterViewInit(): void {
    window.dispatchEvent(new Event('resize'));
  }

  loadList(page = 1) {
    const searchDto = {};
    if (this.search.name) searchDto['name'] = this.search.name;
    if (this.search?.categories[1]) searchDto['categoryId'] = this.search?.categories[1];
    // const searchDto = {
    //   name: this.search.name,
    //   category: this.search?.categories[1]
    // }
    this.chineseMedicineService.getMany(page, this.pager.pageSize, searchDto).subscribe((val) => {
      this.pager.total = val.total;
      // this.pager.pageIndex = page;
      // this.pager.pageSize = size;
      this.chineseMedicines = val.list.map((v) => ({
        id: v.id,
        name: v.name,
        category: v.category,
        alias: v.alias,
        nature: v.nature,
        taste: v.taste,
        meridianTropism: v.meridianTropism,
        passage: v.passage,
        createTime: v.date.createTime,
        images: v.images,
      }));
    });
  }
  clear() {
    this.search = {
      categories: [],
      name: '',
    };
  }

  deleteItem(rowItem) {
    this.chineseMedicineService.delete(rowItem.id).subscribe((val) => {
      if (val) this.loadList(this.pager.pageIndex);
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
            const { name, aliasTags, imgList, categories, natureSelects, tasteSelects, meridianTropismSelects, contents } =
              results.modalContentInstance.data;
            this.chineseMedicineService
              .add(
                name,
                aliasTags.map((v) => v.name),
                imgList.map((v) => v.url),
                categories[1],
                natureSelects.map((v) => v.value),
                tasteSelects.map((v) => v.value),
                meridianTropismSelects.map((v) => v.value),
                contents
              )
              .subscribe((data) => {
                results.modalInstance.hide();
                this.loadList(this.pager.pageIndex);
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
        name: '',
        aliasTags: [],
        imgList: [],
        categories: [],
        natureSelects: [],
        tasteSelects: [],
        meridianTropismSelects: [],
        contents: [
          {
            title: '',
            content: '',
          },
        ],
        canConfirm: (value: boolean) => {
          results.modalInstance.updateButtonOptions([{ disabled: !value }]);
        },
      },
    });
  }
  openEditDialog(rowItem) {
    const results = this.dialogService.open({
      id: 'dialog-service',
      width: '600px',
      maxHeight: '600px',
      title: '修改',
      content: ModalCasesComponent,
      backdropCloseable: true,
      dialogtype: 'standard',
      onClose: () => {
        console.log('on dialog closed');
      },
      buttons: [
        {
          cssClass: 'primary',
          text: '修改',
          disabled: true,
          handler: ($event: Event) => {
            const { name, aliasTags, imgList, categories, natureSelects, tasteSelects, meridianTropismSelects, contents } =
              results.modalContentInstance.data;
            console.log(name, aliasTags, imgList, categories, natureSelects, tasteSelects, meridianTropismSelects, contents);

            // TODO: update
            this.chineseMedicineService
              .update(
                rowItem.id,
                name,
                aliasTags.map((v) => (v.id ? { id: v.id, name: v.name } : { name: v.name })),
                imgList.map((v) => v.url),
                categories[1],
                natureSelects.map((v) => v.value),
                tasteSelects.map((v) => v.value),
                meridianTropismSelects.map((v) => v.value),
                contents.map((v) => (v.id ? { id: v.id, title: v.title, content: v.content } : v))
              )
              .subscribe((data) => {
                results.modalInstance.hide();
                this.toastService.open({
                  value: [
                    {
                      severity: 'info',
                      summary: '提示',
                      content: '修改成功！',
                    },
                  ],
                  life: 2000,
                });
                this.loadList(this.pager.pageIndex);
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
        name: rowItem?.name,
        aliasTags: rowItem?.alias,
        imgList: rowItem?.images,
        categories: [
          `${rowItem?.category?.parent?.name} / ${rowItem?.category?.name}`,
          rowItem?.category?.parent?.id,
          rowItem?.category?.id,
        ],
        natureSelects: rowItem?.nature?.map((v) => ({ name: v.name, value: v.id })),
        tasteSelects: rowItem?.taste?.map((v) => ({ name: v.name, value: v.id })),
        meridianTropismSelects: rowItem?.meridianTropism?.map((v) => ({ name: v.name, value: v.id })),
        contents: rowItem?.passage,
        canConfirm: (value: boolean) => {
          results.modalInstance.updateButtonOptions([{ disabled: !value }]);
        },
      },
    });
  }
  // basicDataSource = JSON.parse(JSON.stringify(originSource.slice(0, 6)));
  dataTableOptions = {
    columns: [
      {
        field: 'name',
        header: '名称',
        fieldType: 'text',
      },
      {
        field: 'alias',
        header: '别名',
        fieldType: 'tagsInput',

        selected: [],
      },
      {
        field: 'category',
        header: '分类',
        fieldType: 'text',
      },
      {
        field: 'nature',
        header: '性状',
        fieldType: 'tags',

        selected: [],
      },
      {
        field: 'taste',
        header: '味',
        fieldType: 'tags',

        selected: [],
      },
      {
        field: 'meridianTropism',
        header: '归经',
        fieldType: 'tags',

        selected: [],
      },
      {
        field: 'createTime',
        header: '创建时间',
        fieldType: 'date',
      },
    ],
  };

  tableWidthConfig = [
    {
      field: '#',
      width: '75px',
    },
    {
      field: 'name',
      width: '100px',
    },
    {
      field: 'alias',
      width: '150px',
    },
    {
      field: 'category',
      width: '100px',
    },
    {
      field: 'nature',
      width: '140px',
    },
    {
      field: 'taste',
      width: '140px',
    },
    {
      field: 'meridianTropism',
      width: '140px',
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
  pageIndexChange(pageIndex) {
    this.loadList(pageIndex);
  }
  pageSizeChange(pageSize) {
    this.loadList(this.pager.pageIndex);
  }
}
