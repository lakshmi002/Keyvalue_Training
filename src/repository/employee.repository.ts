import { DataSource, Repository } from "typeorm";
import Employee from "../entity/employee.entity";
import dataSource from "../db/data-source.db";

class EmployeeRepository {

    constructor(private repository : Repository<Employee>){    }
    // find = async(): Promise<Employee[]> => {
    //     return this.repository.find();
    // }
    // findById = async(id: number): Promise<Employee | null> => {
    //     return this.repository.findOneBy({ id });
    // }
    find = async (): Promise<Employee[]> => {
        return this.repository.find({ relations: ["address"] });  
      };
    
      findOneBy = async (filter: Partial<Employee>): Promise<Employee | null> => {
        return this.repository.findOne({
          where: filter,
          relations: ["address"],
        });
      };
    save = async (employee: Employee): Promise<Employee> => {
        return this.repository.save(employee);
      };
      softRemove = async (employee: Employee): Promise<void> => {
        await this.repository.softRemove(employee);
      };
      Updatesave = async (employee: Employee): Promise<Employee> => {
        return this.repository.save(employee);
      };

}
export default EmployeeRepository;