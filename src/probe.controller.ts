import { Controller, Get } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
@ApiExcludeController()
@Controller()
export default class ProbeController {
  @Get('/')
  public home() {
    return { status_code: 200, message: 'Welcome to NestJs Backend Endpoint' };
  }

  @Get('api')
  public api() {
    return { status_code: 200, message: 'Welcome to NestJs Backend Endpoint' };
  }

  @Get('api/v1')
  public v1() {
    return {
      status_code: 200,
      message: 'Welcome to version 1 of NestJS Backend Endpoint',
    };
  }
}
