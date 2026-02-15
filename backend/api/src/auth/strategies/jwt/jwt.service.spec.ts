import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from './jwt.service';

describe('JwtService', () => {
  let strategy: JwtStrategy;

  beforeEach(async () => {
    // Set JWT_SECRET for test
    process.env.JWT_SECRET = 'test_jwt_secret_key_min_32_chars_long';

    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtStrategy],
    }).compile();

    strategy = module.get<JwtStrategy>(JwtStrategy);
  });

  afterEach(() => {
    // Clean up
    delete process.env.JWT_SECRET;
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });
});
