import { Component, OnInit } from '@angular/core';
import { Freelancer } from '../../shared/models/freelancer';
import { FreelancersService } from '../../core/services/freelancers.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogFreelancerDetailsComponent } from '../dialog-freelancer-details/dialog-freelancer-details.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'gen-freelancer-list',
  templateUrl: './freelancer-list.component.html',
  styleUrls: ['./freelancer-list.component.scss']
})
export class FreelancerListComponent implements OnInit {

  public inDashboard: boolean;
  public freelancerList: Array<Freelancer>;

  constructor(private freelancers: FreelancersService, route: ActivatedRoute,private matDialog: MatDialog) {
    route.data.subscribe( (data: {inDashboard:boolean}) => this.inDashboard = data.inDashboard);
  }

  //#region lyfecycle
  ngOnInit() {
    this.refreshFreelancerList();
  }
  //#endregion
  

  private refreshFreelancerList(){
    this.freelancers.get().subscribe( es => this.freelancerList = es );
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
        this.refreshFreelancerList();
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
        this.freelancers.delete(freelancer).subscribe( () => this.refreshFreelancerList());
      }
    });
  }


}
