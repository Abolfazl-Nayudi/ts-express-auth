import { hashSync, compareSync, genSaltSync } from 'bcrypt';
import { Response, Request } from 'express';
import { verify, sign, JwtPayload } from 'jsonwebtoken';
const { ACCESS_TOKEN, REFRESH_TOKEN, TOKEN_NAME } = process.env;
class AuthUtils {
  static hassPassword(password: string): string {
    const salt = genSaltSync();
    return hashSync(password, salt);
  }

  static comparePassword(password: string, hash: string) {
    return compareSync(password, hash);
  }

  static createAccessToken(email: string) {
    return sign({ email }, ACCESS_TOKEN!, { expiresIn: '15min' });
  }
  static createRefreshToken(email: string) {
    return sign({ email }, REFRESH_TOKEN!, { expiresIn: '1d' });
  }

  static sendAccessToken(req: Request, res: Response, accessToken: string) {
    return res.status(200).json({ token: accessToken });
  }

  static sendRefreshToken(req: Request, res: Response, refreshToken: string) {
    return res.cookie(TOKEN_NAME!, refreshToken, {
      httpOnly: true,
      path: '/refresh',
    });
  }

  static verifyUser(token: string, secret: string) {
    try {
      const decoded = verify(token, secret) as JwtPayload;
      return decoded.email;
    } catch (err) {
      return null;
    }
  }
}

export { AuthUtils };
