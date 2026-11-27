<?php
$dsn = "mysql:host=localhost; dbname=hhouse";

$options = [
  PDO::ATTR_EMULATE_PREPARES   => false, // Disable emulation mode for "real" prepared statements
  PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, // Disable errors in the form of exceptions
  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, // Make the default fetch be an associative array
];
// try {
  $pdo = new PDO($dsn, str_replace(array("\r", "\n"), '',file_get_contents('user.txt')), str_replace(array("\r", "\n"), '',file_get_contents('passwd.txt')), $options);
 $data = json_decode( file_get_contents( 'php://input' ), true );
 $Descr=$data['Descr'];
 $Urgency=$data['Urgency'];
 $Submittor=$data['Submittor'];
 $ImglinkS=$data['ImglinkS'];
 $Scale=$data['Scale'];
  $Location=$data['Location'];
 $stmt = $pdo->prepare("INSERT INTO tickets ( Description, Urgency, Submittor, ImglinkS, Scale, Location) VALUES( :Description, :Urgency, :Submittor, :Im
 glinkS, :Scale, :Location)");
 $stmt->bindParam(':Description', $Descr);
 $stmt->bindParam(':Urgency', $Urgency);
 $stmt->bindParam(':Submittor', $Submittor);
 $stmt->bindParam(':ImglinkS', $ImglinkS);
 $stmt->bindParam(':Scale', $Scale);
 $stmt->bindParam(':Location', $Location);
 $stmt->execute();
 echo ["ticket recieved without issue."];
 exit();
//} 
//catch (Exception $e) {
 // error_log($e->getMessage());
//  exit('Something bad happened'); 
//}

?>
