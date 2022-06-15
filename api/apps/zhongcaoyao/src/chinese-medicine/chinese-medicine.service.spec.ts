import { Test, TestingModule } from '@nestjs/testing';
import { ChineseMedicineService } from './chinese-medicine.service';

describe('ChineseMedicineService', () => {
  let service: ChineseMedicineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChineseMedicineService],
    }).compile();

    service = module.get<ChineseMedicineService>(ChineseMedicineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
