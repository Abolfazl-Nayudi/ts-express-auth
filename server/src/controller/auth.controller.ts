import { Response, Request } from 'express';
import { User } from '../model/User.model';
import { AuthUtils } from '../lib/authUtils';
const { TOKEN_NAME, REFRESH_TOKEN, ACCESS_TOKEN } = process.env;
class AuthController {
  static async register(req: Request, res: Response) {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: 'the user already exists', data: '' });
    }

    const newUser = await User.create({
      email,
      password: AuthUtils.hassPassword(password),
    });

    res.status(201).json({
      sucess: true,
      message: 'account created successfully',
      data: newUser,
    });
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          success: false,
          message: 'email or password incorrect',
          data: '',
        });
      }

      const checkPassword = AuthUtils.comparePassword(password, user.password);
      if (!checkPassword) {
        return res.status(403).json({
          success: false,
          message: 'email or password incorrect',
          data: '',
        });
      }

      const accessToken = AuthUtils.createAccessToken(user.email);
      const refreshToken = AuthUtils.createRefreshToken(user.email);

      user.token = refreshToken;
      user.save();

      AuthUtils.sendRefreshToken(req, res, refreshToken);
      AuthUtils.sendAccessToken(req, res, accessToken);
    } catch (err) {
      console.log(err);
    }
  }

  static logout(req: Request, res: Response) {
    res.clearCookie(TOKEN_NAME!, {
      path: '/refresh',
    });
    res
      .status(200)
      .json({ success: true, message: 'logout successfully', data: '' });
  }

  static async refresh(req: Request, res: Response) {
    const token = req.cookies[`${TOKEN_NAME}`];
    console.log(token);
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: 'unathenticated', data: '' });
    }

    const payload = AuthUtils.verifyUser(token, REFRESH_TOKEN!);

    const user = await User.findOne({ email: payload });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: 'unathenticated', data: '' });
    }

    if (user.token !== token) {
      return res
        .status(401)
        .json({ success: false, message: 'unathenticated', data: '' });
    }

    const accessToken = AuthUtils.createAccessToken(user.email);
    const refreshToken = AuthUtils.createRefreshToken(user.email);
    user.token = refreshToken;
    user.save();

    AuthUtils.sendRefreshToken(req, res, refreshToken);
    AuthUtils.sendAccessToken(req, res, accessToken);
  }
}

export { AuthController };
