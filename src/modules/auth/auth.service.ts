import { Inject, Injectable } from '@nestjs/common';
import { IAdminRepository } from '../admin/interfaces/admin.repository';
import { JwtService } from '@nestjs/jwt';
import { LoginAdminDto } from './dto/login-admin.dto';
import { Response } from 'express';
import { EmailOrPasswordIncorrect, InvalidRefreshToken, RefreshTokenIsMissingExeption } from './exeption/auth.exeption';
import { compare, hash } from 'bcrypt';
import { generateTokens } from '../../common/helpers/generate-token';

@Injectable()
export class AuthService {
  constructor(
    @Inject('IAdminRepository')
    private readonly adminRepository: IAdminRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: LoginAdminDto, res: Response) {
    const { login, password } = data;
    const admin = await this.adminRepository.findByLogin(login);
    if (!admin) {
      throw new EmailOrPasswordIncorrect();
    }
    const validPassword = await compare(password, admin.hashedPassword);
    if (!validPassword) {
      throw new EmailOrPasswordIncorrect();
    }
    const tokens = await generateTokens(admin, this.jwtService);
    const hashedRefreshToken = await hash(tokens.refresh_token, 7);
    admin.hashedRefreshToken = hashedRefreshToken;
    admin.isActive = true;
    await this.adminRepository.update(admin);

    return {
      message: 'Admin logged in successfully',
      id: admin.id,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    };
  }

  async refreshToken(refresh_token: string, res: Response) {
    if (!refresh_token) {
      throw new RefreshTokenIsMissingExeption();
    }
    const payload = await this.jwtService.verify(refresh_token, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!payload) {
      throw new InvalidRefreshToken();
    }
    const admin = await this.adminRepository.findByLogin(payload.login)
    if (!admin) {
      throw new InvalidRefreshToken()
    } 

    const validRefreshToken = await compare(refresh_token, admin.hashedRefreshToken)
    if (!validRefreshToken) {
      throw new InvalidRefreshToken()
    }

    const tokens = await generateTokens(admin, this.jwtService)
    const hashedRefreshToken = await hash(tokens.refresh_token, 7);
    admin.hashedRefreshToken = hashedRefreshToken;
    await this.adminRepository.update(admin);

    return {
      message: 'Token refreshed successfully',
      id: admin.id,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    };
  }
}
