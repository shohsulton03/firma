import { HttpException, HttpStatus } from "@nestjs/common";

export class EmailOrPasswordIncorrect extends HttpException {
  constructor() {
    super('Login or password is wrong!', 401);
  }
}

export class RefreshTokenIsMissingExeption extends HttpException {
  constructor() {
    super('Refresh token is missing', 401);
  }
}

export class InvalidRefreshToken extends HttpException {
  constructor() {
    super('Invalid refresh token', 401);
  }
}