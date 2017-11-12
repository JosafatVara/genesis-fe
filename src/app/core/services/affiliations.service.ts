import { Injectable } from '@angular/core';
import { CrudService } from './contracts/crud-service';
import { Affiliation } from '../../shared/models/affiliation';
import { Specification } from './specifications/base/specification';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AffiliationsService implements CrudService<Affiliation> {

  public mockData: Affiliation[] = [
    new Affiliation({id: 1, description: 'AFP'})
  ];

  get(specification?: Specification<Affiliation>): Observable<Affiliation[]> {
    return Observable.of(this.mockData);
  }
  update(entity: Affiliation): Observable<Affiliation> {
    throw new Error("Method not implemented.");
  }
  create(entity: Affiliation): Observable<Affiliation> {
    throw new Error("Method not implemented.");
  }
  delete(entity: Affiliation): Observable<Affiliation> {
    throw new Error("Method not implemented.");
  }
  getSync(specification?: Specification<Affiliation>): Affiliation[] {
    throw new Error("Method not implemented.");
  }

}
