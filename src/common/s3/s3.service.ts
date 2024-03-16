import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class S3Service {
  private readonly s3: S3Client;

  constructor(
    @Inject('Logger')
    private readonly logger: LoggerService,
    private readonly configService: ConfigService,
  ) {
    this.s3 = new S3Client({
      region: this.configService.get<string>('AWS_REGION'),
      endpoint: 'http://localhost:4566',
      forcePathStyle: true,
    });
  }

  async uploadRawImage(key: string, imageBuffer: Buffer, imageType: string) {
    try {
      const command = new PutObjectCommand({
        Bucket: this.configService.get<string>('BUCKET_NAME'),
        Key: key,
        Body: imageBuffer,
        ContentType: imageType,
      });

      await this.s3.send(command);
    } catch (error) {
      this.logger.error(error);
      throw new Error(`Failed to upload image to S3: ${error.message}`);
    }
  }

  async uploadBase64Image(
    objectName: string,
    objectId: string,
    base64Image: string,
  ): Promise<string> {
    const imageBuff = Buffer.from(
      base64Image.replace(/^data:image\/\w+;base64,/, ''),
      'base64',
    );
    const match = base64Image.match(/^data:(image\/\w+);base64,/i);
    if (!match || match.length !== 2) {
    }
    const imageType = match[1];
    const extName = imageType.replace('image/', '');
    const pathName = `assets/${objectName}/${objectId}/${uuidv4()}.` + extName;
    await this.uploadRawImage(pathName, imageBuff, imageType);

    return pathName;
  }
}
