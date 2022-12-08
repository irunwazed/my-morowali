<!DOCTYPE html>
<html>

<head>
    <title>Print Laporan Keluarga</title>
    <link rel="stylesheet" href="{{ asset('') }}assets/dist-assets/js/bootstrap.min.css" />
    <style>
        .tb_inside td {
            border: 0 !important;
        }

        td .no_lr {
            border-left-style: hidden;
            border-right-style: hidden;
        }

        td .no_ud {
            border-top-style: hidden;
            border-bottom-style: hidden;
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
            margin-left: 1cm;
            margin-right: 1cm;
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
        <b> Laporan Data Keluarga - Dicetak dari: SEPAKAD Kab Morowali pada {{ date('d-m-Y') }} &nbsp;&nbsp; </b>
    </header>
    <footer>
        <b> &nbsp;&nbsp; Copyright &copy; Sumber : LITBANG - BAPPEDA {{ date('Y') }} </b>
    </footer>

    <div class="m-2">
        <table class='table table-bordered'>
            <thead>
                <tr>
                    <th style="width: 5px;">#</th>
                    <th>NIK</th>
                    <th>Nama</th>
                    <th>Jenis Kelamin</th>
                    <th>Agama</th>
                    <th>TTL</th>
                    <th>Umur</th>
                    <th>Alamat</th>
                    <th>Status Nikah</th>
                    <th>Pendidikan</th>
                    <th>Kondisi Fisik</th>
                    <th>Penyakit</th>
                    <th>Pekerjaan</th>
                    <th>Hidup</th>
                </tr>
            </thead>
            <tbody>
                @php
                    $i = 1;
                @endphp
                @foreach ($data as $dat)
                    <tr>
                        <td>{{ $i }}</td>
                        <td colspan="13"><b>Nomor Kartu Keluarga : {{ $dat->no_kk }} </b></td>
                    </tr>
                    @foreach ($dat->anggota_keluarga as $dat_kel)
                        <tr>
                            @if ($loop->last)
                                <td></td>
                            @else
                                <td style="border-top-style: hidden;border-bottom-style: hidden;"></td>
                            @endif
                            <td>{{ $dat_kel->nik }}</td>
                            <td>{{ $dat_kel->nama }}</td>
                            <td>{{ $dat_kel->jenis_kelamin }}</td>
                            <td>{{ $dat_kel->agama }}</td>
                            <td>{{ $dat_kel->lahir->tempat }}, {{ dateform($dat_kel->lahir->tanggal) }}</td>
                            <td>{{ hitung_umur($dat_kel->lahir->tanggal) }}</td>
                            <td>{{ $dat_kel->alamat->alamat_nama }}<br>Kelurahan
                                {{ $dat_kel->alamat->kelurahan_nama }}<br>Kecamatan
                                {{ $dat_kel->alamat->kecamatan_nama }}<br>Kabupaten
                                {{ $dat_kel->alamat->kabupaten_nama }}</td>
                            <td>{{ $dat_kel->status_pernikahan }}</td>
                            <td>{{ $dat_kel->pendidikan }}</td>
                            <td>{{ $dat_kel->fisik->kondisi }}</td>
                            <td>{{ $dat_kel->penyakit->nama ? $dat_kel->penyakit->nama : '' }}
                            </td>
                            <td>{{ $dat_kel->hidup }}</td>
                            <td>
                                @if (isset($dat_kel->pekerjaan[0]->pekerjaan_nama))
                                    <b>{{ $dat_kel->pekerjaan[0]->pekerjaan_nama }}</b> <br>
                                    <small>{{ rupiah($dat_kel->pekerjaan[0]->gaji) }}</small>
                                @else
                                    -
                                @endif
                            </td>
                        </tr>
                    @endforeach
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
{{-- {{ dd($data[0]) }} --}}

</html>
