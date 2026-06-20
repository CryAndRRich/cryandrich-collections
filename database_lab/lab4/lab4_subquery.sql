USE HR;

-- 1. Write a query to find the name (first_name, last_name) and the salary 
-- of the employees who have a higher salary than the employee whose last_name="Bull"
SELECT CONCAT(first_name, ' ', last_name) AS name, salary
FROM employees
WHERE salary > (
    SELECT salary 
    FROM employees 
    WHERE last_name = 'Bull'
);

-- 2. Write a query to find the name (first_name, last_name) of all employees 
-- who work in the IT department ("IT" is the name of the department)
SELECT CONCAT(first_name, ' ', last_name) AS name
FROM employees
WHERE department_id = (
    SELECT department_id 
    FROM departments 
    WHERE department_name = 'IT'
);

-- 3. Write a query to find the name (first_name, last_name) of the employees 
-- who have a manager and worked in a USA based department (country_name is 
-- "United States of America" and country_id is "US")
SELECT CONCAT(first_name, ' ', last_name) AS name
FROM employees
WHERE manager_id > 0
AND department_id IN (
    SELECT d.department_id
    FROM departments d
    JOIN locations l ON d.location_id = l.location_id
    WHERE l.country_id = 'US'
);

-- 4. Write a query to find the name (first_name, last_name) 
-- of the employees who are managers
SELECT CONCAT(first_name, ' ', last_name) AS name
FROM employees
WHERE employee_id IN (
    SELECT DISTINCT manager_id 
    FROM employees 
    WHERE manager_id > 0
);

-- 5. Write a query to find the name (first_name, last_name), and salary
-- of the employees whose salary is greater than the average salary of all employees
SELECT CONCAT(first_name, ' ', last_name) AS name, salary
FROM employees
WHERE salary > (
    SELECT AVG(salary) 
    FROM employees
);

-- 6. Write a query to find the name (first_name, last_name), and salary
-- of the employees who earn more than the average salary and works
-- in any of the IT departments (they have name starting with "IT")
SELECT CONCAT(first_name, ' ', last_name) AS name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees)
AND department_id IN (
    SELECT department_id 
    FROM departments 
    WHERE department_name LIKE 'IT%'
);

-- 7. Write a query to find the name (first_name, last_name), and salary 
-- of the employees who earn more than the earning of Mr.Bell (Bell is his last name)
SELECT CONCAT(first_name, ' ', last_name) AS name, salary
FROM employees
WHERE salary > (
    SELECT salary 
    FROM employees 
    WHERE last_name = 'Bell'
);

-- 8. Write a query to find the name (first_name, last_name), and salary
-- of the employees who earn the same salary as the minimum salary of the corresponding 
-- departments they're working at
SELECT CONCAT(first_name, ' ', last_name) AS name, salary
FROM employees e
WHERE salary = (
    SELECT MIN(salary) 
    FROM employees 
    WHERE department_id = e.department_id
);

-- 9. Write a query to find the name (first_name, last_name) and salary  
-- of the employees who earn a salary that is higher than the salary 
-- of all the Shipping Clerk (JOB_ID = "SH_CLERK")
-- Sort the results of the salary of the lowest to highest
SELECT CONCAT(first_name, ' ', last_name) AS name, salary
FROM employees
WHERE salary > ALL (
    SELECT salary 
    FROM employees 
    WHERE job_id = 'SH_CLERK'
)
ORDER BY salary ASC;

-- 10. Write a query to find the name (first_name, last_name) 
-- of the employees who are not supervisors/managers
SELECT CONCAT(first_name, ' ', last_name) AS name
FROM employees
WHERE employee_id NOT IN (
    SELECT DISTINCT manager_id 
    FROM employees 
    WHERE manager_id > 0
);

-- 11. Write a query to display the employee ID, first name, last name, salary 
-- of all employees whose salary is above average of their corresponding departments
SELECT employee_id, first_name, last_name, salary
FROM employees e
WHERE salary > (
    SELECT AVG(salary) 
    FROM employees 
    WHERE department_id = e.department_id
);

-- 12. Write a query to fetch even numbered records from employees table
SELECT *
FROM (
    SELECT e.*, ROW_NUMBER() OVER (ORDER BY employee_id) AS row_num
    FROM employees e
) tmp
WHERE tmp.row_num % 2 = 0;

-- 13. Write a query to find the 5th maximum salary in the employees table
SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 4;

-- 14. Write a query to find the 4th minimum salary in the employees table
SELECT DISTINCT salary
FROM employees
ORDER BY salary ASC
LIMIT 1 OFFSET 3;

-- 15. Write a query to select every record 
-- except the last 10 records from employees table
SELECT *
FROM (
    SELECT e.*, ROW_NUMBER() OVER (ORDER BY employee_id) AS row_num
    FROM employees e
) tmp
WHERE tmp.row_num <= (
    SELECT COUNT(*) - 10 
    FROM employees
);

-- 16. Write a query to list the department ID and name
-- of all the departments where no employee is working
SELECT department_id, department_name
FROM departments
WHERE department_id NOT IN (
    SELECT DISTINCT department_id 
    FROM employees 
    WHERE department_id IS NOT NULL
);

-- 17. Write a query to get 3 maximum salaries
SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
LIMIT 3;

-- 18. Write a query to get 3 minimum salaries
SELECT DISTINCT salary
FROM employees
ORDER BY salary ASC
LIMIT 3;

-- 19. Write a query to get nth max salaries of employees
SELECT DISTINCT salary
FROM (
    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
    FROM employees
) tmp
-- Suppose n = 3
WHERE tmp.rnk = 3;
