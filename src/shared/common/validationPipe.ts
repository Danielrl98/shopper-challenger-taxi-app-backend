import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { CustomException } from './customException';

@Injectable()
export class CustomValidationPipe implements PipeTransform {
  async transform(value: string, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const errorMessages = errors
        .map((err) => Object.values(err.constraints).join(', '))
        .join('; ');
      throw new CustomException(`${errorMessages}`, 400);
    }
    return value;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  private toValidate(metatype: Function): boolean {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
