import { ArgumentsHost, Catch, ConflictException, ExceptionFilter, NotFoundException } from '@nestjs/common'
import type { Response } from 'express'
import { Prisma } from '../generated/prisma/client.js'

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    // ojo: si solo retorno el getResponse, nest lo ignora y la request se queda cargando infinito
    const response = host.switchToHttp().getResponse<Response>()
    switch (exception.code) {
      case 'P2002': {
        // correo repetido, le mando 409
        const error = new ConflictException('Ya existe un registro con ese valor único')
        return response.status(error.getStatus()).json(error.getResponse())
      }
      case 'P2025': {
        // id que no existe, 404
        const error = new NotFoundException('Registro no encontrado')
        return response.status(error.getStatus()).json(error.getResponse())
      }
      default:
        throw exception
    }
  }
}
