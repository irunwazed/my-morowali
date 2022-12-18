<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use Session;
use GuzzleHttp\Exception\RequestException;

class PrintController extends Controller
{
    public function print_penduduk_stream(Request $request)
    {
        // dd($_GET);
        // dd($request->all());
        $kab = $request->kabupaten;
        $kec = $request->kecamatan;
        $kel = $request->kelurahan;
        if (!$kab) $kab = "";
        if (!$kec) $kec = "";
        if (!$kel) $kel = "";
        // dd($_GET);
        $url = 'http://127.0.0.1:3000/kemiskinan/laporan/penduduk?datatable=false&kabupaten=' . $kab . '&kecamatan=' . $kec . '&kelurahan=' . $kel;
        $auth = "Bearer " . $request->session()->get('token');
        // dd($auth);
        try {
            $client = new \GuzzleHttp\Client();
            $response = $client->request(
                'GET',
                $url,
                [
                    'headers' =>
                    [
                        'Authorization' => $auth
                    ]
                ],
            );
            $respon = json_decode($response->getBody()->getContents());
            $data = $respon->data;
            // dd($data[0]);

            // $pdf = PDF::loadview(
            //     'pages.print.penduduk',
            //     [
            //         'data' => $respon->data
            //     ]
            // );
            // $pdf->set_paper('legal', 'landscape');
            // return $pdf->stream('laporan-penduduk');

            return view(
                'pages.print.penduduk',
                [
                    'data' => $data
                ]
            );
            // dd($respon);
        } catch (RequestException $e) {
            $response = $e->getResponse();
            $responseBodyAsString = json_decode($response->getBody()->getContents());
            return \redirect()->back()->with('error', $responseBodyAsString->message);
            // dd(json_decode($responseBodyAsString));
        }
    }


    public function print_penduduk_pdf(Request $request)
    {
        // dd($request->all());
        $kab = $request->kabupaten;
        $kec = $request->kecamatan;
        $kel = $request->kelurahan;
        if (!$kab) $kab = "";
        if (!$kec) $kec = "";
        if (!$kel) $kel = "";
        $url = 'http://127.0.0.1:3000/kemiskinan/laporan/penduduk?kabupaten=' . $kab . '&kecamatan=' . $kec . '&kelurahan=' . $kel;
        $auth = "Bearer " . $request->session()->get('token');
        // dd($auth);
        try {
            $client = new \GuzzleHttp\Client();
            $response = $client->request(
                'GET',
                $url,
                [
                    'headers' =>
                    [
                        'Authorization' => $auth
                    ]
                ],
            );
            $respon = json_decode($response->getBody()->getContents());
            $data = $respon->data;

            $pdf = PDF::loadview(
                'pages.print.penduduk',
                [
                    'data' => $respon->data
                ]
            );

            $pdf->setOption(['dpi' => 150, 'defaultFont' => 'sans-serif']);
            $pdf->set_paper('Legal', 'landscape');
            $pdf->render();
            return $pdf->download('laporan-penduduk');
        } catch (RequestException $e) {
            $response = $e->getResponse();
            $responseBodyAsString = json_decode($response->getBody()->getContents());
            return \redirect()->back()->with('error', $responseBodyAsString->message);
            // dd(json_decode($responseBodyAsString));
        }
    }

    public function print_kesejahteraan_stream(Request $request)
    {
        $status_kesejahteraan = $request->status_kesejahteraan;
        $tahun = $request->tahun;
        if (!$status_kesejahteraan) $status_kesejahteraan = "";
        if (!$tahun) $tahun = "";
        // dd($request->all());
        $url = 'http://127.0.0.1:3000/kemiskinan/laporan/kesejahteraan?datatable=false&status_kesejahteraan=' . $status_kesejahteraan . '&tahun=' . $tahun;
        $auth = "Bearer " . $request->session()->get('token');
        try {
            $client = new \GuzzleHttp\Client();
            $response = $client->request(
                'GET',
                $url,
                [
                    'headers' =>
                    [
                        'Authorization' => $auth
                    ]
                ],
            );
            $respon = json_decode($response->getBody()->getContents());
            $data = $respon->data;
            // dd($data);
            return view('pages.print.kesejahteraan', ['data' => $data]);
        } catch (RequestException $e) {
            $response = $e->getResponse();
            $responseBodyAsString = json_decode($response->getBody()->getContents());
            return \redirect()->back()->with('error', $responseBodyAsString->message);
        }
    }


