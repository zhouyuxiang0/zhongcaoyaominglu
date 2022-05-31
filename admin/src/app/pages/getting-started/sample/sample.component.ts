import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DialogService } from 'ng-devui';
import { ChineseMedicineService } from 'src/app/@core/mock/chinese-medicine.service';
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
    private readonly natureService: NatureService,
    private readonly tasteService: TasteService
  ) {}

  ngOnInit(): void {
    this.natureService.getMany().subscribe((val) => {
      this.natureTags = val;
    });
    this.tasteService.getMany().subscribe((val) => {
      this.tasteTags = val;
    });
    this.chineseMedicineService.getChineseMedicines().subscribe((val) => {
      this.chineseMedicines = val;
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
  // basicDataSource = JSON.parse(JSON.stringify(originSource.slice(0, 6)));
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
  natureTagConfig = {
    displayProperty: 'name',
    maxLength: 200,
    minLength: 1,
    maxTags: 100,
    placeholder: '添加性状',
    spellcheck: false,
    caseSensitivity: false,
    isAddBySpace: true,
  };
  tasteTagConfig = {
    displayProperty: 'name',
    maxLength: 200,
    minLength: 1,
    maxTags: 100,
    placeholder: '添加味',
    spellcheck: false,
    caseSensitivity: false,
    isAddBySpace: true,
  };
  meridianTropismTagConfig = {
    displayProperty: 'name',
    maxLength: 200,
    minLength: 1,
    maxTags: 100,
    placeholder: '添加归经',
    spellcheck: false,
    caseSensitivity: false,
    isAddBySpace: true,
  };
  natureTags = [];
  tasteTags = [];
  meridianTropismTags = [];
  natureCheck(value) {
    return true;
  }
  changeNatureTags() {
    const newNatureTag = this.natureTags.filter((v) => !v.id);
    newNatureTag.map((nature) => {
      this.natureService.add(nature.name).subscribe((data) => {
        this.natureTags = this.natureTags.map((v) => {
          if (!v.id) return data;
          return v;
        });
        console.log(this.natureTags);
      });
    });
  }
  tasteCheck(value) {
    return true;
  }
  changeTasteTags() {
    const newTasteTag = this.tasteTags.filter((v) => !v.id);
    newTasteTag.map((taste) => {
      this.tasteService.add(taste.name).subscribe((data) => {
        this.tasteTags = this.tasteTags.map((v) => {
          if (!v.id) return data;
          return v;
        });
      });
    });
  }
  meridianTropismCheck(value) {
    return true;
  }
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
