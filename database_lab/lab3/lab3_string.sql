USE HR;

-- 1. Write a query to get every phone number in the employees table, 
-- within the phone number the substring "124" will be replaced by "999"
SELECT REPLACE(phone_number, '124', '999') AS phone_number
FROM employees;

-- 2. Write a query to append "@example.com" to the email field
SELECT CONCAT(email, '@example.com') AS email
FROM employees;

-- 3. Write a query to get the employee id, name (first name + last name) and hire month
SELECT employee_id, CONCAT(first_name, ' ', last_name) AS name, MONTH(hire_date) AS hire_month
FROM employees;

-- 4. Write a query to get the employee id, email id (discard the last three characters)
SELECT employee_id, LEFT(email, LENGTH(email) - 3) AS email
FROM employees;

-- 5. Write a query to find all employees where first names are in the upper case
SELECT *
FROM employees
WHERE BINARY first_name = UPPER(first_name);

-- 6. Write a query to extract the last 4 characters of phone numbers
SELECT RIGHT(phone_number, 4) AS last_4_phone_number
FROM employees;

-- 7. Write a query to get the last word of the street addres
SELECT RIGHT(street_address, LOCATE(' ', REVERSE(street_address)) - 1) AS last_word
FROM locations
WHERE LOCATE(' ', street_address) > 0;

-- 8. Write a query to get the locations that have minimum street address length
SELECT *
FROM locations
WHERE LENGTH(street_address) = (
   SELECT MIN(LENGTH(street_address)) 
   FROM locations
);

-- 9. Write a query to display the first word from those job titles  
-- which contain more than one word
SELECT LEFT(job_title, LOCATE(' ', job_title) - 1) AS first_word
FROM jobs
WHERE LOCATE(' ', job_title) > 0;

-- 10. Write a query to display the length of first name for employees 
-- where the last name contains character "c" after 2nd position
SELECT LENGTH(first_name) AS first_name_length
FROM employees
WHERE LOCATE('c', BINARY last_name, 3) > 0;

-- 11. Write a query that displays the first name and the length of the first name 
-- for all employees whose name starts with the letters "A", "J" or "M"
-- Sort the results by the employees' first names
SELECT first_name, LENGTH(first_name) AS name_length
FROM employees
WHERE first_name LIKE 'A%'
OR first_name LIKE 'J%'
OR first_name LIKE 'M%'
ORDER BY first_name;

-- 12. Write a query to display the first name and salary for all employees
-- Format the salary to be 10 characters long, left-padded with the $ symbol
-- Label the column SALARY
SELECT first_name, LPAD(salary, 10, '$') AS SALARY
FROM employees;

-- 13. Write a query to display the first eight characters of the employees' first names 
-- and indicate the amounts of their salaries with "$" sign. Each "$" sign signifies 
-- a thousand dollars. Sort the data in descending order of salary
SELECT LEFT(first_name, 8) AS first_name, REPEAT('$', salary DIV 1000) AS salary_indicator
FROM employees
ORDER BY salary DESC;
