/**
 * Wraps Controllers for easy import from other modules
 */
import { EmployeeRespository } from "../repository/employeeRepository";
import { EmployeeService } from "../service/EmployeeService";
import EmployeeController from "./EmployeeController";
import { DepartmentRespository } from "../repository/departmentRepository";
import { DepartmentService } from "../service/DepartmentService";
import DepartmentController from "./DepartmentController";
import HealthController from "./HealthController";
export default [
  new HealthController(),
  new EmployeeController(new EmployeeService(new EmployeeRespository())),
  new DepartmentController(new DepartmentService(new DepartmentRespository())),
];
