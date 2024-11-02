import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductService } from '../services/product.service';
import { CommonModule, Location } from '@angular/common';
import { ProductCatalogComponent } from "../components/product-catalog/product-catalog.component";

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, ProductCatalogComponent],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
addToCart() {
throw new Error('Method not implemented.');
}
  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = +params.get('id')!;
      console.log( {productId});
      this.loadProduct(productId);
    });
  };
  

  loadProduct(productId: number): void {
    this.productService.getProductById(productId).subscribe(
      (data: Product) => {
        this.product = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getStars(rating: number): { filled: boolean }[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push({ filled: i <= Math.floor(rating) });
    }
    return stars;
  }

 

  goBack(): void {
    this.location.back();
  }
}
