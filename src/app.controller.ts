import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LazyModuleLoader } from '@nestjs/core';
import { ReportsService } from './reports/reports.service';
import { ReportsModule } from './reports/reports.module';
import { LoggerGuard } from './guard/logger.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly lazyModuleLoader: LazyModuleLoader,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('reports')
  @UseGuards(LoggerGuard)
  async loadReports() {
    const moduleRef = await this.lazyModuleLoader.load(() => ReportsModule);
      console.log('ReportsModule loaded lazily!'); 
    const reportsService = moduleRef.get(ReportsService);
    return reportsService.getReport();
  }
}
