<!DOCTYPE html>
<html>

<head>
    <title>Print Laporan Kesejahteraan</title>
    <link rel="stylesheet" href="{{ asset('') }}assets/dist-assets/js/bootstrap.min.css" />

    <style>
        .tb_inside td {
            border: 0 !important;
        }

        td .no_lr {
            border-left-style: hidden;
            border-right-style: hidden;
        }

        table td,
        table th {
            font-size: 20px;
        }

        header {
            position: fixed;
            top: 0cm;
            left: 0cm;
            right: 0cm;
            height: 1cm;
            background-color: #c9c9c9;
            font-size: 20px;
            ;
            font-weight: bold;
            color: rgb(0, 0, 0);
            text-align: right;
            line-height: 0.8cm;
        }

        footer {
            position: fixed;
            bottom: 0cm;
            left: 0cm;
            right: 0cm;
            height: 1cm;
            background-color: #c9c9c9;
            color: rgb(0, 0, 0);
            font-size: 20px;
            ;
            text-align: left;
            line-height: 0.9cm;
        }

        body {
            line-height: 1.5;
        }

        table {
            table-layout: auto !important;
        }

        th,
        td,
        thead th,
        tbody td,
        tfoot td,
        tfoot th {
            width: auto !important;
        }

        table {
            border-collapse: collapse;
            border-spacing: 0;
        }

        @media print {
            @page {
                size: landscape;
            }

        }

        @page {
            margin: 0px;
        }

        body {
            margin: 0px;
        }
    </style>


</head>

<body>
    <header>
        <b> Laporan Data Kesejahteraan - Dicetak dari: SEPEKAN Kab Morowali pada {{ date('d-m-Y') }} &nbsp;&nbsp; </b>
    </header>
    <footer>
        <b> &nbsp;&nbsp; Copyright &copy; Sumber : LITBANG - BAPPEDA {{ date('Y') }} </b>
    </footer>

    <div class="m-3" style="padding-top: 50px;">
        <table class='table table-bordered'>
            <thead>
                <tr>
                    <th style="width: 5px; ">No</th>
                    <th>No KK</th>
                    <th>Provinsi</th>
                    <th>Kabupaten/Kota</th>
                    <th>Kecamatan</th>
                    <th>Desa/Kelurahan</th>
                    <th>Alamat</th>
                    <th>Desil Kesejahteraan</th>
                    <th>Nama</th>
                    <th>NIK</th>
                    <th>Jenis Kelamin</th>
                    <th>Tempat Lahir</th>
                    <th>Tanggal Lahir</th>
                    <th>Umur</th>
                    <th>Pekerjaan</th>
                    <th>Pendidikan</th>
                    <th>Kepemilikan Rumah</th>
                    <th>Jenis Atap</th>
                    <th>Jenis Dinding</th>
                    <th>Jenis Lantai</th>
                    <th>Sumber Penerangan</th>
                    <th>Bahan Bakar Memasak</th>
                    <th>Sumber Air Minum</th>
                    <th>Memiliki fasilitas Buang Air Besar</th>
                </tr>
            </thead>
            <tbody>
                @php
                    $i = 1;
                @endphp
                @foreach (@$data as $dat)
                    <tr>
                        <td style="width: 5px; "> {{ $i }} </td>
                        <td>{{ @$dat->kepala_keluarga->no_kk }}</td>
                        <td>{{ @$dat->kepala_keluarga->alamat->provinsi_nama }}</td>
                        <td>{{ @$dat->kepala_keluarga->alamat->kabupaten_nama }}</td>
                        <td>{{ @$dat->kepala_keluarga->alamat->kecamatan_nama }}</td>
                        <td>{{ @$dat->kepala_keluarga->alamat->kelurahan_nama }}</td>
                        <td>{{ @$dat->kepala_keluarga->alamat->alamat_nama }}</td>
                        <td>{{ @$dat->status_kesejahteraan }}</td>
                        <td>{{ @$dat->kepala_keluarga->nama }}</td>
                        <td>{{ @$dat->kepala_keluarga->nik }}</td>
                        <td>{{ @$dat->kepala_keluarga->jk }}</td>
                        <td>{{ @$dat->kepala_keluarga->lahir->tempat }}</td>
                        <td>{{ @dateform($dat->kepala_keluarga->lahir->tanggal) }}</td>
                        <td>{{ @hitung_umur($dat->kepala_keluarga->lahir->tanggal) }}</td>
                        <td>{{ @$dat->kepala_keluarga->pekerjaan[0]->pekerjaan_nama }}</td>
                        <td>{{ @$dat->kepala_keluarga->pendidikan_id }}</td>
                        <td>{{ @$dat->indikator->rumah->nama }}</td>
                        <td>{{ @$dat->indikator->atap->nama }}</td>
                        <td>{{ @$dat->indikator->dinding->nama }}</td>
                        <td>{{ @$dat->indikator->lantai->nama }}</td>
                        <td>{{ @$dat->indikator->penerangan->nama }}</td>
                        <td>{{ @$dat->indikator->bahan_bakar->nama }}</td>
                        <td>{{ @$dat->indikator->sumber_air->nama }}</td>
                        <td>{{ @$dat->indikator->jamban->nama }}</td>
                    </tr>
                    @php $i++ @endphp
                @endforeach
            </tbody>
        </table>
        <br>
    </div>

</body>
@php
    function dateform($tgl)
    {
        $date = date_create($tgl);
        $tanggal = date_format($date, 'd/m/Y');
        return $tanggal;
    }
    function rupiah($angka)
    {
        $hasil_rupiah = 'Rp ' . number_format($angka, 0, ',', '.');
        return $hasil_rupiah;
    }
    function hitung_umur($tgl)
    {
        $date = date_create($tgl);
        $tanggal = date_format($date, 'Y-m-d');

        $birthDate = new DateTime($tanggal);
        $today = new DateTime();
        if ($birthDate > $today) {
            exit('0');
        }
        $y = $today->diff($birthDate)->y;
        return $y;
    }
@endphp

</html>
