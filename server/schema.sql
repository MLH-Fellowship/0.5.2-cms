DROP TABLE IF EXISTS person;
DROP TABLE IF EXISTS contact;


CREATE TABLE person (
    id INTEGER PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name  TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    pw TEXT NOT NULL
    
);


CREATE TABLE contact (
    id INTEGER PRIMARY KEY,
    contact_name TEXT NOT NULL,
    date_met DATE NOT NULL,
    where_met TEXT NOT NULL,
    email TEXT NOT NULL,
    notes TEXT NOT NULL

)