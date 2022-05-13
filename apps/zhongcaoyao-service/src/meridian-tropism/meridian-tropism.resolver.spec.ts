import { Test, TestingModule } from '@nestjs/testing';
import { MeridianTropismResolver } from './meridian-tropism.resolver';
import { MeridianTropismService } from './meridian-tropism.service';

describe('MeridianTropismResolver', () => {
  let resolver: MeridianTropismResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeridianTropismResolver, MeridianTropismService],
    }).compile();

    resolver = module.get<MeridianTropismResolver>(MeridianTropismResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
