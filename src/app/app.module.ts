import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatNativeDateModule } from '@angular/material/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { DemoMaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { UserListComponent } from './user-list/user-list.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { UserComponent } from './user/user.component';
import { PostComponent } from './post/post.component';
import { FlexLayoutModule } from '@angular/flex-layout';
var firebaseConfig = {
  apiKey: 'AIzaSyBHgAqu1Dy4FR9h9QDLviv1Oio4G1MxLI4',
  authDomain: 'minitwitter-13a22.firebaseapp.com',
  projectId: 'minitwitter-13a22',
  storageBucket: 'minitwitter-13a22.appspot.com',
  messagingSenderId: '448185174434',
  appId: '1:448185174434:web:8a3f0c793bfd45f76e0afb',
};
@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    PostsListComponent,
    UserComponent,
    PostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    FlexLayoutModule,
  ],
  entryComponents: [AppComponent],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
