<?php
$dsn = "mysql:host=localhost; dbname=tickets";

$options = [
  PDO::ATTR_EMULATE_PREPARES   => false, // Disable emulation mode for "real" prepared statements
  PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, // Disable errors in the form of exceptions
  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, // Make the default fetch be an associative array
];
try {
  $pdo = new PDO($dsn, str_replace(array("\r", "\n"), '',file_get_contents('user.txt')), str_replace(array("\r", "\n"), '',file_get_contents('passwd.txt')), $options);
 $data = json_decode( file_get_contents( 'php://input' ), true );
 $stmt = $pdo->prepare("INSERT INTO hhouse (scale, urgency, prior, hasimage, submittedwhen, description, location) VALUES(:scale, :urgency, :prior, :hasimage, :submittedwhen, :description, :location)");
 $stmt->bind_param(':scale', $sc);
 $stmt->bind_param(':urgency', $urg);
 $stmt->bind_param(':prior', $pri);
 $stmt->bind_param(':hasimage', $img);
 $stmt->bind_param(':submittedwhen', $when);
 $stmt->bind_param(':description', $descr);
 $stmt->bind_param(':location', $loc);
 $sc=$data['scale']; 
 $ur=$data['urgency'];
 $pri=$data['prior'];
 $img=$data['hasimg'];
 $when=$data['submit'];
 $descr=$data['descr'];
 $loc=$data['loc'];
 $stmt->execute();
 echo "ticket recieved at ", $data['submit'];
 exit();
} 
catch (Exception $e) {
  error_log($e->getMessage());
  exit('Something bad happened'); 
}

?>
