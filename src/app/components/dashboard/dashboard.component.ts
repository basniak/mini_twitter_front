import { AuthService } from 'src/app/service/auth-service.service';
import { ApiServiceService } from './../../service/api-service.service';

import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnChanges {
  title = '';
  usersList: any = [];
  postagensList: any = [];
  public show = false;
  constructor(
    public api: ApiServiceService,
    public auth: AuthService,
    public router: Router
  ) {
    auth.afAuth.authState.subscribe((user) => {
      if (user) {
        user.getIdToken(true).then((id: any) => {
          this.api.refreshToken = id;
          this.refreshAll();
          this.api.getUsers().subscribe(
            (data) => {
              console.log(data);
              this.usersList = data;
            },
            (err) => {
              console.log(err);
              window.alert(err.message);
            }
          );
        });
      }
    });
  }

  refreshAll() {
    this.postagensList = [];
    this.show = false;
    // this.rota.navigate(['home']);
    this.api.getPostagens().subscribe(
      (data) => {
        console.log(data);
        this.postagensList = data;
        this.show = true;
      },
      (err) => {
        console.log(err);
        window.alert(err.message);
      }
    );
  }

  reLoad() {
    // this.router.navigate(['home']);
    console.log('reload');
    // Location.reload()
    window.location.reload();
  }

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges) {
    // debugger;
    console.log(changes);
  }
}
