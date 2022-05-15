import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NatureService } from './nature.service';
import { Nature } from './entities/nature.entity';
import { CreateNatureInput } from './dto/create-nature.input';
import { UpdateNatureInput } from './dto/update-nature.input';

@Resolver(() => Nature)
export class NatureResolver {
  constructor(private readonly natureService: NatureService) {}

  @Mutation(() => Nature)
  createNature(
    @Args('createNatureInput') createNatureInput: CreateNatureInput
  ) {
    return this.natureService.create(createNatureInput);
  }

  @Query(() => [Nature], { name: 'nature' })
  findAll() {
    return this.natureService.findAll();
  }

  @Query(() => Nature, { name: 'nature' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.natureService.findOne(id);
  }

  @Mutation(() => Nature)
  updateNature(
    @Args('updateNatureInput') updateNatureInput: UpdateNatureInput
  ) {
    return this.natureService.update(updateNatureInput.id, updateNatureInput);
  }

  @Mutation(() => Nature)
  removeNature(@Args('id', { type: () => Int }) id: number) {
    return this.natureService.remove(id);
  }
}
