import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import {ProductCatalogComponent} from "../product-catalog/product-catalog.component" ;


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, ProductCatalogComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
