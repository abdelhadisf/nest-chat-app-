import { Injectable, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthBody, CreateUser } from './auth.controller';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from './jwt.strategy';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService,
        private readonly jwtService : JwtService
    ) {}

    async login({ authBody }: { authBody: AuthBody }) {
        const { email, password } = authBody;

        const hashPassword = await this.hashPassword({ password });

        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!existingUser) {
            throw new Error('User not found');
        }

        const isPasswordSame = await this.isPasswordValid({
            password,
            hashPassword: existingUser.password,
        });

        if (!isPasswordSame) {
            throw new Error('invalid Password');
        }

        return  this.authenticateUser({userId : existingUser.id });
    }


      async register({ registerBody }: { registerBody: CreateUser }) {
        const { email, firstname ,password } = registerBody;


        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            throw new Error('email already in use');
        }
        const hashPassword = await this.hashPassword({ password });
        const createdUser =  await  this.prisma.user.create({
            data: {
                email,
                password : hashPassword,
                firstname,
                 },
                                });

        return  this.authenticateUser({userId : createdUser.id });
    }
    private async hashPassword({ password }: { password: string }) {
        const hashPassword = await hash(password, 10);
        return hashPassword;
    }

    private async isPasswordValid(
        { password, hashPassword }: { password: string; hashPassword: string },
    ) {
        const isPasswordValid = await compare(password, hashPassword);
        return isPasswordValid;
    }

    private  authenticateUser({userId} : UserPayload)  {
     const payload : UserPayload = { userId};
    return {
      access_token:  this.jwtService.sign(payload),
    };


    }
}