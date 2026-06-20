-- Database Lab 1 - Task III
-- 1.
UPDATE employees 
SET email = 'not available';

-- 2.
UPDATE employees 
SET email = 'not available', commission_pct = 0.10;

-- 3.
UPDATE employees 
SET email = 'not available', commission_pct = 0.10 
WHERE department_id = 110;

-- 4.
UPDATE employees 
SET email = 'not available' 
WHERE department_id = 80 AND commission_pct < 0.20;

-- 5.
UPDATE employees 
SET email = 'not available' 
WHERE department_id IN (
    SELECT department_id 
    FROM departments 
    WHERE department_name = 'Accounting'
);

-- 6.
UPDATE employees 
SET salary = 8000 
WHERE employee_id = 105 AND salary < 5000;

-- 7.
UPDATE employees 
SET job_id = 'SH_CLERK' 
WHERE employee_id = 118 
AND department_id = 30 
AND job_id NOT LIKE 'SH%';

-- 8.
UPDATE employees e
JOIN (
    SELECT 40 AS dept_id, 1.25 AS rate 
    UNION ALL
    SELECT 90 AS dept_id, 1.15 AS rate 
    UNION ALL
    SELECT 110 AS dept_id, 1.10 AS rate
) AS rules ON e.department_id = rules.dept_id
SET e.salary = e.salary * rules.rate;

-- 9.
UPDATE jobs j
JOIN employees e on j.job_id = e.job_id
SET j.min_salary = j.min_salary + 2000, j.max_salary = j.max_salary + 2000,
    e.salary = e.salary * 1.2, e.commission_pct = e.commission_pct + 0.10
WHERE j.job_id = 'PU_CLERK';