<?php

namespace App\Http\Controllers;

use GuzzleHttp\Exception\RequestException;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request as HttpRequest;
use Illuminate\Routing\Controller as BaseController;
use PDF;


class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function index()
    {
        return view('index');
    }

    public function admin()
    {
        return view('pages.admin.index');
    }

    public function penduduk()
    {
        return view('pages.admin.penduduk');
    }

    public function pekerjaan_penduduk()
    {
        return view('pages.admin.penduduk_pekerjaan');
    }

    public function penyakit()
    {
        return view('pages.admin.penyakit');
    }

    public function pekerjaan()
    {
        return view('pages.admin.pekerjaan');
    }

    public function bantuan()
    {
        return view('pages.admin.bantuan');
    }


    public function atap()
    {
        return view('pages.indikator.atap');
    }
    public function bahan_bakar()
    {
        return view('pages.indikator.bahanbakar');
    }
    public function dinding()
    {
        return view('pages.indikator.dinding');
    }
    public function jamban()
    {
        return view('pages.indikator.jamban');
    }
    public function lantai()
    {
        return view('pages.indikator.lantai');
    }
    public function penerangan()
    {
        return view('pages.indikator.penerangan');
    }
    public function rumah()
    {
        return view('pages.indikator.rumah');
    }
    public function sumber_air()
    {
        return view('pages.indikator.sumberair');
    }


    public function kes_indi()
    {
        return view('pages.kesejahteraan.indikator');
    }

    public function kes_ban()
    {
        return view('pages.kesejahteraan.bantuan');
    }


    public function laporan_kesejahteraan()
    {
        return view('pages.laporan.kesejahteraan');
    }
    public function laporan_penduduk()
    {
        return view('pages.laporan.penduduk');
    }
    public function laporan_keluarga()
    {
        return view('pages.laporan.keluarga');
    }
    public function laporan_bantuan()
    {
        return view('pages.laporan.bantuan');
    }


    public function print_penduduk_stream(HttpRequest $request)
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

    public function print_penduduk_pdf(HttpRequest $request)
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

    public function print_kesejahteraan_stream(HttpRequest $request)
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

    public function print_kesejahteraan_pdf(HttpRequest $request)
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


    public function print_bantuan_stream(HttpRequest $request)
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

    public function print_bantuan_pdf(HttpRequest $request)
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
            $pdf->setOption(['dpi' => 75, 'defaultFont' => 'sans-serif']);
            $pdf->set_paper('Legal', 'landscape');
            return $pdf->download('laporan-bantuan');
        } catch (RequestException $e) {
            $response = $e->getResponse();
            $responseBodyAsString = json_decode($response->getBody()->getContents());
            return \redirect()->back()->with('error', $responseBodyAsString->message);
        }
    }


    public function print_keluarga_stream(HttpRequest $request)
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

            // return view(
            //     'pages.print.keluarga',
            //     [
            //         'data' => $data
            //     ]
            // );
        } catch (RequestException $e) {
            $response = $e->getResponse();
            $responseBodyAsString = json_decode($response->getBody()->getContents());
            return \redirect()->back()->with('error', $responseBodyAsString->message);
        }
    }

    public function print_keluarga_pdf(HttpRequest $request)
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
