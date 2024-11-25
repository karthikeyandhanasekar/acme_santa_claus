
### Secret Santa Assignment Explanation

### **How Overall Solution Works**
1. **CSV File Upload**: 
   - The application allows users to upload a CSV file containing data.
   - Upon upload, the system automatically detects the **current year** and the **previous year** from the data.

2. **Processing**: 
   - The application processes the data for the current and previous years.
   - If data for the **previous year** is not found, the application will notify the user with a message:  
     **"Last year data not found."**

3. **Feature to View Specific Year Data**:
   - Users can select and view data for any specific year available in the dataset.

### **Key Features**
- **Automated Year Detection**: Automatically identifies the current and previous years from the uploaded CSV file.
- **Error Handling**: Notifies the user if data for the previous year is unavailable.
- **Custom Year View**: Provides flexibility to retrieve and analyze data for a specific year.


### How solution Works on Server

1. **Start with Everyone**:
   - We begin with a list of all employees.
   - Initially, everyone is available to be chosen as a Secret Child.

2. **Apply the Rules**:
   - For each employee:
     - Create a list of valid Secret Children.
     - Remove:
       - The employee themselves (you can’t pick yourself!).
       - The child they had last year (no repeats allowed).

3. **Pick Randomly**:
   - From the valid list, randomly select one person to be the Secret Child for the current employee.

4. **Remove the Chosen Child**:
   - Once someone is assigned as a Secret Child, they are removed from the available pool.
   - This ensures no one else can pick the same person.

5. **Repeat the Process**:
   - Repeat this for every employee, one by one, until everyone has a Secret Child.

6. **Handle Problems**:
   - If no valid Secret Child is available for an employee (due to the rules), an error is shown.
   - This indicates the input data (employees or last year’s assignments) needs to be reviewed.

7. **Fair and Fun**:
   - This process guarantees that:
     - Everyone gets a unique Secret Child.
     - The rules are followed.
     - Random selection adds an element of surprise and fairness!

---

## Tech Stack
- **Frontend**: React.js
- **Backend**: Express.js
- **Database**: MySQL

---

## Application Features

1. **Authentication**:
      -  Ensures that only authenticated users can access the API. Requires a valid Bearer token.
        
2 **Authorization**: 
       - Verifies that the authenticated user has the necessary permissions to access this resource.

3. **Employee Management**:
   - Add, update, view, and delete employee details seamlessly.

4. **Authentication System**:
   - Secure employee login with email and password authentication.

5. **Secret Santa Assignments**:
   - Automatically assign Secret Children to employees following specific rules to ensure fairness.

6. **CSV Upload and Parsing**:
   - Upload employee data via CSV files for bulk management and assignments.

7. **Rule-Based Logic**:
   - Enforce rules to prevent employees from being assigned to themselves or repeating last year’s assignments.

8. **Dynamic and Scalable**:
   - Designed to handle multiple employees efficiently while ensuring a random and unique experience.


---

## Prerequisites
Make sure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v18 or later)
- [MySQL](https://dev.mysql.com/downloads/)
- [Git](https://git-scm.com/)

---

## Getting Started

### Step 1: Clone the Repository
```bash
git clone [https://github.com/your-username/your-repo-name.git](https://github.com/Karthikeyan-FullStack-Developer/acme_santa_claus.git)
cd acme_santa_claus
```
### Step 2: Start the Server (Express.js)
```bash
cd acme_santa_claus_server
npm i 
npm i chai sinon supertest mock-fs --save-dev
npm install -g nodemon 
nodemon
```

### Step 3: Start the Application (React.js)
```bash
cd acme_santa_claus_client
npm i 
npm start
```

---

# API Documentation

## Employees

### **GET**: Get Employees
**URL**: `http://localhost:5000/api/employees`
#### Headers
| Key            | Value                          | Description                      |
|----------------|--------------------------------|----------------------------------|
| Authorization  | Bearer `<your-token-here>`     | **Required**. Bearer token for authentication. |

#### Response
- **200 OK**: Returns the list of employees.
- **401 Unauthorized**: If the Authorization header is missing or invalid.

---

### **GET**: Get Specific Employee Details
**URL**: `http://localhost:5000/api/employees/{id}`

#### Headers
| Key            | Value                          | Description                      |
|----------------|--------------------------------|----------------------------------|
| Authorization  | Bearer `<your-token-here>`     | **Required**. Bearer token for authentication. |

#### Response
- **200 OK**: Returns the list of employees.
- **401 Unauthorized**: If the Authorization header is missing or invalid.

---

### **POST**: Register Employee
**URL**: `http://localhost:5000/api/employees`

#### Body (raw JSON):
```json
{
    "name": "John Doe",
    "mail": "johndoe@gmail.com",
    "phone": 1234567890,
    "password": "Johndoe@123"
}
```

### **PUT**: Update Employee details
**URL**: `http://localhost:5000/api/employees/{id}`

#### Headers
| Key            | Value                          | Description                      |
|----------------|--------------------------------|----------------------------------|
| Authorization  | Bearer `<your-token-here>`     | **Required**. Bearer token for authentication. |

#### Response
- **200 OK**: Returns the list of employees.
- **401 Unauthorized**: If the Authorization header is missing or invalid.


#### Body (raw JSON):
```json
{
      "name": "John Doe",
    "mail": "johndoe@gmail.com",
    "phone": 1234567890,
}
```
### **DELETE**: Remove Employee
**URL**: `http://localhost:5000/api/employees/{id}`
#### Headers
| Key            | Value                          | Description                      |
|----------------|--------------------------------|----------------------------------|
| Authorization  | Bearer `<your-token-here>`     | **Required**. Bearer token for authentication. |

#### Response
- **200 OK**: Returns the list of employees.
- **401 Unauthorized**: If the Authorization header is missing or invalid.


---

## Authentication

### **POST**: LOGIN
**URL**: `http://localhost:5000/api/auth/login`

#### Body (raw JSON):
```json
{
    "mail": "johndoe@gmail.com",
    "password": "Johndoe@123"
}
```
---
## Gifts/Santa Claus API

### **GET**: Get Available Assigned Years
**URL**: `http://localhost:5000/api/gift/availableYears`
#### Headers
| Key            | Value                          | Description                      |
|----------------|--------------------------------|----------------------------------|
| Authorization  | Bearer `<your-token-here>`     | **Required**. Bearer token for authentication. |

#### Response
- **200 OK**: Returns the list of employees.
- **401 Unauthorized**: If the Authorization header is missing or invalid.


### **GET**: Get Assigned Yearly Data
**URL**: `http://localhost:5000/api/gift/{year}`
#### Headers
| Key            | Value                          | Description                      |
|----------------|--------------------------------|----------------------------------|
| Authorization  | Bearer `<your-token-here>`     | **Required**. Bearer token for authentication. |

#### Response
- **200 OK**: Returns the list of employees.
- **401 Unauthorized**: If the Authorization header is missing or invalid.


### **POST**: EMPLOYEE-CHILD ASSIGNMENT
**URL**: `http://localhost:5000/api/gift/upload`

#### Headers
| Key            | Value                          | Description                      |
|----------------|--------------------------------|----------------------------------|
| Authorization  | Bearer `<your-token-here>`     | **Required**. Bearer token for authentication. |

#### Response
- **200 OK**: Returns the list of employees.
- **401 Unauthorized**: If the Authorization header is missing or invalid.


## Body (form-data)
- **file**: `/D:/NodeJs_Projects/acme_santa_claus/documents/inputDocument/employee.csv`




