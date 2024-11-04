import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };

}


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/products'; 
  categories = signal<string[]>([]);
  products = signal<Product[]>([]);
  error = signal<string | null>(null);
  constructor(private http: HttpClient) {}
  

  loadProducts(): void {
    this.http.get<Product[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.products.set(data);
        console.log('Loaded products:', data); 
        this.error.set(null);
      },
      error: (error) => {
        this.error.set('Failed to load products');
        console.error(error);
      },
    });
  }

  loadProductsByCategory(category: string): void {
    this.http.get<Product[]>(`${this.apiUrl}/category/${category}`).subscribe({
      next: (data) => {
        this.products.set(data); 
        this.error.set(null);
      },
      error: (error) => {
        this.error.set('Failed to load products by category'); 
        console.error(error);
      },
    });
  }

  
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
  getSortedProducts(sortOrder: 'asc' | 'desc'): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}?sort=${sortOrder}`);
  }
  getCategories(): void {
    this.http.get<string[]>(`${this.apiUrl}/categories`).subscribe({
      next: (data) => {
        this.categories.set(data);
        this.error.set(null);
      },
      error: (error) => {
        this.error.set('Failed to load categories');
        console.error(error);
      },
    });
  }
  
  
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }
  updateProduct(id: number, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
