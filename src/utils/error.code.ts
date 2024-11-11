export const ErrorCodes = {
    INCORRECT_PASSWORD: {
        CODE: "INCORRECT_PASSWORD",
        MESSAGE: "Incorrect password"
},

UNAUTHORIZED: {
    CODE: "UNAUTHORIZED",
    MESSAGE: "You are not authorized to perform this action"
},

EMPLOYEE_WITH_ID_NOT_fOUND: {
    CODE: "EMPLOYEE_WITH_ID_NOT_fOUND",
    MESSAGE: "Employee with the given Id not found"
},
DEPARTMENT_WITH_ID_NOT_fOUND: {
    CODE: "DEPARTMENT_WITH_ID_NOT_fOUND",
    MESSAGE: "Department with the given Id not found"
}
};

export type CustomError = typeof ErrorCodes[keyof typeof ErrorCodes];