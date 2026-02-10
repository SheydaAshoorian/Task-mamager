import { Entity , Column, PrimaryGeneratedColumn, CreateDateColumn} from "typeorm";

@Entity(users)
export class users{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    
    family: string;
    email: string;
    role: enum ;
    isActive: boolean;
    createdAt: ;



}