import { AuthServiceImpl } from '@app/auth/AuthServiceImpl';
import { JWTProviderImpl } from '@app/auth/JWTProviderImpl';
import { logger } from '@app/logger/LoggerFactory';
import { container } from 'tsyringe';
export class AuthModule {
  static async initialize(): Promise<void> {
    container.registerSingleton('JWTProvider', JWTProviderImpl);
    container.registerSingleton('AuthService', AuthServiceImpl);
    logger.debug('app.context.auth.module.initialized');
  }
}
