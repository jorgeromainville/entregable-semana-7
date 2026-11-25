import { IsEmail, IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator'

export class CreateMedicoDto {
  @IsString()
  @IsNotEmpty({ message: 'Este campo es obligatorio' })
  nombre!: string

  @IsString()
  @IsNotEmpty({ message: 'Este campo es obligatorio' })
  apellido!: string

  @IsEmail({}, { message: 'El correo no tiene un formato válido' })
  email!: string

  @IsInt()
  @IsPositive()
  especialidadId!: number
}
