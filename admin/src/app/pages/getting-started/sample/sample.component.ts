import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CascaderItem, DialogService, EditableTip } from 'ng-devui';
import { CategoryService } from 'src/app/@core/services/category.service';
import { ChineseMedicineService } from 'src/app/@core/services/chinese-medicine.service';
import { MeridianTropismService } from 'src/app/@core/services/meridian-tropism.service';
import { NatureService } from 'src/app/@core/services/nature.service';
import { TasteService } from 'src/app/@core/services/taste.service';
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
    private readonly categoryService: CategoryService,
    private readonly natureService: NatureService,
    private readonly tasteService: TasteService,
    private readonly meridianTropismService: MeridianTropismService
  ) {}
  chineseMedicines = [];
  ngOnInit(): void {
    this.loadList();
  }

  ngAfterViewInit(): void {
    window.dispatchEvent(new Event('resize'));
  }

  loadList() {
    this.chineseMedicineService.getMany().subscribe((val) => {
      this.chineseMedicines = val.map((v) => ({
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
            const { name, aliasTags, imgList, categories, natureSelects, tasteSelects, meridianTropismSelects, contents } =
              results.modalContentInstance;
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
                natureSelects.map((v) => v.id),
                tasteSelects.map((v) => v.id),
                meridianTropismSelects.map((v) => v.id),
                contents.map((v) => (v.id ? { id: v.id, title: v.title, content: v.content } : v))
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
        name: rowItem.name,
        aliasTags: rowItem.alias,
        imgList: rowItem.images,
        categories: [`${rowItem.category.parent.name} / ${rowItem.category.name}`, rowItem.category.parent.id, rowItem.category.id],
        natureSelects: rowItem.nature,
        tasteSelects: rowItem.taste,
        meridianTropismSelects: rowItem.meridianTropism,
        contents: rowItem.passage,
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
      width: '50px',
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
