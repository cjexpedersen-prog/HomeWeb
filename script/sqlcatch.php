<?php
$data = json_decode( file_get_contents( 'php://input' ), true );
$user = file_get_contents('user.txt');
$pass = file_get_contents('passwd.txt');
$dbn = file_get_contents('dbn.txt');
$sqll = mysqli_connect('localhost',$user,$pass,$dbn);
if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error(). <br> .$user.$pass.$dbn.$sqll;
  exit();
}
else{
$stmt = $mysqli->prepare("INSERT INTO hhouse (scale,urgency,prior,hasimage,submittedwhen,description,location) VALUES(?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param($data['scale'], $data['urgency'], $data['prior'], $data['hasimg'], $data['submit'], $data['descr'], $data['loc'];
$stmt->execute();
echo "ticket recieved at ",$data['submit'];
  exit();
}
?>
