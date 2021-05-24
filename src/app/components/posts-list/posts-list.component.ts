import { ApiServiceService } from './../../service/api-service.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostsListComponent implements OnInit {
  constructor(public api: ApiServiceService) {}
  @Input() items: any[] = [];
  @Input() getposts: any;
  ngOnInit(): void {}
  enviarPost(frase: string) {
    // debugger;
    this.api.createPost(frase).subscribe(
      (data) => {
        console.log(data);
        this.getposts();
      },
      (err) => {
        console.log(err);
        window.alert(err.message);
      }
    );
  }
}
