import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'stock-control';

  constructor(private primeNgConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primeNgConfig.ripple = true; // habilita o ripple
    // traduz os botões de filtro na tabela
    this.primeNgConfig.setTranslation({
      apply: 'Aplicar',
      clear: 'Limpar',
    });
  }
}
