import { AuthService } from 'src/app/service/auth-service.service';
import { User } from './../shared/services/user';
import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpHeaders,
  HttpInterceptor,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService implements HttpInterceptor {
  urlB = environment.url_base;
  private requests: HttpRequest<any>[] = [];
  public refreshToken = '';
  public isLoading = new BehaviorSubject(false);
  public postagens: any = [];
  public usersList: any = [];
  // public headers = new HttpHeaders()
  //   .set('content-type', 'application/json')
  //   .set('Access-Control-Allow-Origin', '*');
  // .set('Authorization', `Bearer INVALIDO`);

  constructor(private http: HttpClient) {}
  public getPostagens() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${this.refreshToken}`);
    return this.http.get<any[]>(this.urlB + 'posts', {
      headers: headers,
    });
    // .subscribe(
    //   (data) => {
    //     console.log(data);
    //     this.postagens = data;
    //   },
    //   (err) => {
    //     console.log(err);
    //     window.alert(err.message);
    //   }
    // );
  }
  public createPost(frase: any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${this.refreshToken}`);
    return this.http.post<any[]>(
      this.urlB + 'posts',
      { tweet: frase },
      {
        headers: headers,
      }
    );
  }
  public createUserApi(username: string, user: any, token: any) {
    const userData = {
      uid: user.uid,
      email: user.email,
      username: username,
    };
    this.refreshToken = token;
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${this.refreshToken}`);

    return this.http.post<any[]>(this.urlB + 'users', userData, {
      headers: headers,
    });
  }
  public getUsers() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${this.refreshToken}`);
    return this.http.get<any[]>(this.urlB + 'users', {
      headers: headers,
    });
  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.refreshToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.refreshToken}`,
        },
      });
    }
    return next.handle(request);
  }
}
