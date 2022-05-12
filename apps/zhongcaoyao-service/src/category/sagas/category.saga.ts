import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { CategoryCreatedEvent } from '../events/impl/category-created.event';

@Injectable()
export class CategorySagas {
  // @Saga()
  // categoryCreated = (events$: Observable<any>): Observable<ICommand> => {
  //   return events$.pipe(
  //     ofType(CategoryCreatedEvent),
  //     map((event) => {
  //       // 触发其他event
  //       return event;
  //     })
  //   );
  // };
}
