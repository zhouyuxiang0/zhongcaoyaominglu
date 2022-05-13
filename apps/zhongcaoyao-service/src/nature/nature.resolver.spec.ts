import { Test, TestingModule } from '@nestjs/testing';
import { NatureResolver } from './nature.resolver';
import { NatureService } from './nature.service';

describe('NatureResolver', () => {
  let resolver: NatureResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NatureResolver, NatureService],
    }).compile();

    resolver = module.get<NatureResolver>(NatureResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
