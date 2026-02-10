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

    @Column({un})
    role: enum ;

    @Column()
    isActive: boolean;

    @Column()
    createdAt: ;



}