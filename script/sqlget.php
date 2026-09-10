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
 
?>
