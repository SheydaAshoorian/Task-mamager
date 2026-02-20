import { Entity , Column, PrimaryGeneratedColumn, CreateDateColumn , UpdateDateColumn} from 'typeorm';

@Entity(users)


export enum  UserRole{

    Admin = 'admin';
    User = 'user';
    Manager = 'manager'

}

export class users{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    family: string;

    @Column({uniqe : true})
    email: string;

    @Column(
        {type : enum
            
        }
    )
    role: enum ;

    @Column()
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;



}