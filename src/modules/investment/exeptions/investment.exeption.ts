import { HttpException, HttpStatus } from '@nestjs/common';

export class InvestmentNotFoundExeption extends HttpException {
  constructor() {
    super('Investment not found', 404);
  }
}

export class FileIsMissinExeption extends HttpException {
  constructor() {
    super('File is missing', 400);
  }
}

export class InvestmentAlreadyExistsExeption extends HttpException {
  constructor() {
    super('File is missing', HttpStatus.CONFLICT);
  }
}