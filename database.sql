CREATE TABLE "koala" (
   "id" serial PRIMARY KEY,
   "name" varchar(30) not null,
   "age" integer not null,
   "gender" varchar(1) not null,
   "transfer" varchar(5) not null,
   "notes" varchar(255) not null
);

INSERT INTO "koala" ("name", "age", "gender", "transfer", "notes")
VALUES ('Scotty', '4', 'M', 'false', 'He is really great');
