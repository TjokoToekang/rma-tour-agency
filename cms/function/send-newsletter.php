<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Make sure you have PHPMailer installed via Composer
require 'connect.php'; // Include your existing database connection file


$response = ['success' => false, 'message' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $subject = $_POST['subject'] ?? '';
    $body = $_POST['body'] ?? '';

    if (empty($subject) || empty($body)) {
        $response['message'] = 'Subject and body are required.';
        echo json_encode($response);
        exit;
    }

    // Fetch subscriber emails from the database
    $subscribers = getSubscribers($mysqli);

    if (empty($subscribers)) {
        $response['message'] = 'No subscribers found.';
        echo json_encode($response);
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = 'mail.rma-tour.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'info@rma-tour.com';
        $mail->Password   = 'rma!2024';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // Changed to SMTPS for port 465
        $mail->Port       = 465;

        // Sender
        $mail->setFrom('info@rma-tour.com', 'RMA Tour Organizer');

        // Content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $body;

        // Send to all subscribers
        foreach ($subscribers as $email) {
            $mail->addBCC($email);
        }

        $mail->send();
        $response['success'] = true;
        $response['message'] = 'Newsletter sent successfully to ' . count($subscribers) . ' subscribers.';
    } catch (Exception $e) {
        $response['message'] = "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}

echo json_encode($response);

function getSubscribers($mysqli) {
    $subscribers = [];
    $query = "SELECT user_email FROM tb_subscribe";
    $result = mysqli_query($mysqli, $query);

    if ($result) {
        while ($row = mysqli_fetch_assoc($result)) {
            $subscribers[] = $row['user_email'];
        }
        mysqli_free_result($result);
    }

    return $subscribers;
}