    public function print_kesejahteraan_stream_v2(Request $request)
    {
        $status_kesejahteraan = $request->status_kesejahteraan;
        $tahun = $request->tahun;
        if (!$status_kesejahteraan) $status_kesejahteraan = "";
        if (!$tahun) $tahun = "";
        // dd($request->all());
        $url = 'http://127.0.0.1:3000/kemiskinan/laporan/kesejahteraan?datatable=true&status_kesejahteraan=' . $status_kesejahteraan . '&tahun=' . $tahun;
        $auth = "Bearer " . $request->session()->get('token');
        try {
            $client = new \GuzzleHttp\Client();
            $response = $client->request(
                'GET',
                $url,
                [
                    'headers' =>
                    [
                        'Authorization' => $auth
                    ]
                ],
            );
            $respon = json_decode($response->getBody()->getContents());
            $data = $respon->data;
            // dd($data);
            return view(
                'pages.print.kesejahteraan',
                [
                    'data' => $data
                ]
            );
        } catch (RequestException $e) {
            $response = $e->getResponse();
            $responseBodyAsString = json_decode($response->getBody()->getContents());
            return \redirect()->back()->with('error', $responseBodyAsString->message);
        }
    }

    public function print_kesejahteraan_pdf(Request $request)
    {
        $kab = $request->kabupaten;
        $kec = $request->kecamatan;
        $kel = $request->kelurahan;
        if (!$kab) $kab = "";
        if (!$kec) $kec = "";
        if (!$kel) $kel = "";
        $url = 'http://127.0.0.1:3000/kemiskinan/laporan/kesejahteraan?kabupaten=' . $kab . '&kecamatan=' . $kec . '&kelurahan=' . $kel;
        $auth = "Bearer " . $request->session()->get('token');
        try {
            $client = new \GuzzleHttp\Client();
            $response = $client->request(
                'GET',
                $url,
                [
                    'headers' =>
                    [
                        'Authorization' => $auth
                    ]
                ],
            );
            $respon = json_decode($response->getBody()->getContents());
            $data = $respon->data;
            $pdf = PDF::loadview(
                'pages.print.kesejahteraan',
                [
                    'data' => $respon->data
                ]
            );
            $pdf->set_paper('a4', 'landscape');
            return $pdf->download('laporan-kesejahteraan');
        } catch (RequestException $e) {
            $response = $e->getResponse();
            $responseBodyAsString = json_decode($response->getBody()->getContents());
            return \redirect()->back()->with('error', $responseBodyAsString->message);
        }
    }


    public function print_bantuan_stream(Request $request)
    {
        $kab = $request->kabupaten;
        $kec = $request->kecamatan;
        $kel = $request->kelurahan;
        if (!$kab) $kab = "";
        if (!$kec) $kec = "";
        if (!$kel) $kel = "";
        $url = 'http://127.0.0.1:3000/kemiskinan/laporan/bantuan?datatable=false&kabupaten=' . $kab . '&kecamatan=' . $kec . '&kelurahan=' . $kel;
        $auth = "Bearer " . $request->session()->get('token');
        try {
            $client = new \GuzzleHttp\Client();
            $response = $client->request(
                'GET',
                $url,
                [
                    'headers' =>
                    [
                        'Authorization' => $auth
                    ]
                ],
            );
            $respon = json_decode($response->getBody()->getContents());
            $data = $respon->data;
            return view(
                'pages.print.bantuan',
                [
                    'data' => $data
                ]
            );
        } catch (RequestException $e) {
            $response = $e->getResponse();
            $responseBodyAsString = json_decode($response->getBody()->getContents());
            return \redirect()->back()->with('error', $responseBodyAsString->message);
        }
    }

