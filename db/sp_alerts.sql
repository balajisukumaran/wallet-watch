DELIMITER $$
CREATE DEFINER=`admin`@`%` PROCEDURE `sp_alert`()
BEGIN
	CREATE TEMPORARY TABLE IF NOT EXISTS net_spend 
 AS (
	SELECT u.userid as u_userid, email, c.name as c_name, sum(price) as sum_price
	FROM transaction t 
     INNER JOIN user u ON u.userid=t.userid
     INNER JOIN category c ON t.category_id=c.category_id
		GROUP BY u.userid, email, c.name);

     CREATE TEMPORARY TABLE IF NOT EXISTS net_budget
 AS (   
select userid, c.name, sum(value) as sum
from budget b
INNER JOIN category c ON b.category_id=c.category_id
group by userid, c.name);

select userid, email, name as c_name, (sum_price-sum) as overspend from net_spend s inner join net_budget b on s.u_userid = b.userid where sum_price > sum;

END$$
DELIMITER ;
