import { NextFunction, Router, Response, Request } from "express";
import authorize  from "../middleware/authorize.middleware";
import {RequestWithUser} from "../utils/requestWithUser";
import HttpException from "../exception/http.exception";
import { Role } from "../utils/role.enum";
import { plainToInstance } from "class-transformer";
// import {
//   CreateDepartmentDto,
//   DepartmentResponseDto,
//   UpdateDepartmentDto,
// } from "../dto/createDepartment.dto";
import { CreateDepartmentDto } from "../dto/createDepartment.dto";
import { validate } from "class-validator";
import DepartmentService from "../service/department.service";
// import { errorFormatter } from "../utils/errorFormatter.utils";

export default class DepartmentController {
  public router: Router;

  constructor(private departmentService: DepartmentService) {
    this.router = Router();

    this.router.get("/", authorize, this.getAllDepartments);
    this.router.get("/:id", authorize, this.getDepartmentById);
    this.router.post("/", authorize, this.createDepartment);
    this.router.patch("/", authorize, this.updateDepartment);
    this.router.delete("/:id", authorize, this.deleteDepartment);
  }
  getAllDepartments = async (req: Request, res: Response) => {
    const departments = await this.departmentService.getAllDepartments();
    // res.json(plainToInstance(DepartmentResponseDto, departments));
    res.status(200).send(departments);
  };

  getDepartmentById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = Number(req.params.id);
      const department = await this.departmentService.getDepartmentById(id);
      if (!department) {
        throw new HttpException(404, "Department not found");
      }
      // res.json(plainToInstance(UpdateDepartmentDto, department));
      res.status(200).send(department);
    } catch (error) {
      next(error);
    }
  };

  createDepartment = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
       if (req.role !== Role.HR) {
         throw new HttpException(403, "Invalid Access");
       }
      const departmentDto = plainToInstance(CreateDepartmentDto, req.body);
      const errors = await validate(departmentDto);

      if (errors.length) {
        const error = new HttpException(404,`No department found with id: ${req.params.id}`);
        throw error;
      }

      const departmentData = await this.departmentService.createDepartment(
        departmentDto.name
      );

      res.status(201).json({
        success: true,
        message: "Department Created!",
        data: departmentData,
      });
    } catch (error) {
      next(error);
    }
  };

  // updateDepartment = async (
  //   req: RequestWithUser,
  //   res: Response,
  //   next: NextFunction
  // ) => {
  //   try {
  //     if (req.role !== Role.HR) {
  //       throw new HttpException(403, "Invalid Access");
  //     }
  //     const departmentDto = plainToInstance(DepartmentDto, req.body);
  //     const errors = await validate(departmentDto);

  //     if (errors.length) {
  //       const error = new HttpException(404,`No department found with id: ${req.params.id}`);
  //       throw error;
  //     }

  //     const departmentData = await this.departmentService.updateDepartment(
  //       departmentDto
  //     );
  //     res.json({
  //       sucess: true,
  //       message: "Department Updated!",
  //       data: departmentData,
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // };

  public updateDepartment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const departmentId = Number(req.params.id);
      const departmentData = plainToInstance(CreateDepartmentDto, req.body);
      const errors = await validate(departmentData);

      if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        throw new HttpException(400, JSON.stringify(errors));
      }
      
      const updatedDepartment = await this.departmentService.updateDepartment(
        departmentId,
        departmentData.name
      );
      res.status(200).send(updatedDepartment);
    } catch (error) {
      next(error);
    }
  };

  deleteDepartment = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (req.role !== Role.HR) {
        throw new HttpException(403, "Invalid Access");
      }
      const id = Number(req.params.id);
      await this.departmentService.deleteDepartment(id);
      res.json({ sucess: true, message: "Department Deleted!" });
    } catch (err) {
      next(err);
    }
  };
}