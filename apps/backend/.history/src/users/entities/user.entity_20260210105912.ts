import { Entity , Column, PrimaryGeneratedColumn, CreateDateColumn , UpdateDateColumn} from 'typeorm';

@Entity(users)


export enum {
    
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

    @Column({})
    role: enum ;

    @Column()
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;



}