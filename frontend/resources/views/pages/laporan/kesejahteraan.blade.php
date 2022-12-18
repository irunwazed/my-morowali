@extends('temp.temp')

@section('judul', 'Laporan Data Kesejahteraan - SEPEKAN')

@section('tambah_css')

@endsection

@section('isi')

    <div class="breadcrumb">
        <h1>Laporan Data Kesejahteraan</h1>
    </div>
    <div class="separator-breadcrumb border-top"></div>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header gradient-purple-indigo 0-hidden pb-80">
                </div>
                <div class="card-body">
                    <div class="ul-contact-list-body">
                        <div class="ul-contact-main-content" style="height: 100%;">
                            <div class="ul-contact-content" style="width: 100%">
                                <div class="card">
                                    <div class="card-body">
                                        <form id="form_data" class="mx-4">
                                            <div class="row mb-4">
                                                <div class="col-md-3 mb-2">
                                                    <div class="form-group">
                                                        <label><b>Status Kesejahteraan</b> </label>
                                                        <select id="status_kesejahteraan" name="status_kesejahteraan"
                                                            class="form-control" style="width:100%;">
                                                            <option value="" selected disabled>- Pilih Status
                                                                Kesejahteraan -</option>
                                                            <option value="1">Sangat Miskin</option>
                                                            <option value="2">Miskin</option>
                                                            <option value="3">Rentan Miskin</option>
                                                            <option value="4">Menuju Miskin</option>
                                                            <option value="5">Middle Class</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-md-3 mb-2">
                                                    <div class="form-group">
                                                        <label><b>Tahun</b> </label>
                                                        <select id="tahun" name="tahun" class="form-control"
                                                            style="width:100%;">
                                                            <option value="" selected disabled>- Pilih Tahun -
                                                            </option>
                                                            @for ($tah = date('Y') + 1; $tah > 2010; $tah--)
                                                                <option value={{ $tah }}>{{ $tah }}
                                                                </option>
                                                            @endfor
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-group" style="margin-top: 20px;">
                                                        <button class="btn btn-outline-primary" style="padding-top: 8px;"
                                                            id="btn_cari" type="button"><i class="i-Magnifi-Glass1"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div class="col-md-3 mb-2">
                                                </div>
                                            </div>
                                        </form>
                                        <div id="show_dat">
                                            <hr>
                                            <div class="d-flex flex-row ml-2">
                                                <div class="p-2">
                                                    <button class="btn btn-outline-primary" style="margin-top: 8px;"
                                                        id="_print" type="button">
                                                        <i class="i-Files"></i>&nbsp;
                                                        PRINT
                                                    </button>
                                                </div>
                                                <div class="p-2">
                                                    <button class="btn btn-outline-primary" style="margin-top: 8px;"
                                                        id="_print_v2" type="button">
                                                        <i class="i-Files"></i>&nbsp;
                                                        PRINT V2
                                                    </button>
                                                </div>
                                                {{-- <div class="p-2">
                                                    <button class="btn btn-outline-primary" style="margin-top: 8px;"
                                                        id="_pdf" type="button">
                                                        <i class="i-File-Download"></i>&nbsp;
                                                        PDF
                                                    </button>
                                                </div> --}}
                                            </div>
                                            <div class="table-responsive" style="margin-top: 10px;">
                                                <table class="display table table-bordered" id="tabel_data"
                                                    style="width:100%">
                                                    <thead>
                                                        <tr>
                                                            <th style="width: 5px;">No</th>
                                                            <th style="width: 15%;">Tahun</th>
                                                            <th style="width: 100px;">Kecamatan</th>
                                                            <th style="width: 100px;">Desa/Kelurahan</th>
                                                            <th style="width: 15%;">NIK</th>
                                                            <th style="width: 15%;">Nama</th>
                                                            <th style="width: 150px;">TTL<br>Umur</th>
                                                            <th style="width: 5px;">Jenis Kelamin</th>
                                                            <th style="width: 150px;">Pendapatan Utama (Tahun)</th>
                                                            <th style="width: 150px;">Pendapatan Sampingan (Tahun)</th>
                                                            <th style="width: 150px;">Pengeluaran (Tahun)</th>
                                                            <th style="width: 150px;">Status Kesejahteraan</th>
                                                        </tr>
                                                    </thead>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection

