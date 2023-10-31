CREATE TABLE `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` VARCHAR(20) NOT NULL,
  `user_password` VARCHAR(20) NOT NULL,
  `user_nickname` VARCHAR(20) NOT NULL,
  `profile_photo_link` VARCHAR(50) NOT NULL,
  `profile_status_message` VARCHAR(50) NOT NULL,
  `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
  `sign_up_date` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `channels` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `channel_name` VARCHAR(20) NOT NULL,
  `created_user` INT NOT NULL,
  `channel_link` VARCHAR(50) NOT NULL,
  `max_capacity` INT NOT NULL,
  `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
  `create_date` DATETIME NOT NULL,
  PRIMARY KEY (`id`)
  FOREIGN KEY (`created_user`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `chats` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` TEXT NOT NULL,
  `writer` INT NOT NULL,
  `channel` INT NOT NULL,
  `created_date` DATETIME NOT NULL,
  PRIMARY KEY (`id`)
  FOREIGN KEY (`writer`) REFERENCES `users`(`id`) ON DELETE CASCADE
  FOREIGN KEY (`channel`) REFERENCES `channels`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `follows` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `follower` INT NOT NULL,
  `followee` INT NOT NULL,
  `follow_date` DATETIME NOT NULL,
  PRIMARY KEY (`id`)
  FOREIGN KEY (`follower`) REFERENCES `users`(`id`) ON DELETE CASCADE
  FOREIGN KEY (`followee`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `blocks` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `blocker` INT NOT NULL,
  `blockee` INT NOT NULL,
  `block_date` DATETIME NOT NULL,
  PRIMARY KEY (`id`)
  FOREIGN KEY (`blocker`) REFERENCES `users`(`id`) ON DELETE CASCADE
  FOREIGN KEY (`blockee`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
