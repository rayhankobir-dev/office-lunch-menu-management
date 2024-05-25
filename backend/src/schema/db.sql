CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL NOT NULL CHECK (role IN ('admin', 'employee')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE menus (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    unit VARCHAR(50) NOT NULL
);

CREATE TABLE options (
    id SERIAL PRIMARY KEY,
    menu_id INT NOT NULL,
    date DATE NOT NULL,
    max_limit INT NOT NULL,
    FOREIGN KEY (menu_id) REFERENCES menus(id)
)

CREATE TABLE choices (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    option_id INT NOT NULL,
    current_count INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (option_id) REFERENCES options(id)
);
