<?php 
// include the database connection
require_once 'connect.php';

// Function to check if OTP exists and return the token
function checkOTPExists($otp) {
    global $mysqli;
    
    $stmt = $mysqli->prepare("SELECT token FROM tb_access WHERE otp = ?");
    $stmt->bind_param("s", $otp);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($row = $result->fetch_assoc()) {
        return $row['token'];
    }
    
    return null;
}

// REST API to check if OTP exists and return the token
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json');
    
    $otp = isset($_POST['otp']) ? $_POST['otp'] : '';
    
    if (empty($otp)) {
        echo json_encode(['success' => false, 'message' => 'OTP is required']);
        exit;
    }
    
    $token = checkOTPExists($otp);
    if ($token !== null) {
        echo json_encode(['success' => true, 'exists' => true, 'token' => $token]);
    } else {
        echo json_encode(['success' => true, 'exists' => false]);
    }
}
?>