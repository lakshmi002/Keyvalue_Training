import HttpException from "../exception/http.exception";
import DepartmentRepository from "../repository/department.repository";
import Department from "../entity/department.entity";

class DepartmentService{
  constructor(private departmentRepository : DepartmentRepository) {
  }
   getAllDepartments= async (): Promise<Department[]>=>{
      return await this.departmentRepository.find();
    }
    getDepartmentById=async(id:number): Promise<Department|null> =>{
      return this.departmentRepository.findOneBy({
          id,
      });
  }
  createDepartment = async ( name: string): Promise<Department> => {
      const newDepartment= new Department();
      newDepartment.name= name;
      return this.departmentRepository.save(newDepartment);
    };
    updateDepartment = async (
     id:number,
      name: string,
    ): Promise<Department> => {
      const department = await this.getDepartmentById(id);
     department.name = name;
      return this.departmentRepository.Updatesave(department);
    };
    deleteDepartment = async (id: number): Promise<void> => {
      const department = await this.getDepartmentById(id);
      await this.departmentRepository.softremove(department);
    };
}
export default DepartmentService;