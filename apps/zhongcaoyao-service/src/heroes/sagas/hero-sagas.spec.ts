import { Test, TestingModule } from '@nestjs/testing';
import { HeroSagas } from './hero-sagas';

describe('HeroSagas', () => {
  let provider: HeroSagas;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeroSagas],
    }).compile();

    provider = module.get<HeroSagas>(HeroSagas);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
