import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";
import { Address } from "./Address";
import { Department } from "./Department";

@Entity("employee")
    export class Employee extends AbstractEntity {
        @PrimaryGeneratedColumn("uuid")
        public id: string;  
        
        @Column({ nullable: false })
        public name: string;
        
        @Column({ nullable: false, default: 'no role' })
        public role: string;
        
        @Column({ nullable: false })
        public status: string;
        
        @Column({ nullable: false })
        public experience: number;
        
        @Column({ nullable: false })
        public dateofjoining: string;
        
        @Column({ nullable: false })
        public username: string;
        
        @Column({ nullable: false })
        public password: string;


        @ManyToOne(() => Department, { cascade: true })
            @JoinColumn()
            public department: Department;
            @Column({ nullable: false })
            public departmentId: string;
        
        @OneToOne( ()=> Address,{cascade:true})
            @JoinColumn()
            public address: Address;
            
}