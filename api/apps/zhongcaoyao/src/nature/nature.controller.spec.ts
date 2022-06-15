import { Test, TestingModule } from '@nestjs/testing';
import { NatureController } from './nature.controller';
import { NatureService } from './nature.service';

describe('NatureController', () => {
  let controller: NatureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NatureController],
      providers: [NatureService],
    }).compile();

    controller = module.get<NatureController>(NatureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
