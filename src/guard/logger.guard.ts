import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

/* 
ExecutionContext
 A special object in NestJS lifecycle hooks (guards, interceptors, filters) that lets you:
  🔹Access request details (method, URL, headers, params)
  🔹Access user context (from authentication middleware/guards)
  🔹Switch between HTTP, WebSocket, or gRPC contexts.
*/

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