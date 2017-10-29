import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Enterprise } from '../../shared/models/enterprise';
import { EnterprisesService } from '../../core/services/enterprises.service';
import { Router } from '@angular/router';

@Component({
  selector: 'gen-enterprise-details',
  templateUrl: './enterprise-details.component.html',
  styleUrls: ['./enterprise-details.component.scss']
})
export class EnterpriseDetailsComponent implements OnInit {

  @Input() public mode: string;
  public enterprise: Enterprise;
  private enterprises: EnterprisesService;
  private router: Router;

  constructor(enterprises: EnterprisesService, router: Router){ 
    this.enterprises = enterprises;
  }

  ngOnInit() {
  }

  public finish(){
    this.enterprises.create(this.enterprise)
  }

}
