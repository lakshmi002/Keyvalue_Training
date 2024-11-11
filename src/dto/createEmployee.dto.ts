import { IsEmail, IsEnum, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { AddressDto } from "./createAddress.dto";
import { Type } from "class-transformer";
import { Role } from "../utils/role.enum";
import { DepartmentDto } from "./createDepartment.dto";


export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @ValidateNested({each: true})
  @Type(() => AddressDto)
  address: AddressDto;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @IsNotEmpty()
  @ValidateNested({each:true})
  @Type(()=>DepartmentDto)
  department: DepartmentDto;
}