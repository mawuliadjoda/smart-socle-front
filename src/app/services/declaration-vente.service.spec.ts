/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DeclarationVenteService } from './declaration-vente.service';

describe('Service: DeclarationVente', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeclarationVenteService]
    });
  });

  it('should ...', inject([DeclarationVenteService], (service: DeclarationVenteService) => {
    expect(service).toBeTruthy();
  }));
});
