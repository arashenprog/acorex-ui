import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { AXBasePageComponent, MenuItem, AXTabPageService } from 'acorex-ui';
import { FormsService, FormDTO } from '../froms.services';
import { DesignerPage } from '../designer/designer.page';

@Component({
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormsListPage extends AXBasePageComponent {
  constructor(
    private formService: FormsService,
    private tabPage: AXTabPageService
  ) {
    super();
    //

  }

  ngAfterViewChecked(): void {
    if (!this.cardItems.length)
      this.refresh();
  }

  private refresh() {
    this.formService.getList().then((data) => {
      this.cardItems = data;
    })
  }

  toolbarItemsRight: MenuItem[] = [
    {
      name: "new",
      icon: "fas fa-pen",
      style: "btn btn-success",
      text: "ایجاد"
    },
    {
      name: "refresh",
      icon: "fas fa-sync",
      style: "btn btn-info",
      text: "بروزرسانی"
    }
  ];

  cardItems: any[] = [];

  onSearch(text) {
    let filtred = this.cardItems.filter((c) => {
      return c.title == text
    })
  }

  onItemMenuRightClick(e) {
    if (e.name == "new") {
      this.tabPage.open(DesignerPage, "فرم جدید").closed(() => {
        debugger;
        this.refresh();
      });;
    }
    if (e.name == "refresh") {
      this.refresh();
    }
  }

  onItemClick(form) {
    this.tabPage.open({
      content: DesignerPage,
      title: `${form.code}فرم شماره`,
      data: { code: form.code }
    }).closed(() => {
      this.refresh();
    });
  }
}
