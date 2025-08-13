import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class LoggerGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        console.log('Request Details:');
        console.log('Method:', request.method);
        console.log('URL:', request.url);
        console.log('Headers:', request.headers);
        return true;
    }
}