import { Column, Entity, OneToMany, Unique } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Employee from "./employee.entity";

@Entity()
@Unique(["name"])
export default class Department extends AbstractEntity {
  @Column()
  name: string;

  @OneToMany(() => Employee, (employee) => employee.department)
  employee: Employee[];
}