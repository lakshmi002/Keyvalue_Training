import { AddressDto } from "../dto/createAddress.dto";
import bcrypt from "bcrypt";
import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import EmployeeRepository from "../repository/employee.repository";
import { Role } from "../utils/role.enum";
import EntityNotFoundException from "../exception/entityNotFoundException.exception";
import IncorrectPasswordException from "../exception/incorrectPassword.exception";
import { jwtPayload } from "../utils/jwtPayload";
import { ErrorCodes } from "../utils/error.code";
import { JWT_SECRET, JWT_VALIDITY } from "../utils/constants";
import jsonwebtoken from "jsonwebtoken";
import { CreateDepartmentDto, DepartmentDto } from "../dto/createDepartment.dto";
import DepartmentService from "./department.service";
class EmployeeService{
    constructor(private employeeRepository : EmployeeRepository, private departmentService: DepartmentService) {    }
    getAllEmployees = async(): Promise<Employee[]> => {
        return await this.employeeRepository.find();
      }
    getEmployeeById = async(id:number): Promise<Employee |null> => {
        return this.employeeRepository.findOneBy(
            { id },
        );
    }
    createEmployee = async (email: string, name: string, address: AddressDto, password: string, role: Role, department: DepartmentDto): Promise<Employee> => {
        const newEmployee = new Employee();
        newEmployee.email = email;
        newEmployee.name = name;
    
        const newAddress = new Address();
        newAddress.line1 = address.line1;
        newAddress.pincode = address.pincode;
    
        newEmployee.address = newAddress;
        newEmployee.password = password ? await bcrypt.hash(password, 10) : "";
        newEmployee.role = role;

        const departmentData = await this.departmentService.getDepartmentById(department.id)

        newEmployee.department = departmentData;
    
        return this.employeeRepository.save(newEmployee);
      };

      public updateEmployee = async (
        id: number,
        email: string,
        name: string,
        address: AddressDto,
        department: DepartmentDto
      ): Promise<Employee> => {
        const employeeId = Number(id);
        const employee = await this.employeeRepository.findOneBy(
          { id },
      );
        console.log(employee);
        employee.email = email;
        employee.name = name;
        employee.address.line1 = address.line1;
        employee.address.pincode = address.pincode;
        const departmentData = await this.departmentService.getDepartmentById(department.id)

        employee.department = departmentData;

        return this.employeeRepository.Updatesave(employee);
      };


      deleteEmployee = async (id: number): Promise<void> => {
        const employee = await this.getEmployeeById(id);
        await this.employeeRepository.softRemove(employee);
      };

      loginEmployee = async (email: string, password: string) => {
        const employee = await this.employeeRepository.findOneBy({email});

        if(!employee) {
          throw new EntityNotFoundException(ErrorCodes.EMPLOYEE_WITH_ID_NOT_fOUND);
        }
        const result = await bcrypt.compare(password, employee.password);

        if(!result) {

        throw new IncorrectPasswordException(ErrorCodes.INCORRECT_PASSWORD);
        }

        const payload: jwtPayload = {
          name : employee.name,
          email : employee.email,
          role : employee.role,
        };

        const token = jsonwebtoken.sign(payload,JWT_SECRET, {expiresIn: JWT_VALIDITY});

        return {token};
      }
 }
 export default  EmployeeService;