INSERT INTO department (name)
VALUES ('Sales'), ('Engineering'),('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES 
('Sales Lead', 210000, 1), 
('Sales Person', 75000, 1), 
('Senior Engineer', 275000, 2), 
('Software Engineer', 150000,2), 
('Legal Lead', 95000, 3), 
('Lawyer', 70000, 3 );

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ('John', 'Doe', 1, null), 
('Mike','Chan', 2, null), 
('Ashley', 'Rodriguez', 1, 1), 
('Kevin', 'Tupik', 2, 1), 
('Malia','Brown', 2, null), 
('Sarah', 'Lourd', 3,3);

-- SELECT * FROM department;
-- SELECT * FROM roles;
-- SELECT * FROM employee INNER JOIN roles ON roles.id = employee.roles_id;