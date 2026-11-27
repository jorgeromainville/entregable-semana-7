import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Role } from '../../generated/prisma/enums.js';

export class RegisterDto {
  @IsEmail({}, { message: 'El correo no tiene un formato válido' })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password!: string;

  @IsEnum(Role, { message: 'El rol debe ser RECEPCIONISTA, MEDICO o GERENCIA' })
  role!: Role;
}
