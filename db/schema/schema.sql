DROP TABLE IF EXISTS person CASCADE;
DROP TABLE IF EXISTS expenses CASCADE;
DROP TABLE IF EXISTS account CASCADE;
DROP TABLE IF EXISTS job_application CASCADE;
DROP TABLE IF EXISTS job CASCADE;

CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    card_number INTEGER NOT NULL,
    user_password VARCHAR(50) NOT NULL,
    is_employed BOOLEAN NOT NULL,
    job_count INTEGER NOT NULL
);

CREATE TABLE expenses (
    id SERIAL PRIMARY KEY,
    expense_name VARCHAR(100) NOT NULL,
    price INTEGER NOT NULL,
    image_src VARCHAR(100) NOT NULL
);

CREATE TABLE account (
    id SERIAL PRIMARY KEY,
    chequing INTEGER NOT NULL,
    savings INTEGER NOT NULL,
    money_on_hand INTEGER NOT NULL,
    user_id INTEGER REFERENCES person(id) ON DELETE CASCADE
);

CREATE TABLE job (
    id SERIAL PRIMARY KEY,
    job_name VARCHAR(100) NOT NULL,
    job_description VARCHAR(500) NOT NULL,
    salary REAL NOT NULL,
    shift INTEGER NOT NULL
);

CREATE TABLE job_application (
    id SERIAL PRIMARY KEY,
    question_1 VARCHAR(100) NOT NULL,
    question_2 VARCHAR(100) NOT NULL,
    question_3 VARCHAR(100) NOT NULL,
    hired BOOLEAN NOT NULL,
    job_id INTEGER REFERENCES job(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES person(id) ON DELETE CASCADE
);

