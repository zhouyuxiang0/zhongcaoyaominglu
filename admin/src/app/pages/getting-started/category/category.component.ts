import { Component, OnInit, ViewChild } from '@angular/core';
import { ITreeItem, OperableTreeComponent, TreeNode } from 'ng-devui';
import { CategoryService } from 'src/app/@core/services/category.service';
import { MeridianTropismService } from 'src/app/@core/services/meridian-tropism.service';
import { NatureService } from 'src/app/@core/services/nature.service';
import { TasteService } from 'src/app/@core/services/taste.service';
let parentId;
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  constructor(
    private readonly natureService: NatureService,
    private readonly tasteService: TasteService,
    private readonly meridianTropismService: MeridianTropismService,
    private readonly categoryService: CategoryService
  ) {}

  currentSelectedNode;
  @ViewChild('operableTree', { static: true }) operableTree: OperableTreeComponent;

  labelStyles = ['blue-w98', 'aqua-w98', 'olivine-w98', 'green-w98', 'yellow-w98', 'orange-w98', 'pink-w98', 'red-w98', 'purple-w98'];

  natureTags = [];
  newNature = '';
  tasteTags = [];
  newTaste = '';
  meridianTropismTags = [];
  newMeridianTropism = '';
  natureObservable = this.natureService.getMany();
  tasteObservable = this.tasteService.getMany();
  meridianTropismObservable = this.meridianTropismService.getMany();
  data = [];

  ngOnInit(): void {
    this.natureObservable.subscribe((data) => {
      this.natureTags = this.mapLabelStyles(data);
    });
    this.tasteObservable.subscribe((data) => {
      this.tasteTags = this.mapLabelStyles(data);
    });
    this.meridianTropismObservable.subscribe((data) => {
      this.meridianTropismTags = this.mapLabelStyles(data);
    });
    this.loadCategory();
  }

  mapLabelStyles(arr: any[]) {
    return arr.map((v, i) => {
      v.labelStyle = this.labelStyles[i % this.labelStyles.length];
      return v;
    });
  }

  loadCategory() {
    this.categoryService.getMany().subscribe((data) => {
      this.data = [
        {
          name: '分类',
          open: true,
          children: data.map((v) => ({ ...v, open: true })),
          disableEdit: true,
          disableDelete: true,
        },
      ];
    });
  }

  deleteNatureTag(index) {
    const tag = this.natureTags[index];
    console.log(tag);
  }
  deleteTasteTag(index) {
    const tag = this.tasteTags[index];
    console.log(tag);
  }
  deleteMeridianTropismTag(index) {
    const tag = this.meridianTropismTags[index];
    console.log(tag);
  }

  addNatureTag() {
    if (this.newNature) {
      this.natureService.add(this.newNature).subscribe((data) => {
        this.newNature = '';
        this.natureTags.push(data);
        this.mapLabelStyles(this.natureTags);
      });
    }
  }
  addTasteTag() {
    if (this.newTaste) {
      this.tasteService.add(this.newTaste).subscribe((data) => {
        this.newTaste = '';
        this.tasteTags.push(data);
        this.mapLabelStyles(this.tasteTags);
      });
    }
  }
  addMeridianTropismTag() {
    if (this.newMeridianTropism) {
      this.meridianTropismService.add(this.newMeridianTropism).subscribe((data) => {
        this.newMeridianTropism = '';
        this.meridianTropismTags.push(data);
        this.mapLabelStyles(this.meridianTropismTags);
      });
    }
  }
  beforeAddNode(node) {
    parentId = node.data.originItem.id;
    return new Promise((resolve, reject) => {
      resolve({ title: '新增节点' });
    });
  }
  postAddNode = (node) => {
    this.categoryService.add(node.data.title, parentId ? parentId : null).subscribe((data) => {
      parentId = null;
      this.loadCategory();
    });
    return new Promise((resolve, reject) => {
      return resolve(node);
    }).catch((err) => console.error(err));
  };
  onOperableNodeDeleted(treeNode: TreeNode) {
    this.categoryService.del(treeNode.data.originItem.id).subscribe((data) => {});
  }

  onOperableNodeChecked(checkedNodes: Array<ITreeItem>) {
    // console.log('checked: ', checkedNodes);
  }
  onOperableNodeEdited(treeNode: TreeNode) {
    this.categoryService
      .update(treeNode.data.originItem.id, treeNode.data.title, treeNode.data.originItem.parent?.id)
      .subscribe((data) => {});
  }
  select(e) {
    console.log(e.data.originItem.id);
    console.log(e.data.originItem.parent?.id);
  }
  editValueChange(event) {
    // 标记态校验节点，可通过传入errTips控制报错信息，errTipsPosition控制报错信息的弹出位置
    if (event.value === '') {
      event.callback({
        errTips: '节点名称不能为空！',
        errTipsPosition: 'right',
      });
    } else {
      // 校验通过后调用callback,取消报错显示
      event.callback();
    }
  }
}
