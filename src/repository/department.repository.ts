import { Repository } from "typeorm";
import Department from "../entity/department.entity";
import { CreateDepartmentDto } from "../dto/createDepartment.dto";

export default class DepartmentRepository {
  constructor(private departmentRepository: Repository<Department>) {
    this.departmentRepository = departmentRepository;
  }

  find = async () =>
    await this.departmentRepository.find({
      relations: { employee: true },
    });

  findOneBy = async (filter: Partial<Department>) =>
    await this.departmentRepository.findOne({
      where: filter,
      relations: { employee: true },
    });

  save = async (department: Department) =>
    await this.departmentRepository.save(department);

  Updatesave = async (department: CreateDepartmentDto) =>
    await this.departmentRepository.save(department);

  softremove = async (department: Department) =>
    await this.departmentRepository.softRemove(department);
}