import { Injectable, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaService } from '../prisma/prisma.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(data: RegisterDto) {
    const passwordHash = await bcrypt.hash(data.password, 10);
    return this.prisma.usuario.create({
      data: {
        email: data.email,
        password: passwordHash,
        role: data.role,
      },
      select: { id: true, email: true, role: true },
    });
  }

  async login(data: LoginDto) {
    const user = await this.prisma.usuario.findUnique({
      where: { email: data.email },
    });

    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '8h' },
    );

    return { token };
  }
}
