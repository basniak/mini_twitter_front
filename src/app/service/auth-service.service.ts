import { ApiServiceService } from './api-service.service';
import { User } from './../shared/services/user';
import * as firebase from 'firebase/app';
import { Injectable, NgZone } from '@angular/core';
import 'firebase/app';
import 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/auth';
// import auth  from 'firebase/auth';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userData: any; // Save logged in user data

  constructor(
    // public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone,
    public api: ApiServiceService // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        user.getIdToken(true).then((id: any) => {
          this.api.refreshToken = id;
        });
        // this.api.refreshToken = this.userData.refreshToken;
        localStorage.setItem('user', JSON.stringify(this.userData));
        // JSON.parse(localStorage.getItem('user'));
        // this.SetUserData(this.userData);
        this.router.navigate(['home']);
      } else {
        localStorage.setItem('user', '');
        // JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  // Sign in with email/password
  public SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result: any) => {
        this.ngZone.run(() => {
          this.SetUserData(result.user);
          this.router.navigate(['home']);
          // this.SendVerificationMail();
        });
      })
      .catch((error: any) => {
        window.alert(error.message);
      });
  }

  // Sign up with email/password
  public SignUp(email: string, password: string, username: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(async (result: any) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
        // result.user.
        if (result?.user) {
          let token = await result?.user.getIdToken(true);
          this.api.createUserApi(username, result?.user, token).subscribe(
            (data) => {
              console.log(data);
              // this.usersList = data;
              this.router.navigate(['home']);
            },
            (err: any) => {
              console.log(err);
              window.alert(err.message);
            }
          );
        }
      })
      .catch((error: any) => {
        window.alert(error.message);
      });
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    this.afAuth.currentUser.then((e: any) => {
      e.sendEmailVerification();
    });
    // await firebase.auth().currentUser.sendEmailVerification();
    // this.afAuth;
    // return this.afAuth.auth.currentUser.sendEmailVerification();
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user !== null && user.email ? true : false;
  }

  // Sign in with Google
  // GoogleAuth() {
  //   return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  // }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result: any) => {
        this.ngZone.run(() => {
          result.user.getIdToken(true).then((id: any) => {
            this.api.refreshToken = id;
            this.SetUserData(result.user);
            this.router.navigate(['home']);
          });
        });
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
      this.api.refreshToken = '';
    });
  }
  SetUserData(user: any) {
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    user.getIdToken(true).then((id: any) => {
      this.api.refreshToken = id;
    });
  }
}
