<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Make sure you have PHPMailer installed via Composer
require_once 'connect.php'; // Include your existing database connection file

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(array("status" => "error", "message" => "Only POST requests are allowed"));
    exit();
}

// Use $_POST instead of file_get_contents
$id_visa = $_POST["id_visa"];
$fullname = $_POST['fullname'] ?? '';
$email = $_POST['email'] ?? '';
$whatsapp = $_POST['whatsapp'] ?? '';
$order_date = date('Y-m-d H:i:s');

// Generate unique_id
$unique_id = 'RMAVISA-' . strtoupper(substr(md5(uniqid()), 0, 6));

$query = "INSERT INTO order_visa (id_visa, fullname, email, whatsapp, order_date, unique_id) VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $mysqli->prepare($query);
$stmt->bind_param("ssssss", $id_visa, $fullname, $email, $whatsapp, $order_date, $unique_id);

if ($stmt->execute()) {
    // Send confirmation email
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = 'mail.rma-tour.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'info@rma-tour.com';
        $mail->Password   = 'rma!2024';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;

        // Sender
        $mail->setFrom('info@rma-tour.com', 'RMA Tour Organizer');

        // Recipient
        $mail->addAddress($email, $fullname);

        // Content
        $mail->isHTML(true);
        $mail->Subject = 'Thank You for Your Order';
        $mail->Body    = "
            <h2>Thank you for your order!</h2>
            <p>Dear {$fullname},</p>
            <p>We have received your visa order with the unique ID: <strong>{$unique_id}</strong>.</p>
            <p>Please wait for our admin to confirm and follow up on your order. We will contact you shortly.</p>
            <p>If you have any questions, please don't hesitate to contact us.</p>
            <p>Best regards,<br>RMA Tour Organizer Team</p>
        ";

        $mail->send();
        echo json_encode(array("status" => "success", "message" => "Order inserted successfully and confirmation email sent", "unique_id" => $unique_id));
    } catch (Exception $e) {
        echo json_encode(array("status" => "partial_success", "message" => "Order inserted successfully but failed to send confirmation email", "unique_id" => $unique_id));
    }
} else {
    echo json_encode(array("status" => "error", "message" => "Failed to insert order"));
}

$stmt->close();
$mysqli->close();
?>