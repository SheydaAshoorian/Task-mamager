import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


export enum Priority{
    // LOW, MEDIUM, HIGH
    LOW = 'low';
        LOW = 'low';


}


@Entity(tasks)
export class Tasks{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column( type:'text', nullable:true)
    description: string;

    @Column()
    priority: string;

    @Column()
    status:;

    @Column()
    deadline:;

    @Column()
    assignedTo:;

    @Column()
    createdBy:;

    @Column()
    createdAt:;

    @Column()
    updatedAt:;

}