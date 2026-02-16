import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity(tasks)
export class Tasks{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;
    priority: string;
    status:;
    deadline:;
    assignedTo:;
    createdBy:;
    createdAt:;
    updatedAt:;

}