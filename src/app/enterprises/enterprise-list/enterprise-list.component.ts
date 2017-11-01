import { Component, OnInit, EventEmitter, AfterViewInit, Input } from '@angular/core';
import { EnterprisesService, EnterpriseListDataSource } from '../../core/services/enterprises.service';
import { DataSource } from '@angular/cdk/collections';
import { Enterprise } from '../../shared/models/enterprise';
import { Refresher } from '../../core/services/shared/refresher';
import { UsersService } from '../../core/services/users.service';
import { User } from '../../shared/models/user';
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from '@angular/material';
import { DialogEnterpriseDetailsComponent } from '../dialog-enterprise-details/dialog-enterprise-details.component';

@Component({
  selector: 'gen-enterprise-list',
  templateUrl: './enterprise-list.component.html',
  styleUrls: ['./enterprise-list.component.scss']
})
export class EnterpriseListComponent implements OnInit, AfterViewInit {
 
  ngAfterViewInit(): void {
    this.refresher.refreshEvent.emit();
  }

  public inDashboard: boolean;
  public enterpriseList: Array<Enterprise>;
  public currentUser: User;
  public currentEnterprise: Enterprise;
  public displayedColumns: Array<string> =  ['Nombre','RUC','Administrar', 'Equipo'];
  public enterpriseDS: DataSource<Enterprise>;
  private refresher: Refresher;

  constructor(private enterprises: EnterprisesService, private users: UsersService, route: ActivatedRoute
    ,private matDialog: MatDialog) {
    this.refresher = new Refresher();
    this.refresher.refreshEvent = new EventEmitter();
    enterprises.get().subscribe( es => this.enterpriseList = es );
    enterprises.getCurrentEnterprise().subscribe( e => this.currentEnterprise = e );
    users.getCurrentUser().subscribe( u => this.currentUser = u);
    route.data.subscribe( (data: {inDashboard:boolean}) => this.inDashboard = data.inDashboard);
  }

  ngOnInit() {
    this.enterpriseDS = new EnterpriseListDataSource(this.enterprises, undefined, undefined, this.refresher);
  }

  public isManaging(enterprise: Enterprise) : boolean{
    return enterprise.id == this.currentEnterprise.id;
  }

  public createEnterprise(){
    let dialogRef = this.matDialog.open(DialogEnterpriseDetailsComponent,{
      disableClose: true,
      width: '750px',
      data: {
        mode: 'create'
      }
    });

  }
  
}
