import { Component, OnInit, ViewEncapsulation } from "@angular/core";
// import { HttpService } from "../../services/HttpService";

@Component({
  selector: "ax-data-grid",
  templateUrl: "./datagrid.component.html",
  styleUrls: ["./datagrid.component.scss"]
})
export class AXDataGridComponent implements OnInit {
  constructor() {}

  columnDefs = [
    { headerName: "نام دارو", field: "1", width: 100 },
    { headerName: "شکل", field: "2", width: 100 },
    { headerName: "دوز مصرف", field: "4", width: 100 },
    { headerName: "تعداد", field: "3", width: 100 },
    { headerName: "توضیحات", field: "5", width: 100 }
  ];

  searchText: string = "";

  rowData = [];

  ngOnInit(): void {
    // this.httpService.get("https://jsonplaceholder.typicode.com/todos").fetch(data => {
    //     this.rowData = data;
    // })
    this.rowData = [
      {
        1: "بیمه رازی",
        2: "ندارد",
        3: 90,
        4: "حسن حسنی",
        5: 54998,
        6: 2,
        7: "1397/5/12",
        8: 20333
      },
      {
        1: "بیمه رازی",
        2: "ندارد",
        3: 90,
        4: "حسن حسنی",
        5: 54998,
        6: 2,
        7: "1397/5/12",
        8: 20333
      },
      {
        1: "بیمه رازی",
        2: "ندارد",
        3: 90,
        4: "حسن حسنی",
        5: 54998,
        6: 2,
        7: "1397/5/12",
        8: 20333
      },
      {
        1: "بیمه رازی",
        2: "ندارد",
        3: 90,
        4: "حسن حسنی",
        5: 54998,
        6: 2,
        7: "1397/5/12",
        8: 20333
      },
      {
        1: "بیمه رازی",
        2: "ندارد",
        3: 90,
        4: "حسن حسنی",
        5: 54998,
        6: 2,
        7: "1397/5/12",
        8: 20333
      },
      {
        1: "بیمه رازی",
        2: "ندارد",
        3: 90,
        4: "حسن حسنی",
        5: 54998,
        6: 2,
        7: "1397/5/12",
        8: 20333
      },
      {
        1: "بیمه رازی",
        2: "ندارد",
        3: 90,
        4: "حسن حسنی",
        5: 54998,
        6: 2,
        7: "1397/5/12",
        8: 20333
      }
    ];
  }

  onSearch(e) {}
}
