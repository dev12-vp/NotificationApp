import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class NotificationService {
    constructor(@Inject(forwardRef(() => UserService))
    private readonly userService: UserService
    ) { }

    sendNotification(userId: number, message: string) {
        const user = this.userService.getUserById(userId)
        console.log(`Send notification to ${user.name} : ${message}`)
    }
}
