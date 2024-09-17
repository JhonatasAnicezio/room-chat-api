import { Body, Controller, Post } from '@nestjs/common';
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
}
