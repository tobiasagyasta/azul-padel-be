import { Role } from '@prisma/client';
import {
  expectDtoToBeInvalid,
  getValidationMessages,
  validateDto,
} from '../../testing/validation-test.util';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { createUserDtoMock, updateUserDtoMock } from './fixtures/user.fixture';

describe('Users DTOs', () => {
  describe('CreateUserDto', () => {
    it('accepts a valid payload', async () => {
      await expect(validateDto(CreateUserDto, createUserDtoMock())).resolves.toEqual(
        expect.objectContaining(createUserDtoMock()),
      );
    });

    it('rejects an invalid email', async () => {
      const error = await expectDtoToBeInvalid(
        CreateUserDto,
        createUserDtoMock({ email: 'invalid-email' }),
      );

      expect(getValidationMessages(error)).toContain('email must be an email');
    });

    it('rejects an invalid role', async () => {
      const error = await expectDtoToBeInvalid(CreateUserDto, {
        ...createUserDtoMock(),
        role: 'SUPER_ADMIN',
      });

      expect(getValidationMessages(error)).toEqual(
        expect.arrayContaining([
          expect.stringContaining('role must be one of the following values'),
        ]),
      );
    });

    it('rejects extra properties', async () => {
      const error = await expectDtoToBeInvalid(CreateUserDto, {
        ...createUserDtoMock(),
        extra: 'forbidden',
      });

      expect(getValidationMessages(error)).toContain(
        'property extra should not exist',
      );
    });
  });

  describe('UpdateUserDto', () => {
    it('accepts a partial valid payload', async () => {
      await expect(
        validateDto(UpdateUserDto, updateUserDtoMock({ role: Role.ADMIN })),
      ).resolves.toEqual(
        expect.objectContaining(updateUserDtoMock({ role: Role.ADMIN })),
      );
    });

    it('rejects an invalid provided email', async () => {
      const error = await expectDtoToBeInvalid(
        UpdateUserDto,
        updateUserDtoMock({ email: 'invalid-email' }),
      );

      expect(getValidationMessages(error)).toContain('email must be an email');
    });
  });
});
