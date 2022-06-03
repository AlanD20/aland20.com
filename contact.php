<?php

if (count($_POST) <= 2) {
    header('Location: index.php#contact');
    exit;
}

session_start();

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'vendor/autoload.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(false);

try {
    //Server settings
    $cred_mail = "__SMTP_USERNAME__";
    //Send using SMTP
    $mail->isSMTP();
    //$mail->SMTPDebug = true;
    //Set the SMTP server to send through
    $mail->Host = '__SMTP_HOST__';
    //Enable SMTP authentication
    $mail->SMTPAuth   = true;
    $mail->SMTPAutoTLS = false;
    //$mail->SMTPDebug = 6;

    //SMTP username
    $mail->Username   = $cred_mail;
    //SMTP password
    $mail->Password   = '__SMTP_PASSWORD__';
    //Enable implicit TLS encryption
    //$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    //$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->SMTPSecure = false;

    $mail->Port       = 587;
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);
    //Recipients
    $mail->setFrom($cred_mail);
    $mail->addAddress($cred_mail);
    $mail->addReplyTo($email, $name);
    $messageBody = "Name: {$name}\nEmail: {$email}\n\nMessage:\n${message}";
    //Content

    //Set email format to HTML
    $mail->isHTML(false);
    $mail->Subject = "Portfolio Contact Form";
    $mail->Body = $messageBody;

    $mail->send();
    $_SESSION['sent'] = 'Message has been sent.';
} catch (Exception $e) {
    $_SESSION['sent'] =  "Message could not be sent. please try again.";
}
header('Location: index.php#contact');
