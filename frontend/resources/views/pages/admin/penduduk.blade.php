@extends('temp.temp')

@section('judul', 'Dashboard - SEPEKAN')

@section('tambah_css')

    <style>
        * {
            box-sizing: border-box;
        }

        /* Style the search field */
        form.carian input[type=text] {
            padding: 10px;
            font-size: 13px;
            float: left;
            width: 80%;
        }

        /* Style the submit button */
        form.carian button {
            float: left;
            width: 40px;
            margin-left: 5px;
            font-size: 13px;
            cursor: pointer;
        }

        form.carian button:hover {}

        /* Clear floats */
        form.carian::after {
            content: "";
            clear: both;
            display: table;
        }
    </style>
@endsection

@section('isi')

    <div class="breadcrumb">
        <h1>Data Penduduk</h1>
    </div>
    <div class="separator-breadcrumb border-top"></div>
    <!-- content goes here-->
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header gradient-purple-indigo 0-hidden pb-80">
                    <div class="pt-4">
                        <div class="row">
                            <h4 class="col-md-4 text-white">Tabel Penduduk</h4>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="ul-contact-list-body">
                        <div class="ul-contact-main-content" style="height: 100%;">
                            <div class="ul-contact-content" style="width: 100%">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row mb-4">
                                            <div class="col-md-6">
                                                <form class="carian">
                                                    <input type="text" class="form-control" id="id_cari"
                                                        placeholder="Masukkan Nomor Kartu Keluarga .." name="search">
                                                    <button style="padding-top: 8px;" class="btn btn-outline-primary btn-sm"
                                                        id="btn_cari" type="button"><i class="i-Magnifi-Glass1"></i>
                                                    </button>
                                                </form>
                                            </div>
                                            <div class="col-md-6 text-right">
                                                <div id="btn_tam_hid">
                                                    <button class="btn btn-outline-success" style="padding-top:px;"
                                                        type="button" id="btn_modal"><i class="i-Add"></i> Tambah
                                                        Data</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="table-responsive" style="margin-top: 10px;" id="tabel_show">
                                            <table class="display table table-bordered" id="tabel_penduduk"
                                                style="width:100%">
                                                <thead>
                                                    <tr>
                                                        <th style="width: 5px;"></th>
                                                        <th style="width: 5px;">No</th>
                                                        <th>NIK</th>
                                                        <th>Nama</th>
                                                        <th>Hubungan Keluarga</th>
                                                        <th>Tempat, Tanggal Lahir</th>
                                                        <th>Status Pernikahan</th>
                                                        <th>Jenis Kelamin</th>
                                                        <th>Pendidikan</th>
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

    <div class="modal fade" id="modal_data" data-backdrop="static" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Form Penduduk</h5>
                    <button class="close m_close" type="button" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                </div>
                <div class="modal-body">
                    <input id="kk_dummy" hidden>
                    <form id="form_data">
                        <div class="modal-body">
                            <div class="form-group">
                                <label>Nomor Kartu Keluarga</label>
                                <input id="no_kk" name="no_kk" type="text" class="form-control" readonly>
                            </div>
                            {{-- <div class="form-group">
                                <label>Kepala Keluarga</label>
                                <select id="kepala_keluarga" name="kepala_keluarga" class="form-control" style="width:100%;"
                                    required="">
                                    <option value="" selected disabled>- Pilih Status -</option>
                                    <option value="true">Ya</option>
                                    <option value="false">Tidak</option>
                                </select>
                            </div> --}}
                            <div class="form-group">
                                <label>Foto Kartu Keluarga</label>
                                <input id="" name="kk_image" type="file" onchange="viewImg(this)"
                                    class="form-control" accept="image/png, image/jpg, image/jpeg">
                            </div>
                            <div class="form-group mt-2">
                                <img id="kk_image" style="object-fit: contain; width: 100%; height: 250px;"
                                    class="col-sm-12 img-uploaded" />
                            </div>
                            <div class="form-group">
                                <label>Foto KTP</label>
                                <input id="" name="ktp_image" type="file" onchange="viewImg(this)"
                                    class="form-control" accept="image/png, image/jpg, image/jpeg">
                            </div>
                            <div class="form-group mt-2">
                                <img id="ktp_image" style="object-fit: contain; width: 100%; height: 250px;"
                                    class="col-sm-12 img-uploaded img-uploaded-ktp" />
                            </div>
                            <div class="form-group">
                                <label>Hubungan Keluarga</label>
                                <select id="hubungan_keluarga" name="hubungan_keluarga" class="form-control"
                                    style="width:100%;" required="">
                                    <option value="" selected disabled>- Pilih Hubungan Keluarga -</option>
                                    <option value="1">Kepala Keluarga</option>
                                    <option value="2">Suami/Istri</option>
                                    <option value="3">Anak</option>
                                    <option value="4">Lainnya</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>NIK</label>
                                <input id="e_nik" name="nik" type="text" class="form-control mode_edit"
                                    required="">
                            </div>
                            <div class="form-group">
                                <label>Nama</label>
                                <input id="e_nama" name="nama" type="text" class="form-control"
                                    required="">
                            </div>
                            <div class="form-group">
                                <label>Jenis Kelamin</label>
                                <select name="jk" id="e_jk" class="form-control" style="width:100%;"
                                    required="">
                                    <option value="" selected disabled>- Pilih Jenis Kelamin -</option>
                                    <option value="L">Laki - Laki</option>
                                    <option value="P">Perempuan</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Tempat Lahir</label>
                                <input name="lahirTempat" id="e_lahirTempat" type="text" class="form-control"
                                    required="">
                            </div>
                            <div class="form-group">
                                <label>Tanggal Lahir</label>
                                <div class="input-group date">
                                    <div class="input-group-addon">
                                        <i class="fa fa-calendar"></i>
                                    </div>
                                    <input name="lahirTgl" id="e_lahirTgl" type="date" class="form-control"
                                        value="">
                                </div>
                            </div>

                            <div class="form-group">
                                <label>Agama</label>
                                <select name="agama" id="e_agama" class="form-control" style="width:100%;"
                                    required="" tabindex="-1" aria-hidden="true">
                                    <option value="" selected disabled>- Pilih Agama -</option>
                                    <option value="1">Islam</option>
                                    <option value="2">Kristen</option>
                                    <option value="3">Hindu</option>
                                    <option value="4">Katolik</option>
                                    <option value="5">Buddha</option>
                                    <option value="6">Kong Hu Cu</option>
                                </select>
                            </div>

                            <div class="form-group" id="camat_drop">
                                <label>Kecamatan</label>
                                <select id="kecamatan" class="form-control" style="width:100%;" required=""
                                    tabindex="-1" aria-hidden="true">
                                </select>
                            </div>
                            <div class="form-group" id="desa_drop">
                                <label>Kelurahan/Desa</label>
                                <select id="desa" name="wilayah" class="form-control ini_desa" style="width:100%;"
                                    required="" aria-hidden="true">
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Alamat</label>
                                <textarea name="alamat" id="e_alamat" class="form-control" rows="3" required=""></textarea>
                            </div>
                            <div class="form-group">
                                <label>Kondisi Fisik</label>
                                <select name="fisik" id="e_fisik" class="form-control" style="width:100%;"
                                    required="">
                                    <option value="" selected disabled>- Pilih Fisik -</option>
                                    <option value="2">Sehat</option>
                                    <option value="3">Cacat</option>
                                    <option value="1">Lainnya</option>

                                </select>
                            </div>
                            <div class="form-group">
                                <label>Keterangan Kondisi Fisik</label>
                                <textarea name="fisikKet" id="e_fisikKet" class="form-control" rows="3" required=""></textarea>
                            </div>
                            <div class="form-group" id="innes">
                                <label>Penyakit yang dialami</label>
                                <select id="select_penyakit" name="penyakit_id" class="form-control select"
                                    style="width:100%;" required="">
                                    <option value="" selected disabled>- Pilih Penyakit -</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label>Keterangan Kondisi Fisik</label>
                                <textarea name="penyakit_ket" id="e_penyakit_ket" class="form-control" rows="3" required=""></textarea>
                            </div>

                            <div class="form-group">
                                <label>Status Perkawinan</label>
                                <select name="statKawin" id="e_statKawin" class="form-control select"
                                    style="width:100%;" required="">
                                    <option value="" selected disabled>- Pilih Status Perkawinan -</option>
                                    <option value="1">Belum Kawin</option>
                                    <option value="2">Cerai Hidup</option>
                                    <option value="3">Cerai Mati</option>
                                    <option value="4">Kawin</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label>Status Pendidikan</label>
                                <select name="statPendidikan" id="e_statPendidikan" class="form-control select"
                                    style="width:100%;" required="">
                                    <option value="" selected disabled>- Pilih Status Pendidikan -</option>
                                    @php
                                        $arr = ['', 'Tidak/belum sekolah', 'Tidak tamat', 'SD/sederajat', 'Siswa SD/sederajat', 'Tamat SD/sederajat', 'Siswa SMP/sederajat', 'Tamat SMP/sederajat', 'Siswa SMA/sederajat', 'Tamat SMA/sederajat', 'Mahasiswa Perguruan Tinggi', 'Tamat Perguruan Tinggi'];
                                    @endphp
                                    @for ($i = 1; $i < count($arr); $i++)
                                        <option value="{{ $i }}">{{ $arr[$i] }}</option>
                                    @endfor
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Hidup</label>
                                <select name="hidup" id="e_hidup" class="form-control select" style="width:100%;"
                                    required="">
                                    <option value="" selected disabled>- Pilih Status Hidup -</option>
                                    <option value="true">Ya</option>
                                    <option value="false">Tidak</option>
                                </select>
                            </div>

                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <div id="m_tambah">
                        <button class="btn btn-outline-warning btn-sm m_close" type="button"
                            data-dismiss="modal">Batal</button>
                        <button class="btn btn-outline-primary btn-sm" id="btn_tambah" type="button"><i
                                class="i-Add"></i>
                            Tambah Data</button>
                    </div>
                    <div id="m_edit">
                        <button class="btn btn-outline-warning btn-sm m_close" type="button"
                            data-dismiss="modal">Batal</button>
                        <button class="btn btn-outline-primary btn-sm" id="btn_update" type="button"><i
                                class="i-Edit"></i>
                            Ubah Data</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('tambah_js')

    <script>
        $(document).ready(function() {
            // loadData('asd');
            $('#m_tambah').hide();
            $('#m_edit').hide();

            $("#select_penyakit").select2({
                dropdownParent: $('#innes')
            });
            $("#kecamatan").select2({
                dropdownParent: $('#camat_drop')
            });
            $("#desa").select2({
                dropdownParent: $('#desa_drop')
            });

            $('.img-uploaded').attr('src', "{{ env('API_URL') }}/kemiskinan-public/storages/images/no-images.png")
            $("#tabel_show").hide()
            $("#btn_tam_hid").hide()
        });

        $("#btn_cari").click(function() {
            id = $('#id_cari').val();

            $.ajax({
                type: "GET",
                url: "{{ env('API_URL') }}/kemiskinan/keluarga/no_kk/" + id,
                headers: {
                    "Authorization": "Bearer {{ Session::get('token') }}"
                },
                success: function(data) {
                    if (data.data) {
                        $("#btn_tam_hid").show(300);
                        $('#no_kk').val(data.data.no_kk);
                        $('#kk_dummy').val(data.data.no_kk);
                        $('#kk_image').attr('src', "{{ env('API_URL') }}/kemiskinan-public" + data.data
                            .kk_image)

                        loadData(id);
                    } else {
                        sweetRes("error", "500", "Server Error!");
                    }
                },
                error: function(error) {
                    // console.log(error.responseJSON.statusCode)
                    if (error.responseJSON.statusCode == 400) {
                        $("#tabel_show").hide()
                        $("#btn_tam_hid").hide(300);

                        const swalWithBootstrapButtons = Swal.mixin({
                            customClass: {
                                confirmButton: "btn btn-success",
                                cancelButton: "btn btn-danger mr-2",
                            },
                            buttonsStyling: false,
                        });

                        swalWithBootstrapButtons
                            .fire({
                                title: "Data tidak ditemukan",
                                text: "Apakah ingin membiuat data keluarga baru?",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonText: "Ya",
                                cancelButtonText: "Tidak",
                                reverseButtons: true,
                            })
                            .then((result) => {
                                if (result.isConfirmed) {
                                    $('#no_kk').val(id);
                                    $('#kk_dummy').val(id);
                                    getPenyakit();
                                    getCamat();
                                    $('#m_tambah').show();
                                    $('#m_edit').hide();
                                    $('.mode_edit').prop('readonly', false);
                                    $('#modal_data').modal('show');

                                } else if (
                                    result.dismiss === Swal.DismissReason.cancel
                                ) {
                                    swalWithBootstrapButtons.fire("", "Dibatalkan", "error");
                                }
                            });
                    } else {
                        sweetRes("error", "500", "Server Error!");
                    }
                }
            });
        });

        $(".m_close").click(function() {
            id = $('#id_cari').val();
            $('#no_kk').val("");
            $('#kk_dummy').val("");
            $("#form_data")[0].reset();
            $('#modal_data').modal('hide');
        })

        $("#btn_modal").click(function() {
            $('.img-uploaded-ktp').attr('src',
                "{{ env('API_URL') }}/kemiskinan-public/storages/images/no-images.png")
            id = $('#id_cari').val();
            $('#no_kk').val(id);
            $('#kk_dummy').val(id);
            $('#m_tambah').show();
            $('#m_edit').hide();
            $('.mode_edit').prop('readonly', false);

            $('#modal_data').modal('show');

            getPenyakit();
            getCamat();
        });

        $('#kecamatan').on('change', function() {
            var kecamatan = $('#kecamatan').val();
            getDesa(kecamatan);
        });

        function getPenyakit() {

            var select = $('#select_penyakit');
            $.ajax({
                type: "GET",
                url: "{{ env('API_URL') }}/kemiskinan/data/penyakit",
                headers: {
                    "Authorization": "Bearer {{ Session::get('token') }}"
                },
                success: function(data) {
                    // console.log(data);
                    var htmlOptions = [];
                    if (data.data.length) {
                        html = '<option value="" selected disabled>- Pilih Penyakit -</option>';
                        htmlOptions[htmlOptions.length] = html;
                        for (item in data.data) {
                            html = '<option value="' + data.data[item]._id + '">' + data.data[item]
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

        function getDesa(id) {
            var select = $('#desa');
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

        function loadData(id) {
            // console.log(id)
            $('#tabel_penduduk').DataTable({
                paging: false,
                "bPaginate": false,
                info: false,
                searching: true,
                autoWidth: true,
                responsive: false,
                destroy: true,
                processing: true,
                serverSide: false,
                ajax: {
                    url: "{{ env('API_URL') }}/kemiskinan/keluarga/no_kk/" + id,
                    type: 'GET',
                    headers: {
                        "Authorization": "Bearer {{ Session::get('token') }}"
                    },
                    dataSrc: "data.keluarga_penduduk",
                    // success: function(data) {
                    //     console.log(data);
                    //     if(!data.data){
                    //         alert('Tidak Ada Data')
                    //     }
                    // },
                    // error: function(error) {
                    //     console.log(error);
                    // },
                },
                columns: [{
                        data: null,
                        render: function(data, type, row) {
                            return `
                            <button class="btn bg-transparent _r_btn btn-sm" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="_dot _r_block-dot bg-dark"></span>
                                <span class="_dot _r_block-dot bg-dark"></span>
                                <span class="_dot _r_block-dot bg-dark"></span>
                            </button>
                            <div class="dropdown-menu" x-placement="bottom-start">
                                <button id="` + data.data_penduduk._id + `" onClick="edit_data(this.id)" type="button" class="dropdown-item" >
                                    <i class="nav-icon i-Pen-2 text-success font-weight-bold mr-2"></i>
                                        Ubah
                                </button>
                                <button type="button" id="` + data.data_penduduk._id + `" onClick="hapus_data(this.id)" class="dropdown-item" >
                                    <i class="nav-icon i-Close-Window text-danger font-weight-bold mr-2"></i>
                                        Hapus
                                </button>
                            </div>`;

                        },
                    },
                    {
                        "data": null,
                        "sortable": false,
                        render: function(data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        }
                    },
                    {
                        data: 'data_penduduk.nik',
                    },
                    {
                        data: 'data_penduduk.nama',
                    },
                    {
                        data: 'level',
                        render: function(data, type, row) {
                            if (data == "1") {
                                return "Kepala Keluarga";
                            } else if (data == "2") {
                                return "Suami/Istri";
                            } else if (data == "3") {
                                return "Anak";
                            } else if (data == "4") {
                                return "Lainnya";
                            }
                        }
                    },
                    {
                        data: 'null',
                        render: function(data, type, row) {
                            return "" + row.data_penduduk.lahir.tempat + " " + dateformat(row.data_penduduk
                                .lahir.tanggal);
                        }
                    },
                    {
                        data: 'data_penduduk.status_pernikahan',
                        render: function(data, type, row) {
                            let arr = ['',
                                'Belum Kawin', 'Cerai Hidup', 'Cerai Mati', 'Kawin'
                            ]
                            return arr[data];
                        }
                    },
                    {
                        data: 'data_penduduk.jk',
                        render: function(data, type, row) {
                            if (data == "L") {
                                return "Laki-Laki";
                            } else {
                                return "Perempuan";
                            }
                        }
                    },
                    {
                        data: 'data_penduduk.pendidikan_id',
                        render: function(data, type, row) {
                            let arr = ['', 'Tidak/belum sekolah', 'Tidak tamat', 'SD/sederajat',
                                'Siswa SD/sederajat', 'Tamat SD/sederajat', 'Siswa SMP/sederajat',
                                'Tamat SMP/sederajat', 'Siswa SMA/sederajat', 'Tamat SMA/sederajat',
                                'Mahasiswa Perguruan Tinggi', 'Tamat Perguruan Tinggi'
                            ]
                            return arr[data];
                        }
                    },
                ],
            });

            $("#tabel_show").show(300)
        }

        function edit_data(id) {
            getPenyakit();
            getCamat();
            $.ajax({
                type: "GET",
                url: "{{ env('API_URL') }}/kemiskinan/penduduk/" + id,
                headers: {
                    "Authorization": "Bearer {{ Session::get('token') }}"
                },
                success: function(data) {
                    // console.log(data.data);
                    if (data.statusCode != 200) {
                        return;
                    }
                    $('#kecamatan').val(data.data.alamat.kecamatan_kode).change();
                    $('#e_nik').val(data.data.nik);
                    $('#e_nama').val(data.data.nama);
                    $('#e_lahirTempat').val(data.data.lahir.tempat);
                    $('#e_lahirTgl').val(dateformatEdit(data.data.lahir.tanggal));
                    $('#e_alamat').val(data.data.alamat.alamat_nama);
                    $('#e_agama').val(data.data.agama).change();
                    if (data.data.fisik) {
                        $('#e_fisik').val(data.data.fisik.fisik_id).change()
                        $('#e_fisikKet').val(data.data.fisik.keterangan)
                    }
                    $('#ktp_image').attr('src', "{{ env('API_URL') }}/kemiskinan-public" + data.data.ktp_image)

                    $('#e_penyakit_ket').val(data.data.penyakit ? data.data.penyakit.keterangan : '-')

                    $('#e_statKawin').val(data.data.status_pernikahan).change();
                    $('#e_statPendidikan').val(data.data.pendidikan_id).change();
                    $('#e_jk').val(data.data.jk).change();
                    if (data.data.hidup == true) {
                        $('#e_hidup').val('true').change();
                    } else {
                        $('#e_hidup').val('false').change();
                    }

                    $('#no_kk').val(data.data.keluarga_penduduk['0'].keluarga.no_kk);
                    $('#hubungan_keluarga').val(data.data.keluarga_penduduk['0'].level).change();

                    setTimeout(function() {
                        $('#desa').val(data.data.alamat.kelurahan_kode).change();
                        $('#select_penyakit').val(data.data.penyakit ? data.data.penyakit.penyakit_id :
                            '-').change();
                    }, 500);

                    $('.mode_edit').prop('readonly', true);
                },
                error: function(error) {
                    console.log(error);
                }
            });
            $('#m_tambah').hide();
            $('#m_edit').show();
            $('#modal_data').modal('show');

        }

        function hapus_data(id) {
            // console.log(id);
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: "btn btn-success",
                    cancelButton: "btn btn-danger mr-2",
                },
                buttonsStyling: false,
            });

            swalWithBootstrapButtons
                .fire({
                    title: "Data akan dihapus?",
                    text: "Data dihapus tidak dapat dikembalikan!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Ya, hapus",
                    cancelButtonText: "Tidak, batalkan",
                    reverseButtons: true,
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        $.ajax({
                            url: "{{ env('API_URL') }}/kemiskinan/penduduk/" + id,
                            type: "DELETE",
                            headers: {
                                "Authorization": "Bearer {{ Session::get('token') }}"
                            },
                        });
                        swalWithBootstrapButtons.fire(
                            "Terhapus!",
                            "Data Berhasil diHapus!.",
                            "success"
                        );

                        idkk = $('#id_cari').val();
                        loadData(idkk);
                    } else if (
                        /* Read more about handling dismissals below */
                        result.dismiss === Swal.DismissReason.cancel
                    ) {
                        swalWithBootstrapButtons.fire("Dibatalkan", "", "error");
                    }
                });
        }

        $('#btn_tambah').click(function() {
            event.preventDefault();
            idata = new FormData($('#form_data')[0]);
            // console.log(idata);
            $.ajax({
                type: "POST",
                url: "{{ env('API_URL') }}/kemiskinan/penduduk",
                data: idata,
                headers: {
                    "Authorization": "Bearer {{ Session::get('token') }}"
                },
                processData: false,
                contentType: false,
                cache: false,
                success: function(data) {
                    // console.log(data);
                    Swal.fire({
                        icon: 'success',
                        title: "",
                        text: 'Data berhasil ditambahkan!',
                        customClass: {
                            confirmButton: 'btn btn-success'
                        }
                    });
                    idkk = $('#kk_dummy').val();
                    loadData(idkk);
                    $("#form_data")[0].reset();
                    $('#modal_data').modal('hide');
                },
                error: function(error) {
                    Swal.fire({
                        icon: 'error',
                        title: error.responseJSON.errors['0'].msg + " (" + error.responseJSON
                            .errors['0'].param + ")",
                        text: '',
                        customClass: {
                            confirmButton: 'btn btn-success'
                        }
                    });
                    console.log(error);
                }
            });
        });


        $('#btn_update').click(function() {
            event.preventDefault();
            idata = new FormData($('#form_data')[0]);
            $.ajax({
                type: "POST",
                url: "{{ env('API_URL') }}/kemiskinan/penduduk",
                data: idata,
                headers: {
                    "Authorization": "Bearer {{ Session::get('token') }}"
                },
                processData: false,
                contentType: false,
                cache: false,
                success: function(data) {
                    // console.log(data);
                    Swal.fire({
                        icon: 'success',
                        title: "Data berhasil diubah!",
                        text: '',
                        customClass: {
                            confirmButton: 'btn btn-success'
                        }
                    });
                    idkk = $('#kk_dummy').val();
                    loadData(idkk);
                    $("#form_data")[0].reset();
                    $('#modal_data').modal('hide');
                },
                error: function(error) {
                    Swal.fire({
                        icon: 'error',
                        title: error.responseJSON.errors['0'].msg + " (" + error.responseJSON
                            .errors['0'].param + ")",
                        text: '',
                        customClass: {
                            confirmButton: 'btn btn-success'
                        }
                    });
                    console.log(error);
                }
            });
        });

        function viewImg(input) {
            if (input.files && input.files[0]) {
                var batasImg = 204800;
                if (input.files[0]['size'] <= batasImg) {
                    var reader = new FileReader();
                    var nama = $(input).attr('name');
                    // console.log(input.files[0]['size']);

                    reader.onload = function(e) {
                        $('#' + nama).attr('src', e.target.result);
                    }

                    reader.readAsDataURL(input.files[0]);
                } else {

                    Swal.fire({
                        icon: 'warning',
                        title: '',
                        text: 'Foto terlalu berat! Maximal 200 KB',
                        customClass: {
                            confirmButton: 'btn btn-success'
                        }
                    });
                    $(input).val("");
                    // console.log($(input).val());
                }
            }
        }
    </script>
@endsection
