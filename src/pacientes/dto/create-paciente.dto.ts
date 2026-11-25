import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreatePacienteDto {
  @IsString()
  @IsNotEmpty({ message: 'Este campo es obligatorio' })
  nombre!: string

  @IsString()
  @IsNotEmpty({ message: 'Este campo es obligatorio' })
  apellido!: string

  @IsEmail({}, { message: 'El correo no tiene un formato válido' })
  email!: string

  @IsDateString({}, { message: 'La fecha debe ser una fecha válida' })
  fechaNacimiento!: string
}
