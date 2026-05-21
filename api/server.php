<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$lat1 = $data['lat1'];
$lon1 = $data['lon1'];
$lat2 = $data['lat2'];
$lon2 = $data['lon2'];

if (!isset($lat1) || !isset($lon1) || !isset($lat2) || !isset($lon2)) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing parameters']);
    exit;
}

if (!is_numeric($lat1) || !is_numeric($lon1) || !is_numeric($lat2) || !is_numeric($lon2)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

function distance_calculator($lat1, $lon1, $lat2, $lon2) {
    $earth_radius = 6371; 

    $dLat = deg2rad($lat2 - $lat1);
    $dLon = deg2rad($lon2 - $lon1);

    $a = sin($dLat / 2) * sin($dLat / 2) +
         cos(deg2rad($lat1)) * cos(deg2rad($lat2)) *
         sin($dLon / 2) * sin($dLon / 2);

    $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

    return $earth_radius * $c;
}

$distance = distance_calculator($lat1, $lon1, $lat2, $lon2);
$meter = $distance * 1000; 
echo json_encode([
    'distance_kilometers' => round($distance, 3), 
    'distance_meters' => round($meter, 0),
    ]);
?>