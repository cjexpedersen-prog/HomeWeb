<?php
$data = json_decode( file_get_contents( 'php://input' ), true );
try{
 include_once("sqlconnect.php");
  $stmt = $mysqli->prepare("INSERT INTO hhouse (scale,urgency,prior,hasimage,submittedwhen,description,location) VALUES(?, ?, ?, ?, ?, ?, ?)");
  $stmt->bind_param($data['scale'], $data['urgency'], $data['prior'], $data['hasimg'], $data['submit'], $data['descr'], $data['loc']);
  $stmt->execute();
  echo "ticket recieved at ", $data['submit'];
  exit();
}
catch(Exception $e){
  echo 'Message: ' .$e->getMessage();
}


?>
