@extends('temp.temp')

@section('judul', 'Laporan Bantuan - SEPAKAD')

@section('tambah_css')

@endsection

@section('isi')

    <div class="breadcrumb">
        <h1>Laporan Data Bantuan</h1>
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
                                                        <label><b>Kabupaten</b> </label>
                                                        <select id="kabupaten" name="kabupaten" class="form-control select2"
                                                            style="width:100%;" required>
                                                            <option value="7203" selected>Kabupaten Morowali</option>
                                                        </select>
                                                    </div>

                                                </div>
                                                <div class="col-md-3 mb-2">
                                                    <div class="form-group">
                                                        <label><b>Kecamatan</b> </label>
                                                        <select id="kecamatan" name="kecamatan" class="form-control select2"
                                                            style="width:100%;" required>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="carian">
                                                        <div class="form-group">
                                                            <label><b> Kelurahan</b></label>
                                                            <select id="kelurahan" name="kelurahan"
                                                                class="form-control select2" style="width:100%;" required>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-3 mb-2">
                                                    <div class="form-group" style="margin-top: 20px;">
                                                        <button class="btn btn-outline-primary" style="padding-top: 8px;"
                                                            id="btn_cari" type="button"><i class="i-Magnifi-Glass1"></i>
                                                        </button>
                                                    </div>
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
                                                        id="_pdf" type="button">
                                                        <i class="i-File-Download"></i>&nbsp;
                                                        PDF
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="table-responsive" style="margin-top: 10px;">
                                                <table class="display table table-bordered" id="tabel_data"
                                                    style="width:100%">
                                                    <thead>
                                                        <tr>
                                                            <th style="width: 5px;">No</th>
                                                            <th style="width: 5px;">Tahun</th>
                                                            <th style="width: 150px;">Kecamatan</th>
                                                            <th style="width: 150px;">Desa/Kelurahan</th>
                                                            <th style="width: 200px;">Nama Bantuan</th>
                                                            <th style="width: 200px;">Nama Penerima</th>
                                                            <th style="width: 200px;">Pagu</th>
                                                            <th style="width: 200px;">Keterangan</th>
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

        function loadData(prov, camat, desa) {
            console.log(prov);
            console.log(camat);
            console.log(desa);
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
                dom: 'Bfrtip',
                buttons: [{
                        extend: 'csv',
                        className: 'mr-3',
                        text: '<i class="i-File-CSV"></i> CSV'
                    },
                    {
                        extend: 'excel',
                        text: '<i class="i-File-Excel"></i> Excel'
                    }
                ],
                ajax: {
                    url: "{{ env('API_URL') }}/kemiskinan/laporan/bantuan",
                    type: 'GET',
                    headers: {
                        "Authorization": "Bearer {{ Session::get('token') }}"
                    },
                    data: {
                        datatable: true,
                        kabupaten: prov,
                        kecamatan: camat,
                        kelurahan: desa
                    },
                    // success: function(data) {
                    //     console.log(data);
                    // },
                    // error: function(error) {
                    //     console.log(error);
                    // },
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
                        data: 'lokasi.kecamatan_nama',
                        render: function(data, row) {
                            return data;
                        }
                    },
                    {
                        data: null,
                        render: function(data, row) {
                            return data.lokasi.kelurahan_nama ? data.lokasi.kelurahan_nama : "-";
                        }
                    },
                    {
                        data: 'bantuan.nama',
                    },
                    {
                        data: null,
                        render: function(data, type, row) {
                            nam = "";
                            $.each(data.penduduk, function(key, value) {
                                nam = nam + "<b>" + value.nama + "</b><br> <small>" + value.nik +
                                    "</small><br>"
                            });
                            return nam;
                        }
                    },
                    {
                        data: 'bantuan.pagu',
                        render: function(data, row) {
                            return  rupiah(data);
                        }
                    },
                    {
                        data: 'bantuan.keterangan',
                    },
                ],
                'columnDefs': [{
                    "targets": [1 ],
                    "className": "text-center",
                }],
            });
        }

        $('#btn_cari').click(function() {
            prov = $('#kabupaten').val();
            camat = $('#kecamatan').val();
            desa = $('#kelurahan').val();
            loadData(prov, camat, desa);
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

            kab = $('#kabupaten').val();
            camat = $('#kecamatan').val();
            desa = $('#kelurahan').val();
            if (!kab) kab = "";
            if (!camat) camat = "";
            if (!desa) desa = "";

            url = "{{ url('') }}/admin/print/bantuan/stream?kabupaten=" + kab + "&kecamatan=" + camat +
                "&kelurahan=" + desa;
            window.open(url, '_blank');
        })

        $('#_pdf').click(function() {

            kab = $('#kabupaten').val();
            camat = $('#kecamatan').val();
            desa = $('#kelurahan').val();
            if (!kab) kab = "";
            if (!camat) camat = "";
            if (!desa) desa = "";

            url = "{{ url('') }}/admin/print/bantuan/pdf?kabupaten=" + kab + "&kecamatan=" + camat +
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
    </script>
@endsection
