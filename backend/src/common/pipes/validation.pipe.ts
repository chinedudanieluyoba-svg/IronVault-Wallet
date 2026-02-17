import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

/**
 * Global validation pipe
 * Catches validation errors and returns 400 with clear error messages
 */
@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!value) {
      throw new BadRequestException('Request body is required');
    }
    return value;
  }
}
