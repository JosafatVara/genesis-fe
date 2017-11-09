import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { Enterprise } from "../../shared/models/enterprise";
import { EnterprisesService } from "../../core/services/enterprises.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'gen-select-enterprise-to-manage',
  templateUrl: './select-enterprise-to-manage.component.html',
  styleUrls: ['./select-enterprise-to-manage.component.scss']
})
export class SelectEnterpriseToManageComponent implements OnInit, OnDestroy {  

  enterpriseList: Enterprise[] = [];
  private currentEnterpriseSubscription: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private enterprises: EnterprisesService) { 
    this.route.data.subscribe( (data: { enterpriseList: Enterprise[] }) => {
      // if(data.enterpriseList.length == 0){
      //   this.router.navigateByUrl('/dashboard');
      // }
      this.enterpriseList = data.enterpriseList;
    });
  }

  ngOnInit() {
    
  }

  ngOnDestroy(): void {
    if(this.currentEnterpriseSubscription){
      this.currentEnterpriseSubscription.unsubscribe();
    }
  }

  manageThis(enterprise: Enterprise){
    this.currentEnterpriseSubscription = this.enterprises.setCurrentEnterprise(enterprise).subscribe( e => {
      this.route.queryParams.subscribe( params => {
        if(params['returnUrl']){
          this.router.navigateByUrl(params['returnUrl']);
          return;
        }else{
          this.router.navigateByUrl('dashboard/empresas');
          return;
        }          
      });
    });
  }

}
