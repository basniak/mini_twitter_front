import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  urlB = environment.url_base;
  private requests: HttpRequest<any>[] = [];

  public isLoading = new BehaviorSubject(false);
  public postagens: any = [];
  public usersList: any = [];

  constructor(private http: HttpClient) {}
  public getPostagens() {
    this.http.get<any[]>(this.urlB + 'posts').subscribe(
      (data) => {
        console.log(data);
        this.postagens = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  public getUsers() {
    this.http.get<any[]>(this.urlB + 'users').subscribe(
      (data) => {
        console.log(data);
        this.usersList = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.isLoading.next(this.requests.length > 0);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.requests.push(req);
    // //("No of requests--->" + this.requests.length);
    // this.isLoading.next(true);
    return Observable.create((observer: any) => {
      const subscription = next.handle(req).subscribe(
        (event) => {
          if (event instanceof HttpResponse) {
            this.removeRequest(req);
            observer.next(event);
          }
        },
        (err) => {
          // alert('error returned');
          this.removeRequest(req);
          observer.error(err);
        },
        () => {
          this.removeRequest(req);

          observer.complete();
        }
      );
      // remove request from queue when cancelled
      return () => {
        this.removeRequest(req);

        subscription.unsubscribe();
      };
    });
  }
}
