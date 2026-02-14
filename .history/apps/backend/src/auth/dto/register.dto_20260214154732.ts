import { IsNotEmpty, IsEmail, IsString, MinLength} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class RegisterDto{

    @ApiProperty({ example: 'example@gmail.com' , description: 'ایمیل منحصر به فرد'})
    @IsString()
    @IsNotEmpty({ message: 'نام الزامی است'})
    name: string,

    @ApiProperty({ example: 'familt' , description: 'ایمیل منحصر به فرد'})
    @IsString()
    @IsNotEmpty({ message: 'نام خانوادگی الزامی است'})
    family: string,

    @IsString()
    @IsNotEmpty({ message: 'ایمیل الزامی است'})
    email: string,

    @IsString()
    @IsNotEmpty({ message: 'پسوورد الزامی است'})
    @MinLength(8, { message: 'رمز عبور باید حداقل ۸ کاراکتر باشد' })
    password: string,

}