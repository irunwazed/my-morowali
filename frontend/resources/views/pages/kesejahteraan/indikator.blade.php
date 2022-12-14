@extends('temp.temp')

@section('judul', 'Kesejahteraan - SEPAKAD')

@section('tambah_css')


    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.1/css/jquery.dataTables.min.css" />
    <style>
        * {
            box-sizing: border-box;
        }

        /* Style the search field */
        div.carian input[type=text] {
            padding: 10px;
            font-size: 13px;
            float: left;
            width: 85%;
        }

        /* Style the submit button */
        div.carian button {
            float: left;
            width: 40px;
            margin-left: 5px;
            font-size: 13px;
            cursor: pointer;
        }

        div.carian button:hover {}

        /* Clear floats */
        div.carian::after {
            content: "";
            clear: both;
            display: table;
        }
    </style>
@endsection

@section('isi')

    <div class="breadcrumb">
        <h1>Kesejahteraan</h1>
    </div>
    <div class="separator-breadcrumb border-top"></div>
    <!-- content goes here-->
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header gradient-purple-indigo 0-hidden pb-80">
                    <div class="pt-4">
                        <div class="row">
                            <div class="col-md-6">
                                <h4 class=" text-white">Tabel Data Kesejahteraan</h4>
                            </div>
                            <div class="col-md-6 text-right"><button class="btn btn-secondary" style="padding-top:8px;"
                                    type="button" id="btn_modal"><i class="i-Add"></i> Tambah Data</button></div>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="ul-contact-list-body">
                        <div class="ul-contact-main-content" style="height: 100%;">
                            <div class="ul-contact-content" style="width: 100%">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="table-responsive" style="margin-top: 10px;">
                                            <table class="display table table-bordered" id="tabel_data" style="width:100%">
                                                <thead>
                                                    <tr>
                                                        <th style="width: 5px;"></th>
                                                        <th style="width: 5px;">No</th>
                                                        <th>Nomor KK</th>
                                                        <th>Nama Kepala</th>
                                                        <th>Pendapatan Utama (Tahun)</th>
                                                        <th>Pendapatan Sampingan (Tahun)</th>
                                                        <th>Pengeluaran Total (Tahun)</th>
                                                        <th>Status Kesejahteraan</th>
                                                        <th>tahun</th>
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
        <div class="modal-dialog modal-dialog-centered  modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Form Kesejahteraan</h5>
                    <button class="close m_close" type="button" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                </div>
                <div class="modal-body">
                    <form id="form_data" class="m-3">
                        <input id="e_id" hidden>

                        <div class="form-group" id="input_kk_s">
                            <label>Nomor Kartu Keluarga</label>
                            <div class="carian">
                                <input type="text" class="form-control" id="id_cari" placeholder="" name="search">
                                <button style="padding-top: 8px;" class="btn btn-outline-primary btn-sm" id="btn_cari"
                                    type="button"><i class="i-Magnifi-Glass1"></i>
                                </button>
                            </div>
                            <hr>
                        </div>

                        <div id="show_data">

                            <input hidden id="asd_id" type="text" class="form-control">
                            <input hidden id="keluarga_id" name="keluarga_id" type="text" class="form-control">
                            <div class="form-group" id="no_kk_e">
                                <label>Nomor Kartu Keluarga</label>
                                <input id="no_kk_ed" type="text" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Tahun</label>
                                <select id="tahun" name="tahun" class="form-control" style="width:100%;" required>
                                    <option value="" selected disabled>- Pilih Tahun -</option>
                                    @for ($tah = date('Y') + 1; $tah > 2010; $tah--)
                                        <option value={{ $tah }}>{{ $tah }}</option>
                                    @endfor
                                </select>
                            </div>

                            <div class="form-group mt-4">
                                <label>Pendapatan Utama (Tahun)</label>
                                <input id="pendapatan_utama" name="pendapatan_utama" type="number" class="form-control"
                                    required>
                            </div>
                            <div class="form-group">
                                <label>Pendapatan Sampingan (Tahun)</label>
                                <input id="pendapatan_sampingan" name="pendapatan_sampingan" type="number"
                                    class="form-control" required>
                            </div>
                            <div class="form-group">
                                <label>Pengeluaran Total (Tahun)</label>
                                <input id="pengeluaran_total" name="pengeluaran_total" type="number" class="form-control"
                                    required>
                            </div>




                            <div class="row  mt-4">
                                <div class="col-md-6">
                                    <div class="form-group ">
                                        <label>Kepemilikan Rumah</label>
                                        <select id="indikator_rumah_id" name="indikator_rumah_id" class="form-control"
                                            style="width:100%;" required>
                                        </select>
                                    </div>

                                    <div class="form-group">
                                        <label>Ukuran Rumah (m²)</label>
                                        <input id="indikator_rumah_ukuran" name="indikator_rumah_ukuran" type="text"
                                            class="form-control" required>
                                    </div>
                                    <div class="form-group">
                                        <label>Keterangan Rumah</label>
                                        <textarea name="indikator_rumah_ket" id="indikator_rumah_ket" class="form-control" rows="5" required></textarea>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Foto Rumah</label>
                                        <input id="" name="indikator_rumah_image" type="file"
                                            onchange="viewImg(this)" class="form-control"
                                            accept="image/png, image/jpg, image/jpeg">
                                    </div>
                                    <div class="form-group mt-2">
                                        <img id="indikator_rumah_image"
                                            style="object-fit: contain; width: 100%; height: 250px;"
                                            class="col-sm-12 img-uploaded" />
                                    </div>
                                </div>
                            </div>

                            <div class="row  mt-4">
                                <div class="col-md-6">
                                    <div class="form-group ">
                                        <label>Atap</label>
                                        <select id="indikator_atap_id" name="indikator_atap_id" class="form-control"
                                            style="width:100%;" required>

                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>Keterangan Atap</label>
                                        <textarea name="indikator_atap_ket" id="indikator_atap_ket" class="form-control" rows="5" required></textarea>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Foto Atap</label>
                                        <input id="" name="indikator_atap_image" type="file"
                                            onchange="viewImg(this)" class="form-control"
                                            accept="image/png, image/jpg, image/jpeg">
                                    </div>
                                    <div class="form-group mt-2">
                                        <img id="indikator_atap_image"
                                            style="object-fit: contain; width: 100%; height: 250px;"
                                            class="col-sm-12 img-uploaded" />
                                    </div>
                                </div>
                            </div>



                            <div class="row  mt-4">
                                <div class="col-md-6">
                                    <div class="form-group  ">
                                        <label>Bahan Bakar</label>
                                        <select id="indikator_bahan_bakar_id" name="indikator_bahan_bakar_id"
                                            class="form-control" style="width:100%;" required>

                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>Keterangan Bahan Bakar</label>
                                        <textarea name="indikator_bahan_bakar_ket" id="indikator_bahan_bakar_ket" class="form-control" rows="5"
                                            required></textarea>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Foto Bahan Bakar</label>
                                        <input id="" name="indikator_bahan_bakar_image" onchange="viewImg(this)"
                                            type="file" class="form-control"
                                            accept="image/png, image/jpg, image/jpeg">
                                    </div>
                                    <div class="form-group mt-2">
                                        <img id="indikator_bahan_bakar_image"
                                            style="object-fit: contain; width: 100%; height: 250px;"
                                            class="col-sm-12 img-uploaded" />
                                    </div>
                                </div>
                            </div>


                            <div class="row  mt-4">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Dinding</label>
                                        <select id="indikator_dinding_id" name="indikator_dinding_id"
                                            class="form-control" style="width:100%;" required>
                                            <option value="" selected disabled>- Pilih Dinding -</option>

                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>Keterangan Dinding</label>
                                        <textarea name="indikator_dinding_ket" id="indikator_dinding_ket" class="form-control" rows="5" required></textarea>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Foto Dinding</label>
                                        <input id="" name="indikator_dinding_image" type="file"
                                            onchange="viewImg(this)" class="form-control"
                                            accept="image/png, image/jpg, image/jpeg">
                                    </div>
                                    <div class="form-group mt-2">
                                        <img id="indikator_dinding_image"
                                            style="object-fit: contain; width: 100%; height: 250px;"
                                            class="col-sm-12 img-uploaded" />
                                    </div>
                                </div>
                            </div>



                            <div class="row  mt-4">
                                <div class="col-md-6">
                                    <div class="form-group ">
                                        <label>Jamban</label>
                                        <select id="indikator_jamban_id" name="indikator_jamban_id" class="form-control"
                                            style="width:100%;" required>

                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>Keterangan Jamban</label>
                                        <textarea name="indikator_jamban_ket" id="indikator_jamban_ket" class="form-control" rows="5" required></textarea>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Foto Jamban</label>
                                        <input id="" name="indikator_jamban_image" type="file"
                                            onchange="viewImg(this)" class="form-control"
                                            accept="image/png, image/jpg, image/jpeg">
                                    </div>
                                    <div class="form-group mt-2">
                                        <img id="indikator_jamban_image"
                                            style="object-fit: contain; width: 100%; height: 250px;"
                                            class="col-sm-12 img-uploaded" />
                                    </div>
                                </div>
                            </div>



                            <div class="row  mt-4">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Lantai</label>
                                        <select id="indikator_lantai_id" name="indikator_lantai_id" class="form-control"
                                            style="width:100%;" required>

                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>Keterangan Lantai</label>
                                        <textarea name="indikator_lantai_ket" id="indikator_lantai_ket" class="form-control" rows="5" required></textarea>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Foto Lantai</label>
                                        <input id="" name="indikator_lantai_image" type="file"
                                            onchange="viewImg(this)" class="form-control"
                                            accept="image/png, image/jpg, image/jpeg">
                                    </div>
                                    <div class="form-group mt-2">
                                        <img id="indikator_lantai_image"
                                            style="object-fit: contain; width: 100%; height: 250px;"
                                            class="col-sm-12 img-uploaded" />
                                    </div>
                                </div>
                            </div>


                            <div class="row  mt-4">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Penerangan</label>
                                        <select id="indikator_penerangan_id" name="indikator_penerangan_id"
                                            class="form-control" style="width:100%;" required>

                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>Keterangan Penerangan</label>
                                        <textarea name="indikator_penerangan_ket" id="indikator_penerangan_ket" class="form-control" rows="5"
                                            required></textarea>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Foto Penerangan</label>
                                        <input id="" name="indikator_penerangan_image" onchange="viewImg(this)"
                                            type="file" class="form-control"
                                            accept="image/png, image/jpg, image/jpeg">
                                    </div>
                                    <div class="form-group mt-2">
                                        <img id="indikator_penerangan_image"
                                            style="object-fit: contain; width: 100%; height: 250px;"
                                            class="col-sm-12 img-uploaded" />
                                    </div>
                                </div>
                            </div>

                            <div class="row  mt-4">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Sumber Air Minum</label>
                                        <select id="indikator_sumber_air_id" name="indikator_sumber_air_id"
                                            class="form-control" style="width:100%;" required>

                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>Keterangan Sumber Air Minum</label>
                                        <textarea name="indikator_sumber_air_ket" id="indikator_sumber_air_ket" class="form-control" rows="5"
                                            required></textarea>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Foto Sumber Air Minum</label>
                                        <input id="" name="indikator_sumber_air_image" onchange="viewImg(this)"
                                            type="file" class="form-control"
                                            accept="image/png, image/jpg, image/jpeg">
                                    </div>
                                    <div class="form-group mt-2">
                                        <img id="indikator_sumber_air_image"
                                            style="object-fit: contain; width: 100%; height: 250px;"
                                            class="col-sm-12 img-uploaded" />
                                    </div>
                                </div>
                            </div>

                            <div class="form-group mt-4">
                                <label>Status Kesejahteraan</label>
                                <select id="status_kesejahteraan" name="status_kesejahteraan" class="form-control"
                                    style="width:100%;" required>
                                    <option value="" selected disabled>- Pilih Status Kesejahteraan -</option>
                                    <option value="1">Sangat Miskin</option>
                                    <option value="2">Miskin</option>
                                    <option value="3">Rentan Miskin</option>
                                    <option value="4">Menuju Miskin</option>
                                    <option value="5">Middle Class</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <div id="m_tambah">
                        <button class="btn btn-outline-warning btn-sm m_close" type="button"
                            data-dismiss="modal">Batal</button>
                        <button class="btn btn-outline-primary btn-sm" form="form_data" type="submit"><i
                                class="i-Add"></i>
                            Tambah Data</button>
                    </div>
                    <div id="m_edit">
                        <button class="btn btn-outline-warning btn-sm m_close" type="button"
                            data-dismiss="modal">Batal</button>
                        <button class="btn btn-outline-primary btn-sm" form="form_data" id="btn_update"
                            type="submit"><i class="i-Edit"></i>
                            Ubah Data</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('tambah_js')

    <script src="{{ asset('') }}assets/dist-assets/js/jquery.mask.js"></script>
    <script src="{{ asset('') }}assets/dist-assets/js/jquery.inputfilter.js"></script>
    <script src="https://cdn.datatables.net/1.13.1/js/jquery.dataTables.min.js"></script>

    <script>
        var formStatus = '';

        $(document).ready(function() {
            loadData();
            $('#m_tambah').hide();
            $('#m_edit').hide();
            $('#show_data').hide();

            getRumah();
            getAtap();
            getBahanbakar();
            getdinding();
            getJamban();
            getLantai();
            getPenerangan();
            getSumberair();

            // $(".angka").inputFilter(function(value) {
            //     return /^-?\d*$/.test(value);
            // }, "");

            $('.uang').mask('000.000.000.000.000', {
                reverse: true
            });

            $("#keluarga").select2({
                dropdownParent: $('#keluarga_drop')
            });
        });

        $('.m_close').click(function() {
            $("#form_data")[0].reset();
            $('#show_data').hide();
            $('#modal_data').modal('hide');
        })

        $("#btn_modal").click(function() {
            $('.img-uploaded').attr('src', "{{ env('API_URL') }}/kemiskinan-public/storages/images/no-images.png")

            $("#input_kk_s").show(300);
            $("#no_kk_e").hide();
            $("#form_data")[0].reset();
            $('#m_tambah').hide();
            $('#m_edit').hide();
            // $('#indikator_rumah_image').attr('src', "");
            // $('#indikator_atap_image').attr('src', "");
            // $('#indikator_bahan_bakar_image').attr('src', "");
            // $('#indikator_jamban_image').attr('src', "");
            // $('#indikator_lantai_image').attr('src', "");
            // $('#indikator_penerangan_image').attr('src', "");
            // $('#indikator_dinding_image').attr('src', "");
            // $('#indikator_sumber_air_image').attr('src', "");
            $('#modal_data').modal('show');
            formStatus = 'create';
        });

        $("#btn_cari").click(function() {
            $('#m_tambah').show();
            $('#m_edit').hide();
            id = $('#id_cari').val();


            $.ajax({
                type: "GET",
                url: "{{ env('API_URL') }}/kemiskinan/keluarga/no_kk/" + id,
                headers: {
                    "Authorization": "Bearer {{ Session::get('token') }}"
                },
                success: function(data) {
                    // console.log(data)
                    if (data.data) {
                        $('#keluarga_id').val(data.data._id);
                        $("#show_data").show(1000);
                    } else {
                        $("#show_data").hide(1000);
                        $('#m_tambah').hide();
                        Swal.fire({
                            icon: 'error',
                            title: data.message,
                            // title: 'Nomor Kartu Keluarga Tidak Terdaftar',
                            text: '',
                            customClass: {
                                confirmButton: 'btn btn-danger'
                            }
                        });
                    }
                },
                error: function(error) {
                    console.log(error);
                }
            });
        });

        function loadData() {
            $('#tabel_data').DataTable({
                paging: true,
                searching: true,
                autoWidth: false,
                responsive: false,
                info: true,
                destroy: true,
                processing: false,
                ordering: true,
                serverSide: true,
                ajax: {
                    url: "{{ env('API_URL') }}/kemiskinan/kesejahteraan",
                    type: 'GET',
                    headers: {
                        "Authorization": "Bearer {{ Session::get('token') }}"
                    },
                    "dataSrc": "data",
                    success: function(data) {
                    console.log(data);
                    },
                    error: function(error) {
                        console.log(error);
                    },
                },
                columns: [{
                        data: null,
                        render: function(data, type, row) {
                            return `
                                <button class="btn bg-transparent _r_btn btn-sm" type="button" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                    <span class="_dot _r_block-dot bg-dark"></span>
                                    <span class="_dot _r_block-dot bg-dark"></span>
                                    <span class="_dot _r_block-dot bg-dark"></span>
                                </button>
                                <div class="dropdown-menu" x-placement="bottom-start">
                                    <button id="` + data._id + `" onClick="edit_data(this.id)" type="button" class="dropdown-item">
                                        <i class="nav-icon i-Pen-2 text-success font-weight-bold mr-2"></i>
                                        Ubah
                                    </button>
                                    <button type="button" id="` + data._id + `" onClick="hapus_data(this.id)" class="dropdown-item">
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
                        data: null,
                        render: function(data, type, row) {
                            return data.kepala_keluarga.no_kk ? data.kepala_keluarga.no_kk : "-";
                        }
                    },
                    {
                        data: null,
                        render: function(data, type, row) {
                            return data.kepala_keluarga.nama ? data.kepala_keluarga.nama : "-";
                        }
                    },
                    {
                        data: 'keuangan.pendapatan_utama',
                        render: function(data, type, row) {
                            return data ? rupiah(data) : "-";
                        }
                    },
                    {
                        data: 'keuangan.pendapatan_sampingan',
                        render: function(data, type, row) {
                            return data ? rupiah(data) : "-";
                        }
                    },
                    {
                        data: 'keuangan.pengeluaran_total',
                        render: function(data, type, row) {
                            return data ? rupiah(data) : "-";
                        }
                    },
                    {
                        data: 'status_kesejahteraan',
                        render: function(data, type, row) {
                            if (data == "1") {
                                return "Sangat Miskin";
                            } else if (data == "2") {
                                return "Miskin";
                            } else if (data == "3") {
                                return "Rentan Miskin";
                            } else if (data == "4") {
                                return "Menuju Miskin";
                            } else if (data == "5") {
                                return "Middle Class";
                            }
                        }
                    },
                    {
                        data: 'tahun',
                    },
                ],
                'columnDefs': [{
                    "targets": [4, 5, 6],
                    "className": "text-center",
                }, {
                    "targets": [7, 8],
                    "className": "text-center",
                }, ]
            });
        }

        $('#form_data').on('submit', function(e) {
            e.preventDefault();
            idata = new FormData($('#form_data')[0]);
            // console.log(idata);
            let url = ""
            let method = ""
            if (formStatus == 'edit') {
                id = $('#asd_id').val();
                url = '{{ env('API_URL') }}/kemiskinan/kesejahteraan/' + id
                method = 'PUT'
                msg = "Data berhasil diubah!"
            } else {
                url = '{{ env('API_URL') }}/kemiskinan/kesejahteraan'
                method = 'POST'
                msg = "Data berhasil ditambahkan!"
            }


            $.ajax({
                type: method,
                url: url,
                data: idata,
                headers: {
                    "Authorization": "Bearer {{ Session::get('token') }}"
                },
                processData: false,
                contentType: false,
                cache: false,
                success: function(data) {
                    console.log(data);

                    Swal.fire({
                        icon: 'success',
                        title: '',
                        text: msg,
                        customClass: {
                            confirmButton: 'btn btn-success'
                        }
                    });
                    $("#form_data")[0].reset();
                    $('#modal_data').modal('hide');
                    loadData();
                },
                error: function(error) {
                    if (error.responseJSON.message) {
                        title2 = error.responseJSON.message;
                    } else {
                        title2 = error.responseJSON.errors['0'].msg + " (" + error.responseJSON.errors[
                            '0'].param + ")"
                    }

                    Swal.fire({
                        icon: 'error',
                        title: title2,
                        text: '',
                        customClass: {
                            confirmButton: 'btn btn-success'
                        }
                    });
                    console.log(error);
                }
            });
        });

        function edit_data(id) {
            $('#show_data').show();
            $("#no_kk_e").show();
            $("#input_kk_s").hide();
            $("#no_kk_ed").attr('disabled', 'disabled');
            $("#form_data")[0].reset();
            formStatus = 'edit';

            // console.log(id);
            $.ajax({
                type: "GET",
                url: "{{ env('API_URL') }}/kemiskinan/kesejahteraan/" + id,
                headers: {
                    "Authorization": "Bearer {{ Session::get('token') }}"
                },
                success: function(data) {
                    // console.log(data.data);
                    if (data.statusCode != 200) {
                        return;
                    }

                    $('#e_id').val(data.data._id);
                    $('#asd_id').val(data.data._id);
                    $('#keluarga_id').val(data.data.keluarga_id);
                    $('#no_kk_ed').val(data.data.kepala_keluarga.no_kk);
                    $('#tahun').val(data.data.tahun).change();
                    if (typeof data.data.keuangan === "undefined") {
                        $('#pendapatan_utama').val('')
                        $('#pendapatan_sampingan').val('')
                        $('#pengeluaran_total').val('')
                    } else {
                        $('#pendapatan_utama').val(data.data.keuangan.pendapatan_utama)
                        $('#pendapatan_sampingan').val(data.data.keuangan.pendapatan_sampingan);
                        $('#pengeluaran_total').val(data.data.keuangan.pengeluaran_total);
                    }
                    $('#indikator_rumah_ukuran').val(data.data.indikator.rumah.ukuran);
                    $('#indikator_rumah_id').val(data.data.indikator.rumah.rumah_id);
                    $('#indikator_rumah_ket').val(data.data.indikator.rumah.keterangan);
                    $('#indikator_rumah_image').attr('src', "{{ env('API_URL') }}/kemiskinan-public" + data
                        .data.indikator.rumah.image);
                    $('#indikator_atap_id').val(data.data.indikator.atap.atap_id);
                    $('#indikator_atap_ket').val(data.data.indikator.atap.keterangan);
                    $('#indikator_atap_image').attr('src', "{{ env('API_URL') }}/kemiskinan-public" + data.data
                        .indikator.atap.image);
                    $('#indikator_bahan_bakar_id').val(data.data.indikator.bahan_bakar.bahan_bakar_id);
                    $('#indikator_bahan_bakar_ket').val(data.data.indikator.bahan_bakar.keterangan);
                    $('#indikator_bahan_bakar_image').attr('src', "{{ env('API_URL') }}/kemiskinan-public" +
                        data.data.indikator.bahan_bakar.image);
                    $('#indikator_jamban_id').val(data.data.indikator.jamban.jamban_id);
                    $('#indikator_jamban_ket').val(data.data.indikator.jamban.keterangan);
                    $('#indikator_jamban_image').attr('src', "{{ env('API_URL') }}/kemiskinan-public" + data
                        .data.indikator.jamban.image);
                    $('#indikator_lantai_id').val(data.data.indikator.lantai.lantai_id);
                    $('#indikator_lantai_ket').val(data.data.indikator.lantai.keterangan);
                    $('#indikator_lantai_image').attr('src', "{{ env('API_URL') }}/kemiskinan-public" + data
                        .data.indikator.lantai.image);
                    $('#indikator_penerangan_id').val(data.data.indikator.penerangan.penerangan_id);
                    $('#indikator_penerangan_ket').val(data.data.indikator.penerangan.keterangan);
                    $('#indikator_penerangan_image').attr('src', "{{ env('API_URL') }}/kemiskinan-public" +
                        data.data.indikator.penerangan.image);
                    $('#indikator_dinding_id').val(data.data.indikator.dinding.dinding_id);
                    $('#indikator_dinding_ket').val(data.data.indikator.dinding.keterangan);
                    $('#indikator_dinding_image').attr('src', "{{ env('API_URL') }}/kemiskinan-public" +
                        data.data.indikator.dinding.image);
                    $('#indikator_sumber_air_id').val(data.data.indikator.sumber_air.sumber_air_id);
                    $('#indikator_sumber_air_ket').val(data.data.indikator.sumber_air.keterangan);
                    $('#indikator_sumber_air_image').attr('src', "{{ env('API_URL') }}/kemiskinan-public" +
                        data.data.indikator.sumber_air.image);
                    $('#status_kesejahteraan').val(data.data.status_kesejahteraan);
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
                            url: "{{ env('API_URL') }}/kemiskinan/kesejahteraan/" + id,
                            type: "DELETE",
                            headers: {
                                "Authorization": "Bearer {{ Session::get('token') }}"
                            },
                            success: function(data) {
                                // console.log(data);

                                loadData();
                                swalWithBootstrapButtons.fire(
                                    "Terhapus!",
                                    "Data Berhasil diHapus!.",
                                    "success"
                                );
                            },
                            error: function(error) {
                                console.log(error);
                            }
                        });
                    } else if (
                        /* Read more about handling dismissals below */
                        result.dismiss === Swal.DismissReason.cancel
                    ) {
                        swalWithBootstrapButtons.fire("Dibatalkan", "", "error");
                    }
                });
        }

        function getRumah() {
            var select = $('#indikator_rumah_id');
            $.ajax({
                type: "GET",
                url: "{{ env('API_URL') }}/kemiskinan/get/ki/rumah",
                headers: {
                    "Authorization": "Bearer {{ Session::get('token') }}"
                },
                success: function(data) {
                    // console.log(data);
                    var htmlOptions = [];
                    if (data.data.length) {
                        html = '<option value="" selected disabled>- Pilih Kepemilikan Rumah -</option>';
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

        function getAtap() {
            var select = $('#indikator_atap_id');
            $.ajax({
                type: "GET",
                url: "{{ env('API_URL') }}/kemiskinan/get/ki/atap",
                headers: {
                    "Authorization": "Bearer {{ Session::get('token') }}"
                },
                success: function(data) {
                    // console.log(data);
                    var htmlOptions = [];
                    if (data.data.length) {
                        html = '<option value="" selected disabled>- Pilih Jenis Atap -</option>';
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

        function getBahanbakar() {
            var select = $('#indikator_bahan_bakar_id');
            $.ajax({
                type: "GET",
                url: "{{ env('API_URL') }}/kemiskinan/get/ki/bahan-bakar",
                headers: {
                    "Authorization": "Bearer {{ Session::get('token') }}"
                },
                success: function(data) {
                    // console.log(data);
                    var htmlOptions = [];
                    if (data.data.length) {
                        html = '<option value="" selected disabled>- Pilih Jenis Bahan Bakar -</option>';
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

        function getdinding() {
            var select = $('#indikator_dinding_id');
            $.ajax({
                type: "GET",
                url: "{{ env('API_URL') }}/kemiskinan/get/ki/dinding",
                headers: {
                    "Authorization": "Bearer {{ Session::get('token') }}"
                },
                success: function(data) {
                    // console.log(data);
                    var htmlOptions = [];
                    if (data.data.length) {
                        html = '<option value="" selected disabled>- Pilih Jenis Dinding -</option>';
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

        function getJamban() {
            var select = $('#indikator_jamban_id');
            $.ajax({
                type: "GET",
                url: "{{ env('API_URL') }}/kemiskinan/get/ki/jamban",
                headers: {
                    "Authorization": "Bearer {{ Session::get('token') }}"
                },
                success: function(data) {
                    // console.log(data);
                    var htmlOptions = [];
                    if (data.data.length) {
                        html = '<option value="" selected disabled>- Pilih Jenis Jamban -</option>';
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

        function getLantai() {
            var select = $('#indikator_lantai_id');
            $.ajax({
                type: "GET",
                url: "{{ env('API_URL') }}/kemiskinan/get/ki/lantai",
                headers: {
                    "Authorization": "Bearer {{ Session::get('token') }}"
                },
                success: function(data) {
                    // console.log(data);
                    var htmlOptions = [];
                    if (data.data.length) {
                        html = '<option value="" selected disabled>- Pilih Jenis Lantai -</option>';
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

        function getPenerangan() {
            var select = $('#indikator_penerangan_id');
            $.ajax({
                type: "GET",
                url: "{{ env('API_URL') }}/kemiskinan/get/ki/penerangan",
                headers: {
                    "Authorization": "Bearer {{ Session::get('token') }}"
                },
                success: function(data) {
                    // console.log(data);
                    var htmlOptions = [];
                    if (data.data.length) {
                        html = '<option value="" selected disabled>- Pilih Jenis Penerangan -</option>';
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

        function getSumberair() {
            var select = $('#indikator_sumber_air_id');
            $.ajax({
                type: "GET",
                url: "{{ env('API_URL') }}/kemiskinan/get/ki/sumber-air",
                headers: {
                    "Authorization": "Bearer {{ Session::get('token') }}"
                },
                success: function(data) {
                    // console.log(data);
                    var htmlOptions = [];
                    if (data.data.length) {
                        html = '<option value="" selected disabled>- Pilih Sumber Air Minum -</option>';
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

        function rupiah(number) {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
            }).format(number);
        }

        function hit_umur(number) {
            var dob = new Date(number);
            var today = new Date();
            var age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));
            return age + " Tahun"
        }
    </script>
@endsection
