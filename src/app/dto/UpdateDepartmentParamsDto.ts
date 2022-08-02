import { IsNumber, IsString, IsUUID } from "class-validator";

export class UpdateDepartmentParamsDto {
    @IsUUID()
    public id: string;
}