import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-catalog',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.css'],
})
export class ProductCatalogComponent implements OnInit {
  @Input() category: string | null = null;
  products: Product[] = [];
  errorMessage: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
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
  
  
  loadProducts():void {
    if (this.category) {
      this.productService.getProductsByCategory(this.category).subscribe({
        next: (data) => {
          this.products = data;
        },
        error: (error) => {
          this.errorMessage = 'Failed to load products by category';
          console.error(error);
        },
      });
    } else {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load product';
        console.error(error);
      },
    });
  }
}
}
