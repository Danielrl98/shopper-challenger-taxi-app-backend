import { HttpException } from '@nestjs/common';
import { Logger } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(
    message: string,
    statusCode: number,
    description = 'INVALID_DATA',
  ) {
    super(
      {
        error_code: description,
        error_description: message,
      },
      statusCode,
    );
    new Logger().warn(`[${statusCode}] ` + message);
  }
}
