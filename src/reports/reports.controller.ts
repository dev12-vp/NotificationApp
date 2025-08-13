import { Controller, Get, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { LoggerGuard } from 'src/guard/logger.guard';

@Controller()
export class ReportsController {
    constructor(private reportService: ReportsService) { }

    @Get()
    @UseGuards(LoggerGuard)
    getReports() {
        return { message: 'Reports data loaded lazily' };
    }
}
