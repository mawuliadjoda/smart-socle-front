/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RefProduitService } from './ref-produit.service';

describe('Service: RefProduit', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RefProduitService]
    });
  });

  it('should ...', inject([RefProduitService], (service: RefProduitService) => {
    expect(service).toBeTruthy();
  }));
});
