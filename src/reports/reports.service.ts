import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportsService {
  getReport() {
    console.log('getReport() called');
    return [{ id: 1, name: 'Annual Report' }];
  }
}
