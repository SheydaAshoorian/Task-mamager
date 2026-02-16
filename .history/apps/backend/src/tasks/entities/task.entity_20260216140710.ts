import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


export enum Priority{
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

    @Column(enum,default: low)
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