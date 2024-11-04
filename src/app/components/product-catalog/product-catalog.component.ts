import { Component, Input, OnInit, SimpleChanges, computed } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FilterByCategoryComponent } from "../filter-by-category/filter-by-category.component";

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
  products = computed(() => this.productService.products());
  errorMessage = computed(() => this.productService.error());

  constructor(private productService: ProductService) {}
  
  ngOnInit(): void {
    if (this.category) {
      this.loadProductsByCategory(this.category);
    } else {
      this.loadProducts();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['category'] && !changes['category'].firstChange) {
      this.loadProducts();
    }
  }
  getStars(rating: number): { filled: boolean }[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push({ filled: i <= Math.floor(rating) }); 
    }
    return stars;
  }
  
  loadProducts(): void {
    this.productService.loadProducts();
  }

  loadProductsByCategory(category: string | null): void {
    if (category) {
      this.productService.loadProductsByCategory(category);
    } else {
      this.loadProducts();
    }
  }
  // loadProducts():void {
  //   if (this.category) {
  //     this.productService.loadProductsByCategory(this.category);
  //   } else {
  //     this.productService.loadProducts();
  //   }
    
  // }
    
}
