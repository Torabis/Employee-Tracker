CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) UNIQUE NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT UNIQUE NOT NULL AUTO_INCREMENT,
  title VARCHAR(45) NULL,
  salary DECIMAL(10,2) NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department(id)
);

 CREATE TABLE employee (
  id INT UNIQUE NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(45) NULL,
  last_name VARCHAR(45) NULL,
  roles_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY(roles_id) REFERENCES roles(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);
 