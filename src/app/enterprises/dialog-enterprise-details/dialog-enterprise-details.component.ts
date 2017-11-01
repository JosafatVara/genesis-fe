import { Component, OnInit, Inject } from '@angular/core';
import { EnterprisesService } from '../../core/services/enterprises.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Enterprise } from '../../shared/models/enterprise';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../shared/components/base/base-component';

@Component({
  selector: 'gen-dialog-enterprise-details',
  templateUrl: './dialog-enterprise-details.component.html',
  styleUrls: ['./dialog-enterprise-details.component.scss']
})
export class DialogEnterpriseDetailsComponent extends BaseComponent implements OnInit {

  public mode: string
  public enterprise: Enterprise;

  constructor(private enterprises: EnterprisesService, private dialogRef: MatDialogRef<DialogEnterpriseDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {mode: string, enterprise: Enterprise}) {
    super();
    this.mode = data.mode || 'read';
    this.enterprise = data.mode == 'create'? new Enterprise() : data.enterprise;
  }

  ngOnInit() {
  }

  onCrudComponentFinish(enterprise: Enterprise){
    this.loadingOn();
    let observable: Observable<Enterprise>;
    switch(this.mode){
      case 'create':
        observable = this.enterprises.create(enterprise);
        break;
      case 'update':
        observable = this.enterprises.update(enterprise);
        break;
      default:
        observable = Observable.of(undefined);
    }
    observable.subscribe( e => {
      if(e!=undefined){
        this.dialogRef.close({cancelled:false});
      }else{

      }
    },err=>{this.loadingOff();},()=>{this.loadingOff()});
  }

}
