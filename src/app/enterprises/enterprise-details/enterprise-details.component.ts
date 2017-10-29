import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'gen-enterprise-details',
  templateUrl: './enterprise-details.component.html',
  styleUrls: ['./enterprise-details.component.scss']
})
export class EnterpriseDetailsComponent implements OnInit {

  @Input()
  public mode: string;

  constructor() { }

  ngOnInit() {
  }

}
