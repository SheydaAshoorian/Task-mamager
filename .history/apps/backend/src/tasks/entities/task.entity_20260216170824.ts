import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn } from 'typeorm';
import { User} from '../../users/entities/user.entity';

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


@Entity('Tasks')
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

    @m(()=> User , (user)=> UserAssignedTasks)
    @JoinColumn({ name: 'assignedToId' })
    assignedTo: User;

    @Column(()=>User)
    createdBy: User;
    
    @CreateDateColumn()
    createdAt:Date;


    @UpdateDateColumn()
    updatedAt:Date;

}