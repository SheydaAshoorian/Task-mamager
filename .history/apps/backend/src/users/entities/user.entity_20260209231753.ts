import { Entity , Column, PrimaryGeneratedColumn, CreateDateColumn} from "typeorm";

@Entity(users)
export class users{

    @PrimaryGeneratedColumn()
    id: number;

    @Column( L)
    name: string;

    @Column()
    family: string;

    @Column()
    email: string;

    @Column()
    role: enum ;

    @Column()
    isActive: boolean;

    @Column()
    createdAt: ;



}