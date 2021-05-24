import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  validateEmail(email: string) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  validateUsername(userName: string) {
    const re = /^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$/gi;
    return re.test(String(userName).toLowerCase());
  }

  criarUsuario(
    $event: any,
    userEmail: string,
    userPwd: string,
    userName: string,
    formUp: any
  ) {
    $event.preventDefault();
    if (userEmail && userPwd && userName) {
      if (userPwd.length >= 6) {
        if (this.validateEmail(userEmail)) {
          if (this.validateUsername(userName)) {
            this.authService.SignUp(userEmail, userPwd, userName.toLowerCase());
          } else {
            window.alert('UserName min 5 alphanumerics');
          }
        } else {
          window.alert('Email invalido');
        }
      } else {
        window.alert('Confira! Todos os campos do formulário são obrigatório');
      }
    } else {
      window.alert('Password min 6 alphanumerics');
    }
  }
}
