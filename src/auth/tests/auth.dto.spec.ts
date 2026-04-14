import { LoginDto } from '../dto/login.dto';
import {
  expectDtoToBeInvalid,
  getValidationMessages,
  validateDto,
} from '../../testing/validation-test.util';
import { createLoginDtoMock } from './fixtures/auth.fixture';

describe('Auth DTOs', () => {
  describe('LoginDto', () => {
    it('accepts a valid login payload', async () => {
      await expect(validateDto(LoginDto, createLoginDtoMock())).resolves.toEqual(
        expect.objectContaining(createLoginDtoMock()),
      );
    });

    it('rejects an empty username', async () => {
      const error = await expectDtoToBeInvalid(
        LoginDto,
        createLoginDtoMock({ username: '' }),
      );

      expect(getValidationMessages(error)).toContain(
        'username should not be empty',
      );
    });

    it('rejects a missing password', async () => {
      const { password: _password, ...payload } = createLoginDtoMock();
      const error = await expectDtoToBeInvalid(LoginDto, payload);

      expect(getValidationMessages(error)).toContain(
        'password must be a string',
      );
    });
  });
});
