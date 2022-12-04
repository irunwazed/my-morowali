@extends('temp.temp')

@section('judul', 'Data Pekerjaan - SEPAKAD')

@section('tambah_css')
    <link rel="stylesheet" href="{{ asset('') }}/assets/dist-assets/css/plugins/datatables.min.css" />
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
@endsection

@section('isi')

    <div class="breadcrumb">
        <h1>Data Pekerjaan</h1>
    </div>
    <div class="separator-breadcrumb border-top"></div>
    <!-- content goes here-->
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header gradient-purple-indigo 0-hidden pb-80">
                    <div class="pt-4">
                        <div class="row">
                            <h4 class="col-md-4 text-white">Tabel Pekerjaan</h4>
                            {{-- <input class="form-control form-control-rounded col-md-4 ml-3 mr-3" id="exampleFormControlInput1" type="text" placeholder="Search Contacts..." />? --}}
                            {{-- <button class="btn btn-primary" style="float: right" type="button" data-toggle="modal"
                                data-target="#exampleModal">Tambah Data</button> --}}
                            <button class="btn btn-secondary" style="position: absolute; right:25px;" type="button"
                                id="btn_modal">Tambah Data</button>
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
                                                        <th>Nama</th>
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
                                <label>Nama Pekerjaan</label>
                                <input id="nama" name="nama" type="text" class="form-control" required="">
                            </div>
                            <div class="form-group">
                                <label>Keterangan Pekerjaan</label>
                                <textarea name="keterangan" id="keterangan" class="form-control" rows="3" required=""></textarea>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <div id="m_tambah">
                        <button class="btn btn-outline-warning btn-sm" type="button" data-dismiss="modal">Batal</button>
                        <button class="btn btn-outline-primary btn-sm" id="btn_tambah" type="button"><i class="i-Add"></i>
                            Tambah Data</button>
                    </div>
                    <div id="m_edit">
                        <button class="btn btn-outline-warning btn-sm" type="button" data-dismiss="modal">Batal</button>
                        <button class="btn btn-outline-primary btn-sm" id="btn_update" type="button"><i class="i-Edit"></i>
                            Ubah Data</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('tambah_js')

    <script src="{{ asset('') }}assets/dist-assets/js/plugins/datatables.min.js"></script>
    <script src="{{ asset('') }}assets/dist-assets/js/scripts/datatables.script.min.js"></script>
    <script src="{{ asset('') }}assets/dist-assets/js/select2.min.js"></script>
    <script>
        $(document).ready(function() {
            loadData();
            $('#m_tambah').hide();
            $('#m_edit').hide();
        });

        $("#btn_modal").click(function() {
            $("#form_data")[0].reset();
            $('#m_tambah').show();
            $('#m_edit').hide();
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
                serverSide: true,
                ajax: {
                    url: "{{ env('API_URL') }}/kemiskinan/data/pekerjaan",
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
                        data: 'nama',
                    },
                ],
            });
        }

        function edit_data(id) {
            $("#form_data")[0].reset();
            // console.log(id);
            $.ajax({
                type: "GET",
                url: "{{ env('API_URL') }}/kemiskinan/data/pekerjaan/" + id,
                headers: {
                    "Authorization": "Bearer {{ Session::get('token') }}"
                },
                success: function(data) {
                    // console.log(data.data);
                    $('#e_id').val(id);
                    $('#nama').val(data.data.nama);
                    $('#keterangan').val('');
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
                            url: "{{ env('API_URL') }}/kemiskinan/data/pekerjaan/" + id,
                            type: "DELETE",
                            headers: {
                                "Authorization": "Bearer {{ Session::get('token') }}"
                            },
                        });
                        loadData();
                        swalWithBootstrapButtons.fire(
                            "Terhapus!",
                            "Data Berhasil diHapus!.",
                            "success"
                        );
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
                url: "{{ env('API_URL') }}/kemiskinan/data/pekerjaan",
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
                        title: "Data berhasil ditambahkan!",
                        text: '',
                        customClass: {
                            confirmButton: 'btn btn-success'
                        }
                    });
                    loadData();
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
            id = $('#e_id').val();
            $.ajax({
                type: "PUT",
                url: "{{ env('API_URL') }}/kemiskinan/data/pekerjaan/" + id,
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
                    loadData();
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
    </script>
@endsection
