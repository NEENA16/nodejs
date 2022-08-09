import IncorrectUsernameOrPasswordException from "../exception/IncorrectUsernameOrPasswordException";

/**
 * Custom error codes to be send to UI to display proper a response
 */
export const ErrorCodes: { [key: string]: CustomError } = {
    UNAUTHORIZED: {
        CODE: "UNAUTHORIZED",
        MESSAGE: "User is not allowed to perform this operation",
    },
    ROLEUNAUTHORIZED: {
        CODE: "ROLENOTAUTHORIZED",
        MESSAGE: "Role is not authorised to perform this operation",
    },
    USER_NOT_FOUND: {
        CODE: "USER_NOT_FOUND",
        MESSAGE: "User not found",
    },
    USER_WITH_ID_NOT_FOUND: {
        CODE: "USER_WITH_ID_NOT_FOUND",
        MESSAGE: "User with given id not found",
    },
    VALIDATION_ERROR: {
        CODE: "VALIDATION_ERROR",
        MESSAGE: "Validation failed error",
    },
    EMPLOYEE_WITH_ID_NOT_FOUND: {
        CODE: "EMPLOYEE_WITH_ID_NOT_FOUND",
        MESSAGE: "Employee with given id not found",
    },
    INCORRECT_USERNAME_OR_PASSWORD_EXCEPTION: {
        CODE: "INCORRECT_USERNAME_OR_PASSWORD",
        MESSAGE: " Incorrect username or password given"
    }
};

/**
 * Interface to describe custom errors
 */
export interface CustomError {
    CODE: string;
    MESSAGE: string;
}
