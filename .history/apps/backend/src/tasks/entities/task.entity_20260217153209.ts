import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn,
         UpdateDateColumn ,OneToOne,ManyToOne وJoinColumn
} from 'typeorm';

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


@Entity('Task')
export class Task{
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


// ۱. فیلد عددی برای ذخیره آیدی در دیتابیس
@Column()
assignedToId: number; 

// ۲. رابطه مجازی برای دسترسی به دیتای یوزر (بدون ستون اضافه)
@ManyToOne(() => User)
@JoinColumn({ name: 'assignedToId' }) 
assignedTo: User;

// ۳. فیلد عددی برای سازنده
@Column()
createdById: number;

@ManyToOne(() => User)
@JoinColumn({ name: 'createdById' })
createdBy: User;

    
    @CreateDateColumn()
    createdAt:Date;


    @UpdateDateColumn()
    updatedAt:Date;

}