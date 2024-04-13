import { AuthService } from '@app/auth/AuthService';
import { ApplicationError } from '@app/error/ApplicationError';
import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

export const verifyAccess =
  () =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers['authorization'];

    if (!token) {
      throw new ApplicationError('missed auth token', 400);
    }
    const authService = container.resolve<AuthService>('AuthService');

    await authService.validateAccessToken(token || '');
    next();
  };
