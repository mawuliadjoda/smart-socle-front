/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FournisseurService } from './fournisseur.service';

describe('Service: Fournisseur', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FournisseurService]
    });
  });

  it('should ...', inject([FournisseurService], (service: FournisseurService) => {
    expect(service).toBeTruthy();
  }));
});
