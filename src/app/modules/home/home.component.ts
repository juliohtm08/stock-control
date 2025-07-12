import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { AuthRequest } from 'src/app/models/interfaces/auth/AuthRequest';
import { SignupUserRequest } from 'src/app/models/interfaces/user/SignupUserRequest';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy, AfterViewInit {
  private destroy$ = new Subject<void>();

  @ViewChild('emailInput') public emailInputRef!: ElementRef;
  @ViewChild('passwordInput') public passwordInputRef!: ElementRef;
  loginCard = true;

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  signupForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService,
    private messageService: MessageService,
    private router: Router
  ) {}

  // após renderizar o DOM os campos são preenchidos automaticamente
  ngAfterViewInit(): void {
    this.emailInputRef.nativeElement.value = 'seu email aqui';
    this.passwordInputRef.nativeElement.value = 'sua senha aqui';
    console.log('seu email aqui => ' + this.emailInputRef);
    console.log('sua senha aqui => ' + this.passwordInputRef);
  }

  // login do usuário
  onSubmitLoginForm(): void {
    if (this.loginForm.value && this.loginForm.valid) {
      this.userService
        .authUser(this.loginForm.value as AuthRequest)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              // armazena o token no cookie
              this.cookieService.set('USER_INFO', response?.token);
              this.loginForm.reset(); // limpa o formulário
              this.router.navigate(['/dashboard']);

              this.messageService.add({
                severity: 'success', // Tipo do Toast
                summary: 'Sucesso',
                detail: `Bem vindo de volta ${response?.name}!`,
                life: 2000,
              });
            }
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error', // Tipo do Toast
              summary: 'Erro',
              detail: `Erro ao fazer login!`,
              life: 2000,
            });

            console.log(err);
          },
        });
    }
  }

  // cadastro do usuário
  onSubmitSignupForm(): void {
    if (this.signupForm.value && this.signupForm.valid) {
      this.userService
        .signupUser(this.signupForm.value as SignupUserRequest)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              this.signupForm.reset(); // limpa o formulário
              this.loginCard = true; // retorna a tela de login
              this.messageService.add({
                severity: 'success', // Tipo do Toast
                summary: 'Sucesso',
                detail: `Usuário criado com sucesso!`,
                life: 2000,
              });
            }
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error', // Tipo do Toast
              summary: 'Erro',
              detail: `Erro ao cadastrar usuário!`,
              life: 2000,
            });

            console.log(err);
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
