import { Test, TestingModule } from '@nestjs/testing';
import { ChineseMedicineResolver } from './chinese-medicine.resolver';
import { ChineseMedicineService } from './chinese-medicine.service';

describe('ChineseMedicineResolver', () => {
  let resolver: ChineseMedicineResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChineseMedicineResolver, ChineseMedicineService],
    }).compile();

    resolver = module.get<ChineseMedicineResolver>(ChineseMedicineResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
