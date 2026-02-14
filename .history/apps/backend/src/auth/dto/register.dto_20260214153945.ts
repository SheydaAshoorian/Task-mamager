import { IsNotEmpty, IsEmail, IsString, MinLength} from 'class-validator';

export class RegisterDto{

    @IsNotEmpty({ message: 'نام الزامی است'})
    name: string,

    @IsNotEmpty({ message: 'نام خانوادگی الزامی است'})
    family: string,

    @IsNotEmpty({ message: 'اینیل'})
    email: string,

    IsNotEmpty()
    password: string,

}