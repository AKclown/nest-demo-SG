import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiBody,
  ApiCookieAuth,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CccDto } from './ccc.dto';
import { CccVo } from './ccc.vo';

@ApiTags('AKclown')
@Controller('AKclown')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('AKclown-get')
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiBearerAuth('bearer')
  @ApiTags('AKclown-get')
  @ApiOperation({ summary: '测试 aaa', description: 'aaa 描述' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'aaa成功',
    type: String,
  })
  @ApiQuery({
    name: 'a1',
    type: String,
    description: 'a1 param',
    required: false,
    example: '111',
  })
  @ApiQuery({
    name: 'a2',
    type: Number,
    description: 'a2 param',
    required: true,
    example: 222,
  })
  @ApiHeader({
    name: 'X-MyHeader',
    description: 'Custom header',
  })
  @Get('aaa')
  aaa(@Query('a1') a1, @Query('a2') a2) {
    console.log(a1, a2);
    return 'aaa success';
  }

  @ApiCookieAuth('cookie')
  @ApiOperation({ summary: '测试 bbb', description: 'bbb 描述' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'bbb成功',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'id 不合法',
  })
  @ApiParam({
    name: 'id',
    description: 'ID',
    required: true,
    example: 222,
  })
  @Get('bbb/:id')
  bbb(@Param('id', ParseIntPipe) id) {
    console.log(id);
    if (id !== 111) {
      throw new UnauthorizedException();
    }
    return 'bbb success';
  }

  @ApiBasicAuth('basic')
  @ApiOperation({ summary: '测试 ccc', description: 'ccc 描述' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'bbb成功',
    type: CccVo,
  })
  @ApiBody({
    type: CccDto,
  })
  @Post('ccc')
  ccc(@Body('ccc') ccc: CccDto) {
    console.log('ccc: ', ccc);
    const vo = new CccVo();
    vo.aaa = 111;
    vo.bbb = 222;

    return vo;
  }
}
