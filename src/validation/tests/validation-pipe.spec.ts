import { IsInt, IsString } from 'class-validator';
import {
  createValidationPipe,
  expectDtoToBeInvalid,
  getValidationMessages,
  validateDto,
} from '../../testing/validation-test.util';

class SampleBodyDto {
  @IsString()
  name!: string;

  @IsInt()
  age!: number;
}

describe('ValidationPipe', () => {
  it('uses the shared validation pipe configuration', () => {
    expect(createValidationPipe()).toBeDefined();
  });

  it('rejects non-whitelisted properties', async () => {
    const error = await expectDtoToBeInvalid(SampleBodyDto, {
      name: 'Azul',
      age: 20,
      extra: 'forbidden',
    });

    expect(getValidationMessages(error)).toContain(
      'property extra should not exist',
    );
  });

  it('transforms implicit primitive values when metadata allows it', async () => {
    const result = await validateDto(SampleBodyDto, {
      name: 'Azul',
      age: '20',
    });

    expect(result).toBeInstanceOf(SampleBodyDto);
    expect(result.age).toBe(20);
  });
});
