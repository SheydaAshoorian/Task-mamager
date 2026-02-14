import { IsNotEmpty, IsEmail, IsString, MinLength} from 'class-validator';

export class RegisterDto{

    @IsNotEmpty()
    @IsNotEmpty({ message: 'نام الزامی است'})
    name: string,

    @IsString()
    @IsNotEmpty({ message: 'نام خانوادگی الزامی است'})
    family: string,

    @IsString()
    @IsNotEmpty({ message: 'ایمیل الزامی است'})
    email: string,

    @IsString()
    @IsNotEmpty({ message: 'پسوورد الزامی است'})
    @MinLength({ , 'm'}})
    password: string,

}