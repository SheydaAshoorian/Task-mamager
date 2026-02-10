import { Entity , Column, PrimaryGeneratedColumn, CreateDateColumn , UpdateDateColumn} from 'typeorm';




export enum  UserRole{

    Admin = 'admin',
    User = 'user',
    Manager = 'manager',

}

@Entity('users')
export class User{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
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
    role: UserRole ;

    @Column({default : true})
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;



}