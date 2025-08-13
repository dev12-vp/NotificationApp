import { Module, OnModuleInit } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';

// onModuleInit() isn’t firing because LazyModuleLoader doesn’t trigger lifecycle hooks when loading a module programmatically.
@Module({
  providers: [ReportsService],
  controllers: [ReportsController],
})
export class ReportsModule implements OnModuleInit {
  onModuleInit() {
    console.log('ReportsModule loaded lazily!');
  }
}
