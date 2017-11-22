import { Component, OnInit, Input } from '@angular/core';
import { PaginationControlsDirective } from 'ngx-pagination';

@Component({
  selector: 'gen-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  @Input('pagination') p: PaginationControlsDirective;

  constructor() { }

  ngOnInit() {
    
  }

}
