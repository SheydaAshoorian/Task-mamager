import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


export enum TaskPriority{
    Low = 'low';
    Mediun = 'mediun';
    High = 'high';
}

export enum TaskStatus {

   Todo = 'todo';
   In_Progress = 'in_progress';
   Done = 'done';
   OnGit = 'ongit';
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
         enum: TaskPriority,
         default: TaskPriority.LOW,
        
        )
    priority: TaskPriority;


    @Column(
        type:'enum',
        enum: TaskStatus,
        default: TaskStatus.Todo,
    )
    status:TaskStatus;

    @Column({ type:'timestamp'})
    deadline: Date;

    @Column()
    assignedTo:;

    @Column()
    createdBy:;

    @Column()
    createdAt:;

    @Column()
    updatedAt:;

}