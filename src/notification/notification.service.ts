import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { mailTransporter } from 'src/mail/sendMail.mail';

@Injectable()
export class NotificationService {
    constructor(@Inject(forwardRef(() => UserService))
    private readonly userService: UserService
    ) { }

    //send notification using nodemailer;
    async sendNotification(userId: number, message: string) {

        const user = this.userService.getUserById(userId);

        await mailTransporter.sendMail({
            from: '"My App" <no-reply@myapp.com>',
            to: user.email || 'vivek@test.com',
            subject: 'Notification',
            text: message,
        });

        Logger.log(`Send notification to ${user.name} : ${message}`)

    }
}
