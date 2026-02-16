import { Entity , Column, PrimaryGeneratedColumn, CreateDateColumn , UpdateDateColumn, OneToMany} from 'typeorm';
import { Task } from '../../tasks/entities/tas'

export enum  UserRole{

    Admin = 'admin',
    User = 'user',
    Manager = 'manager',
}


@Entity('User')
export class User{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    family: string;

    @Column({ unique: true }) 
    email: string;

    @Column(
        { type : 'enum',
          enum : UserRole,
          default : UserRole.User , 
        }
    )
    role: UserRole ;

    @Column()
    password: string;

    @Column({default : true})

    @OneToMany(() => Task, (task) => task.assignedTo)
    tasks: Task[];
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;



}