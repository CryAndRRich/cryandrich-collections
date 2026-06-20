USE HR;

-- 1. Write a query to display the names (first_name, last_name) 
-- using alias name “First Name", "Last Name" from the employees
SELECT first_name AS "First Name", last_name AS "Last Name"
FROM employees;

-- 2. Write a query to get unique department ID from employee table
SELECT DISTINCT department_id
FROM employees;

-- 3. Write a query to get all employee details (from employee table)
-- who are hired in 2022
SELECT *
FROM employees
WHERE YEAR(hire_date) = 2022;

-- 4. Write a query to get the names (first_name, last_name), salary, 
-- PF of the employees (PF is calculated as 15% of salary)
SELECT CONCAT(first_name, ' ', last_name) AS "Full Name", salary, salary * 0.15 AS PF
FROM employees;

-- 5. Write a query to get the names (first_name, last_name), salary, 
-- PF of the employees if PF is greater than 10000
SELECT CONCAT(first_name, ' ', last_name) AS "Full Name", salary, salary * 0.15 AS PF
FROM employees
WHERE salary * 0.15 > 10000;

-- 6. Write a query to get the list of employees and full information of their department
SELECT e.*, d.*
FROM employees e
JOIN departments d ON e.department_id = d.department_id;

-- 7. Write a query to calculate 171 * 214 + 625
SELECT 171 * 214 + 625 AS result;

-- 8. Write a query to get the names (for example Ellen Abel, Sundar Ande etc.) 
-- of all the employees from employees table.
SELECT CONCAT(first_name, ' ', last_name) AS "Full Name"
FROM employees;

-- 9. Write a query to get first name from employees table 
-- after removing white spaces from both side
SELECT TRIM(first_name) AS first_name
FROM employees;

-- 10. Select first 10 records from employees table
SELECT * 
FROM employees 
LIMIT 10;

-- 11. Write a query to get monthly salary (round 2 decimal places) of each employee
-- 12. Note : Assume the salary field provides the 'annual salary' information
SELECT first_name, last_name, ROUND(salary / 12.0, 2) AS monthly_salary
FROM employees;

-- 13. Write a query to get monthly salary (round 2 decimal places) 
-- of each employee if monthly salary is smaller than 5000 
SELECT first_name, last_name, ROUND(salary / 12.0, 2) AS monthly_salary
FROM employees
WHERE ROUND(salary / 12.0, 2) < 5000;