import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import { Injectable, Logger, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
dotenv.config();

// export const mailTransporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

@Injectable()
export class MailProvider implements OnModuleInit, OnApplicationShutdown {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(MailProvider.name)

  getTransporter() {
    return this.transporter
  }

  async onModuleInit() {
    this.logger.log('Initializing mail transporter...')
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await this.transporter.verify()
    this.logger.log('Mail transporter ready.')
  }

  async onApplicationShutdown(signal?: string) {
    if (typeof signal === 'string') {
      this.logger.log(`Shutting down mail transporter (signal: ${signal})`);
    } else {
      this.logger.log('Shutting down mail transporter (no OS signal detected)');
    }
    if (this.transporter?.close) {
      this.transporter.close()
    }
  }
}