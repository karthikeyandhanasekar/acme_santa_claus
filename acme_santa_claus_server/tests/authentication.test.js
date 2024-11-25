const chai = require("chai");
const sinon = require("sinon");
const request = require("supertest");
const app = require("../app");
const mysqlDb = require("../services/mysql_db");
const bcryptService = require("../services/bcrypt");
const { generateToken } = require("../services/tokenService");

const { expect } = chai;

describe("POST /api/auth/login", () => {
  let mysqlStub;
  let bcryptStub;
  let tokenStub;

  beforeEach(() => {
    // Stub the services

    mysqlStub = sinon.stub(mysqlDb, "query");
    console.log("mysqlStub initialized:", mysqlStub);
    bcryptStub = sinon.stub(bcryptService, "compareHashValue");
    console.log("bcryptStub initialized:", bcryptStub);
    tokenStub = sinon.stub(generateToken);
    console.log("tokenStub initialized:", tokenStub);
  });

  afterEach(() => {
    // Restore the stubs
    // Check and restore stubs
    if (mysqlStub && typeof mysqlStub.restore === "function") {
      mysqlStub.restore();
    }

    if (bcryptStub && typeof bcryptStub.restore === "function") {
      bcryptStub.restore();
    }

    if (tokenStub && typeof tokenStub.restore === "function") {
      tokenStub.restore();
    }
  });

  it("should return 404 if the email does not exist", async () => {
    mysqlStub.resolves([[]]); // Simulate no records found

    const response = await request(app).post("/api/auth/login").send({
      mail: "nonexistent@example.com",
      password: "password123",
    });

    expect(response.status).to.equal(404);
    expect(response.body).to.deep.equal({
      success: false,
      message: "Employee is not in the records",
    });
    sinon.restore();
  });

  it("should return 401 for an invalid password", async () => {
    const mockEmployee = [
      {
        employees_id: 1,
        employee_name: "John Doe",
        employee_mail: "john.doe@example.com",
        employees_phone: "1234567890",
        createdDate: "2023-11-01",
        employee_password: "hashedPassword123",
      },
    ];
    mysqlStub.resolves([mockEmployee]); // Mock valid employee
    bcryptStub.resolves(false); // Simulate password mismatch

    const response = await request(app).post("/api/auth/login").send({
      mail: "john.doe@example.com",
      password: "wrongPassword",
    });
    console.log(response.body);

    expect(response.status).to.equal(401);
    expect(response.body).to.deep.equal({
      success: false,
      message: "Invalid Password",
    });
  });

  it("should return 200 and a JWT token for valid credentials", async () => {
    const mockEmployee = [
      {
        employees_id: 1,
        employee_name: "John Doe",
        employee_mail: "john.doe@example.com",
        employees_phone: "1234567890",
        createdDate: "2023-11-01",
        employee_password: "hashedPassword123",
      },
    ];
    mysqlStub.resolves([mockEmployee]); // Mock valid employee
    bcryptStub.resolves(true); // Simulate valid password
    tokenStub.returns("mockedJwtToken"); // Mock JWT generation

    const response = await request(app).post("/api/auth/login").send({
      mail: "john.doe@example.com",
      password: "validPassword",
    });

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({
      success: true,
      message: "Login successful",
      jwtToken: "mockedJwtToken",
    });
  });

  it("should handle server errors gracefully", async () => {
    mysqlStub.rejects(new Error("Database connection error")); // Simulate database error

    const response = await request(app).post("/api/auth/login").send({
      mail: "john.doe@example.com",
      password: "validPassword",
    });

    expect(response.status).to.equal(500);
  });
});
