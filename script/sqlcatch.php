<?php

$data = json_decode( file_get_contents( 'php://input' ), true );

include_once("sqlconnect.php");
 $stmt = $mysqli->prepare("INSERT INTO hhouse (scale, urgency, prior, hasimage, submittedwhen, description, location) VALUES(:scale, :urgency, :prior, :hasimage, :submittedwhen, :description, :location)");
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
?>
