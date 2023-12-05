import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import * as AdmZip from 'adm-zip';
import { Express } from 'express';

@Processor('image')
export class ImageProcessor {
  @Process('optimize')
  async handleOptimization(job: Job) {
    const files: Express.Multer.File[] = job.data.files;

    const optimizedImages = files.map((file) => {
      return Buffer.from(file.buffer);
    });

    const zip = new AdmZip();

    optimizedImages.forEach((image, index) => {
      const fileData = files[index];
      zip.addFile(fileData.originalname, image);
    });

    return zip.toBuffer();
  }
}
