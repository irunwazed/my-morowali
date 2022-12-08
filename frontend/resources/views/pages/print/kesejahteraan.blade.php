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
            width: 5px;
        }

        td .tb_wid_1 {
            width: 180px;
        }

        td .tb_wid_2 {
            width: 150px;
        }

        table {
            border-collapse: collapse;
        }

        table td,
        table th {
            font-size: 10px;
        }

        @page {
            margin: 0cm 0cm;
        }

        body {
            margin-top: 1cm;
            margin-left: 0.2cm;
            margin-right: 0.2cm;
            margin-bottom: 1cm;
        }

        header {
            position: fixed;
            top: 0cm;
            left: 0cm;
            right: 0cm;
            height: 0.6cm;
            background-color: #c9c9c9;
            font-size: 10px;
            font-weight: bold;
            color: rgb(0, 0, 0);
            text-align: right;
            line-height: 0.5cm;
        }

        footer {
            position: fixed;
            bottom: 0cm;
            left: 0cm;
            right: 0cm;
            height: 0.5cm;
            background-color: #c9c9c9;
            color: rgb(0, 0, 0);
            font-size: 10px;
            text-align: left;
            line-height: 0.4cm;
        }
    </style>
</head>

<body>
    <header>
        <b>Laporan Data Kesejahteraan - Dicetak dari: SEPAKAD Kab Morowali pada {{ date('d-m-Y') }} &nbsp;&nbsp;</b>

    </header>
    <footer>
        <b>&nbsp;&nbsp; Copyright &copy; Sumber : LITBANG - BAPPEDA {{ date('Y') }}</b>

    </footer>

    <div class="m-2">
        <table class='table table-bordered'>
            <tbody>
                @php
                    $i = 1;
                @endphp
                @foreach (@$data as $dat)
                    <tr>
                        <td>{{ $i }}</td>
                        <td style="width: 20%">
                            <table class="tb_inside" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td><b>Data</b></td>
                                </tr>
                                <tr>
                                    <td>No Kartu Keluarga</td>
                                    <td>:</td>
                                    <td>{{ @$dat->kepala_keluarga->no_kk }}</td>
                                </tr>
                                <tr>
                                    <td>Nama</td>
                                    <td>:</td>
                                    <td>{{ @$dat->kepala_keluarga->nama }}</td>
                                </tr>
                                <tr>
                                    <td>NIK</td>
                                    <td>:</td>
                                    <td>{{ @$dat->kepala_keluarga->nik }}</td>
                                </tr>
                                <tr>
                                    <td>Jenis Kelamin</td>
                                    <td>:</td>
                                    <td>{{ @$dat->kepala_keluarga->jk }}</td>
                                </tr>
                                <tr>
                                    <td>Agama</td>
                                    <td>:</td>
                                    <td>{{ @$dat->kepala_keluarga->agama }}</td>
                                </tr>
                                <tr>
                                    <td>TTL</td>
                                    <td>:</td>
                                    <td>{{ @$dat->kepala_keluarga->lahir->tempat }},
                                        {{ dateform(@$dat->kepala_keluarga->lahir->tanggal) }}</td>
                                </tr>
                                <tr>
                                    <td>Umur</td>
                                    <td>:</td>
                                    <td>{{ hitung_umur(@$dat->kepala_keluarga->lahir->tanggal) }}</td>
                                </tr>
                                <tr>
                                    <td>Alamat</td>
                                    <td>:</td>
                                    <td>{{ @$dat->kepala_keluarga->alamat->alamat_nama }}<br>Kelurahan
                                        {{ @$dat->kepala_keluarga->alamat->kelurahan_nama }}<br>Kecamatan
                                        {{ @$dat->kepala_keluarga->alamat->kecamatan_nama }}<br>Kabupaten
                                        {{ @$dat->kepala_keluarga->alamat->kabupaten_nama }}</td>
                                </tr>
                                <tr>
                                    <td>Pendidikan</td>
                                    <td>:</td>
                                    <td>{{ @$dat->kepala_keluarga->pendidikan_id }}</td>
                                </tr>
                                <tr>
                                    <td>Kondisi Fisik</td>
                                    <td>:</td>
                                    <td>{{ @$dat->kepala_keluarga->fisik->kondisi }}</td>
                                </tr>
                                <tr>
                                    <td>Hidup</td>
                                    <td>:</td>
                                    <td>{{ @$dat->kepala_keluarga->hidup }}</td>
                                </tr>
                            </table>
                        </td>
                        <td style="width: 40%">
                            <b>Pendapatan / Pengeluaran</b>
                            <table class="my-2">
                                <tr>
                                    <td class="tb_wid_1">Pendapatan Utama (Tahun)</td>
                                    <td class="no_lr">:</td>
                                    <td class="tb_wid_2"><b>{{ rupiah(@$dat->keuangan->pendapatan_utama) }}</b></td>
                                </tr>
                                <tr>
                                    <td>Pendapatan Sampingan (Tahun)</td>
                                    <td class="no_lr">:</td>
                                    <td><b>{{ rupiah(@$dat->keuangan->pendapatan_sampingan) }}</b></td>
                                </tr>
                                <tr>
                                    <td>Pengeluaran (Tahun)</td>
                                    <td class="no_lr">:</td>
                                    <td><b>{{ rupiah(@$dat->keuangan->pengeluaran_total) }}</b></td>
                                </tr>
                            </table>
                            <br>
                            <b>Indikator</b>
                            <table class="my-2">
                                <tr>
                                    <td class="tb_wid_1">Ukuran Rumah</td>
                                    <td class="no_lr">:</td>
                                    <td class="tb_wid_2"><b>{{ @$dat->indikator->rumah->ukuran }} m²</b></td>
                                </tr>
                                <tr>
                                    <td>Kepemilikan Rumah</td>
                                    <td class="no_lr">:</td>
                                    <td><b>{{ @$dat->indikator->rumah->nama }}</b></td>
                                </tr>
                                <tr>
                                    <td>Jenis Atap</td>
                                    <td class="no_lr">:</td>
                                    <td><b>{{ @$dat->indikator->atap->nama }}</b></td>
                                </tr>
                                <tr>
                                    <td>Jenis Dinding</td>
                                    <td class="no_lr">:</td>
                                    <td><b>{{ @$dat->indikator->dinding->nama }}</b></td>
                                </tr>
                                <tr>
                                    <td>Jenis Lantai</td>
                                    <td class="no_lr">:</td>
                                    <td><b>{{ @$dat->indikator->lantai->nama }}</b></td>
                                </tr>
                                <tr>
                                    <td>Jenis Penerangan</td>
                                    <td class="no_lr">:</td>
                                    <td><b>{{ @$dat->indikator->penerangan->nama }}</b></td>
                                </tr>
                                <tr>
                                    <td>Jenis Jamban</td>
                                    <td class="no_lr">:</td>
                                    <td><b>{{ @$dat->indikator->jamban->nama }}</b></td>
                                </tr>
                                <tr>
                                    <td>Jenis Sumber Air</td>
                                    <td class="no_lr">:</td>
                                    <td><b>{{ @$dat->indikator->sumber_air->nama }}</b></td>
                                </tr>
                                <tr>
                                    <td>Jenis Bahan Bakar</td>
                                    <td class="no_lr">:</td>
                                    <td><b>{{ @$dat->indikator->bahan_bakar->nama }}</b></td>
                                </tr>
                            </table>
                            <br>
                        </td>
                        <td style="width: 35%">
                            <table class="my-2" style="text-align: center">
                                <tr>
                                    <td><b>Rumah</b><br>
                                        <img style="width: 150px; height: 120px; object-fit: contain;"
                                            src="{{ env('API_URL') }}/kemiskinan-public{{ @$dat->indikator->rumah->image }}"
                                            alt="">
                                    </td>
                                    <td><b>Atap</b><br>
                                        <img style="width: 150px; height: 120px; object-fit: contain;"
                                            src="{{ env('API_URL') }}/kemiskinan-public{{ @$dat->indikator->atap->image }}"
                                            alt="">
                                    </td>
                                </tr>
                                <tr>
                                    <td><b>Dinding</b><br>
                                        <img style="width: 120px; height: 120px; object-fit: contain;"
                                            src="{{ env('API_URL') }}/kemiskinan-public{{ @$dat->indikator->dinding->image }}"
                                            alt="">
                                    </td>
                                    <td><b>Lantai</b><br>
                                        <img style="width: 150px; height: 120px; object-fit: contain;"
                                            src="{{ env('API_URL') }}/kemiskinan-public{{ @$dat->indikator->lantai->image }}"
                                            alt="">
                                    </td>
                                </tr>
                                <tr>
                                    <td><b>Penerangan</b><br>
                                        <img style="width: 150px; height: 120px; object-fit: contain;"
                                            src="{{ env('API_URL') }}/kemiskinan-public{{ @$dat->indikator->penerangan->image }}"
                                            alt="">
                                    </td>
                                    <td><b>Jamban</b><br>
                                        <img style="width: 150px; height: 120px; object-fit: contain;"
                                            src="{{ env('API_URL') }}/kemiskinan-public{{ @$dat->indikator->jamban->image }}"
                                            alt="">
                                    </td>
                                </tr>
                                <tr>
                                    <td><b>Sumber Air</b><br>
                                        <img style="width: 150px; height: 120px; object-fit: contain;"
                                            src="{{ env('API_URL') }}/kemiskinan-public{{ @$dat->indikator->sumber_air->image }}"
                                            alt="">
                                    </td>
                                    <td><b>Bahan Bakar</b><br>
                                        <img style="width: 150px; height: 120px; object-fit: contain;"
                                            src="{{ env('API_URL') }}/kemiskinan-public{{ @$dat->indikator->bahan_bakar->image }}"
                                            alt="">
                                    </td>
                                </tr>
                            </table>
                        </td>
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
            exit('0 tahun');
        }
        $y = $today->diff($birthDate)->y;
        return $y . ' tahun ';
    }

@endphp

</html>
