/* eslint-disable no-console */
import { AuthService } from '@app/auth/AuthService';
import { logger } from '@app/logger/LoggerFactory';
import { Controller } from '@app/routes/controllers/Controller';
import { Request, Response, Router } from 'express';
import { inject, injectable } from 'tsyringe';

@injectable()
export class AuthController implements Controller {
  constructor(
    @inject('AuthService')
    private authService: AuthService,
  ) {}
  public path(): string {
    return '/auth';
  }

  public initialize(router: Router): void {
    router.get('/login', this.login);
  }

  public login = async (req: Request, res: Response): Promise<void> => {
    logger.debug('auth.controller.login.start');
    const token = await this.authService.login();

    res.status(200).json({
      token,
    });

    logger.debug('auth.controller.login.end');
  };
}
