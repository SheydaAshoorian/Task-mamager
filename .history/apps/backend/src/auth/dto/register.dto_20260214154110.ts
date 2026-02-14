import { IsNotEmpty, IsEmail, IsString, MinLength} from 'class-validator';

export class RegisterDto{

    @IsNotEmpty()
    @IsNotEmpty({ message: 'نام الزامی است'})
    name: string,

    @IsString()
    @IsNotEmpty({ message: 'نام خانوادگی الزامی است'})
    family: string,

    @Is
    @IsNotEmpty({ message: 'ایمیل الزامی است'})
    email: string,

    IsNotEmpty({ message: 'پسوورد الزامی است'})
    password: string,

}