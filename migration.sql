DROP TABLE IF EXISTS pets;


CREATE TABLE pets (
  pets_id serial PRIMARY KEY,
  age int, 
  kind varchar(50),
  name varchar(50)
);

