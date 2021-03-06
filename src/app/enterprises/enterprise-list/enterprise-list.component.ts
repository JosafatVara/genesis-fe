import { Component, OnInit, EventEmitter, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from '@angular/material';

import { EnterprisesService, EnterpriseListDataSource } from '../../core/services/enterprises.service';
import { Enterprise } from '../../shared/models/enterprise';
import { Refresher } from '../../core/services/shared/refresher';
import { UsersService } from '../../core/services/users.service';
import { User } from '../../shared/models/user';
import { DialogEnterpriseDetailsComponent } from '../dialog-enterprise-details/dialog-enterprise-details.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'gen-enterprise-list',
  templateUrl: './enterprise-list.component.html',
  styleUrls: ['./enterprise-list.component.scss']
})
export class EnterpriseListComponent implements OnInit, OnDestroy {

  public inDashboard: boolean;
  public enterpriseList: Array<Enterprise>;
  public currentUser: User;
  public currentEnterprise: Enterprise;
  public displayedColumns: Array<string> = ['Nombre', 'RUC', 'Administrar', 'Equipo'];
  goToUsersSubscription: Subscription;


  constructor(private enterprises: EnterprisesService, private users: UsersService, route: ActivatedRoute
    , private matDialog: MatDialog, private router: Router) {
    enterprises.getCurrentEnterprise().subscribe(e => this.currentEnterprise = e);
    users.getCurrentUser().subscribe(u => this.currentUser = u);
    route.data.subscribe((data: { inDashboard: boolean }) => this.inDashboard = data.inDashboard);
  }

  ngOnInit() {
    this.refreshEnterprises();
  }

  ngOnDestroy(): void {
    if (this.goToUsersSubscription) {
      this.goToUsersSubscription.unsubscribe();
    }
  }

  private refreshEnterprises() {
    this.enterprises.get().subscribe(es => this.enterpriseList = es);
  }

  public isManaging(enterprise: Enterprise): boolean {
    return enterprise.id == this.currentEnterprise.id;
  }

  // public manageThis(enterprise: Enterprise): void {
  //   localStorage.setItem("enterprise", JSON.stringify(enterprise));
  //   // console.log(enterprise.id);    
  //   this.enterprises.setCurrentEnterprise(enterprise).subscribe(e => {
  //     this.currentEnterprise = e;
  //   });
  // }

  public crud(mode: string, enterprise: Enterprise = undefined) {
    if (mode == 'delete') {
      this.delete(Object.assign({}, enterprise));
      return;
    }
    let dialogRef = this.matDialog.open(DialogEnterpriseDetailsComponent, {
      disableClose: true,
      width: '750px',
      data: {
        mode: mode,
        enterprise: Object.assign({}, enterprise)
      }
    });
    dialogRef.afterClosed().subscribe((result: { cancelled: boolean }) => {
      if (result && !result.cancelled) {
        this.refreshEnterprises();
      }
    });
  }

  private delete(enterprise: Enterprise) {
    let dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: {
        message: `Eliminar la empresa ${enterprise.name}?`
      }
    });
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.enterprises.delete(enterprise).subscribe(() => this.refreshEnterprises());
      }
    });
  }

  manageThis(enterprise: Enterprise): void {
    let dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: {
        message: `Administrar ${enterprise.name}?`
      }
    });
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.enterprises.setCurrentEnterprise(enterprise).subscribe(e => {
          this.currentEnterprise = e;
        });
      }
    })
  }

  goToEnterpriseUsers(enterprise: Enterprise) {
    let dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: {
        message: `Administrar ${enterprise.name}?`
      }
    });
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.goToUsersSubscription = this.enterprises.setCurrentEnterprise(enterprise).subscribe(e => {
          this.router.navigateByUrl('dashboard/usuarios');
        });
      }
    })

  }
}
