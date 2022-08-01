import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany } from "typeorm";
import { Employee } from "./Employee";

@Entity("department")
    export class Department extends BaseEntity {
        @PrimaryGeneratedColumn("uuid")
        public id: string;
        @Column({ nullable: false })
        public name: string;

        @OneToMany(() => Employee, (employee) => employee.department)
    @JoinColumn()
    public employee: Employee[];
}