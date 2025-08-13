import { Controller, Get, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { LoggerGuard } from 'src/guard/logger.guard';

/*
Lazy-Loading in NestJS
  🔹Means the module is only loaded when its route is first accessed (instead of at app startup).
  🔹Helps with startup performance in large apps or when some features are rarely used.
*/


@Controller()
export class ReportsController {
    constructor(private reportService: ReportsService) { }

    @Get()
    @UseGuards(LoggerGuard)
    getReports() {
        return { message: 'Reports data loaded lazily' };
    }
}
