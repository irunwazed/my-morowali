@extends('temp.temp')

@section('judul', 'Data Bantuan - SEPAKAD')

@section('tambah_css')

@endsection

@section('isi')

    <div class="breadcrumb">
        <h1>Data Bantuan</h1>
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
                                <h4 class=" text-white">Tabel Bantuan</h4>
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
                                                <thead class="text-center">
                                                    <tr>
                                                        <th style="width: 5px;"></th>
                                                        <th style="width: 5px;">No</th>
                                                        <th style="width: 5px;">Tahun</th>
                                                        <th>Nama Penerima</th>
                                                        <th>Nama Bantuan</th>
                                                        <th>Pagu</th>
                                                        <th>Alamat</th>
                                                        <th>Wilayah</th>
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

    <div class="modal fade" id="modal_data" data-backdrop="static" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Form Bantuan</h5>
                    <button class="close m_close" type="button" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                </div>
                <div class="modal-body">
                    <form id="form_data">
                        <div class="modal-body">
                            <input id="e_id" hidden>
                            <div class="form-group">
                                <label>Tahun</label>
                                <select id="tahun" name="tahun" class="form-control" style="width:100%;" required>
                                    <option value="" selected disabled>- Pilih Tahun -</option>
                                    @for ($tah = date('Y') + 1; $tah > 2010; $tah--)
                                        <option value={{ $tah }}>{{ $tah }}</option>
                                    @endfor
                                </select>
                            </div>
                            <div class="form-group" id="bantuan_drop">
                                <label>Bantuan</label>
                                <select id="bantuan_id" name="bantuan_id" class="form-control" style="width:100%;" required>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Penerima</label>
                                <select multiple id="penduduk" name="penduduk" class="form-control" style="width:100%;">
                                </select>
                                <small style="color: red">*Masukkan NIK atau Nama penerima</small>
                            </div>

                            <div class="form-group" id="camat_drop">
                                <label>Kecamatan</label>
                                <select id="kecamatan" class="form-control" style="width:100%;" required tabindex="-1"
                                    aria-hidden="true">
                                </select>
                            </div>
                            <div class="form-group" id="desa_drop">
                                <label>Kelurahan/Desa</label>
                                <select id="kelurahan" class="form-control" style="width:100%;" aria-hidden="true">
                                </select>
                            </div>

                            <div class="form-group">
                                <label>Alamat</label>
                                <textarea name="alamat" id="alamat" class="form-control" rows="2" required></textarea>
                            </div>
                            <div class="form-group">
                                <label>Pagu</label>
                                <input id="pagu" name="pagu" type="number" class="form-control angka" required />
                            </div>
                            <div class="form-group">
                                <label>Keterangan</label>
                                <textarea name="keterangan" id="keterangan" class="form-control" rows="3" required></textarea>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <div id="m_tambah">
                        <button class="btn btn-outline-warning btn-sm m_close" type="button"
                            data-dismiss="modal">Batal</button>
                        <button class="btn btn-outline-primary btn-sm" form="form_data" id="btn_tambah"
                            type="submit"><i class="i-Add"></i>
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

    <script>
        var formStatus = '';

        $(document).ready(function() {
            loadData();
            $('#m_tambah').hide();
            $('#m_edit').hide();

            $("#bantuan_id").select2({
                dropdownParent: $('#bantuan_drop')
            });
            $("#kecamatan").select2({
                dropdownParent: $('#camat_drop')
            });
            $("#kelurahan").select2({
                dropdownParent: $('#desa_drop')
            });

            getBantuan();
            getCamat();

            $('#penduduk').select2({
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
        });

        $('.m_close').click(function() {
            $("#form_data")[0].reset();
            $('#show_data').hide();
            $('#modal_data').modal('hide');
        })

        $("#btn_modal").click(function() {
            $("#form_data")[0].reset();
            $('#m_tambah').show();
            $('#m_edit').hide();
            formStatus = 'create';
            $('#penduduk').val(null).change();
            $('#modal_data').modal('show');
        });


        function loadData() {
            $('#tabel_data').DataTable({
                paging: true,
                searching: true,
                autoWidth: true,
                responsive: false,
                info: true,
                destroy: true,
                processing: true,
                serverSide: true,
                ajax: {
                    url: "{{ env('API_URL') }}/kemiskinan/bantuan",
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
                        data: 'tahun',
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
                        data: 'bantuan.nama',
                    },
                    {
                        data: 'bantuan.pagu',
                        render: function(data, type, row) {
                            return rupiah(data);
                        }
                    },
                    {
                        data: 'lokasi.alamat_nama',
                    },
                    {
                        data: 'lokasi',
                        render: function(data, type, row) {
                            if (data.kelurahan_nama) {
                                return data.kecamatan_nama + "</b><br> <small>" + data.kelurahan_nama +
                                    "</small><br>";
                            } else {
                                return data.kecamatan_nama;
                            }
                        }
                    },
                    {
                        data: 'bantuan.keterangan',
                    },
                ],
                'columnDefs': [{
                    "targets": [1, 2, 5],
                    "className": "text-center",
                }, ]
            });
        }

        function edit_data(id) {
            $("#form_data")[0].reset();
            formStatus = 'edit';
            $("#penduduk").val(null).trigger("change");
            // console.log(id);
            $.ajax({
                type: "GET",
                url: "{{ env('API_URL') }}/kemiskinan/bantuan/" + id,
                headers: {
                    "Authorization": "Bearer {{ Session::get('token') }}"
                },
                success: function(data) {
                    console.log(data.data);
                    $('#e_id').val(id);
                    $('#tahun').val(data.data.tahun).change();
                    $('#bantuan_id').val(data.data.bantuan.bantuan_id).change();
                    $('#kecamatan').val(data.data.lokasi.kecamatan_kode).change();
                    $('#alamat').val(data.data.lokasi.alamat_nama);
                    $('#pagu').val(data.data.bantuan.pagu);
                    $('#keterangan').val(data.data.bantuan.keterangan);

                    if (data.data.lokasi.kelurahan_kode) {
                        setTimeout(function() {
                            $('#kelurahan').val(data.data.lokasi.kelurahan_kode).change();
                        }, 500);
                    }

                    $.each(data.data.penduduk, function(key, value) {
                        newOption = new Option(value.nama + " - " + value.nik, value.penduduk_id,
                            true,
                            true);
                        $('#penduduk').append(newOption).trigger('change');
                        $('#penduduk').trigger({
                            type: 'select2:select',
                            params: {
                                data: data
                            }
                        });
                    });
                    // newOption = new Option(data.data.penduduk[0].nama + " - " + data.data.penduduk[0].nik, data
                    //     .data.penduduk[0].penduduk_id)
                    // $('#penduduk').append(newOption).trigger('change');
                },
                error: function(error) {
                    console.log(error);
                }
            });
            $('#m_tambah').hide();
            $('#m_edit').show();
            $('#modal_data').modal('show');
        }

        $('#form_data').on('submit', function(e) {
            e.preventDefault();
            idata = new FormData($('#form_data')[0]);
            kec = $('#kecamatan').val();
            kel = $('#kelurahan').val();
            if (!kel) {
                wilayah = kec;
            } else {
                wilayah = kel;
            }
            idata.append('wilayah', wilayah);

            // console.log(idata);

            let url = ""
            let method = ""
            if (formStatus == 'edit') {
                id = $('#e_id').val();
                url = '{{ env('API_URL') }}/kemiskinan/bantuan/' + id;
                method = 'PUT'
                msg = "Data berhasil diubah!"
            } else {
                url = '{{ env('API_URL') }}/kemiskinan/bantuan'
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
                    // console.log(data);
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
                    if (formStatus == 'edit') {
                        setTimeout(function() {
                            location.reload()
                        }, 2000);
                    }
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
                            url: "{{ env('API_URL') }}/kemiskinan/bantuan/" + id,
                            type: "DELETE",
                            headers: {
                                "Authorization": "Bearer {{ Session::get('token') }}"
                            },
                        });
                        loadData();
                        swalWithBootstrapButtons.fire(
                            "",
                            "Data Terhapus!",
                            "success"
                        );
                    } else if (
                        /* Read more about handling dismissals below */
                        result.dismiss === Swal.DismissReason.cancel
                    ) {
                        swalWithBootstrapButtons.fire("", "Dibatalkan!", "error");
                    }
                });
        }

        function rupiah(number) {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
            }).format(number);
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

        function getBantuan(id) {
            var select = $('#bantuan_id');
            $.ajax({
                type: "GET",
                url: "{{ env('API_URL') }}/kemiskinan/data/bantuan/",
                headers: {
                    "Authorization": "Bearer {{ Session::get('token') }}"
                },
                success: function(data) {
                    // console.log(data);
                    var htmlOptions = [];
                    if (data.data.length) {
                        html = '<option value="" selected disabled>- Pilih Bantuan -</option>';
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
    </script>
@endsection
