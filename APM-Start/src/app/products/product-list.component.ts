import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { EMPTY } from 'rxjs';
// import { EMPTY, Observable, of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

// import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
// export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Product List';
  errorMessage = '';
  categories;

  products$ = this.productService.products$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY; // of([])
      })
    );
  // products$: Observable<Product[]>;
  // products: Product[] = [];
  // sub: Subscription;

  constructor(private productService: ProductService) { }

  // ngOnInit(): void {
    // this.products$ = 
    
    // this.productService.getProducts()
    //   .pipe(
    //     catchError(err => {
    //       this.errorMessage = err;
    //       return EMPTY; // of([])
    //     })
    //   );
      // .subscribe(
      //   products => this.products = products,
      //   error => this.errorMessage = error
      // );
  // }

  // ngOnDestroy(): void {
  //   // this.sub.unsubscribe();
  // }

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    console.log('Not yet implemented');
  }
}
