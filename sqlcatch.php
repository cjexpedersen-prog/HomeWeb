<?php

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"));

echo "Received ticket of $urgency importance and $scale size."
?>
