-- Up Migration
CREATE TABLE todos (
  id    SERIAL PRIMARY KEY,
  title TEXT    NOT NULL,
  done  BOOLEAN NOT NULL DEFAULT false
);

INSERT INTO todos (title, done) VALUES
  ('Learn Node.js', false),
  ('Build REST API', false);

-- Down Migration
-- Not implemented
