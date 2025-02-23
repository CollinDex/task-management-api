import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import * as os from 'os';

class HealthResponse {
  @ApiProperty({ example: '200', description: 'status_code' })
  status_code: 200;

  @ApiProperty({
    example: 'message',
    description: 'This is a healthy api',
  })
  message: 'This is a healthy api';

  @ApiProperty({
    example: '192.168.137.1',
    description: 'localIpAddress',
  })
  ip: 'localIpAddress';
}

@ApiTags('Health Check')
@Controller()
export default class HealthController {
  @Get('health')
  @ApiOperation({ summary: 'Get api health status' })
  @ApiResponse({
    status: 200,
    description: 'Health Check Successful',
    type: HealthResponse,
  })
  public health() {
    const networkInterfaces = os.networkInterfaces();
    let localIpAddress = 'Not available';

    // Iterate over network interfaces to find the first non-internal IPv4 address
    for (const interfaceKey in networkInterfaces) {
      const interfaceDetails = networkInterfaces[interfaceKey];
      for (const detail of interfaceDetails) {
        if (detail.family === 'IPv4' && !detail.internal) {
          localIpAddress = detail.address;
          break;
        }
      }
      if (localIpAddress !== 'Not available') break;
    }

    return {
      status_code: 200,
      message: 'This is a healthy api',
      ip: localIpAddress,
    };
  }
}
