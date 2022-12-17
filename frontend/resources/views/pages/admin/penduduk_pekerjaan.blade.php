@extends('temp.temp')

@section('judul', 'Pekerjaan - SEPEKAN')

@section('tambah_css')

@endsection

@section('isi')

    <div class="breadcrumb">
        <h1>Pekerjaan</h1>
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
                                <h4 class=" text-white">Tabel Pekerjaan Penduduk</h4>
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
                                                        <th>Nama Penduduk</th>
                                                        <th>Pekerjaan</th>
                                                        <th>Gaji</th>
                                                        <th>Keterangan</th>
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

    <div class="modal fade" id="modal_data" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Form Pekerjaan</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                </div>
                <div class="modal-body">
                    <form id="form_data">
                        <div class="modal-body">
                            <input id="e_id" hidden>
                            <div class="form-group">
                                <label>Nama Penduduk</label>
                                <select id="nama" name="penduduk_id" class="form-control" style="width:100%;">
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Pekerjaan</label>
                                <select id="pekerjaan" name="pekerjaan_id" class="form-control" style="width:100%;">
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Gaji</label>
                                <input id="gaji" name="gaji" type="number" class="form-control" required />

                            </div>
                            <div class="form-group">
                                <label>Keterangan</label>
                                <textarea name="keterangan" id="keterangan" class="form-control" rows="3"></textarea>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <div id="m_tambah">
                        <button class="btn btn-outline-warning btn-sm" type="button" data-dismiss="modal">Batal</button>
                        <button class="btn btn-outline-primary btn-sm" form="form_data" type="submit"><i
                                class="i-Add"></i>
                            Tambah Data</button>
                    </div>
                    <div id="m_edit">
                        <button class="btn btn-outline-warning btn-sm" type="button" data-dismiss="modal">Batal</button>
                        <button class="btn btn-outline-primary btn-sm" form="form_data" type="submit"><i
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
        var formStatus = '';

        $(document).ready(function() {
            loadData();
            $('#m_tambah').hide();
            $('#m_edit').hide();

            var pekerjaan = $('#pekerjaan');
            getPekerjaan(pekerjaan);
            getPenduduk();
        });

        $("#btn_modal").click(function() {
            $('#nama').append(null).change();
            $("#form_data")[0].reset();
            $('#m_tambah').show();
            $('#m_edit').hide();
            formStatus = 'create';
            $('#modal_data').modal('show');
        });

        function loadData() {
            $('#tabel_data').DataTable({
                paging: true,
                searching: true,
                autoWidth: true,
                processing: true,
                destroy: true,
                responsive: true,
                info: true,
                destroy: true,
                processing: true,
                serverSide: false,
                ajax: {
                    url: "{{ env('API_URL') }}/kemiskinan/penduduk/pekerjaan",
                    type: 'GET',
                    headers: {
                        "Authorization": "Bearer {{ Session::get('token') }}"
                    },
                    // success: function(data) {
                    //     console.log(data);
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
                                <button id="` + data._id + `" onClick="edit_data(this.id)" type="button" class="dropdown-item" >
                                    <i class="nav-icon i-Pen-2 text-success font-weight-bold mr-2"></i>
                                        Ubah
                                </button>
                                <button type="button" id="` + data._id + `" onClick="hapus_data(this.id)" class="dropdown-item" >
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
                        render: function(data, row) {
                            return data.penduduk.nama + "<br><small>" + data.nik + "</small>";
                        }
                    },
                    {
                        data: 'pekerjaan.nama',
                    },
                    {
                        data: 'gaji',
                        render: function(data, row) {
                            return rupiah(data);
                        }
                    },
                    {
                        data: 'keterangan',
                    },
                ],
            });
        }

        function edit_data(id) {
            $('#nama').append(null).change();
            $("#form_data")[0].reset();
            formStatus = 'edit';
            $.ajax({
                type: "GET",
                url: "{{ env('API_URL') }}/kemiskinan/penduduk/pekerjaan/" + id,
                headers: {
                    "Authorization": "Bearer {{ Session::get('token') }}"
                },
                success: function(data) {
                    if (data.statusCode != 200) {
                        return;
                    }
                    $('#e_id').val(id);
                    $('#pekerjaan').val(data.data.pekerjaan_id).change();
                    $('#gaji').val(data.data.gaji);
                    $('#keterangan').val(data.data.keterangan);
                    newOption = new Option(data.data.penduduk.nama + " - " + data.data.nik, data.data
                        .penduduk_id,
                        true, true);
                    $('#nama').append(newOption).trigger('change');
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
                            url: "{{ env('API_URL') }}/kemiskinan/penduduk/pekerjaan/" + id,
                            type: "DELETE",
                            headers: {
                                "Authorization": "Bearer {{ Session::get('token') }}"
                            },
                        });
                        loadData();
                        swalWithBootstrapButtons.fire(
                            "",
                            "Data Berhasil diHapus!.",
                            "success"
                        );
                    } else if (
                        /* Read more about handling dismissals below */
                        result.dismiss === Swal.DismissReason.cancel
                    ) {
                        swalWithBootstrapButtons.fire("", "Dibatalkan", "error");
                    }
                });
        }

        $('#form_data').on('submit', function(e) {
            e.preventDefault();
            idata = new FormData($('#form_data')[0]);
            let url = ""
            let method = ""
            if (formStatus == 'edit') {
                id = $('#e_id').val();
                url = '{{ env('API_URL') }}/kemiskinan/penduduk/pekerjaan/' + id;
                method = 'PUT'
                msg = "Data berhasil diubah!"
            } else {
                url = '{{ env('API_URL') }}/kemiskinan/penduduk/pekerjaan'
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
                    Swal.fire({
                        icon: 'success',
                        title: "",
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
                }
            });
        });


        function getPenduduk() {
            $('#nama').select2({
                minimumInputLength: 3,
                language: {
                    inputTooShort: function() {
                        return 'Cari berdasarkan Nama atau NIK';
                    }
                },
                // allowClear: true,
                ajax: {
                    headers: {
                        "Authorization": "Bearer {{ Session::get('token') }}"
                    },
                    url: "{{ env('API_URL') }}/kemiskinan/get/penduduk",
                    data: function(params) {
                        var query = {
                            search: params.term,
                            type: 'public'
                        }

                        // Query parameters will be ?search=[term]&type=public
                        return query;
                    },
                    processResults: function(data) {
                        // console.log(data.data)
                        return {
                            results: data.data.map(e => {
                                return {
                                    id: e._id,
                                    text: e.nama + " - " + e.nik
                                }
                            })
                        };
                    }
                }
            });
        }
    </script>
@endsection
