import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn } from 'typeorm';
imort { User} from '../user/user.entity';

export enum TaskPriority{
    Low = 'low',
    Mediun = 'mediun',
    High = 'high',
}

export enum TaskStatus {

   Todo = 'todo',
   In_Progress = 'in_progress',
   Done = 'done',
   OnGit = 'ongit',
}


@Entity(tasks)
export class Tasks{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column( {type:'text', nullable:true})
    description: string;

    @Column(
         {
            type:'enum',
            enum: TaskPriority,
            default: TaskPriority.Low
        }
        )
    priority: TaskPriority;


    @Column(
        { 
            type:'enum',
            enum: TaskStatus,
            default: TaskStatus.Todo
        }
    )
    status:TaskStatus;

    @Column({ type:'timestamp', nullable:true })
    deadline: Date;

    @Column(()=> User , (user)=> UserAssignedTasks)
    assignedTo: User;

    @Column(()=>User)
    createdBy: User;
    
    @CreateDateColumn()
    createdAt:Date;


    @UpdateDateColumn()
    updatedAt:Date;

}