import { Component, Input, OnInit, SimpleChanges, computed, effect } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FilterByCategoryComponent } from "../filter-by-category/filter-by-category.component";
import { getStars } from '../../utils/rating.utils';

@Component({
  selector: 'app-product-catalog',
  standalone: true,
  imports: [CommonModule, RouterModule, FilterByCategoryComponent],
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.css'],
})
export class ProductCatalogComponent implements OnInit {
  @Input() category: string | null = null;
  // products: Product[] = [];
  // errorMessage: string | null = null;
//   products = computed(() => this.productService.products());
//   errorMessage = computed(() => this.productService.error());
  
  products = computed(() => 
    this.category ? this.productService.products().filter(p => p.category === this.category) : this.productService.products()
  );

  errorMessage = computed(() => this.productService.error());


  constructor(private productService: ProductService) {}
  
  ngOnInit(): void {
    this.loadProductsByCategory(this.category);

  effect(() => {
    this.loadProductsByCategory(this.category);
    });
  }

  
  
//   loadProducts(): void {
//     this.productService.loadProducts();
//   }

  // fetch products by categ/ all if no category is selected
  private loadProductsByCategory(category: string | null): void {
    if (category) {
      this.productService.loadProductsByCategory(category);
    } else {
      this.productService.loadProducts();
    }
}
  getStars(rating: number): { filled: boolean }[] {
    return getStars(rating);  // This will return the star array for the given rating
  }
}
