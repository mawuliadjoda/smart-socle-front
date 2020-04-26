import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { RefMedicamentAnsmService } from 'src/app/util/services/refMedicament-ansm.service';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { RefMedicamentANSM } from 'src/app/models/ref-medicament-ansm';

@Component({
  selector: 'app-ref-medicament-ansm',
  templateUrl: './refMedicamentANSM.component.html',
  styleUrls: ['./refMedicamentANSM.component.css']
})
export class RefMedicamentANSMComponent implements OnInit, AfterViewInit {

 displayedColumns = [
    'cis',
    'nom',
    'libelleAtc',
    'codeAtc',
    'titulaire'
  ];

  index: number;
  id: number;
  dataSource = new MatTableDataSource<RefMedicamentANSM>([]);
  data: Array<RefMedicamentANSM>;

  loading = true;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  // pageSize = 5;

  // pageIndex = 1;
    /** The current page index. */
  pageIndex = 0;
  /** The current page size */
  pageSize = 5;
  /** The current total number of items being paged */
  length: number;
  /**
   * Index of the page that was selected previously.
   * @breaking-change 8.0.0 To be made into a required property.
   */
  previousPageIndex?: number;

  sortBy = 'nom';

  pageSizeOptions: number[] = [5, 10];
  // no = 0;
  constructor(
    public dialog: MatDialog,
    private refMedicamentAnsmService: RefMedicamentAnsmService
  ) {}
  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  public loadData() {
    this.refMedicamentAnsmService.getAll(this.pageSize, this.pageIndex, this.sortBy).subscribe(data => {
      this.data = data.content;
      this.dataSource = new MatTableDataSource(this.data);

      // this.paginator.pageIndex = data.number;
      // this.paginator.pageSize = data.size;
      // this.paginator.length = data.totalElements;

      this.length = data.totalElements;
      this.pageIndex = data.number;
      this.pageSize = data.size;

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.loading = false;
    },
    (err: HttpErrorResponse) => {
      this.loading = true;
      console.log(err.name + ' ' + err.message);
    });
  }


  changePage(e: PageEvent) {
    // this.no = e.pageIndex > 0 ? e.pageIndex * e.pageSize : 0;
    this.refMedicamentAnsmService.getAll(e.pageSize, e.pageIndex, this.sortBy).subscribe((page) => {
      this.dataSource = new MatTableDataSource(page.content);
      this.length = page.totalElements;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  // public handlePage(e: any) {
  //   this.pageIndex = e.pageIndex;
  //   this.pageSize = e.pageSize;
  //   this.iterator();
  // }
  // private iterator() {
  //   const end = (this.pageIndex + 1) * this.pageSize;
  //   const start = this.pageIndex * this.pageSize;
  //   const part = this.data.slice(start, end);
  //   this.dataSource = new MatTableDataSource(part);
  // }

  // private toTableData(books: Book[]): TableData[] {
  //   return books.map(b => {
  //     return {
  //       isbn: b.isbn,
  //       name: b.name,
  //       authors: b.authorName,
  //       year: b.year,
  //       pages: b.totalPage,
  //     };
  //   });
  // }
}
