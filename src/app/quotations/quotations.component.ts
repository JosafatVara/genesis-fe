import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ModalCrudComponent } from "./modal-crud/modal-crud.component";
import { PaginationInstance } from 'ngx-pagination';
import { FormControl } from '@angular/forms';
import { QuotationsService } from '../core/services/quotations.service';
import { Observable } from 'rxjs/Observable';
import { Quotation } from '../shared/models/quotation';
import { QuotationsSearchPagedSpecification } from '../core/services/specifications/quotation-specification';

@Component({
  selector: 'gen-quotations',
  templateUrl: './quotations.component.html',
  styleUrls: ['./quotations.component.scss']
})
export class QuotationsComponent implements OnInit {

  public quotationList: Observable<Quotation[]>;
  public config: PaginationInstance;
  public searchFC: FormControl;
  
  constructor(public dialog: MatDialog, private quotations: QuotationsService) { 
    this.config = {
      id: 'pagination',
      itemsPerPage: 2,
      currentPage: 1
    };
  }

  ngOnInit() {
    this.searchFC = new FormControl();
    this.searchFC.valueChanges.debounceTime(500).subscribe( () => this.load() );
    this.load();
  }

  load(page?: number){
    page = page || this.config.currentPage;
    this.config.currentPage = page;
    let specification = new QuotationsSearchPagedSpecification(this.searchFC.value || '',page,this.config.itemsPerPage);
    this.quotations.get(specification)
        .do( list => {
            this.config.totalItems = specification.size;
            this.quotationList = Observable.of(list);
        })
        .catch( err => Observable.of([]) ).subscribe();
}

  crud(mode: string, quotation?: Quotation): void {
    if(['c','u'].includes(mode)){
      let dialogRef = this.dialog.open(ModalCrudComponent, {
        width: '720px',
        disableClose: true,
        data: { 
          quotation: quotation 
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.load();
        }
      });
    }
  }
}
