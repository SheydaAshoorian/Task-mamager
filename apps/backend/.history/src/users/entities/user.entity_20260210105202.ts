import { Entity , Column, PrimaryGeneratedColumn, CreateDateColumn} from 'typeorm';

@Entity(users)
export class users{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    family: string;

    @Column({uniqe : true})
    email: string;

    @Column({})
    role: enum ;

    @Column()
    isActive: boolean;

    @Column()
    createdAt: ;



}