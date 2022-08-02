import { IsNumber, IsString, IsUUID } from "class-validator";

export class EmployeeParamsDto {
    @IsUUID()
    public id: string;
}