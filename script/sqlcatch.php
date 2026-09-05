<?php
$data = json_decode(file_get_contents("php://input"));
echo "Received ticket of $data->importance and $data->scale size."
?>
