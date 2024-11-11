
import { IsNotEmpty, IsString } from "class-validator";
import "reflect-metadata"
export class CreateDepartmentDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class DepartmentDto {
  @IsNotEmpty()
  @IsString()
  id: number;
}