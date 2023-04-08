create extension if not exists "uuid-ossp";

CREATE TYPE statuses AS ENUM ('OPEN', 'ORDERED');

create table carts (
	id uuid not null default uuid_generate_v4() primary key,
	user_id uuid not null,
	created_at date not null,
	updated_at date not null,
	status statuses
);

CREATE TABLE cart_items (
  cart_id uuid references carts(id),
  product_id uuid not null,
  count INT not null
);

CREATE TABLE users (
  id uuid not null default uuid_generate_v4() primary key,
  name text not null,
  email text,
  password text not null
);

CREATE TABLE orders (
  id uuid not null default uuid_generate_v4() primary key,
  user_id uuid references users(id),
  cart_id uuid references carts(id),
  payment json,
  delivery json,
  comments text,
  status statuses,
  total INT
);


-- Fill tables
INSERT INTO carts (user_id, created_at, updated_at, status) 
  VALUES ('23e551c7-2e8a-402d-840b-30a6baccd2cb', '2023-04-08', '2023-04-08', 'OPEN');

INSERT INTO cart_items (cart_id, product_id, count) 
  VALUES ('c8867c20-c2de-4766-a18a-a06bc347465b', 'c8867c2a-c2de-4766-a18a-a06bc347465f', 1);
