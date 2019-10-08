import { Component, Input,  } from '@angular/core';
import { 
  NbSortDirection, 
  NbSortRequest, 
  NbTreeGridDataSource, 
  NbTreeGridDataSourceBuilder,
  NbToastrService,
  NbComponentStatus,
  NbGlobalPhysicalPosition
 } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { AppGlobals } from '../../app.global';
interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  name: string;
  size: string;
  kind: string;
  items?: number;
}
@Component({
  selector: 'ngx-tree-grid',
  templateUrl: './tree-grid.component.html',
  styleUrls: ['./tree-grid.component.scss'],
  providers: [AppGlobals],

})
export class TreeGridComponent {
  customColumn = 'name';
  defaultColumns = [ 'size', 'kind', 'items' ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,
    private httpClient : HttpClient, 
    private _global: AppGlobals, 
    private toastrService: NbToastrService,
    ) {
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }
  objek: any[]=[];
  objek2: any[]=[];
  index = 1;
  ngOnInit(): void {
    this.httpClient.get(this._global.baseAPIUrl + '/View_penilaian_indikator_alls/getDataBypenilaianIdDanJenisDanKIIDanKsat?penilaianId=114&jenis=P&kodeSatfung=TSU&kodeIndikatorInduk=K01').subscribe(indikator => {
      const data = JSON.stringify(indikator);
      var datax = JSON.parse(data); 
      // this.objek = this.sources;
      datax.forEach(xx => {
        this.objek.push({
          kode_indikator_induk:xx.kode_indikator_induk,
          indikator:xx.indikator,
          details:this.objek2
        })   
        // this.prinsipName = xx.title;                
      });
    },
    error  => {
      console.log("Error", error);
      this.showToast("warning", "Koneksi bermasalah", error.message);      
    }
    ); 
  
    console.log("GABUNG");
    console.log(this.objek);

    this.httpClient.get(this._global.baseAPIUrl + '/View_penilaian_indikator_alls/getDataBypenilaianIdDanJenisDanKIIDanKsat?penilaianId=114&jenis=D&kodeSatfung=TSU&kodeIndikatorInduk=K01').subscribe(indikator => {
      const data = JSON.stringify(indikator);
      var datax = JSON.parse(data); 
    console.log(datax);
      // this.objek = this.sources;
      datax.forEach(xx => {
        this.objek2.push({
          kode_indikator_induk:xx.kode_indikator_induk,
          indikator:xx.indikator,
          satuan:xx.satuan,
          nilai:xx.nilai,
          arsip_link:xx.arsip_link,
          progress:xx.progress,
          id:xx.id,
        })   
        // this.prinsipName = xx.title;                
      });
    },
    error  => {
      console.log("Error", error);
      this.showToast("warning", "Koneksi bermasalah", error.message);      
    }
    ); 
    console.log("Details");
    console.log(this.objek2);
    
    
  }  
  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 4000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false,
    };
    const titleContent = title ? `${title}` : '';

    this.index += 1;
    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }

  private data: TreeNode<FSEntry>[] = [
    {
      data: { name: 'Projects', size: '1.8 MB', items: 5, kind: 'dir' },
      children: [
        { data: { name: 'project-1.doc', kind: 'doc', size: '240 KB' } },
        { data: { name: 'project-2.doc', kind: 'doc', size: '290 KB' } },
        { data: { name: 'project-3', kind: 'txt', size: '466 KB' } },
        { data: { name: 'project-4.docx', kind: 'docx', size: '900 KB' } },
      ],
    },
    {
      data: { name: 'Reports', kind: 'dir', size: '400 KB', items: 2 },
      children: [
        { data: { name: 'Report 1', kind: 'doc', size: '100 KB' } },
        { data: { name: 'Report 2', kind: 'doc', size: '300 KB' } },
      ],
    },
    {
      data: { name: 'Other', kind: 'dir', size: '109 MB', items: 2 },
      children: [
        { data: { name: 'backup.bkp', kind: 'bkp', size: '107 MB' } },
        { data: { name: 'secret-note.txt', kind: 'txt', size: '2 MB' } },
      ],
    },
  ];

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }
}

@Component({
  selector: 'ngx-fs-icon',
  template: `
    <nb-tree-grid-row-toggle [expanded]="expanded" *ngIf="isDir(); else fileIcon">
    </nb-tree-grid-row-toggle>
    <ng-template #fileIcon>
      <nb-icon icon="file-text-outline"></nb-icon>
    </ng-template>
  `,
})
export class FsIconComponent {
  @Input() kind: string;
  @Input() expanded: boolean;

  isDir(): boolean {
    return this.kind === 'dir';
  }
}
