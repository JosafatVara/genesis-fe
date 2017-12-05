import { Component, OnInit } from '@angular/core';
import { Freelancer } from '../../shared/models/freelancer';
import { FreelancersService } from '../../core/services/freelancers.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogFreelancerDetailsComponent } from '../dialog-freelancer-details/dialog-freelancer-details.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { Observable } from 'rxjs/Observable';
import { PaginationInstance } from 'ngx-pagination';
import { FormControl } from '@angular/forms';
import { FreelancersSearchPagedSpecification } from '../../core/services/specifications/freelancer-specification';

@Component({
  selector: 'gen-freelancer-list',
  templateUrl: './freelancer-list.component.html',
  styleUrls: ['./freelancer-list.component.scss']
})
export class FreelancerListComponent implements OnInit {

  public inDashboard: boolean;
  public freelancerList: Observable<Array<Freelancer>>;
  public config: PaginationInstance;
  public searchFC: FormControl;

  constructor(private freelancers: FreelancersService, route: ActivatedRoute,private matDialog: MatDialog) {
    route.data.subscribe( (data: {inDashboard:boolean}) => this.inDashboard = data.inDashboard);
    this.config = {
      id: 'pagination',
      itemsPerPage: 5,
      currentPage: 1
    };
  }

  //#region lyfecycle
  ngOnInit() {
    this.searchFC = new FormControl();
    this.searchFC.valueChanges.debounceTime(500).subscribe( () => this.load() );
    this.load();
  }
  //#endregion
  
  load(page?: number){
    page = page || this.config.currentPage;
    this.config.currentPage = page;
    let specification = new FreelancersSearchPagedSpecification(this.searchFC.value || '',page,this.config.itemsPerPage);
    this.freelancers.get(specification)
        .do( list => {
            this.config.totalItems = specification.size;
            this.freelancerList = Observable.of(list);
        })
        .catch( err => {
            return Observable.of([])
        } ).subscribe();
  }

  public crud(mode: string, freelancer: Freelancer = undefined ){
    if(mode=='delete'){
      this.delete(Object.assign({},freelancer));
      return;
    }
    let dialogRef = this.matDialog.open(DialogFreelancerDetailsComponent,{
      disableClose: true,
      width: '80%',
      data: {
        mode: mode,
        freelancer: Object.assign({},freelancer)
      }
    });
    dialogRef.afterClosed().subscribe( (result: { cancelled: boolean }) => {
      if(result&&!result.cancelled){
        this.load();
      }
    });
  }

  private delete(freelancer: Freelancer){
    let dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: {
        message: `Eliminar al trabajador ${freelancer.firstName} ${freelancer.lastName}?`
      }
    });
    dialogRef.afterClosed().subscribe( confirm => {
      if(confirm){
        this.freelancers.delete(freelancer).subscribe( () => this.load());
      }
    });
  }


}
