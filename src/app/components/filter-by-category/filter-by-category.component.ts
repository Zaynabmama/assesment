import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-by-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-by-category.component.html',
  styleUrl: './filter-by-category.component.css'
})
export class FilterByCategoryComponent {
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getCategories();
  }

  categories() {
    return this.productService.categories();
  }

  selectCategory(category: string): void {
    this.productService.loadProductsByCategory(category);
  }
}