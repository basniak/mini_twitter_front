import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'tweetbr';
  urlB = environment.url_base;
  options: FormGroup;
  postagens: any = 'postagens';
  users: any = 'users';
  usersList: any = null;
  constructor(fb: FormBuilder, private http: HttpClient) {
    this.options = fb.group({
      bottom: 0,
      fixed: false,
      top: 0,
    });
    this.getPostagens();
    this.getUsers();
  }
  getPostagens() {
    this.http.get<any[]>(this.urlB + 'posts').subscribe(
      (data) => {
        console.log(data);
        this.postagens = JSON.stringify(data);
        this.usersList = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getUsers() {
    this.http.get<any[]>(this.urlB + 'users').subscribe(
      (data) => {
        console.log(data);
        this.users = JSON.stringify(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
