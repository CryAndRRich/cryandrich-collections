USE HR;

-- 1. Write a query to find the addresses (location_id, street_address, 
-- city, state_province, country_name) of all the departments
SELECT l.location_id, l.street_address, l.city, l.state_province, c.country_name
FROM departments d
JOIN locations l ON d.location_id = l.location_id
JOIN countries c ON l.country_id = c.country_id;

-- 2. Write a query to find the name (first_name, last_name),  
-- department ID and department name of all the employees
SELECT CONCAT(e.first_name, ' ', e.last_name) AS "Full Name", e.department_id, d.department_name
FROM employees e
JOIN departments d ON e.department_id = d.department_id;

-- 3. Write a query to find the name (first_name, last_name), job_title,  
-- department ID and department name of the employees who work in London
SELECT CONCAT(e.first_name, ' ', e.last_name) AS "Full Name", j.job_title, e.department_id, d.department_name
FROM employees e
JOIN departments d ON e.department_id = d.department_id
JOIN locations l ON d.location_id = l.location_id
JOIN jobs j ON e.job_id = j.job_id
WHERE l.city = 'London';

-- 4. Write a query to find the employee ID, name (last_name) 
-- along with their manager (manager_id, last_name)
SELECT e.employee_id, e.last_name AS employee_last_name, m.employee_id AS manager_id, m.last_name AS manager_last_name
FROM employees e
JOIN employees m ON e.manager_id = m.employee_id;

-- 5. Write a query to find the name (first_name, last_name) and  
-- hire date of the employees who were hired after 'Jones'
SELECT CONCAT(e.first_name, ' ', e.last_name) AS "Full Name", e.hire_date
FROM employees e
JOIN employees j ON j.last_name = 'Jones'
WHERE e.hire_date > j.hire_date;

-- 6. Write a query to find the employee ID, job title, number of days 
-- between ending date and starting date for all jobs in the department having ID 90
SELECT jh.employee_id, j.job_title, DATEDIFF(jh.end_date, jh.start_date) AS days_worked
FROM job_history jh
JOIN jobs j ON jh.job_id = j.job_id
WHERE jh.department_id = 90;

-- 7. Write a query to display the department name, manager name, and city
SELECT d.department_name, CONCAT(e.first_name, ' ', e.last_name) AS manager_name, l.city
FROM departments d
JOIN employees e ON d.manager_id = e.employee_id
JOIN locations l ON d.location_id = l.location_id;

-- 8. Write a query to display job title, employee (ID, name), and 
-- the difference between the salary of the employee and minimum salary for the job
SELECT j.job_title, e.employee_id, e.first_name, e.last_name, e.salary - j.min_salary AS salary_diff
FROM employees e
JOIN jobs j ON e.job_id = j.job_id;

-- 9. Write a query to display the job history that was done 
-- by any employee who is currently drawing more than 10000 of salary
SELECT jh.*
FROM job_history jh
JOIN employees e ON jh.employee_id = e.employee_id
WHERE e.salary > 10000;