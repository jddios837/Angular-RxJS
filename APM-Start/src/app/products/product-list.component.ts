import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { BehaviorSubject, combineLatest, EMPTY, Subject } from 'rxjs';
// import { EMPTY, Observable, of, Subscription } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';

// import { Product } from './product';
import { ProductService } from './product.service';
import { ProductCategoryService } from "../product-categories/product-category.service";
import { Product } from './product';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
// export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Product List';
  errorMessage = '';
  // categories;
  // selectedCategoryId;

  // Subject no use init value, BehaviorSubjerct start with a default value
  // private categorySelectedSubject = new BehaviorSubject<number>(0);
  private categorySelectedSubject = new Subject<number>();
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();

  products$ = combineLatest([
    // this.productService.productWithCategory$,
    this.productService.productWithAdd$,
    this.categorySelectedAction$.pipe(startWith(0)) // startWith emit initial value
  ]) 
    .pipe(
      map(([products, selectedCategoryId]) => 
        products.filter(product => 
          selectedCategoryId ? product.categoryId === selectedCategoryId : true
      )),
      catchError(err => {
        this.errorMessage = err;
        return EMPTY; // of([])
      })
    );

    
  categories$ = this.categoryService.productCategory$
    .pipe(
      catchError( err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );  
  // products$: Observable<Product[]>;
  // products: Product[] = [];
  // sub: Subscription;

  constructor(private productService: ProductService,
    private categoryService: ProductCategoryService) { }

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
    // console.log('Not yet implemented');
    this.productService.addProduct();
  }

  onSelected(categoryId: string): void {
    this.categorySelectedSubject.next(+categoryId);
  }
}
