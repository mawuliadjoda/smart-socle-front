/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ElasticsearchService } from './elasticsearch.service';

describe('Service: Elasticsearch', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElasticsearchService]
    });
  });

  it('should ...', inject([ElasticsearchService], (service: ElasticsearchService) => {
    expect(service).toBeTruthy();
  }));
});
