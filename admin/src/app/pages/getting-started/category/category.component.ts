import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ITreeItem, OperableTreeComponent, TreeNode } from 'ng-devui';
import { MeridianTropismService } from 'src/app/@core/services/meridian-tropism.service';
import { NatureService } from 'src/app/@core/services/nature.service';
import { TasteService } from 'src/app/@core/services/taste.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly natureService: NatureService,
    private readonly tasteService: TasteService,
    private readonly meridianTropismService: MeridianTropismService
  ) {}

  currentSelectedNode;
  // @ViewChild('operableTree', { static: true }) operableTree: OperableTreeComponent;

  labelStyles = ['blue-w98', 'aqua-w98', 'olivine-w98', 'green-w98', 'yellow-w98', 'orange-w98', 'pink-w98', 'red-w98', 'purple-w98'];

  natureTags = [];
  newNature = '';
  tasteTags = [];
  newTaste = '';
  meridianTropismTags = [];
  newMeridianTropism = '';
  natureObservable = this.natureService.getNatures();
  tasteObservable = this.tasteService.getTastes();
  meridianTropismObservable = this.meridianTropismService.getMeridianTropism();
  data = [
    {
      title: '分类',
      open: true,
      items: [],
    },
  ];

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
  }

  mapLabelStyles(arr: any[]) {
    return arr.map((v, i) => {
      v.labelStyle = this.labelStyles[i % this.labelStyles.length];
      return v;
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

  beforeDeleteNode = (node) => {
    console.log('beforeDeleteNode', node);
    return new Promise((resolve, reject) => {
      resolve(node);
    }).catch((err) => console.error(err));
  };
  postAddNode = (node) => {
    console.log('postAddNode', node);
    return new Promise((resolve, reject) => {
      resolve(node);
    }).catch((err) => console.error(err));
  };
  onOperableNodeDeleted(treeNode: TreeNode) {
    console.log('deleted: ', treeNode);
  }

  onOperableNodeSelected(treeNode: TreeNode) {
    console.log('selected: ', treeNode);
    this.currentSelectedNode = treeNode;
  }

  onOperableNodeToggled(treeNode: TreeNode) {
    console.log('toggled: ', treeNode);
  }

  onOperableNodeChecked(checkedNodes: Array<ITreeItem>) {
    console.log('checked: ', checkedNodes);
  }
  editValueChange(event) {
    console.log('editChanged', event);
    // 标记态校验节点，可通过传入errTips控制报错信息，errTipsPosition控制报错信息的弹出位置
    if (event.value === '') {
      event.callback({
        errTips: 'The node name cannot be null!',
        errTipsPosition: 'right',
      });
    } else {
      // 校验通过后调用callback,取消报错显示
      event.callback();
    }
  }
}
