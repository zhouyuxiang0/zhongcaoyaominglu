import { Test, TestingModule } from '@nestjs/testing';
import { MeridianTropismController } from './meridian-tropism.controller';
import { MeridianTropismService } from './meridian-tropism.service';

describe('MeridianTropismController', () => {
  let controller: MeridianTropismController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeridianTropismController],
      providers: [MeridianTropismService],
    }).compile();

    controller = module.get<MeridianTropismController>(MeridianTropismController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
