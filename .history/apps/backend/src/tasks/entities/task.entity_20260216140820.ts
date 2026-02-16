import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


export enum TaskPriority{
    LOW = 'low';
    MEDIUM = 'mediun';
    HIGH = 'high';
}


@Entity(tasks)
export class Tasks{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column( type:'text', nullable:true)
    description: string;

    @Column(
         type:'enum',
         default: low )
    priority: enum;

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