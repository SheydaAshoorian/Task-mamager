import { Entity , Column, PrimarycreatedC} from "typeorm";

@Entity(users)
export class users{

    id: number;

    name: string;
    family: string;
    email: string;
    role: enum ;
    isActive: boolean;
    createdAt: ;



}