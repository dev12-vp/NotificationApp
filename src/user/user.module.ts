import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports : [forwardRef(() => NotificationModule)],
  providers: [UserService],
  controllers: [UserController],
  exports : [UserService]
})
export class UserModule {}
