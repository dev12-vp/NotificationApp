import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { NotificationService } from 'src/notification/notification.service';

/* 
What causes circular dependencies in NestJS?
  🔹Happens when Module A needs something from Module B and Module B also needs something from Module A.
  🔹Nest tries to resolve all imports at startup, so it can’t finish building either one without the other.

How forwardRef() fixes it:
  🔹Wraps the module reference in a function so Nest resolves it later, not immediately.
  🔹This breaks the “deadlock” at startup.

When to use ModuleRef:
  🔹When you don’t want to directly inject a provider (to avoid circular dependency or load it conditionally).
  🔹Lets you dynamically get providers from the DI container at runtime.
*/

@Injectable()
export class UserService {

    // constructor(@Inject(forwardRef(() => NotificationService))
    // private readonly notificationService: NotificationService
    // ) { }
    private notificationService: NotificationService;
    private userData: any = [];

    constructor(private readonly moduleRef: ModuleRef) { }

    onModuleInit() {
        this.notificationService = this.moduleRef.get(NotificationService, { strict: false });
    }

    getUserById(id: number) {
        return this.userData.find(user => user.id === id);
    }

    createUser(name: string) {
        const newUser = { id: this.userData.length + 1, name };
        this.userData.push(newUser);

        console.log(`User created: ${newUser.name}`);
        this.notificationService.sendNotification(newUser.id, 'Welcome to our app!');
    }
}