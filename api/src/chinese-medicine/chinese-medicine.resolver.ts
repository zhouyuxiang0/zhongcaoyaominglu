import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ChineseMedicineService } from './chinese-medicine.service';
import { ChineseMedicine } from './entities/chinese-medicine.entity';
import { CreateChineseMedicineInput } from './dto/create-chinese-medicine.input';
import { UpdateChineseMedicineInput } from './dto/update-chinese-medicine.input';

@Resolver(() => ChineseMedicine)
export class ChineseMedicineResolver {
  constructor(
    private readonly chineseMedicineService: ChineseMedicineService
  ) {}

  @Mutation(() => ChineseMedicine)
  createChineseMedicine(
    @Args('createChineseMedicineInput')
    createChineseMedicineInput: CreateChineseMedicineInput
  ) {
    return this.chineseMedicineService.create(createChineseMedicineInput);
  }

  @Query(() => [ChineseMedicine], { name: 'chineseMedicine' })
  findAll() {
    return this.chineseMedicineService.findAll();
  }

  @Query(() => ChineseMedicine, { name: 'chineseMedicine' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.chineseMedicineService.findOne(id);
  }

  @Mutation(() => ChineseMedicine)
  updateChineseMedicine(
    @Args('updateChineseMedicineInput')
    updateChineseMedicineInput: UpdateChineseMedicineInput
  ) {
    return this.chineseMedicineService.update(
      updateChineseMedicineInput.id,
      updateChineseMedicineInput
    );
  }

  @Mutation(() => ChineseMedicine)
  removeChineseMedicine(@Args('id', { type: () => Int }) id: number) {
    return this.chineseMedicineService.remove(id);
  }
}
