<?php

function fail(string $message): void {
    fwrite(STDERR, $message . PHP_EOL);
    exit(1);
}

function requestServer(array $payload, string $method = 'POST'): array {
    $context = stream_context_create([
        'http' => [
            'method' => $method,
            'header' => "Content-Type: application/json\r\n",
            'content' => json_encode($payload),
            'ignore_errors' => true,
        ],
    ]);

    $response = file_get_contents('http://localhost:8000/server.php', false, $context);

    if ($response === false) {
        fail('Could not reach http://localhost:8000/server.php. Start the PHP server first.');
    }

    $statusLine = $http_response_header[0] ?? '';
    preg_match('/\s(\d{3})\s/', $statusLine, $matches);

    return [
        'status' => isset($matches[1]) ? (int) $matches[1] : 0,
        'body' => json_decode($response, true),
    ];
}

$validResponse = requestServer([
    'lat1' => 0,
    'lon1' => 0,
    'lat2' => 0,
    'lon2' => 0,
]);

if ($validResponse['status'] !== 200) {
    fail('Expected status 200 for a valid request.');
}

if ((float) ($validResponse['body']['distance_kilometers'] ?? -1) !== 0.0) {
    fail('Expected 0 kilometers for identical coordinates.');
}

if ((int) ($validResponse['body']['distance_meters'] ?? -1) !== 0) {
    fail('Expected 0 meters for identical coordinates.');
}

$invalidResponse = requestServer([
    'lat1' => 'abc',
    'lon1' => 0,
    'lat2' => 0,
    'lon2' => 0,
]);

if ($invalidResponse['status'] !== 400) {
    fail('Expected status 400 for invalid input.');
}

if (($invalidResponse['body']['error'] ?? null) !== 'Invalid input') {
    fail('Expected "Invalid input" error for invalid coordinates.');
}

echo "PHP smoke tests passed" . PHP_EOL;
