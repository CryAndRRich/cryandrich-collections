USE HR;

-- Table for trigger 2
CREATE TABLE IF NOT EXISTS location_change (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    location_id INT,
    old_city VARCHAR(30),
    new_city VARCHAR(30),
    changed_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table for trigger 5
CREATE TABLE IF NOT EXISTS dept_emp_count (
    department_id INT PRIMARY KEY,
    total_employees INT DEFAULT 0
);


-- 1. Create a trigger ensure that only countries whose names have a length 
-- greater than 5 characters can be inserted into the countries table
DROP TRIGGER IF EXISTS trg_check_country_name_length;
DELIMITER //
CREATE TRIGGER trg_check_country_name_length
BEFORE INSERT ON countries
FOR EACH ROW
BEGIN
    IF LENGTH(NEW.country_name) <= 5 THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Country name must be longer than 5 characters';
    END IF;
END //
DELIMITER ;


-- 2. Create a trigger that logs any changes made to the locations table 
-- into a new table called location_change
DROP TRIGGER IF EXISTS trg_locations_after_update;
DELIMITER //
CREATE TRIGGER trg_locations_after_update
AFTER UPDATE ON locations
FOR EACH ROW
BEGIN
    INSERT INTO location_change (location_id, old_city, new_city)
    VALUES (OLD.location_id, OLD.city, NEW.city);
END //
DELIMITER ;


-- 3. Trigger to prevent inserting an employee with a salary 
-- below their job minimum salary
DROP TRIGGER IF EXISTS trg_check_employee_min_salary;
DELIMITER //
CREATE TRIGGER trg_check_employee_min_salary
BEFORE INSERT ON employees
FOR EACH ROW
BEGIN
    DECLARE v_min_salary INT;

    SELECT min_salary INTO v_min_salary
    FROM jobs
    WHERE job_id = NEW.job_id;

    IF NEW.salary < v_min_salary THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Salary is below the minimum salary for this job';
    END IF;
END //
DELIMITER ;


-- 4. Trigger to prevent deletion of employees 
-- who have records in job_history
DROP TRIGGER IF EXISTS trg_prevent_delete_employee_with_history;
DELIMITER //
CREATE TRIGGER trg_prevent_delete_employee_with_history
BEFORE DELETE ON employees
FOR EACH ROW
BEGIN
    IF EXISTS (SELECT 1 FROM job_history WHERE employee_id = OLD.employee_id) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Cannot delete an employee who has records in job_history';
    END IF;
END //
DELIMITER ;


-- 5. Create a trigger that after insert / delete employee, 
-- count the number of employee in each department
DROP TRIGGER IF EXISTS trg_dept_count_after_insert;
DROP TRIGGER IF EXISTS trg_dept_count_after_delete;
DELIMITER //

CREATE TRIGGER trg_dept_count_after_insert
AFTER INSERT ON employees
FOR EACH ROW
BEGIN
    IF NEW.department_id IS NOT NULL THEN
        INSERT INTO dept_emp_count (department_id, total_employees)
        VALUES (NEW.department_id, 1)
        ON DUPLICATE KEY UPDATE total_employees = total_employees + 1;
    END IF;
END //

CREATE TRIGGER trg_dept_count_after_delete
AFTER DELETE ON employees
FOR EACH ROW
BEGIN
    IF OLD.department_id IS NOT NULL THEN
        UPDATE dept_emp_count
        SET total_employees = total_employees - 1
        WHERE department_id = OLD.department_id;
    END IF;
END //

DELIMITER ;


-- 6. Write a trigger that, when a new job is added, checks whether 
-- there is already a job with the same name as the one being added

-- a. Just display a warning message but still allow the insert
DROP TRIGGER IF EXISTS trg_check_duplicate_job_title_warn;
DELIMITER //
CREATE TRIGGER trg_check_duplicate_job_title_warn
BEFORE INSERT ON jobs
FOR EACH ROW
BEGIN
    IF EXISTS (SELECT 1 FROM jobs WHERE job_title = NEW.job_title) THEN
        SIGNAL SQLSTATE '01000'
            SET MESSAGE_TEXT = 'Warning: A job with the same title already exists. Insert will proceed';
    END IF;
END //
DELIMITER ;

-- b. Display a warning message and do not allow the insert
DROP TRIGGER IF EXISTS trg_check_duplicate_job_title_block;
DELIMITER //
CREATE TRIGGER trg_check_duplicate_job_title_block
BEFORE INSERT ON jobs
FOR EACH ROW
BEGIN
    IF EXISTS (SELECT 1 FROM jobs WHERE job_title = NEW.job_title) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Error: A job with the same title already exists. Insert is not allowed.';
    END IF;
END //
DELIMITER ;