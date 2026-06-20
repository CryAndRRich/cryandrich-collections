USE HR;

-- 1. Write a query to get the first name and hire date from the employees table 
-- where hire date is between "1987-06-01" and "1987-07-30"
SELECT first_name, hire_date
FROM employees
WHERE hire_date BETWEEN '1987-06-01' AND '1987-07-30';

-- 2. Write a query to get the first name, last name who joined in the month of June
SELECT first_name, last_name
FROM employees
WHERE MONTH(hire_date) = 6;

-- 3. Write a query to get the first name of employees who joined in 1987
SELECT first_name
FROM employees
WHERE YEAR(hire_date) = 1987;

-- 4. Write a query to get department name, manager name, and salary 
-- of the manager for all managers whose experience is more than 5 years
SELECT d.department_name, CONCAT(e.first_name, ' ', e.last_name) AS manager_name, e.salary
FROM departments d
JOIN employees e ON d.manager_id = e.employee_id
WHERE TIMESTAMPDIFF(YEAR, e.hire_date, CURDATE()) > 5;

-- 5. Write a query to get an employee's ID, last name, and date of first salary 
-- of the employees (assuming employees receive salary on the first day of the next month)
SELECT employee_id, last_name, DATE_ADD(LAST_DAY(hire_date), INTERVAL 1 DAY) AS first_salary_date
FROM employees;

-- 6. Write a query to get first name, hire date and years  
-- of experience of the employees
SELECT first_name, hire_date, TIMESTAMPDIFF(YEAR, hire_date, CURDATE()) AS year_experience
FROM employees;

-- 7. Write a query to get the different department IDs, hire years,  
-- and number of employees who have joined corresponding department in corresponding year
SELECT department_id, YEAR(hire_date) AS hire_year, COUNT(*) AS num_employees
FROM employees
GROUP BY department_id, YEAR(hire_date)
ORDER BY department_id, hire_year;
