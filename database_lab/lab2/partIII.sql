USE HR;

-- 1. Write a query to get the number of jobs available in the employees table
SELECT COUNT(DISTINCT job_id) AS number_jobs_avail
FROM employees;

-- 2. Write a query to get the total salaries payable to employees in each department
SELECT department_id, SUM(salary) AS total_salary
FROM employees
GROUP BY department_id;

-- 3. Write a query to get the minimum salary for each job 
SELECT job_id, MIN(salary) AS min_salary
FROM employees
GROUP BY job_id;

-- 4. Write a query to get the maximum salary of 
-- an employee working as a Programmer (job title)
SELECT MAX(e.salary) AS max_salary
FROM employees e
JOIN jobs j ON e.job_id = j.job_id
WHERE j.job_title = 'Programmer';

-- 5. Write a query to get the average salary and number of employees  
-- working the department 90 (department id)
SELECT AVG(salary) AS avg_salary, COUNT(*) AS num_employees
FROM employees
WHERE department_id = 90;

-- 6. Write a query to get the highest, lowest, sum, and average salary of all employees
SELECT MAX(salary) AS highest_salary, MIN(salary) AS lowest_salary,
       SUM(salary) AS total_salary, AVG(salary) AS avg_salary
FROM employees;

-- 7. Write a query to get the difference between the highest and lowest salaries
SELECT MAX(salary) - MIN(salary) AS high_low_salary_diff
FROM employees;

-- 8. Write a query to find the manager ID and the salary of 
-- the lowest-paid employee for that manager
SELECT manager_id, MIN(salary) AS lowest_employee_salary
FROM employees
GROUP BY manager_id;

-- 9. Write a query to get the average salary for each job ID excluding programmer
SELECT e.job_id, AVG(e.salary) AS avg_salary
FROM employees e
JOIN jobs j ON e.job_id = j.job_id
WHERE j.job_title != 'Programmer'
GROUP BY e.job_id;

-- 10. Write a query to get the job ID and maximum salary of  
-- the employees where maximum salary is greater than or equal to $4000
SELECT job_id, MAX(salary) AS max_salary
FROM employees
GROUP BY job_id
HAVING MAX(salary) >= 4000;

-- 11. Write a query to get the average salary for 
-- all departments employing more than 10 employees
SELECT department_id, AVG(salary) AS avg_salary
FROM employees
GROUP BY department_id
HAVING COUNT(*) > 10;