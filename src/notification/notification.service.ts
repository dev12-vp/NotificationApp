import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { MailProvider } from 'src/mail/mail.provider';
import { UserService } from 'src/user/user.service';
// import { mailTransporter } from 'src/mail/mail.provider';

@Injectable()
export class NotificationService {
    constructor(@Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
        private readonly mailProvider: MailProvider
    ) { }

    //send notification using nodemailer;
    async sendNotification(userId: number, message: string) {

        const user = this.userService.getUserById(userId);

        await this.mailProvider.getTransporter().sendMail({
            from: '"My App" <no-reply@myapp.com>',
            to: user.email || 'vivek@test.com',
            subject: 'Notification',
            text: message,
        });
        Logger.log(`Send notification to ${user.name} : ${message}`)

    }
}
