DROP TABLE IF EXISTS fare_rules;
DROP TABLE IF EXISTS zones;


CREATE TABLE zones (
    id SERIAL PRIMARY KEY,
    zone_description TEXT
);

CREATE TABLE fare_rules (
    id SERIAL PRIMARY KEY,
    from_zone_id INTEGER NOT NULL REFERENCES zones(id),
    to_zone_id INTEGER NOT NULL REFERENCES zones(id),
    fare INTEGER NOT NULL,
    CONSTRAINT from_to_zone_uc UNIQUE (from_zone_id, to_zone_id)
);


INSERT INTO zones (id, zone_description) VALUES
    (1, 'Zone 1'),
    (2, 'Zone 2'),
    (3, 'Zone 3');


INSERT INTO fare_rules (from_zone_id, to_zone_id, fare) VALUES
    (1, 1, 40),
    (1, 2, 55),
    (1, 3, 65),
    (2, 2, 35),
    (2, 3, 45),
    (3, 3, 30);

