import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFiles,
  Body,
  Query,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import {
  existsSync,
  mkdirSync,
  cpSync,
  rmSync,
  readdirSync,
  createReadStream,
  createWriteStream,
  statSync,
  rm,
} from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files', 20, { dest: 'uploads' }))
  uploadFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: { name: string },
  ) {
    console.log('body', body);
    console.log('files', files);

    const fileName = body.name.match(/(.+)\-\d+$/)[1];
    const chunkDir = 'uploads/chunks_' + fileName;

    if (!existsSync(chunkDir)) {
      mkdirSync(chunkDir);
    }
    cpSync(files[0].path, chunkDir + '/' + body.name);
    rmSync(files[0].path);
  }

  @Get('merge')
  merge(@Query('name') name: string) {
    const chunkDir = 'uploads/chunks_' + name;

    const files = readdirSync(chunkDir);
    let count = 0;
    let startPos = 0;
    files.map((file) => {
      const filePath = chunkDir + '/' + file;
      const stream = createReadStream(filePath);
      stream.pipe(
        createWriteStream('uploads/' + name, {
          start: startPos,
        }).on('finish', () => {
          // 但缓存目录下的所有文件都被合并成一个文件时，删除临时目录
          count++;
          if (count === files.length) {
            rm(
              chunkDir,
              {
                recursive: true,
              },
              () => {},
            );
          }
        }),
      );

      startPos += statSync(filePath).size;
    });
  }
}
