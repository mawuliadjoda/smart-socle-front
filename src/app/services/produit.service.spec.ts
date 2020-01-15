/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProduitService } from './produit.service';

describe('Service: Produit', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProduitService]
    });
  });

  it('should ...', inject([ProduitService], (service: ProduitService) => {
    expect(service).toBeTruthy();
  }));
});
