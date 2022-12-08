<!DOCTYPE html>
<html>

<head>
    <title>Print Laporan Penduduk</title>
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
        <b> Laporan Data Penduduk - Dicetak dari: SEPAKAD Kab Morowali pada {{ date('d-m-Y') }} &nbsp;&nbsp; </b>
    </header>
    <footer>
        <b> &nbsp;&nbsp; Copyright &copy; Sumber : LITBANG - BAPPEDA {{ date('Y') }} </b>
    </footer>

    <div class="m-4">
        <table class='table table-bordered'>
            <tbody>
                @php
                    $i = 1;
                @endphp
                @foreach ($data as $dat)
                    <tr>
                        <td style="width: 5px;">{{ $i }}</td>
                        <td>
                            <table class="tb_inside" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td><b>Data Diri</b></td>
                                </tr>
                                <tr>
                                    <td>NIK</td>
                                    <td>:</td>
                                    <td>{{ $dat->nik }}</td>
                                </tr>
                                <tr>
                                    <td>Nama</td>
                                    <td>:</td>
                                    <td>{{ $dat->nama }}</td>
                                </tr>
                                <tr>
                                    <td>Jenis Kelamin</td>
                                    <td>:</td>
                                    <td>{{ $dat->jenis_kelamin }}</td>
                                </tr>
                                <tr>
                                    <td>Agama</td>
                                    <td>:</td>
                                    <td>{{ $dat->agama }}</td>
                                </tr>
                                <tr>
                                    <td>TTL</td>
                                    <td>:</td>
                                    <td>{{ $dat->lahir->tempat }}, {{ dateform($dat->lahir->tanggal) }}</td>
                                </tr>
                                <tr>
                                    <td>Umur</td>
                                    <td>:</td>
                                    <td>{{ hitung_umur($dat->lahir->tanggal) }}</td>
                                </tr>
                                <tr>
                                    <td>Alamat</td>
                                    <td>:</td>
                                    <td>{{ $dat->alamat->alamat_nama }}<br>Kelurahan
                                        {{ $dat->alamat->kelurahan_nama }}<br>Kecamatan
                                        {{ $dat->alamat->kecamatan_nama }}<br>Kabupaten
                                        {{ $dat->alamat->kabupaten_nama }}</td>
                                </tr>
                                <tr>
                                    <td>Status Pernikahan</td>
                                    <td>:</td>
                                    <td>{{ $dat->status_pernikahan }}</td>
                                </tr>
                                <tr>
                                    <td>Pendidikan</td>
                                    <td>:</td>
                                    <td>{{ $dat->pendidikan }}</td>
                                </tr>
                                <tr>
                                    <td>Kondisi Fisik</td>
                                    <td>:</td>
                                    <td>{{ $dat->fisik->kondisi }}</td>
                                </tr>
                                <tr>
                                    <td>Penyakit</td>
                                    <td>:</td>
                                    <td>{{ $dat->penyakit->nama ? $dat->penyakit->nama : '' }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Hidup</td>
                                    <td>:</td>
                                    <td>{{ $dat->hidup }}</td>
                                </tr>
                            </table>
                        </td>
                        <td>
                            <b>Pekerjaan</b>
                            <table class="my-2" style="width: 100%">
                                @php
                                    $k = 1;
                                @endphp
                                @foreach ($dat->pekerjaan as $pekerja)
                                    <tr>
                                        <td rowspan="2" style="width: 5px;">{{ $k }}</td>
                                        <td>Nama Pekerjaan</td>
                                        <td class="no_lr">:</td>
                                        <td><b>{{ $pekerja->pekerjaan_nama }}</b></td>
                                    </tr>
                                    <tr>
                                        <td>Gaji</td>
                                        <td class="no_lr">:</td>
                                        <td><b>{{ rupiah($pekerja->gaji) }}</b></td>
                                    </tr>
                                    @php
                                        $k++;
                                    @endphp
                                @endforeach
                            </table>
                            <br>
                            <b>Bantuan</b>
                            <table class="my-2" style="width: 100%">
                                @php
                                    $j = 1;
                                @endphp
                                @foreach ($dat->bantuan as $bantu)
                                    <tr>
                                        <td rowspan="3" style="width: 5px;">{{ $j }}</td>
                                        <td>Nama Bantuan</td>
                                        <td class="no_lr">:</td>
                                        <td><b>{{ $bantu->bantuan->nama }}</b></td>
                                    </tr>
                                    <tr>

                                        <td>Tahun</td>
                                        <td class="no_lr">:</td>
                                        <td>{{ $bantu->tahun }}</td>
                                    </tr>
                                    <tr>
                                        <td>Pagu</td>
                                        <td class="no_lr">
                                            :</td>
                                        <td>{{ rupiah($bantu->bantuan->pagu) }}</td>

                                    </tr>
                                    @php
                                        $j++;
                                    @endphp
                                @endforeach
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
{{-- {{ dd($data[0]) }} --}}

</html>
