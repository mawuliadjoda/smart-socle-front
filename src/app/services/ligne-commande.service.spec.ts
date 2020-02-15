/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LigneCommandeService } from './ligne-commande.service';

describe('Service: LigneCommande', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LigneCommandeService]
    });
  });

  it('should ...', inject([LigneCommandeService], (service: LigneCommandeService) => {
    expect(service).toBeTruthy();
  }));
});
