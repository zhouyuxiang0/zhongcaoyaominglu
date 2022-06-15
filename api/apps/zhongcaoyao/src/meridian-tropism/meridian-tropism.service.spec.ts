import { Test, TestingModule } from '@nestjs/testing';
import { MeridianTropismService } from './meridian-tropism.service';

describe('MeridianTropismService', () => {
  let service: MeridianTropismService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeridianTropismService],
    }).compile();

    service = module.get<MeridianTropismService>(MeridianTropismService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
