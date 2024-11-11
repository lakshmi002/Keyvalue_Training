// import { when } from "jest-when";
// import EmployeeRepository from "../../src/repository/employee.repository";
// import DepartmentRepository from "../../src/repository/department.repository";
// import Employee from "../../src/entity/employee.entity";
// import Department from "../../src/entity/department.entity";
// import { DepartmentService } from "../../src/service/department.service";

// describe("Employee Service", () => {
//   let employeeRepository: EmployeeRepository;
//   let departmentRepository: DepartmentRepository;
//   let departmentService: DepartmentService;
//   let dummyDepartments: Department[];

//   beforeAll(() => {
//     const dataSource = {
//       getRepository: jest.fn(),
//     };
//     employeeRepository = new EmployeeRepository(
//       dataSource.getRepository(Employee)
//     ) as jest.Mocked<EmployeeRepository>;

//     departmentRepository = new DepartmentRepository(
//       dataSource.getRepository(Department)
//     ) as jest.Mocked<DepartmentRepository>;

//     departmentService = new DepartmentService(departmentRepository);

//     dummyDepartments = [
//       {
//         id: 1,
//         name: "HR",
//         employee: [],
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         deletedAt: null,
//       },
//       {
//         id: 2,
//         name: "Engineering",
//         employee: [],
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         deletedAt: null,
//       },
//     ];
//   });

//   it("should return all departments", async () => {
//     const mock = jest
//       .fn(departmentRepository.find)
//       .mockResolvedValue(dummyDepartments);
//     departmentRepository.find = mock;

//     const departments = await departmentService.getAllDepartments();
//     expect(departments).toEqual(dummyDepartments);
//     expect(mock).toHaveBeenCalledTimes(1);
//   });

//   it("should return department with id", async () => {
//     const mock = jest.fn();
//     when(mock)
//       .calledWith({ id: 1 })
//       .mockResolvedValue(dummyDepartments[0])
//       .calledWith({ id: 2 })
//       .mockResolvedValue(dummyDepartments[1]);
//     departmentRepository.findOneBy = mock;

//     const department1 = await departmentService.getDepartmentById(1);

//     expect(department1.name).toEqual("HR");
//     expect(mock).toHaveBeenCalledTimes(1);

//     const department2 = await departmentService.getDepartmentById(2);
//     expect(department2.name).toEqual("Engineering");
//     expect(mock).toHaveBeenCalledTimes(2);
//   });

//   it("should return department with name", async () => {
//     const mock = jest.fn();
//     when(mock)
//       .calledWith({ name: "HR" })
//       .mockResolvedValue(dummyDepartments[0])
//       .calledWith({ name: "Engineering" })
//       .mockResolvedValue(dummyDepartments[1]);
//     departmentRepository.findOneBy = mock;

//     const department1 = await departmentService.getDepartmentByName("HR");

//     expect(department1.name).toEqual("HR");
//     expect(mock).toHaveBeenCalledTimes(1);

//     const department2 = await departmentService.getDepartmentByName(
//       "Engineering"
//     );
//     expect(department2.name).toEqual("Engineering");
//     expect(mock).toHaveBeenCalledTimes(2);
//   });

//   it("should create a department", async () => {
//     const mock = jest.fn();
//     when(mock)
//       .calledWith(dummyDepartments[0])
//       .mockResolvedValue(dummyDepartments[0]);

//     departmentRepository.save = mock;

//     const department = await departmentService.createNewDepartment(
//       dummyDepartments[0].name
//     );

//     expect(department.name).toEqual(dummyDepartments[0].name);
//     expect(mock).toHaveBeenCalledTimes(1);
//   });

//   // it.only("should return update employee", async () => {
//   //   const mockSave = jest.fn();
//   //   when(mockSave)
//   //     .calledWith(dummyEmployees[0])
//   //     .mockResolvedValue(dummyEmployees[0]);
//   //   employeeRepository.save = mockSave;

//   //   const mockFetchById = jest.fn();
//   //   when(mockFetchById)
//   //     .calledWith({ id: 1 }, ["address", "department"])
//   //     .mockResolvedValue(dummyEmployees[0]);
//   //   employeeRepository.findOneBy = mockFetchById;

//   //   const mockDepartment = jest.fn();
//   //   when(mockDepartment)
//   //     .calledWith("HR")
//   //     .mockResolvedValue(dummyDepartments[0]);
//   //   departmentService.getDepartmentByName = mockDepartment;

//   //   const userUpdate = await employeeService.updateEmployee(dummyEmployees[0]);
//   //   expect(userUpdate).toEqual(dummyEmployees[0]);
//   //   expect(mockSave).toHaveBeenCalledTimes(1);
//   //   expect(mockDepartment).toHaveBeenCalledTimes(1);
//   //   expect(mockFetchById).toHaveBeenCalledTimes(1);
//   // });

//   //   it.only("should delete employee", async () => {
//   //     const mockFetchById = jest.fn();
//   //     when(mockFetchById)
//   //       .calledWith({ id: 1 })
//   //       .mockResolvedValue(dummyEmployees[0]);
//   //     employeeRepository.findOneBy = mockFetchById;

//   //     const mockRemove = jest.fn();
//   //     when(mockRemove).calledWith(1).mockResolvedValue(dummyEmployees[0]);
//   //     employeeRepository.remove = mockRemove;
//   //   });
// });