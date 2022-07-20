INSERT INTO person (first_name, last_name, card_number, user_password, is_employed)

VALUES ('Aphason','Aberham', 123456789, '1234', false),
('Ben','Simmons', 444111222, '1234', false);

INSERT INTO expenses(expense_name, price, image_src)

VALUES ('medical bills', 800, 'medical.jpg'),
('rent', 500, 'house.jpg'),
('electricity', 200, 'lightbulb.jpg'),
('tuition', 3000, 'textbooks.jpeg');

INSERT INTO account (chequing, savings, money_on_hand, user_id)

VALUES (100, 200, 150, 1),
(50, 400, 50, 2);


INSERT INTO job (job_name, job_description, salary, shift)

VALUES ('Flower Caretaker', 'Sell a variety of different flowers to customers, nurish and take care of the flowers on a regular basis', 14.75, 6),
('Burger Factory Cashier', 'Take customer orders, no cashier experience required', 15.00, 8),
('Daycamp Counsellor', 'Work in a day camp, supervise and have fun with campers', 16.25, 7);


INSERT INTO job_application(question_1, question_2, question_3, hired, job_id, user_id)

VALUES ('a','b','c',false, 1, 1),
('a','b','c',true, 2, 1),
('a','b','c',false, 3, 1),


('a','b','c', true, 1, 2),
('a','b','c', true, 2, 2),
('a','b','c', true, 3, 2);


