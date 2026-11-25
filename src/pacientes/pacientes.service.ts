import { BadRequestException, Injectable } from '@nestjs/common'
import { CreatePacienteDto } from './dto/create-paciente.dto.js'
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
    if (new Date(data.fechaNacimiento) > new Date()) {
      throw new BadRequestException('La fecha de nacimiento no puede ser futura')
    }
    return this.prisma.paciente.create({
      data
    });
  }

  update(id: number, data: any) {
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
