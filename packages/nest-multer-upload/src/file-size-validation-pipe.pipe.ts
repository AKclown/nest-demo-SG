import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipePipe implements PipeTransform {
  transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    if (value[0].size > 10 * 1024) {
      throw new HttpException('文件大于10k', HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}
