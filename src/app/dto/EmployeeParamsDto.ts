import {  IsUUID } from "class-validator";

export class EmployeeParamsDto {
    @IsUUID()
    public id: string;
}