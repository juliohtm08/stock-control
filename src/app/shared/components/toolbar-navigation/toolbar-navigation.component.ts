import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-toolbar-navigation',
  templateUrl: './toolbar-navigation.component.html',
  styleUrls: [],
})
export class ToolbarNavigationComponent {
  constructor(private cookie: CookieService, private router: Router) {}

  // método de logout
  handleLogout(): void {
    this.cookie.delete('USER_INFO'); // remove o token
    void this.router.navigate(['/home']); // redireciona para tela de login/cadastro
  }
}
