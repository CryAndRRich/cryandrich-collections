/*
-- Tạo fake data để chạy được file
INSERT IGNORE INTO regions (region_id, region_name) VALUES 
    (1, 'Europe'), (2, 'Americas'), (3, 'Asia'), (4, 'Middle East and Africa');
INSERT IGNORE INTO countries (country_id, country_name, region_id) VALUES ('VN', 'Vietnam', 3);
INSERT IGNORE INTO locations (location_id, street_address, country_id) VALUES (1, 'Hanoi', 'VN');

INSERT IGNORE INTO jobs (job_id, job_title, min_salary, max_salary) 
VALUES ('MGR', 'Manager', 10000, 20000);

INSERT IGNORE INTO departments (department_id, department_name, manager_id, location_id) 
VALUES (116, 'AI Research', NULL, 1);

INSERT IGNORE INTO employees (employee_id, first_name, last_name, email, hire_date, job_id, department_id) 
VALUES (149, 'Nam', 'Hai', 'trannamhai@gmail.com', '2020-01-01', 'MGR', 116);

UPDATE departments SET manager_id = 149 WHERE department_id = 116;
*/

-- Database Lab 1 - Task II
-- 1.
INSERT INTO countries (country_id, country_name, region_id) 
VALUES ('KR', 'South Korea', 3);

-- 2.
INSERT INTO countries (country_id, country_name) 
VALUES ('CN', 'China');

-- 3.
CREATE TABLE country_new AS 
SELECT * FROM countries;

-- 4.
INSERT INTO countries (country_id, country_name, region_id) 
VALUES ('FR', 'France', NULL);

-- 5.
INSERT INTO countries (country_id, country_name, region_id) 
VALUES ('US', 'USA', 2), ('JP', 'Japan', 3), ('AU', 'Australia', 2);

-- 6.
INSERT INTO countries (country_id, country_name, region_id) 
SELECT country_id, country_name, region_id 
FROM country_new;

-- 7.
INSERT INTO jobs (job_id, job_title, min_salary, max_salary)
SELECT * FROM (SELECT 'DSAI', 'Engineer', 10000000, 100000000) AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM jobs WHERE job_id = 'DSAI'
);

-- 10.
INSERT INTO countries (country_name, region_id) 
VALUES ('South Korea', 3);

-- 11.
INSERT INTO countries (region_id) 
VALUES (3);

-- 12.
INSERT INTO job_history (employee_id, start_date, end_date, job_id, department_id) 
SELECT 611, '2026-04-01', '2026-04-26', job_id, 116
FROM jobs
WHERE job_id = 'DSAI';

-- 13.
INSERT INTO employees (employee_id, first_name, last_name, email, hire_date, job_id, salary, manager_id, department_id) 
SELECT 611, 'Hai', 'Tran', 'hai.tn2400103@gmail.com', '2026-04-01', 'DSAI', 2000000, manager_id, department_id
FROM departments
WHERE department_id = 116 AND manager_id = 149;

-- 14.
INSERT INTO employees (employee_id, first_name, last_name, email, hire_date, job_id, salary, manager_id, department_id) 
SELECT 6110, 'Hai2', 'Tran', '2hai.tn2400103@gmail.com', '2026-04-01', j.job_id, 2000000, 149, d.department_id
FROM departments d, jobs j
WHERE d.department_id = 116 AND j.job_id = 'DSAI';