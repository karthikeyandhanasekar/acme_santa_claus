const request = require("supertest");
const app = require("../app"); // Assuming app.js exports the Express app
const { expect } = require("chai");
const sinon = require("sinon");
const mysqlDb = require("../services/mysql_db"); // Assuming mysqlDb is your database connection module

// Mocking database functions for testing
describe("Employee Routes", function () {
  describe("GET /api/employees", function () {
    it("should return 200 and employee details when employees exist", async function () {
      // Mocking database response
      const employeesDetails = [
        {
          employees_id: 1,
          employee_name: "Akask",
          employee_mail: "akasj@gmail.com",
          employees_phone: "9876543210",
          createdDate: "2024-11-21T15:54:44.000Z",
        },
      ];
      sinon.stub(mysqlDb, "query").resolves([employeesDetails]);
      const res = await request(app).get("/api/employees");
      expect(res.status).to.equal(200);
      expect(res.body.employeesDetails).to.be.an("array").that.is.not.empty;
      expect(res.body.employeesDetails[0].employee_name).to.equal("Akask");

      mysqlDb.query.restore(); // Restore the original method
    });

    it("should return 404 if no employees exist", async function () {
      sinon.stub(mysqlDb, "query").resolves([[]]);

      const res = await request(app).get("/api/employees");
      expect(res.status).to.equal(404);
      expect(res.body.employeesDetails).to.be.an("array").that.is.empty;

      mysqlDb.query.restore();
    });
  });

  describe("GET /:id", function () {
    it("should return 200 and the employee details for a valid ID", async function () {
      const employee = {
        employees_id: 1,
        employee_name: "Akask",
        employee_mail: "akasj@gmail.com",
        employees_phone: "9876543210",
        createdDate: "2024-11-21T15:54:44.000Z",
      };
      sinon.stub(mysqlDb, "query").resolves([[employee]]);

      const res = await request(app).get("/api/employees/1");
      expect(res.status).to.equal(200);
      expect(res.body.employeeDetails[0]).to.deep.equal(employee);

      mysqlDb.query.restore();
    });

    it("should return 404 if the employee is not found", async function () {
      sinon.stub(mysqlDb, "query").resolves([[]]);

      const res = await request(app).get("/api/employees/999");
      expect(res.status).to.equal(404);
      expect(res.body.employeeDetails).to.be.an("array").that.is.empty;

      mysqlDb.query.restore();
    });
  });

  describe("POST /api/employees", function () {
    it("should return 201 and create a new employee", async function () {
      const newEmployee = {
        name: "Doe",
        mail: "john.doe@example.com",
        phone: "1346798520",
        password: "TestPassword@2123",
      };

      sinon.stub(mysqlDb, "query").resolves([{}]);

      const res = await request(app).post("/api/employees").send(newEmployee);

      expect(res.status).to.equal(201);
      expect(res.body.success).to.equal(true);

      mysqlDb.query.restore();
    });

    it("should return 400 if the email or phone already exists", async function () {
      const existingEmail = {
        name: "JaneDoe",
        mail: "karthik01@gmail.com",
        phone: "1234178900",
        password: "TestPassword@2123",
      };

      const mockCheckEmailQuery = [{ count: 1 }];

      sinon.stub(mysqlDb, "query").resolves([mockCheckEmailQuery]);

      const res = await request(app).post("/api/employees").send(existingEmail);

      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal(
        "Email/PhoneNo already exists. Please use a different email/phoneNo."
      );

      mysqlDb.query.restore();
    });
  });

  describe("PUT /:id", function () {
    it("should update employee details", async function () {
      const updatedEmployee = {
        name: "karthik",
        mail: "karthik01@gmail.com",
        phone: 1234178900,
        password: "Karthik@123",
      };

      const existingEmployee = {
        employee_name: "Akask",
        employee_mail: "akasj@gmail.com",
        employees_phone: "9876543210",
        createdDate: "2024-11-21T15:54:44.000Z",
      };
      sinon.stub(mysqlDb, "query").resolves([existingEmployee]);

      const res = await request(app)
        .put("/api/employees/1")
        .send(updatedEmployee);
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal("Employee updated successfully.");

      mysqlDb.query.restore();
    });

    it("should return 404 if the employee does not exist", async function () {
      const updatedEmployee = {
        name: "karthik",
        mail: "karthik01@gmail.com",
        phone: 1234178900,
      };
      sinon.stub(mysqlDb, "query").resolves([[]]);

      const res = await request(app)
        .put("/api/employees/999")
        .send(updatedEmployee);
      expect(res.status).to.equal(404);
      expect(res.body.success).to.equal(false);
      expect(res.body.message).to.equal("Employee is not in the records");

      mysqlDb.query.restore();
    });
  });

  describe("DELETE /:id", function () {
    it("should delete the employee record", async function () {
      const employeeToDelete = {
        employees_id: 1,
        employee_name: "Akask",
        employee_mail: "akasj@gmail.com",
        employees_phone: "9876543210",
        createdDate: "2024-11-21T15:54:44.000Z",
      };
      sinon.stub(mysqlDb, "query").resolves([employeeToDelete]);

      const res = await request(app).delete("/api/employees/1");

      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal(
        "Employee record removed successfully."
      );

      mysqlDb.query.restore();
    });

    it("should return 404 if the employee is not found", async function () {
      sinon.stub(mysqlDb, "query").resolves([[]]);

      const res = await request(app).delete("/api/employees/999");

      expect(res.status).to.equal(404);
      expect(res.body.message).to.equal("Employee is not in the records");

      mysqlDb.query.restore();
    });
  });
});
