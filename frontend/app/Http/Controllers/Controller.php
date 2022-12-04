<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

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

}
