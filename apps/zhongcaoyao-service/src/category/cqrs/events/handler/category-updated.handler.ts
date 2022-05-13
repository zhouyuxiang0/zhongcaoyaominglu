import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { CategoryUpdatedEvent } from '../impl/category-updated.event';

@EventsHandler(CategoryUpdatedEvent)
export class CategoryUpdatedHandler
  implements IEventHandler<CategoryUpdatedEvent>
{
  private readonly logger = new Logger(CategoryUpdatedHandler.name);
  handle(event: CategoryUpdatedEvent) {
    this.logger.log('category updated...');
    // this.logger.log(JSON.stringify(event));
    return new Observable((sub) => {
      sub.next(event);
    });
  }
}
