import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Enterprise } from '../shared/models/enterprise';

@Component({
  selector: 'gen-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private router: Router;
  private route: ActivatedRoute;

  constructor(route: ActivatedRoute, router: Router) {
    this.route = route;
    this.router = router;
    this.route.data
    .subscribe((data: { enterprises: Enterprise[] }) => {
      if(data.enterprises && data.enterprises.length == 0){
        this.router.navigateByUrl('dashboard/empresas/sin-empresa');
      }
    });
  }

  ngOnInit() {

  }


}
