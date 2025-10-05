import { Column, Entity, PrimaryGeneratedColumn } from "typeorm/browser";


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({ nullable: false})
    name:string;

    @Column({nullable:false, unique: true})
    email:string;

    @Column()
    password:string;

    @Column({nullable:true})
    age?: number;
}