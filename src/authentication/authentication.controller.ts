import { Body, Controller, Post, Put } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './dto/register-dto';
import { signInDto } from './dto/sign-in-dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) { }

  @Post()
  async register(@Body() { email, password }: RegisterDto) {
    await this.authenticationService.register({ email, password });
  }

  @Post('sing-in')
  async singIn(@Body() { email, password }: signInDto) {
    return await this.authenticationService.signIn({ email, password });
  }

  @Post('sing-in/token')
  async singInWithToken(@Body() { token }: { token: string }) {
    return await this.authenticationService.signInWithToken({ token });
  }

  @Put('display-name')
  async registerName(@Body() { name }: { name: string }) {
    return await this.authenticationService.registerName({ name });
  }
}
