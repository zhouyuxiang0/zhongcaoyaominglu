import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { CategoryCreatedEvent } from '../impl/category-created.event';

@EventsHandler(CategoryCreatedEvent)
export class CategoryCreatedHandler
  implements IEventHandler<CategoryCreatedEvent>
{
  private readonly logger = new Logger(CategoryCreatedHandler.name);
  handle(event: CategoryCreatedEvent) {
    this.logger.log('category created...');
    // this.logger.log(JSON.stringify(event));
    return new Observable((sub) => {
      sub.next(event);
    });
  }
}
