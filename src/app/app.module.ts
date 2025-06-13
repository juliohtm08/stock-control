import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, // Necessário para animações do PrimeNG
    ReactiveFormsModule, // Para usar formulários reativos no futuro
    HttpClientModule, // Para fazer requisições HTTP para a API
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
