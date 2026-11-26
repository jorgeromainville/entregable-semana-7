import { Type } from 'class-transformer'
import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreatePacienteDto {
  @IsString()
  @IsNotEmpty({ message: 'Este campo es obligatorio' })
  nombre!: string

  @IsString()
  @IsNotEmpty({ message: 'Este campo es obligatorio' })
  apellido!: string

  @IsEmail({}, { message: 'El correo no tiene un formato válido' })
  email!: string

  // acá me salía 500 si mandaba "1995-05-12" xq prisma pide datetime completo,
  // así que lo paso a Date de una con Type y listo
  @Type(() => Date)
  @IsDate({ message: 'La fecha debe ser una fecha válida' })
  fechaNacimiento!: Date
}
