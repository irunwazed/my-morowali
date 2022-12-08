<!DOCTYPE html>
<html>

<head>
    <title>Print Laporan Bantuan</title>
    <link rel="stylesheet" href="{{ asset('') }}assets/dist-assets/js/bootstrap.min.css" />
    <style>
        .tb_inside td {
            border: 0 !important;
        }

        td .no_lr {
            border-left-style: hidden;
            border-right-style: hidden;
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
        <b> Laporan Data Bantuan - Dicetak dari: SEPAKAD Kab Morowali pada {{ date('d-m-Y') }} &nbsp;&nbsp; </b>
    </header>
    <footer>
        <b> &nbsp;&nbsp; Copyright &copy; Sumber : LITBANG - BAPPEDA {{ date('Y') }} </b>
    </footer>

    <div class="m-2">
        {{-- <h4 style="font-size: 16px; text-align:center"><b>Data Bantuan</b></h4><br> --}}
        <table class='table table-bordered' style="width: 100%">
            <thead>
                <tr>
                    <th style="width: 5px;">No</th>
                    <th style="width: 5px;">Tahun</th>
                    <th>Kecamatan</th>
                    <th>Desa/Kelurahan</th>
                    <th>Nama Bantuan</th>
                    <th>Nama Penerima</th>
                    <th>Pagu</th>
                    <th>Keterangan</th>
                </tr>
            </thead>
            <tbody>
                @php
                    $i = 1;
                @endphp
                @foreach ($data as $dat)
                    <tr>
                        <td style="text-align:center">{{ $i }}</td>
                        <td style="text-align:center">{{ $dat->tahun }}</td>
                        <td>{{ $dat->lokasi->kecamatan_nama }}</td>
                        <td>
                            @if (isset($dat->lokasi->kelurahan_nama))
                                {{ $dat->lokasi->kelurahan_nama }}
                            @else
                                -
                            @endif
                        </td>
                        <td>{{ $dat->bantuan->nama }}</td>
                        <td>
                            <table class='table' style="width: 100%">
                                @php
                                    $k = 1;
                                @endphp
                                @foreach ($dat->penduduk as $pen)
                                    <tr>
                                        <td style="width: 1px;">
                                            {{ $k }}
                                        </td>
                                        <td>
                                            <b> {{ $pen->nama }}</b>
                                            <br> <small>{{ $pen->nik }} </small>
                                        </td>
                                    </tr>
                                    @php
                                        $k++;
                                    @endphp
                                @endforeach
                            </table>
                        </td>
                        <td>{{ rupiah($dat->bantuan->pagu) }}</td>
                        <td>{{ $dat->bantuan->keterangan }}</td>
                        @php $i++ @endphp
                    </tr>
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
