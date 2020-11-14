/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TierPayanService } from './tier-payan.service';

describe('Service: TierPayan', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TierPayanService]
    });
  });

  it('should ...', inject([TierPayanService], (service: TierPayanService) => {
    expect(service).toBeTruthy();
  }));
});
