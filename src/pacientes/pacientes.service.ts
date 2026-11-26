import { BadRequestException, Injectable } from '@nestjs/common'
import { CreatePacienteDto } from './dto/create-paciente.dto.js'
import { UpdatePacienteDto } from './dto/update-paciente.dto.js'
import { PrismaService } from '../prisma/prisma.service.js'

@Injectable()
export class PacientesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.paciente.findMany()
  }
  findOne(id:number) {
    return this.prisma.paciente.findUnique({
      where: { id },
    });
  }
  async create(data: CreatePacienteDto) {
    // cambiamos el Date
    if (data.fechaNacimiento > new Date()) {
      throw new BadRequestException('La fecha de nacimiento no puede ser futura')
    }
    return this.prisma.paciente.create({
      data
    });
  }

  update(id: number, data: UpdatePacienteDto) {
    // validar la fecha por que si no uff 
    if (data.fechaNacimiento && data.fechaNacimiento > new Date()) {
      throw new BadRequestException('La fecha de nacimiento no puede ser futura')
    }
    return this.prisma.paciente.update({
      where: {id},
      data,
    });
  }

  remove (id: number ) {
    return this.prisma.paciente.delete({
      where: { id },
    })
  }
}
