import { GetCategoriesResponse } from './../../../../models/interfaces/categories/response/GetCategoriesResponse';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: [],
})
export class CategoriesTableComponent {
  @Input() public categories: Array<GetCategoriesResponse> = [];
  public categorySelected!: GetCategoriesResponse;
}
