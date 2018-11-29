# Enterprise172
Application queries data from MySQL with single sign on.  

Employees data are from https://github.com/datacharmer/test_db.

Tables in employees database:
current_dept_emp     |
departments          |
dept_emp             |
dept_emp_latest_date |
dept_manager         |
employees            |
salaries             |
titles               |

Employees table:
    emp_no      INT             NOT NULL,
    birth_date  DATE            NOT NULL,
    first_name  VARCHAR(14)     NOT NULL,
    last_name   VARCHAR(16)     NOT NULL,
    gender      ENUM ('M','F')  NOT NULL,    
    hire_date   DATE            NOT NULL,
    
Departments table:
  dept_no
  dept_name  
  
  Testing
