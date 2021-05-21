import { AuthService } from 'src/app/service/auth-service.service';
import { ApiServiceService } from './../../service/api-service.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(public api: ApiServiceService, public auth: AuthService) {
    api.getPostagens();
    api.getUsers();
  }

  ngOnInit(): void {}
}
