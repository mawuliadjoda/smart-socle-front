/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EtablissementAssuranceService } from './etablissement-assurance.service';

describe('Service: EtablissementAssurance', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EtablissementAssuranceService]
    });
  });

  it('should ...', inject([EtablissementAssuranceService], (service: EtablissementAssuranceService) => {
    expect(service).toBeTruthy();
  }));
});
