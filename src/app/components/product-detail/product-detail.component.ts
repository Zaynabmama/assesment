import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule, Location } from '@angular/common';
import { ProductCatalogComponent } from "../product-catalog/product-catalog.component";
import { getStars } from '../../utils/rating.utils';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, ProductCatalogComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product = signal<Product | null>(null);

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.product = this.productService.productById;
    const productId = +this.route.snapshot.paramMap.get('id')!;
    if (productId) {
      this.productService.getProductById(productId);
    }
  }
  


  getStars(rating: number): { filled: boolean }[] {
    return getStars(rating);  // This will return the star array for the given rating
  }
  addToCart() {
    throw new Error('Method not implemented.');
    }
  goBack(): void {
    this.location.back();
  }
}