@section('tambah_js')

    <script>
        $(document).ready(function() {
            $('#show_dat').hide();

            getCamat();

            $(".select2").select2();
        });

        function loadData(status, tahun) {
            console.log(status);
            console.log(tahun);
            // die()
            $('#show_dat').show(500);
            // die()
            $('#tabel_data').DataTable({
                paging: true,
                searching: true,
                autoWidth: false,
                responsive: false,
                info: true,
                destroy: true,
                processing: true,
                serverSide: true,
                // dom: 'Bfrtip',
                // buttons: [{
                //         extend: 'csv',
                //         className: 'mr-3',
                //         text: '<i class="i-File-CSV"></i> CSV'
                //     },
                //     {
                //         extend: 'excel',
                //         text: '<i class="i-File-Excel"></i> Excel'
                //     }
                // ],
                ajax: {
                    url: "{{ env('API_URL') }}/kemiskinan/laporan/kesejahteraan",
                    type: 'GET',
                    headers: {
                        "Authorization": "Bearer {{ Session::get('token') }}"
                    },
                    data: {
                        datatable: 'true',
                        status_kesejahteraan: status,
                        tahun: tahun,
                    },
                    // success: function(data) {
                    //     console.log(data);
                    // },
                    error: function(error) {
                        console.log(error);
                    },
                },
                columns: [{
                        "data": null,
                        "sortable": false,
                        render: function(data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        }
                    },
                    {
                        data: 'tahun',
                    },
                    {
                        data: 'kepala_keluarga.alamat.kecamatan_nama',
                    },
                    {
                        data: 'kepala_keluarga.alamat.kelurahan_nama',
                    },
                    {
                        data: 'kepala_keluarga.nik'
                    },
                    {
                        data: 'kepala_keluarga.nama'
                    },
                    {
                        data: null,
                        render: function(data, row) {
                            if (data.kepala_keluarga.lahir) {
                                return data.kepala_keluarga.lahir.tempat ? data.kepala_keluarga.lahir
                                    .tempat : "-" + ", " + dateformat(data
                                        .kepala_keluarga.lahir.tanggal) + "<br>" + hit_umur(data
                                        .kepala_keluarga
                                        .lahir.tanggal);

                            }
                            return "-";
                        }
                    },
                    {
                        data: 'kepala_keluarga.jk',
                    },
                    {
                        data: 'keuangan.pendapatan_utama',
                        render: function(data, row) {
                            return data ? rupiah(data) : "-";
                        }
                    },
                    {
                        data: 'keuangan.pendapatan_sampingan',
                        render: function(data, row) {
                            return data ? rupiah(data) : "-";
                        }
                    },
                    {
                        data: 'keuangan.pengeluaran_total',
                        render: function(data, row) {
                            return data ? rupiah(data) : "-";
                        }
                    },
                    {
                        data: 'status_kesejahteraan',
                        render: function(data, row) {
                            return data;
                        }
                    },
                ],
                'columnDefs': [{
                    "targets": [1, 9, 10, 8, 11],
                    "className": "text-center",
                }],
            });
        }

        $('#btn_cari').click(function() {
            status = $('#status_kesejahteraan').val();
            tahun = $('#tahun').val();
            loadData(status, tahun);
        })

        function getCamat() {
            var select22 = $('#kecamatan');
            $.ajax({
                type: "GET",
                url: "{{ env('API_URL') }}/kemiskinan/get/kecamatan",
                headers: {
                    "Authorization": "Bearer {{ Session::get('token') }}"
                },
                success: function(data) {
                    // console.log(data);
                    var htmlOptions = [];
                    if (data.data.length) {

                        html = '<option value="" selected disabled>- Pilih Kecamatan -</option>';
                        htmlOptions[htmlOptions.length] = html;
                        for (item in data.data) {
                            html = '<option value="' + data.data[item].kode + '">' + data.data[item]
                                .nama +
                                '</option>';
                            htmlOptions[htmlOptions.length] = html;
                        }
                        select22.empty().append(htmlOptions.join(''));
                    }
                },
                error: function(error) {
                    console.log(error);
                }
            });
        }

        $('#kecamatan').on('change', function() {
            var kecamatan = $('#kecamatan').val();
            getDesa(kecamatan);
        });

        function getDesa(id) {
            var select = $('#kelurahan');
            $.ajax({
                type: "GET",
                url: "{{ env('API_URL') }}/kemiskinan/get/kelurahan-by-kecamatan/" + id,
                headers: {
                    "Authorization": "Bearer {{ Session::get('token') }}"
                },
                success: function(data) {
                    // console.log(data);
                    var htmlOptions = [];
                    if (data.data.length) {
                        html = '<option value="" selected disabled>- Pilih Keluarahan/Desa -</option>';
                        htmlOptions[htmlOptions.length] = html;
                        for (item in data.data) {
                            html = '<option value="' + data.data[item].kode + '">' + data.data[item]
                                .nama +
                                '</option>';
                            htmlOptions[htmlOptions.length] = html;
                        }
                        select.empty().append(htmlOptions.join(''));
                    }
                },
                error: function(error) {
                    console.log(error);
                }
            });
        }

        $('#_print').click(function() {

            status = $('#status_kesejahteraan').val();
            tahun = $('#tahun').val();
            if (!status) status = "";
            if (!tahun) tahun = "";

            url = "{{ url('') }}/admin/print/kesejahteraan/stream?status_kesejahteraan=" + status +
                "&tahun=" + tahun;
            window.open(url, '_blank');
        })

        $('#_print_v2').click(function() {
            tahun = $('#tahun').val();
            if (!status) status = "";
            if (!tahun) tahun = "";

            url = "{{ url('') }}/admin/print/kesejahteraan/stream_v2?status_kesejahteraan=" + status +
                "&tahun=" + tahun;
            window.open(url, '_blank');
        })

        $('#_pdf').click(function() {

            kab = $('#kabupaten').val();
            camat = $('#kecamatan').val();
            desa = $('#kelurahan').val();
            if (!kab) kab = "";
            if (!camat) camat = "";
            if (!desa) desa = "";

            url = "{{ url('') }}/admin/print/kesejahteraan/pdf?kabupaten=" + kab + "&kecamatan=" + camat +
                "&kelurahan=" + desa;
            window.open(url, '_blank');
        })

        function rupiah(number) {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
            }).format(number);
        }

        function dateformat(date) {
            var date = new Date(date);
            formattedDate = ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '-' + ((date.getMonth() >
                8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + date.getFullYear();
            return formattedDate;
        }

        function hit_umur(number) {
            var dob = new Date(number);
            var today = new Date();
            var age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));
            return age + " Tahun"
        }
    </script>
@endsection
