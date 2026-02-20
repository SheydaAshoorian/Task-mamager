import { IsNotEmpty, IsEmail, IsString, MinLength} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class RegisterDto {

    @ApiProperty({ example: 'example' , description: ' نام الزامی است '})
    @IsString()
    @IsNotEmpty({ message: 'نام الزامی است'})
    first_name: string;

    @ApiProperty({ example: 'example' , description:' فامیلی الزامی است '})
    @IsString()
    @IsNotEmpty({ message: 'نام خانوادگی الزامی است'})
    last_name: string;

    @ApiProperty({ example: 'example@gmail.com' , description: 'ایمیل منحصر به فرد'})
    @IsString()
    @IsNotEmpty({ message: 'ایمیل الزامی است'})
    email: string;

    @ApiProperty({ example: 'password123', description: 'رمز عبور حداقل ۸ کاراکتر' })
    @IsString()
    @IsNotEmpty({ message: 'پسوورد الزامی است'})
    @MinLength(8, { message: 'رمز عبور باید حداقل ۸ کاراکتر باشد' })
    password: string;

}