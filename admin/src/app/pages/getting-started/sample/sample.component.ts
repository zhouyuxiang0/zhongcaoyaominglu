import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DialogService } from 'ng-devui';
import { ChineseMedicineService } from 'src/app/@core/mock/chinese-medicine.service';
import { ModalCasesComponent } from './modal-cases/modal-cases.component';
const originSource = [
  {
    id: 1,
    name: 'Mark',
    category: 'Otto',
    dob: new Date(1990, 12, 1),
    gender: 'Male',
    description: 'handsome man',
  },
  {
    id: 2,
    name: 'Jacob',
    category: 'Thornton',
    gender: 'Female',
    dob: new Date(1989, 1, 1),
    description: 'interesting man',
  },
  {
    id: 3,
    name: 'Danni',
    category: 'Chen',
    gender: 'Female',
    dob: new Date(1991, 3, 1),
    description: 'pretty man',
    expandConfig: { description: 'Danni is here' },
  },
  {
    id: 4,
    name: 'green',
    category: 'gerong',
    gender: 'Male',
    description: 'interesting man',
    dob: new Date(1991, 3, 1),
  },
  {
    id: 5,
    name: 'po',
    category: 'lang',
    gender: 'Male',
    dob: new Date(1991, 3, 1),
    description: 'lang is here',
  },
  {
    id: 6,
    name: 'john',
    category: 'li',
    gender: 'Female',
    dob: new Date(1991, 3, 1),
    description: 'pretty man',
  },
  {
    id: 7,
    name: 'peng',
    category: 'li',
    gender: 'Female',
    dob: new Date(1991, 3, 1),
  },
  {
    id: 8,
    name: 'Danni',
    category: 'Yu',
    gender: 'Female',
    dob: new Date(1991, 3, 1),
  },
  {
    id: 9,
    name: 'Danni',
    category: 'Yu',
    gender: 'Female',
    dob: new Date(1991, 3, 1),
    detail: '这是另外一个行详情',
  },
  {
    id: 10,
    name: 'Danni',
    category: 'Yu',
    gender: 'Female',
    dob: new Date(1991, 3, 1),
  },
  {
    id: 11,
    name: 'Danni',
    category: 'Yu',
    gender: 'Female',
    dob: new Date(1991, 3, 1),
  },
  {
    id: 12,
    name: 'Danni',
    category: 'Yu',
    gender: 'Female',
    dob: new Date(1991, 3, 1),
  },
];
@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss'],
})
export class SampleComponent implements OnInit, AfterViewInit {
  constructor(private readonly dialogService: DialogService, private readonly chineseMedicineService: ChineseMedicineService) {}

  ngOnInit(): void {
    this.chineseMedicineService.getChineseMedicines().subscribe((val) => {
      this.chineseMedicines = val;
      console.log(val);
    });
  }

  ngAfterViewInit(): void {
    window.dispatchEvent(new Event('resize'));
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
            console.log(results.modalContentInstance);
            results.modalInstance.hide();
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
  chineseMedicines = [];
  basicDataSource = JSON.parse(JSON.stringify(originSource.slice(0, 6)));
  dataTableOptions = {
    columns: [
      {
        field: 'name',
        header: '名称',
        fieldType: 'text',
      },
      {
        field: 'categories',
        header: '分类',
        fieldType: 'text',
      },
      {
        field: 'nature',
        header: '性状',
        fieldType: 'text',
      },
      {
        field: 'taste',
        header: '味',
        fieldType: 'text',
      },
      {
        field: 'meridianTropism',
        header: '归经',
        fieldType: 'text',
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
      width: '150px',
    },
    {
      field: 'categories',
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
    total: 306,
    pageIndex: 5,
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
