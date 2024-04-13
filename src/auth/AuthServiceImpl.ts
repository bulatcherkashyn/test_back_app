/* eslint-disable no-console */
import { AuthService } from '@app/auth/AuthService';
import { JWTProvider } from '@app/auth/JWTProvider';
import { logger } from '@app/logger/LoggerFactory';
import { inject, injectable } from 'tsyringe';

@injectable()
export class AuthServiceImpl implements AuthService {
  constructor(@inject('JWTProvider') private authProvider: JWTProvider) {}

  public async login(): Promise<string> {
    logger.debug('auth.service.login.start');

    logger.debug('auth.service.login.end');
    return this.createAuthToken();
  }

  public async validateAccessToken(authToken: string): Promise<void> {
    logger.debug(`auth.service.validate-access-token.start.for-access-token: [${authToken}]`);
    this.authProvider.decodeAuthToken(authToken);
    logger.debug(`auth.service.validate-access-token.end.for-access-token: [${authToken}]`);
  }

  private async createAuthToken(): Promise<string> {
    logger.debug('auth.service.create-auth-tokens.start');
    const token = this.getToken();

    return token;
  }

  private getToken(): string {
    logger.debug('auth.service.get-tokens.start');
    const token = this.authProvider.getAuthToken();

    logger.debug(`auth.service.get-tokens.done.\nAccess token: [${token}]`);
    return token;
  }
}
