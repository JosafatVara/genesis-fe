import { Component, OnInit, Inject } from '@angular/core';
import { Freelancer } from '../../shared/models/freelancer';
import { FreelancersService } from '../../core/services/freelancers.service';
import { BaseComponent } from '../../shared/components/base/base-component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'gen-dialog-freelancer-details',
  templateUrl: './dialog-freelancer-details.component.html',
  styleUrls: ['./dialog-freelancer-details.component.scss']
})
export class DialogFreelancerDetailsComponent extends BaseComponent implements OnInit {

  public mode: string
  public freelancer: Freelancer;

  constructor(private freelancers: FreelancersService, private dialogRef: MatDialogRef<DialogFreelancerDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {mode: string, freelancer: Freelancer}) {
    super();
    this.mode = data.mode || 'read';
    this.freelancer = data.mode == 'create'? new Freelancer() : data.freelancer;
  }

  ngOnInit() {
  }

  onCrudComponentFinish(freelancer: Freelancer){
    this.loadingOn();
    let observable: Observable<Freelancer>;
    switch(this.mode){
      case 'create':
        observable = this.freelancers.create(freelancer);
        break;
      case 'update':
        observable = this.freelancers.update(freelancer);
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
