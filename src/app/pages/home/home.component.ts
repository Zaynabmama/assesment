import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import {ProductCatalogComponent} from "../../components/product-catalog/product-catalog.component" ;
import { FilterByCategoryComponent } from "../../components/filter-by-category/filter-by-category.component";
// import { WeatherComponent } from '../../components/weather/weather.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, ProductCatalogComponent, FilterByCategoryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
