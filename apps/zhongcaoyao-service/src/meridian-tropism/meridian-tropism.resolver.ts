import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MeridianTropismService } from './meridian-tropism.service';
import { MeridianTropism } from './entities/meridian-tropism.entity';
import { CreateMeridianTropismInput } from './dto/create-meridian-tropism.input';
import { UpdateMeridianTropismInput } from './dto/update-meridian-tropism.input';

@Resolver(() => MeridianTropism)
export class MeridianTropismResolver {
  constructor(
    private readonly meridianTropismService: MeridianTropismService
  ) {}

  @Mutation(() => MeridianTropism)
  createMeridianTropism(
    @Args('createMeridianTropismInput')
    createMeridianTropismInput: CreateMeridianTropismInput
  ) {
    return this.meridianTropismService.create(createMeridianTropismInput);
  }

  @Query(() => [MeridianTropism], { name: 'meridianTropism' })
  findAll() {
    return this.meridianTropismService.findAll();
  }

  @Query(() => MeridianTropism, { name: 'meridianTropism' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.meridianTropismService.findOne(id);
  }

  @Mutation(() => MeridianTropism)
  updateMeridianTropism(
    @Args('updateMeridianTropismInput')
    updateMeridianTropismInput: UpdateMeridianTropismInput
  ) {
    return this.meridianTropismService.update(
      updateMeridianTropismInput.id,
      updateMeridianTropismInput
    );
  }

  @Mutation(() => MeridianTropism)
  removeMeridianTropism(@Args('id', { type: () => Int }) id: number) {
    return this.meridianTropismService.remove(id);
  }
}
