import {
  ArgumentMetadata,
  BadRequestException,
  ValidationPipe,
} from '@nestjs/common';
import { validationPipeOptions } from '../validation/validation-pipe-options';

type ClassConstructor<T> = new (...args: never[]) => T;

export function createValidationPipe() {
  return new ValidationPipe(validationPipeOptions);
}

export async function validateDto<T>(
  metatype: ClassConstructor<T>,
  value: unknown,
  type: ArgumentMetadata['type'] = 'body',
): Promise<T> {
  return (await createValidationPipe().transform(value, {
    type,
    metatype,
    data: '',
  })) as T;
}

export async function expectDtoToBeInvalid<T>(
  metatype: ClassConstructor<T>,
  value: unknown,
  type: ArgumentMetadata['type'] = 'body',
): Promise<BadRequestException> {
  try {
    await validateDto(metatype, value, type);
  } catch (error) {
    if (error instanceof BadRequestException) {
      return error;
    }

    throw error;
  }

  throw new Error('Expected DTO validation to fail, but it passed.');
}

export function getValidationMessages(error: BadRequestException): string[] {
  const response = error.getResponse();

  if (
    typeof response === 'object' &&
    response !== null &&
    'message' in response &&
    Array.isArray(response.message)
  ) {
    return response.message.filter(
      (message): message is string => typeof message === 'string',
    );
  }

  return [];
}
