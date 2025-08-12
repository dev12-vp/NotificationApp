import { Body, Controller, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
    constructor(private notificationService: NotificationService) { }

    @Post()
    send(@Body('userId') userId: number, @Body('message') message: string) {
        this.notificationService.sendNotification(userId, message)
        return { message: 'Notification sent!' };
    }

}
