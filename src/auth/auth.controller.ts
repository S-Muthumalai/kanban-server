import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthGuard } from '../guard/auth.guard';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: LoginDto })
  async signIn(
    @Body() loginDto: LoginDto,
  ): Promise<{ access_token: string; user: any }> {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @ApiBody({ type: CreateAuthDto })
  async signUp(@Body() createAuthDto: CreateAuthDto): Promise<{
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  }> {
    return this.authService.register(createAuthDto);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('me')
  me() {
    return this.authService.findById();
  }
}
