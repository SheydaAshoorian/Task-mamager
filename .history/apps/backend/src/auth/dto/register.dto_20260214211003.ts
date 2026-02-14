import { IsNotEmpty, IsEmail, IsString, MinLength} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class RegisterDto {

    @ApiProperty({ example: 'example@gmail.com' , description: ' نام الزامی است '})
    @IsString()
    @IsNotEmpty({ message: 'نام الزامی است'})
    name: string;

    @ApiProperty({ example: 'family' , description:' فامیلی الزامی است '})
    @IsString()
    @IsNotEmpty({ message: 'نام خانوادگی الزامی است'})
    family: string;

    @ApiProperty({ example: 'example' , description: 'ایمیل منحصر به فرد'})
    @IsString()
    @IsNotEmpty({ message: 'ایمیل الزامی است'})
    email: string;

    @ApiProperty({ example: 'password123', description: 'رمز عبور حداقل ۸ کاراکتر' })
    @IsString()
    @IsNotEmpty({ message: 'پسوورد الزامی است'})
    @MinLength(8, { message: 'رمز عبور باید حداقل ۸ کاراکتر باشد' })
    password: string;

}