    public function print_bantuan_pdf(Request $request)
    {
        $kab = $request->kabupaten;
        $kec = $request->kecamatan;
        $kel = $request->kelurahan;
        if (!$kab) $kab = "";
        if (!$kec) $kec = "";
        if (!$kel) $kel = "";
        $url = 'http://127.0.0.1:3000/kemiskinan/laporan/bantuan?kabupaten=' . $kab . '&kecamatan=' . $kec . '&kelurahan=' . $kel;
        $auth = "Bearer " . $request->session()->get('token');
        try {
            $client = new \GuzzleHttp\Client();
            $response = $client->request(
                'GET',
                $url,
                [
                    'headers' =>
                    [
                        'Authorization' => $auth
                    ]
                ],
            );
            $respon = json_decode($response->getBody()->getContents());
            $data = $respon->data;
            $pdf = PDF::loadview(
                'pages.print.bantuan',
                [
                    'data' => $respon->data
                ]
            );
            $pdf->setOption(['dpi' => 100, 'defaultFont' => 'sans-serif']);
            $pdf->set_paper('Legal', 'landscape');
            return $pdf->download('laporan-bantuan');
        } catch (RequestException $e) {
            $response = $e->getResponse();
            $responseBodyAsString = json_decode($response->getBody()->getContents());
            return \redirect()->back()->with('error', $responseBodyAsString->message);
        }
    }


    public function print_keluarga_stream(Request $request)
    {
        $kab = $request->kabupaten;
        $kec = $request->kecamatan;
        $kel = $request->kelurahan;
        if (!$kab) $kab = "";
        if (!$kec) $kec = "";
        if (!$kel) $kel = "";
        $url = 'http://127.0.0.1:3000/kemiskinan/laporan/keluarga?datatable=false&kabupaten=' . $kab . '&kecamatan=' . $kec . '&kelurahan=' . $kel;
        $auth = "Bearer " . $request->session()->get('token');
        try {
            $client = new \GuzzleHttp\Client();
            $response = $client->request(
                'GET',
                $url,
                [
                    'headers' =>
                    [
                        'Authorization' => $auth
                    ]
                ],
            );
            $respon = json_decode($response->getBody()->getContents());
            $data = $respon->data;
            // dd($data);

            return view('pages.print.keluarga', ['data' => $data]);
        } catch (RequestException $e) {
            $response = $e->getResponse();
            $responseBodyAsString = json_decode($response->getBody()->getContents());
            return \redirect()->back()->with('error', $responseBodyAsString->message);
        }
    }

    public function print_keluarga_pdf(Request $request)
    {
        $kab = $request->kabupaten;
        $kec = $request->kecamatan;
        $kel = $request->kelurahan;
        if (!$kab) $kab = "";
        if (!$kec) $kec = "";
        if (!$kel) $kel = "";
        $url = 'http://127.0.0.1:3000/kemiskinan/laporan/keluarga?kabupaten=' . $kab . '&kecamatan=' . $kec . '&kelurahan=' . $kel;
        $auth = "Bearer " . $request->session()->get('token');
        try {
            $client = new \GuzzleHttp\Client();
            $response = $client->request(
                'GET',
                $url,
                [
                    'headers' =>
                    [
                        'Authorization' => $auth
                    ]
                ],
            );
            $respon = json_decode($response->getBody()->getContents());
            $data = $respon->data;

            // $pdf = PDF::loadview(
            //     'pages.print.keluarga',
            //     [
            //         'data' => $respon->data
            //     ]
            // );
            // $pdf->set_paper('a4', 'landscape');
            // return $pdf->download('laporan-keluarga');
        } catch (RequestException $e) {
            $response = $e->getResponse();
            $responseBodyAsString = json_decode($response->getBody()->getContents());
            return \redirect()->back()->with('error', $responseBodyAsString->message);
        }
    }
}
