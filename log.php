<?php
header('Content-Type: application/json');

$rows = array_map('str_getcsv', explode("\n", trim(file_get_contents('log.csv'))));

for ($i = 0; $i < sizeof($rows); $i++) {
    $rows[$i][1] = (float) $rows[$i][1];
    $rows[$i][2] = (float) $rows[$i][2];
    $rows[$i][3] = (float) $rows[$i][3];
}

echo json_encode($rows);
