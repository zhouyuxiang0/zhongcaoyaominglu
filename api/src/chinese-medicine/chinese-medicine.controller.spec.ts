import { Test, TestingModule } from '@nestjs/testing';
import { ChineseMedicineController } from './chinese-medicine.controller';
import { ChineseMedicineService } from './chinese-medicine.service';

describe('ChineseMedicineController', () => {
  let controller: ChineseMedicineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChineseMedicineController],
      providers: [ChineseMedicineService],
    }).compile();

    controller = module.get<ChineseMedicineController>(ChineseMedicineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
