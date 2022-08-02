import { IsNumber, IsString, IsUUID } from "class-validator";

export class DepartmentParamsDto {
    @IsUUID()
    public id: string;
}