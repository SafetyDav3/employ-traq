USE employ_db;

INSERT INTO departments (name)
VALUES 
('IT'),
('Cleaning'),
('Office');

INSERT INTO roles (title, salary, department_id)
VALUES 
('Boss', 500000, 3),
('Janitor', 4900000, 2),
('IT Guy', 35000, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
('Gary', 'Fischer', 1, 8),
('Steve', 'Insane', 2, 8),
('Hank', 'SoHo', 3, 8),
('Devyn', 'Odom', 3, 8),
('Karen', 'Bolton', 1, 8),
('Morgan', 'Meyers', 3, 8),
('Sage', 'Frazier', 2, 8),
('Ignacio', 'Travis', 3, 8),
('Alia', 'Kim', 3, 8);