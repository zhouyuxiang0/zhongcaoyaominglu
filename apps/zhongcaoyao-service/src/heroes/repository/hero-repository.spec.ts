import { Test, TestingModule } from '@nestjs/testing';
import { HeroRepository } from './hero-repository';

describe('HeroRepository', () => {
  let provider: HeroRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeroRepository],
    }).compile();

    provider = module.get<HeroRepository>(HeroRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
