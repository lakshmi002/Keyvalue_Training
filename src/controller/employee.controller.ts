import express from "express"
import EmployeeService from "../service/employee.service";
import HttpException from "../exception/http.exception";
import { plainToInstance } from "class-transformer";
import { CreateEmployeeDto } from "../dto/createEmployee.dto";
import { validate } from "class-validator";
import { NextFunction } from "express-serve-static-core";
import IncorrectPasswordException from "../exception/incorrectPassword.exception";
import { Role } from "../utils/role.enum";
import { ErrorCodes } from "../utils/error.code";
import authorize from "../middleware/authorize.middleware";
import  {RequestWithUser} from "../utils/requestWithUser";

class EmployeeController {
    public router: express.Router;
    constructor(private employeeService: EmployeeService) {
      this.router = express.Router();
      this.router.get("/",this.getAllEmployees);
      this.router.get("/:id",this.getEmployeeById);
      this.router.post("/",authorize,this.createEmployee);
      this.router.delete("/:id",this.deleteEmployee);
      this.router.put("/:id",this.updateEmployee);
      this.router.post("/login", this.loginEmployee);
      
  }
  getAllEmployees = async(req:express.Request,res:express.Response) => {
    const employees =await this.employeeService.getAllEmployees();
    res.status(200).send(employees);
  }
  // getAllEmployeesById = async(req:express.Request,res:express.Response) => {
  //   const employeeId=Number(req.params.id);
  //   const employees =await this.employeeService.getEmployeeById(employeeId);
  //   res.status(200).send(employees);
  // }

  public loginEmployee = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    const {email, password} = req.body;
    try {
      const token = await this.employeeService.loginEmployee(email,password);
      res.status(200).send({ data: token});
    } catch (error) {
      next(error);
    }
  };

  public getEmployeeById = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
 try {
   const employeeId = Number(req.params.id);
   const employee = await this.employeeService.getEmployeeById(employeeId);
   if (!employee) {
     const error = new HttpException(404,`No employee found with id: ${req.params.id}`);
     throw error;
   }
   res.status(200).send(employee);
 } catch (error) {
     next(error) }
  };

  
  public createEmployee = async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {

      const role = req.role;
      if( role !== Role.HR) {
        throw new IncorrectPasswordException(ErrorCodes.UNAUTHORIZED);
      }

      const employee = plainToInstance(CreateEmployeeDto, req.body);
      const errors = await validate(employee);

      if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        throw new HttpException(400, JSON.stringify(errors));
      }

      // const departmentData = await this.departmentService

      const savedEmployee = await this.employeeService.createEmployee(
        employee.email,
        employee.name,
        employee.address,
        employee.password,
        employee.role,
        employee.department
      );
      res.status(200).send(savedEmployee);
    } catch (error) {
      next(error);
    }
  };
    

  // public updateEmployee =async(
  //   req :express.Request,
  //   res:express.Response,
  //   next:express.NextFunction
  // ) => {
  //   const employeeId= Number(req.params.id);
  //   const { email, name, address } = req.body;
  //   await this.employeeService.updateEmployee(employeeId, email, name, address);
  //   res.status(200).send();
  // };

  public updateEmployee = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const employeeId = Number(req.params.id);
      const { email, name, address, department } = req.body;
  
      // Call the service to update the employee
      await this.employeeService.updateEmployee(employeeId, email, name, address,department);
  
      // Send a success response
      res.status(200).send();
    } catch (error) {
      // Handle the error
      console.error(error); // Log the error for debugging
  
      // Send an error response
      res.status(500).json({
        message: 'An error occurred while updating the employee.',
        error: error.message, // Optionally include the error message
      });
    }
  };

  public deleteEmployee = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const employeeId = Number(req.params.id);
  
      // Call the service to delete the employee
      await this.employeeService.deleteEmployee(employeeId);
  
      // Send a success response
      res.status(200).send();
    } catch (error) {
      // Handle the error
      console.error(error); // Log the error for debugging
  
      // Send an error response
      res.status(500).json({
        message: 'An error occurred while deleting the employee.',
        error: error.message, // Optionally include the error message
      });
    }
  };


  // public deleteEmployee = async (
  //   req: express.Request,
  //   res: express.Response
  // ) => {
  //   const employeeId = Number(req.params.id);
  //   await this.employeeService.deleteEmployee(employeeId);
  //   res.status(200).send();
  // };

}
  export default EmployeeController;