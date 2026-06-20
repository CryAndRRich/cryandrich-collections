-- Database Lab 1 - Task I
-- 1.
CREATE TABLE countries (
    country_id VARCHAR(2) PRIMARY KEY,
    country_name VARCHAR(40),
    region_id INT
);

-- 2.
CREATE TABLE jobs (
    job_id VARCHAR(10) PRIMARY KEY,
    job_title VARCHAR(35),
    min_salary INT,
    max_salary INT,
    CHECK (max_salary <= 25000)
);

-- 3.
CREATE TABLE countries (
    country_id VARCHAR(2) PRIMARY KEY,
    country_name VARCHAR(40),
    region_id INT,
    CHECK (country_name IN ('Italy', 'India', 'China'))
);

-- 4.
CREATE TABLE countries (
    country_id VARCHAR(2) UNIQUE,
    country_name VARCHAR(40),
    region_id INT
);

-- 5.
CREATE TABLE jobs (
    job_id VARCHAR(10) PRIMARY KEY,
    job_title VARCHAR(35) DEFAULT '',
    min_salary INT DEFAULT 8000,
    max_salary INT DEFAULT NULL
);

-- 6.
CREATE TABLE countries (
    country_id VARCHAR(2) UNIQUE KEY,
    country_name VARCHAR(40),
    region_id INT
);

-- 7.
CREATE TABLE countries (
    country_id INT AUTO_INCREMENT PRIMARY KEY,
    country_name VARCHAR(40),
    region_id INT
);

-- 8.
CREATE TABLE job_history (
    employee_id INT UNIQUE,
    start_date DATE,
    end_date DATE,
    job_id VARCHAR(10),
    department_id INT,
    FOREIGN KEY (job_id) REFERENCES jobs(job_id)
);

-- 9.
CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    first_name VARCHAR(20),
    last_name VARCHAR(25),
    email VARCHAR(25),
    phone_number VARCHAR(20),
    hire_date DATE,
    job_id VARCHAR(10),
    salary INT,
    commission DECIMAL(18, 3),
    manager_id DECIMAL(6, 0),
    department_id DECIMAL(4, 0),
    FOREIGN KEY (department_id, manager_id) REFERENCES departments(department_id, manager_id)
);

-- 10.
CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    first_name VARCHAR(20),
    last_name VARCHAR(25),
    email VARCHAR(25),
    phone_number VARCHAR(20),
    hire_date DATE,
    job_id VARCHAR(10),
    salary INT,
    commission DECIMAL(18, 3),
    manager_id DECIMAL(6, 0),
    department_id DECIMAL(4, 0),
    FOREIGN KEY (department_id) REFERENCES departments(department_id),
    FOREIGN KEY (job_id) REFERENCES jobs(job_id)
);

-- 11.
CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    first_name VARCHAR(20),
    last_name VARCHAR(25),
    job_id INT,
    salary INT,
    FOREIGN KEY (job_id) REFERENCES jobs(job_id) ON UPDATE CASCADE ON DELETE RESTRICT
);

-- 12.
CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    first_name VARCHAR(20),
    last_name VARCHAR(25),
    job_id INT,
    salary INT,
    FOREIGN KEY (job_id) REFERENCES jobs(job_id) ON DELETE CASCADE ON UPDATE RESTRICT
);

-- 13.
CREATE TABLE employees (
    employee_id INT UNIQUE,
    first_name VARCHAR(20),
    last_name VARCHAR(25),
    job_id INT,
    salary INT,
    FOREIGN KEY (job_id) REFERENCES jobs(job_id) ON DELETE SET NULL ON UPDATE SET NULL
);