import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


export enum TaskPriority{
    Low = 'low';
    Mediun = 'mediun';
    High = 'high';
}

export enum TaskStatus {

   Waiting = 'waiting';
   InProgress = 'inprogress';
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
        default: TaskStatus.Waiting,
    )
    status:Ts;

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