BEGIN TRANSACTION;

CREATE TABLE `games` (
  `id` integer not null primary key autoincrement,
  `title` text not null,
  `genre` text not null,
  `releaseYear` integer,
  `created_at` datetime not null default CURRENT_TIMESTAMP,
  `updated_at` datetime not null default CURRENT_TIMESTAMP
);

COMMIT TRANSACTION;
