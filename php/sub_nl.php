
<?php

if($_POST)
{
    $to_email       = "contact@mail.com"; //Recipient email, Replace with own email here
    $from_email     = 'noreply@codephenix.fr'; //from mail, it is mandatory with some hosts and without it mail might endup in spam.
    //check if its an ajax request, exit if not
    if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {

        $output = json_encode(array( //create JSON data
            'type'=>'error',
            'text' => 'Sorry Request must be Ajax POST'
        ));
        die($output); //exit script outputting json data
    }

    //Sanitize input data using PHP filter_var().
    $user_email     = filter_var($_POST["nl_email"], FILTER_SANITIZE_EMAIL);
    $message        = "Inscription à la Newsletter CodePhenix de :";

    //email body
    $message_body = $message."\r\n\r\n-".$user_email;
    //proceed with PHP email.
    $headers = 'From: '.$from_email.' \r\n'.'Reply-To: '.$user_email.' \r\n' .'X-Mailer: PHP/'.phpversion();
    $subject = 'Newsletter';
    $send_mail = mail($to_email, $subject, $message_body, $headers);

    if(!$send_mail)
    {
        //If mail couldn't be sent output error. Check your PHP email configuration (if it ever happens)
        $output = array('type'=>'error');
    }else{
        $output = array('type'=>'success');
    }
    echo json_encode($output);
    die();
}

?>