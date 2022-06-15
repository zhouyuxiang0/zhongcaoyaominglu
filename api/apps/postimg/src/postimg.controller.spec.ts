import { Test, TestingModule } from '@nestjs/testing';
import { PostimgController } from './postimg.controller';
import { PostimgService } from './postimg.service';

describe('PostimgController', () => {
  let postimgController: PostimgController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PostimgController],
      providers: [PostimgService],
    }).compile();

    postimgController = app.get<PostimgController>(PostimgController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(postimgController.getHello()).toBe('Hello World!');
    });
  });
});
