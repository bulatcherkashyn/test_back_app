import { JWTProvider } from '@app/auth/JWTProvider';
import { ApplicationError } from '@app/error/ApplicationError';
import { logger } from '@app/logger/LoggerFactory';
import { sign, TokenExpiredError, verify } from 'jsonwebtoken';

import { JwtObject } from './models/JwtObject';

export class JWTProviderImpl implements JWTProvider {
  private readonly jwtSecret: string;
  private TOKEN_EXPIRATION_TIME = 2 * 60 * 60 * 1000;

  private readonly TOKEN_TYPE = 'Bearer';

  constructor() {
    if (!process.env.JWT_SECRET) {
      throw new ApplicationError('missed JWT_SECRET');
    }
    this.jwtSecret = process.env.JWT_SECRET;
  }
  public getAuthToken(): string {
    logger.debug('auth.provider.get-auth-token.start');
    const jwtData = this.generateJWT(
      { type: 'access_token' },
      this.jwtSecret,
      this.TOKEN_EXPIRATION_TIME,
    );

    logger.debug('auth.provider.get-auth-token.end');
    return jwtData;
  }

  public decodeAuthToken(token: string): void {
    try {
      logger.debug('auth-provider.decode-auth-token.start.decode-token');
      const jwtToken = this.extractJwtFromAuthToken(token);

      logger.debug('auth-provider.decode-auth-token.done.decode-token');
      this.decodeJWT(jwtToken, this.jwtSecret);
    } catch (e) {
      throw e;
    }
  }

  private decodeJWT(token: string, secret: string): void {
    logger.debug('auth.provider.decode-jwt.start');
    try {
      verify(token, secret) as JwtObject;

      logger.debug('auth.provider.decode-jwt.done');
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new ApplicationError('Token has expired', 401);
      }
      return;
    }
  }

  private generateJWT(data: object, secret: string, expiresIn?: number): string {
    logger.debug('auth.provider.generate-jwt.start');
    const options = expiresIn ? { expiresIn } : {};

    const jwtToken = sign(data, secret, options);

    logger.debug('auth.provider.generate-jwt.end');
    return jwtToken;
  }

  private extractJwtFromAuthToken(authHeader: string | undefined): string {
    logger.debug('auth.provider.extract-jwt-from-auth-token.start');
    if (!authHeader) {
      logger.debug('auth.provider.extract-jwt-from-auth-token.error.no-auth-token');
      throw new ApplicationError('No auth token', 401);
    }
    const [prefixFromToken, token] = authHeader.split(' ');

    if (!token || prefixFromToken !== this.TOKEN_TYPE) {
      logger.debug('auth.provider.extract-jwt-from-auth-token.error.incorrect-access-token');
      throw new ApplicationError('Incorrect access token', 401);
    }
    logger.debug('auth.provider.extract-jwt-from-auth-token.done');
    return token;
  }
}
