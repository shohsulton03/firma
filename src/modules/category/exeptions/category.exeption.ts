import { HttpException, HttpStatus } from '@nestjs/common';

export class CategoryNotFoundException extends HttpException {
  constructor() {
    super('Category not found', HttpStatus.NOT_FOUND);
  }
}

export class CategoryAlreadyExistsException extends HttpException {
  constructor() {
    super('Category already exists', HttpStatus.CONFLICT);
  }
}