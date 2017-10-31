import { Component, OnInit, EventEmitter, AfterViewInit } from '@angular/core';
import { EnterprisesService, EnterpriseListDataSource } from '../../core/services/enterprises.service';
import { DataSource } from '@angular/cdk/collections';
import { Enterprise } from '../../shared/models/enterprise';
import { Refresher } from '../../core/services/shared/refresher';
import { UsersService } from '../../core/services/users.service';
import { User } from '../../shared/models/user';

@Component({
  selector: 'gen-enterprise-list',
  templateUrl: './enterprise-list.component.html',
  styleUrls: ['./enterprise-list.component.scss']
})
export class EnterpriseListComponent implements OnInit, AfterViewInit {
  
  ngAfterViewInit(): void {
    this.refresher.refreshEvent.emit();
  }

  public currentUser: User;
  public currentEnterprise: Enterprise;
  public displayedColumns: Array<string> =  ['name','ruc','manage', 'team', 'actions']
  public enterpriseDS: DataSource<Enterprise>;
  private refresher: Refresher;

  constructor(private enterprises: EnterprisesService, private users: UsersService) {
    this.refresher = new Refresher();
    this.refresher.refreshEvent = new EventEmitter();
    enterprises.getCurrentEnterprise().subscribe( e => this.currentEnterprise = e );
    users.getCurrentUser().subscribe( u => this.currentUser = u);
  }

  ngOnInit() {
    this.enterpriseDS = new EnterpriseListDataSource(this.enterprises, undefined, undefined, this.refresher);
  }
  
}
