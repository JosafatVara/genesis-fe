import { Component, OnInit, SystemJsNgModuleLoader, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Enterprise } from '../shared/models/enterprise';
import { User } from '../shared/models/user';
import { UsersService } from '../core/services/users.service';

@Component({
  selector: 'gen-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  
  ngAfterViewInit(): void {
  }

  private router: Router;
  private route: ActivatedRoute;

  constructor(route: ActivatedRoute, router: Router, users: UsersService) {
    this.route = route;
    this.router = router;    
  }

  ngOnInit() {
    // setTimeout(() => {
      this.route.data
      .subscribe((data: { enterprises: Enterprise[], currentUser: User }) => {
        if(data.enterprises && data.enterprises.length == 0){
          this.router.navigateByUrl('dashboard/empresas/sin-empresa');
        }
      });  
    // }, 100);
    
  }


}
