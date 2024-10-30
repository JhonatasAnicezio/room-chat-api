import { Body, Controller, Delete, Headers, Post, Put } from '@nestjs/common';
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

  @Put('update-profile')
  async registerProfile(
    @Body() { name, photoURL }: { name: string, photoURL: string },
    @Headers('authorization') token: string,
  ) {
    const cleanToken = token?.replace('Bearer ', '');

    return await this.authenticationService.registerProfile({ name, photoURL, token: cleanToken });
  }

  @Delete()
  async deleteUser(
    @Body() { uid }: { uid: string },
    @Headers('authorization') token: string,
  ) {
    const cleanToken = token?.replace('Bearer ', '');

    return await this.authenticationService.deleteUser({ uid, token: cleanToken });
  }
}
