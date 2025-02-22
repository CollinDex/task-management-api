import { Controller, Get } from '@nestjs/common';
@Controller('/probe')
export default class ProbeController {
  @Get('/')
  public test() {
    return { status_code: 200, message: 'I am the NestJs api responding' };
  }
}

/* @ApiTags('Home')
@Controller('/home')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved tasks.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  getHello(): string {
    return this.appService.getHello();
  }
} */
