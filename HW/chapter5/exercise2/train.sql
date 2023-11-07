-- 5.2.1 --
SELECT `users`.`id`, `users`.`name`, `tickets`.`seat_number` FROM `tickets` 
INNER JOIN `users` ON `tickets`.`user` = `users`.`id` AND `tickets`.`train` = 11 
ORDER BY `tickets`.`seat_number` ASC;

-- 5.2.2 --
SELECT `tickets`.`user` AS `id`, `users`.`name` AS `name`, Count(*) AS `trains_count`, Sum(`trains`.`distance`) * .1 AS `total_distance` 
FROM `tickets` INNER JOIN `trains` ON `tickets`.`train` = `trains`.`id` INNER JOIN `users` ON `tickets`.`user` = `users`.`id` 
GROUP BY `id` ORDER BY `total_distance` DESC LIMIT 0, 6;

-- 5.2.3 --
SELECT `trains`.`id` AS `id`, `types`.`name` AS `type`, `s1`.`name` AS `src_stn`, `s2`.`name` AS `dst_stn`, 
Timediff(`trains`.`arrival`, `trains`.`departure`) AS `travel_time` FROM `trains` 
INNER JOIN `types` ON `trains`.`type` = `types`.`id` 
INNER JOIN `stations` AS `s1` ON `trains`.`source` = `s1`.`id` 
INNER JOIN `stations` AS `s2` ON `trains`.`destination` = `s2`.`id` 
ORDER BY `travel_time` DESC LIMIT 0, 6;

-- 5.2.4 --
SELECT `types`.`name` AS `type`, `s1`.`name` AS `src_stn`, `s2`.`name` AS `dst_stn`, `trains`.`departure` AS `departure`, 
`trains`.`arrival` AS `arrival`, Round(`trains`.`distance` * .001 * `types`.`fare_rate`, -2) AS `fare` FROM `trains` 
INNER JOIN `types` ON `trains`.`type` = `types`.`id` 
INNER JOIN `stations` AS `s1` ON `trains`.`source` = `s1`.`id` 
INNER JOIN `stations` AS `s2` ON `trains`.`destination` = `s2`.`id` 
ORDER BY `departure` ASC;

-- 5.2.5 --
SELECT `trains`.`id` AS `id`, `types`.`name` AS `type`, `s1`.`name` AS `src_stn`, `s2`.`name` AS `dst_stn`, 
Count(`tickets`.`train`) AS `occupied`, `types`.`max_seats` AS `maximum` FROM `trains` 
INNER JOIN `types` ON `trains`.`type` = `types`.`id` 
INNER JOIN `stations` AS `s1` ON `trains`.`source` = `s1`.`id` 
INNER JOIN `stations` AS `s2` ON `trains`.`destination` = `s2`.`id` 
INNER JOIN `tickets` ON `trains`.`id` = `tickets`.`train` 
GROUP BY `tickets`.`train` 
ORDER BY `id` ASC;

-- 5.2.6 --
SELECT `trains`.`id` AS `id`, `types`.`name` AS `type`, `s1`.`name` AS `src_stn`, `s2`.`name` AS `dst_stn`, 
Count(`tickets`.`train`) AS `occupied`, `types`.`max_seats` AS `maximum` FROM `trains` 
INNER JOIN `types` ON `trains`.`type` = `types`.`id` 
INNER JOIN `stations` AS `s1` ON `trains`.`source` = `s1`.`id` 
INNER JOIN `stations` AS `s2` ON `trains`.`destination` = `s2`.`id` 
LEFT OUTER JOIN `tickets` ON `trains`.`id` = `tickets`.`train` 
GROUP BY `tickets`.`train` 
ORDER BY `id` ASC;
