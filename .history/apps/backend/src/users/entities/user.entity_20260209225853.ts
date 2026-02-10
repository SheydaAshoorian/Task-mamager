import { Entity } from "typeorm";

@Entity(users)
export class users{

    id: number;
    name: string;
    family: string;
    email:;
    isActive: boolean;
    role: enum ;


}