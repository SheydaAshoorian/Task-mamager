import { IsEmail} from 'class-validator'
import {ApiProperty} from '@nestjs/swagger'


export class CreateUserDto {

    name: string;

    @Column()
    family: string;

    @Column({unique : true})
    email: string;

    @Column(
        { type : 'enum',
          enum : UserRole,
          default : UserRole.User , 
        }
    )

}
