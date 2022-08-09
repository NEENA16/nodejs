import {  IsUUID } from "class-validator";

export class DepartmentParamsDto {
    @IsUUID()
    public id: string;
}