<?php
include 'connect.php';

$query = "SELECT user_email, subs_date FROM tb_subscribe ORDER BY subs_date DESC";
$result = mysqli_query($mysqli, $query);

$subscribers = array();
while ($row = mysqli_fetch_assoc($result)) {
    $subscribers[] = $row;
}

echo json_encode($subscribers);

mysqli_close($mysqli);
?>