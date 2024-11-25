const { expect } = require("chai");
const sinon = require("sinon");
const mockFs = require("mock-fs");
const path = require("path");
const {
  secretChildController,
} = require("../controllers/secretChildController");
const { parseCSV, jsonToCSV } = require("../utils/generalFunctions");
const { getCurrentYear } = require("../utils/dateFunction");
const { log } = require("console");

describe("secretChildController", () => {
  let req, res, next;

  beforeEach(() => {
    sinon.restore();
    req = {
      file: {
        path: "uploads/employee_list.csv", // Mock file upload path
      },
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    next = sinon.stub();

    // Mock the `parseCSV` and `jsonToCSV` utility functions
    sinon.stub(parseCSV);
    sinon.stub(jsonToCSV);
    // sinon.stub(getCurrentYear).returns(new Date().getFullYear()); // Mock current year to 2024
  });

  afterEach(() => {
    sinon.restore();
    mockFs.restore(); // Restore the file system
  });

  //   it("should return a 404 if last year's data is missing", async () => {
  //     // Simulate missing last year data file
  //     mockFs({});

  //     await secretChildController(req, res, next);

  //     expect(res.status.calledWith(404)).to.be.true;
  //     expect(
  //       res.json.calledWithMatch({
  //         success: false,
  //         message: "Last Year Data is missing",
  //       })
  //     ).to.be.true;
  //   });

  it("should process and return Secret Santa assignments", async () => {
    // Mock the file system with last year's data and uploaded file
    mockFs({
      "public/documents/2023_secret_child_mapping.csv": `
            Employee_Name,Employee_EmailID,Secret_Child_Name,Secret_Child_EmailID
            Hamish Murray,hamish.murray@acme.com,Benjamin Collins,benjamin.collins@acme.com
            Layla Graham,layla.graham@acme.com,Piper Stewart,piper.stewart@acme.com
            Matthew King,matthew.king@acme.com,Spencer Allen,spencer.allen@acme.com
            Benjamin Collins,benjamin.collins@acme.com,Ethan Murray,ethan.murray@acme.com
            Isabella Scott,isabella.scott@acme.com,Layla Graham,layla.graham@acme.com
            Charlie Ross,charlie.ross@acme.com,Mark Lawrence,mark.lawrence@acme.com
            Hamish Murray,hamish.murray.sr@acme.com,Hamish Murray,hamish.murray.jr@acme.com
            Piper Stewart,piper.stewart@acme.com,Charlie Ross,charlie.ross.jr@acme.com
            Spencer Allen,spencer.allen@acme.com,Charlie Wright,charlie.wright@acme.com
            Charlie Wright,charlie.wright@acme.com,Hamish Murray,hamish.murray@acme.com
            Hamish Murray,hamish.murray.jr@acme.com,Charlie Ross,charlie.ross@acme.com
            Charlie Ross,charlie.ross.jr@acme.com,Matthew King,matthew.king@acme.com
            Ethan Murray,ethan.murray@acme.com,Matthew King,matthew.king.jr@acme.com
            Matthew King,matthew.king.jr@acme.com,Hamish Murray,hamish.murray.sr@acme.com
            Mark Lawrence,mark.lawrence@acme.com,Isabella Scott,isabella.scott@acme.com

      `,
      "uploads/employees.csv": `
       Employee_Name,Employee_EmailID
            Hamish Murray,hamish.murray@acme.com
            Layla Graham,layla.graham@acme.com
            Matthew King,matthew.king@acme.com
            Benjamin Collins,benjamin.collins@acme.com
            Isabella Scott,isabella.scott@acme.com
            Charlie Ross,charlie.ross@acme.com
            Hamish Murray,hamish.murray.sr@acme.com
            Piper Stewart,piper.stewart@acme.com
            Spencer Allen,spencer.allen@acme.com
            Charlie Wright,charlie.wright@acme.com
            Hamish Murray,hamish.murray.jr@acme.com
            Charlie Ross,charlie.ross.jr@acme.com
            Ethan Murray,ethan.murray@acme.com
            Matthew King,matthew.king.jr@acme.com
            Mark Lawrence,mark.lawrence@acme.com

      `,
    });
    console.log(require.resolve("csv-parser"));

    // Mock parseCSV to return parsed data
    parseCSV(
      path.resolve(
        __dirname,
        "../public/documents/2023_secret_child_mapping.csv"
      )
    ).resolves([
      {
        Employee_Name: "Hamish Murray",
        Employee_EmailID: "hamish.murray@acme.com",
        Secret_Child_Name: "Benjamin Collins",
        Secret_Child_EmailID: "benjamin.collins@acme.com",
      },
    ]);

    parseCSV.withArgs(path.join(__dirname, req.file.path), true).resolves([
      {
        Employee_Name: "Hamish Murray",
        Employee_EmailID: "hamish.murray@acme.com",
      },
      {
        Employee_Name: "Layla Graham",
        Employee_EmailID: "layla.graham@acme.com",
      },
    ]);

    // Execute the controller
    await secretChildController(req, res, next);

    // Validate that the response contains the assignments
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.called).to.be.true;
    const responseData = res.json.getCall(0).args[0];
    expect(responseData)
      .to.have.property("totalAssignment")
      .that.is.an("array");

    // Validate that `jsonToCSV` was called to save the output
    expect(jsonToCSV.calledOnce).to.be.true;
    expect(
      jsonToCSV.calledWithMatch(
        responseData.totalAssignment,
        sinon.match.string
      )
    ).to.be.true;
  });

  it("should handle errors and call next with an error", async () => {
    // Simulate an error in `parseCSV`
    parseCSV.rejects(new Error("Parse error"));

    await secretChildController(req, res, next);

    // Ensure the next middleware was called with the error
    expect(next.calledOnce).to.be.true;
    const error = next.getCall(0).args[0];
    expect(error).to.be.an("error");
    expect(error.message).to.equal("Parse error");
  });
});
