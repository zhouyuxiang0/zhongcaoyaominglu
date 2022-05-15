import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TasteService } from './taste.service';
import { Taste } from './entities/taste.entity';
import { CreateTasteInput } from './dto/create-taste.input';
import { UpdateTasteInput } from './dto/update-taste.input';

@Resolver(() => Taste)
export class TasteResolver {
  constructor(private readonly tasteService: TasteService) {}

  @Mutation(() => Taste)
  createTaste(@Args('createTasteInput') createTasteInput: CreateTasteInput) {
    return this.tasteService.create(createTasteInput);
  }

  @Query(() => [Taste], { name: 'taste' })
  findAll() {
    return this.tasteService.findAll();
  }

  @Query(() => Taste, { name: 'taste' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.tasteService.findOne(id);
  }

  @Mutation(() => Taste)
  updateTaste(@Args('updateTasteInput') updateTasteInput: UpdateTasteInput) {
    return this.tasteService.update(updateTasteInput.id, updateTasteInput);
  }

  @Mutation(() => Taste)
  removeTaste(@Args('id', { type: () => Int }) id: number) {
    return this.tasteService.remove(id);
  }
}
