import Employee from '../../entity/employee.entity';
import EmployeeService from '../../service/employee.service';
import EmployeeRepository from '../../repository/employee.repository';
import { when } from 'jest-when';
import bcrypt from "bcrypt";
describe("Employee Service Test", () => {
    let employeeService: EmployeeService;
    let employeeRepository: EmployeeRepository;

    beforeAll(() => {
        const dataSource = {
            getRepository: jest.fn()
        };
        employeeRepository = new EmployeeRepository(dataSource.getRepository(Employee)) as jest.Mocked<EmployeeRepository>;
        employeeService = new EmployeeService(employeeRepository);
    });

    it("should get all employees", async () => {
        employeeRepository.find = jest.fn().mockResolvedValueOnce([]);
        const employees = await employeeService.getAllEmployees();
        expect(employees).toEqual([]);
    });
    // it("should get employee by ID", async () => {
    //     const mockEmployee = { id: 1, name: "John Doe", role: "Developer" };
    //     employeeRepository.findOneBy = jest.fn().mockResolvedValueOnce(mockEmployee);
    //     const employee = await employeeService.getEmployeeById(1);
    //     expect(employee).toEqual(mockEmployee);
    // });
    it('should return getEmployeeById', async () => {
        const mockedFunction = jest.fn();
        when(mockedFunction).calledWith({id: 123}).mockResolvedValue({"id": 123, "name": "Employee name"});
        employeeRepository.findOneBy = mockedFunction;
        const user = await employeeService.getEmployeeById(123);
        expect(user).toEqual({"id": 123, "name": "Employee name"});
        expect(mockedFunction).toHaveBeenCalledTimes(1);
    });

    it('should return deleteEmployeeById', async () => {
        const mockedFunction = jest.fn();
        when(mockedFunction).calledWith({id: 123}).mockResolvedValue({"success": true, "message": "Employee deleted"});
        employeeRepository.softRemove = mockedFunction;
        const response = await employeeService.deleteEmployee(123);
        expect(mockedFunction).toHaveBeenCalledTimes(1);
    });
    it("should throw not found exception when employee not found", async () => {
        const mockedFunction = jest.fn();
        when(mockedFunction).calledWith({email: "abc@yopmail.com"}).mockResolvedValue(null);
        employeeRepository.findOneBy = mockedFunction;
        try {
            await employeeService.loginEmployee("abc@yopmail.com", "password");
        } catch (err) {
            expect(err).toEqual(new Error("not found"));
        }
    });


    it("should throw password mismatch if password mismatch", async () => {
        const bcryptMock = jest.fn();
        when(bcryptMock)
            .calledWith("password", "11111111")
            .mockResolvedValue(false);
        bcrypt.compare = bcryptMock;

        const mockedFunction = jest.fn();
        when(mockedFunction)
            .calledWith({ email: "abc@yopmail.com" })
            .mockResolvedValue({
                email: "abc@yopmail.com",
                password: "password",
            });
        employeeRepository.findOneBy = mockedFunction;
        try {
            await employeeService.loginEmployee("abc@yopmail.com", "password");
        } catch (err) {
            expect(err).toEqual(new Error("Incorrect Password"));
        }
    });
})