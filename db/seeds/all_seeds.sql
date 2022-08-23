INSERT INTO person (first_name, last_name, card_number, user_password, is_employed, job_count)

VALUES ('Aphason','Aberham', 123456789, '1234', false, 0),
('Ben','Simmons', 444111222, '1234', false, 0);

INSERT INTO expenses(expense_name, price, image_src)

VALUES ('Medical Bills', 500, 'medical.jpg'),
('Rent', 100, 'house.jpg'),
('Electricity', 200, 'lightbulb.jpg'),
('Tuition', 100, 'textbooks.jpeg');

INSERT INTO account (chequing, savings, money_on_hand, user_id)

VALUES (100, 200, 150, 1),
(50, 400, 50, 2);


INSERT INTO job (job_name, job_description, salary, shift)

VALUES ('Flower Caretaker', 'Sell a variety of different flowers to customers, nurish and take care of the flowers on a regular basis', 14.75, 6),
('Burger Factory Cashier', 'Take customer orders, no cashier experience required', 15.00, 8),
('Daycamp Counsellor', 'Work in a day camp, supervise and have fun with campers', 16.25, 7);


INSERT INTO job_application(question_1, question_2, question_3, hired, job_id, user_id)

VALUES ('Do you have any experience working in a flower shop ?','How available are you to work ?','How dedicated would you be to learn our system of work ?', false, 1, 1),
('Do you have any experience working in a fast food establishment ?','How available are you to work ?','How dedicated would you be to learn our system of work ?', false, 2, 1),
('Do you have any experience working in a day camp ?','How available are you to work ?','How dedicated would you be to learn our system of work ?', false, 3, 1),


('Do you have any experience working in a flower shop ?', 'How available are you to work ?','How dedicated would you be to learn our system of work ?', false, 1, 2),
('Do you have any experience working in a fast food establishment ?','How available are you to work ?','How dedicated would you be to learn our system of work ?', false, 2, 2),
('Do you have any experience working in a day camp ?','How available are you to work ?','How dedicated would you be to learn our system of work ?', false, 3, 2);



