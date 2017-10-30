import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthenticationService } from '../../core/services/authentication.service';
import { DialogEnterpriseNoneComponent } from '../dialog-enterprise-none/dialog-enterprise-none.component';
import { Enterprise } from '../../shared/models/enterprise';
import { Router } from '@angular/router';
import { EnterprisesService } from '../../core/services/enterprises.service';

@Component({
  selector: 'gen-enterprise-none',
  templateUrl: './enterprise-none.component.html',
  styleUrls: ['./enterprise-none.component.scss']
})
export class EnterpriseNoneComponent implements OnInit {

  private matDialog: MatDialog;
  private auth: AuthenticationService;
  private router: Router;
  private enterprises: EnterprisesService;

  constructor(auth: AuthenticationService, enterprises: EnterprisesService, matDialog: MatDialog, router: Router) { 
    this.auth = auth;
    this.matDialog = matDialog;
    this.router = router;
    this.enterprises = enterprises;
  }

  ngOnInit() {
    setTimeout(() => {
      this.openDialog();
    }, 0);    
  }

  private openDialog(){
    let dialogRef = this.matDialog.open(DialogEnterpriseNoneComponent,{
      disableClose: true,
      width: '750px'
    });
    dialogRef.afterClosed().subscribe( (response: { exitSelected: boolean, createdEnterprise: Enterprise }) => {
      if(!response){
        this.openDialog();
        return;
      }
      if(response.exitSelected){
        this.auth.logout().subscribe( logout => {
          this.router.navigateByUrl('auth');
        })
      }else{
        
      }
    });
  }

}
