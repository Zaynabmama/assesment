import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/products'; 
  categories = signal<string[]>([]);
  products = signal<Product[]>([]);
  productById = signal<Product | null>(null);
  error = signal<string | null>(null);
  constructor(private http: HttpClient) {}
  
  
  private fetchData<T>(url: string, signalToUpdate: any): void {
    this.http.get<T>(url).subscribe({
      next: (data) => {
        if (data) {
          signalToUpdate.set(data); 
          this.error.set(null);
        }
      },
      error: (error) => {
        this.error.set('Failed to load data');
        console.error(error);
      }
    });
  }

  loadProducts(): void {
    this.fetchData<Product[]>(this.apiUrl, this.products); // Update signal
  
  }

  loadProductsByCategory(category: string): void {
    this.fetchData<Product[]>(`${this.apiUrl}/category/${category}`, this.products); 
  
  }

  
  getProductById(id: number): void{
    this.fetchData<Product>(`${this.apiUrl}/${id}`, this.productById); 
  }

  getCategories(): void {
    this.fetchData<string[]>(`${this.apiUrl}/categories`, this.categories); 
  }
  
  
}