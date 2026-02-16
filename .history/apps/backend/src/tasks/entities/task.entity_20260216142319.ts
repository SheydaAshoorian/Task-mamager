import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


export enum TaskPriority{
    Low = 'low';
    Mediun = 'mediun';
    High = 'high';
}

export enum 


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
         enum: TaskPriority,
         default: TaskPriority.LOW,
        
        )
    priority: TaskPriority;

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