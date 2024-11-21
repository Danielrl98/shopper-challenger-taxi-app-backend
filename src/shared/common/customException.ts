import { HttpException } from '@nestjs/common';
import { Logger } from '@nestjs/common';

export class CustomException extends HttpException {
    constructor(message: string, statusCode: number) {
        super(message, statusCode);
        new Logger().warn(`[${statusCode}] -` + message)
    }
}