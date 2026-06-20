USE HR;

-- 1. Write a stored procedure to print "Hello World"
DROP PROCEDURE IF EXISTS HelloWorld;
DELIMITER //
CREATE PROCEDURE HelloWorld()
BEGIN
    SELECT 'Hello World' AS message;
END //
DELIMITER ;

CALL HelloWorld();


-- 2. Create a stored procedure that returns all employees first and last names
-- for whose yearly salary is above 5000
DROP PROCEDURE IF EXISTS GetEmployeesYearlySalaryAbove5000;
DELIMITER //
CREATE PROCEDURE GetEmployeesYearlySalaryAbove5000()
BEGIN
    SELECT first_name, last_name, salary * 12 AS yearly_salary
    FROM employees
    WHERE salary * 12 > 5000;
END //
DELIMITER ;

CALL GetEmployeesYearlySalaryAbove5000();


-- 3. Create a stored procedure that accepts a number as parameter 
-- and return all employees whose salary is above or equal to the given number
DROP PROCEDURE IF EXISTS GetEmployeesBySalary;
DELIMITER //
CREATE PROCEDURE GetEmployeesBySalary(IN min_sal INT)
BEGIN
    SELECT first_name, last_name, salary
    FROM employees
    WHERE salary >= min_sal;
END //
DELIMITER ;

-- Test: salary >= 10000
CALL GetEmployeesBySalary(10000);


-- 4. Write a stored procedure that accept string as parameter 
-- and returns all city names starting with that string.
DROP PROCEDURE IF EXISTS GetCitiesByPrefix;
DELIMITER //
CREATE PROCEDURE GetCitiesByPrefix(IN prefix VARCHAR(50))
BEGIN
    SELECT DISTINCT city
    FROM locations
    WHERE city LIKE CONCAT(prefix, '%');
END //
DELIMITER ;

-- Test: cities starting with 'S'
CALL GetCitiesByPrefix('S');


-- 5. Write a stored procedure that inserts a new employee and validates that the
-- job ID exists, and the salary is between the job min and max salary
DROP PROCEDURE IF EXISTS InsertEmployee;
DELIMITER //
CREATE PROCEDURE InsertEmployee(
    IN p_employee_id    INT,
    IN p_first_name     VARCHAR(20),
    IN p_last_name      VARCHAR(25),
    IN p_email          VARCHAR(25),
    IN p_phone_number   VARCHAR(20),
    IN p_hire_date      DATE,
    IN p_job_id         VARCHAR(10),
    IN p_salary         INT,
    IN p_commission_pct NUMERIC(18, 3),
    IN p_manager_id     INT,
    IN p_department_id  INT
)
BEGIN
    DECLARE v_min_salary INT;
    DECLARE v_max_salary INT;
    DECLARE v_job_count  INT;

    SELECT COUNT(*) INTO v_job_count
    FROM jobs
    WHERE job_id = p_job_id;

    IF v_job_count = 0 THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Error: Job ID does not exist';
    END IF;

    SELECT min_salary, max_salary
    INTO v_min_salary, v_max_salary
    FROM jobs
    WHERE job_id = p_job_id;

    IF p_salary < v_min_salary OR p_salary > v_max_salary THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Error: Salary is out of range for this job';
    END IF;

    INSERT INTO employees
        (employee_id, first_name, last_name, email, phone_number,
         hire_date, job_id, salary, commission_pct, manager_id, department_id)
    VALUES
        (p_employee_id, p_first_name, p_last_name, p_email, p_phone_number,
         p_hire_date, p_job_id, p_salary, p_commission_pct, p_manager_id, p_department_id);

    SELECT 'Employee inserted successfully' AS result;
END //
DELIMITER ;

-- Test: insert employee (IT_PROG min=4000, max=10000)
CALL InsertEmployee(300, 'John', 'Doe', 'JDOE', '555.000.0001',
                    '2024-01-01', 'IT_PROG', 6000, 0, 103, 60);


-- 6. Write a stored procedure to print from 1 to n if n > 0, 
-- otherwise it should print 'INVALID'
DROP PROCEDURE IF EXISTS PrintOneToN;
DELIMITER //
CREATE PROCEDURE PrintOneToN(IN n INT)
BEGIN
    DECLARE i      INT          DEFAULT 1;
    DECLARE result VARCHAR(10000) DEFAULT '';

    IF n <= 0 THEN
        SELECT 'INVALID' AS result;
    ELSE
        WHILE i <= n DO
            SET result = CONCAT(result, i, IF(i < n, ', ', ''));
            SET i = i + 1;
        END WHILE;
        SELECT result;
    END IF;
END //
DELIMITER ;

-- Test: print 1 to 10
CALL PrintOneToN(10);
