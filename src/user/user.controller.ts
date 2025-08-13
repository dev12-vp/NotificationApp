import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post()
    create(@Body('name') name: string, @Body('email') email: string) {
        this.userService.createUser(name, email)
        return { message: 'User created and notified!' };
    }
}
