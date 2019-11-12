<?php

// return true;
 
// get the HTTP method, path and body of the request
header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'),true);

$jml=0;
if ($input['data']) {
    $jml=count($input['data']);
}

// var_dump($jml);
// die();
$dataList='';
for ($i=0; $i < $jml; $i++) { 
    $dataList .="<tr>
                    <td>". ($i+1) ."</td>
                    <td>". $input['data'][$i]['singkatan_satfung'] ."</td>
                    <td>". ($i+1) ."</td>
                    <td>". ($i+1) ."</td>
                    <td>". ($i+1) ."</td>
                </tr>"; 
}

$html = "<div>
            <p>NAMA POLRES : ". $input['data'][0]['satker'] ."</p>
        </div>
        <table border='1' width='100%' style='border-collapse: collapse;'>
        <tr>
            <th>No</th>
            <th>Satuan Fungsi</th>
            <th>Data Obyektif (%)</th>
            <th>Lampiran (%)</th>
            <th>Validasi Kasatfung</th>
        </tr>
        ". $dataList ."
        </table>";

        
$filename = "newpdffile";

// include autoloader
require_once 'dompdf/autoload.inc.php'; 

// reference the Dompdf namespace
use Dompdf\Dompdf;

// instantiate and use the dompdf class
$dompdf = new Dompdf();

$dompdf->loadHtml($html);

// (Optional) Setup the paper size and orientation
$dompdf->setPaper('A4', 'portrait');

// Render the HTML as PDF
$dompdf->render();
$dompdf->stream();
// Output the generated PDF to Browser
// $dompdf->stream($filename);