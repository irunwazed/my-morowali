<!DOCTYPE html>
<html lang="en" dir="">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>
        @yield('judul')
    </title>
    <link rel="icon" href="{{ asset('') }}assets/dist-assets/images/logo.png">
    <link href="https://fonts.googleapis.com/css?family=Nunito:300,400,400i,600,700,800,900" rel="stylesheet" />
    <link href="{{ asset('') }}assets/dist-assets/css/themes/lite-purple.css" rel="stylesheet" />
    <link href="{{ asset('') }}assets/dist-assets/css/plugins/perfect-scrollbar.css" rel="stylesheet" />
    {{-- <link rel="stylesheet" href="{{ asset('') }}assets/dist-assets/css/plugins/fontawesome-5.css" /> --}}
    <link href="{{ asset('') }}assets/dist-assets/css/plugins/metisMenu.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="{{ asset('') }}assets/dist-assets/css/plugins/datatables.min.css" />
    <link rel="stylesheet" href="{{ asset('') }}assets/dist-assets/js/select2.min.css" />

    <style>
        #modal_loading {
            display: none;
            position: fixed;
            z-index: 1500;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background: rgba(255, 255, 255, .8) url('{{ asset('') }}assets/dist-assets/images/load1.gif') 50% 50% no-repeat;
        }

        .modal-header {
            background-image: url('{{ asset('') }}assets/dist-assets/images/head.png');
            background-position: top 0px right 0px;
            background-repeat: no-repeat;
        }

        .modal-footer {
            background-image: url('{{ asset('') }}assets/dist-assets/images/bottom.png');
            background-position: bottom 0px left 0px;
            background-repeat: no-repeat;
        }

        .scroll-nav {
            background-image: url('{{ asset('') }}assets/dist-assets/images/bl.png');
            background-position: bottom 0px left 0px;
            background-repeat: no-repeat;
        }

        .main-content-wrap {
            background-image: url('{{ asset('') }}assets/dist-assets/images/br.png');
            background-position: bottom 0px right 0px;
            background-repeat: no-repeat;

        }

        th.dt-center,
        td.dt-center {
            text-align: center;
        }
    </style>
    @yield('tambah_css')
</head>

<body class="text-left">
    <div class="app-admin-wrap layout-sidebar-vertical sidebar-full">

        @include('temp.sidebar')
        <div class="main-content-wrap mobile-menu-content bg-off-white m-0">
            @include('temp.header')
            <div class="main-content pt-4">
                @yield('isi')
            </div>
            @include('temp.footer')
        </div>
    </div>
    <div id="modal_loading"></div>
    <script src="{{ asset('') }}assets/dist-assets/js/plugins/jquery-3.3.1.min.js"></script>
    <script src="{{ asset('') }}assets/dist-assets/js/jquery-ui.min.js"></script>
    <script src="{{ asset('') }}assets/dist-assets/js/plugins/bootstrap.bundle.min.js"></script>
    <script src="{{ asset('') }}assets/dist-assets/js/plugins/perfect-scrollbar.min.js"></script>
    <script src="{{ asset('') }}assets/dist-assets/js/scripts/tooltip.script.min.js"></script>
    <script src="{{ asset('') }}assets/dist-assets/js/scripts/script.min.js"></script>
    <script src="{{ asset('') }}assets/dist-assets/js/scripts/script_2.min.js"></script>
    <script src="{{ asset('') }}assets/dist-assets/js/scripts/sidebar.large.script.min.js"></script>
    <script src="{{ asset('') }}assets/dist-assets/js/plugins/feather.min.js"></script>
    <script src="{{ asset('') }}assets/dist-assets/js/plugins/metisMenu.min.js"></script>
    <script src="{{ asset('') }}assets/dist-assets/js/scripts/layout-sidebar-vertical.min.js"></script>
    <script src="{{ asset('') }}assets/dist-assets/js/scripts/dashboard.v4.script.min.js"></script>

    <script src="{{ asset('') }}assets/dist-assets/js/plugins/datatables.min.js"></script>
    <script src="{{ asset('') }}assets/dist-assets/js/scripts/datatables.script.min.js"></script>
    <script src="{{ asset('') }}assets/dist-assets/js/select2.min.js"></script>
    <script src="{{ asset('') }}assets/dist-assets/js/sweetalert2.all.min.js"></script>
    @yield('tambah_js')
    <script>
        $(document).on({
            ajaxStart: function() {
                $('#modal_loading').show();
            },
            ajaxStop: function() {
                $('#modal_loading').hide();
            }
        });

        if ($.fn.dataTable) {
            $.extend(true, $.fn.dataTable.defaults, {
                "language": {
                    "emptyTable": "Tidak ada data yang tersedia pada tabel ini",
                    "info": "Menampilkan _START_ sampai _END_ dari _TOTAL_ data",
                    "infoEmpty": "Menampilkan 0 sampai 0 dari 0 data",
                    "infoFiltered": "(disaring dari _MAX_ data keseluruhan)",
                    "lengthMenu": "Tampilkan _MENU_ data",
                    "loadingRecords": "Sedang memuat...",
                    "processing": "Sedang memproses...",
                    "search": "Cari:",
                    "zeroRecords": "Tidak ditemukan data yang sesuai",
                    "thousands": "'",
                    "paginate": {
                        "first": "Pertama",
                        "last": "Terakhir",
                        "next": "⫸",
                        "previous": "⫷"
                    },
                    "aria": {
                        "sortAscending": ": aktifkan untuk mengurutkan kolom ke atas",
                        "sortDescending": ": aktifkan untuk mengurutkan kolom menurun"
                    },
                    "autoFill": {
                        "cancel": "Batalkan",
                        "fill": "Isi semua sel dengan <i>%d<\/i>",
                        "fillHorizontal": "Isi sel secara horizontal",
                        "fillVertical": "Isi sel secara vertikal"
                    },
                    "buttons": {
                        "collection": "Kumpulan <span class='ui-button-icon-primary ui-icon ui-icon-triangle-1-s'\/>",
                        "colvis": "Visibilitas Kolom",
                        "colvisRestore": "Kembalikan visibilitas",
                        "copy": "Salin",
                        "copySuccess": {
                            "1": "1 baris disalin ke papan klip",
                            "_": "%d baris disalin ke papan klip"
                        },
                        "copyTitle": "Salin ke Papan klip",
                        "csv": "CSV",
                        "excel": "Excel",
                        "pageLength": {
                            "-1": "Tampilkan semua baris",
                            "1": "Tampilkan 1 baris",
                            "_": "Tampilkan %d baris"
                        },
                        "pdf": "PDF",
                        "print": "Cetak",
                        "copyKeys": "Tekan ctrl atau u2318 + C untuk menyalin tabel ke papan klip.<br \/><br \/>Untuk membatalkan, klik pesan ini atau tekan esc."
                    },
                    "searchBuilder": {
                        "add": "Tambah Kondisi",
                        "button": {
                            "0": "Cari Builder",
                            "_": "Cari Builder (%d)"
                        },
                        "clearAll": "Bersihkan Semua",
                        "condition": "Kondisi",
                        "data": "Data",
                        "deleteTitle": "Hapus filter",
                        "leftTitle": "Ke Kiri",
                        "logicAnd": "Dan",
                        "logicOr": "Atau",
                        "rightTitle": "Ke Kanan",
                        "title": {
                            "0": "Cari Builder",
                            "_": "Cari Builder (%d)"
                        },
                        "value": "Nilai",
                        "conditions": {
                            "date": {
                                "after": "Setelah",
                                "before": "Sebelum",
                                "between": "Diantara",
                                "empty": "Kosong",
                                "equals": "Sama dengan",
                                "not": "Tidak sama",
                                "notBetween": "Tidak diantara",
                                "notEmpty": "Tidak kosong"
                            },
                            "number": {
                                "between": "Diantara",
                                "empty": "Kosong",
                                "equals": "Sama dengan",
                                "gt": "Lebih besar dari",
                                "gte": "Lebih besar atau sama dengan",
                                "lt": "Lebih kecil dari",
                                "lte": "Lebih kecil atau sama dengan",
                                "not": "Tidak sama",
                                "notBetween": "Tidak diantara",
                                "notEmpty": "Tidak kosong"
                            },
                            "string": {
                                "contains": "Berisi",
                                "empty": "Kosong",
                                "endsWith": "Diakhiri dengan",
                                "equals": "Sama Dengan",
                                "not": "Tidak sama",
                                "notEmpty": "Tidak kosong",
                                "startsWith": "Diawali dengan"
                            },
                            "array": {
                                "equals": "Sama dengan",
                                "empty": "Kosong",
                                "contains": "Berisi",
                                "not": "Tidak",
                                "notEmpty": "Tidak kosong",
                                "without": "Tanpa"
                            }
                        }
                    },
                    "searchPanes": {
                        "clearMessage": "Bersihkan Semua",
                        "count": "{total}",
                        "countFiltered": "{shown} ({total})",
                        "title": "Filter Aktif - %d",
                        "collapse": {
                            "0": "Panel Pencarian",
                            "_": "Panel Pencarian (%d)"
                        },
                        "emptyPanes": "Tidak Ada Panel Pencarian",
                        "loadMessage": "Memuat Panel Pencarian"
                    },
                    "infoThousands": ",",
                    "searchPlaceholder": "Kata kunci pencarian ...",
                    "select": {
                        "1": "%d baris terpilih",
                        "_": "%d baris terpilih",
                        "cells": {
                            "1": "1 sel terpilih",
                            "_": "%d sel terpilih"
                        },
                        "columns": {
                            "1": "1 kolom terpilih",
                            "_": "%d kolom terpilih"
                        }
                    },
                    "datetime": {
                        "previous": "Sebelumnya",
                        "next": "Selanjutnya",
                        "hours": "Jam",
                        "minutes": "Menit",
                        "seconds": "Detik",
                        "unknown": "-",
                        "amPm": [
                            "am",
                            "pm"
                        ]
                    },
                    "editor": {
                        "close": "Tutup",
                        "create": {
                            "button": "Tambah",
                            "submit": "Tambah",
                            "title": "Tambah inputan baru"
                        },
                        "remove": {
                            "button": "Hapus",
                            "submit": "Hapus",
                            "confirm": {
                                "_": "Apakah Anda yakin untuk menghapus %d baris?",
                                "1": "Apakah Anda yakin untuk menghapus 1 baris?"
                            },
                            "title": "Hapus inputan"
                        },
                        "multi": {
                            "title": "Beberapa Nilai",
                            "info": "Item yang dipilih berisi nilai yang berbeda untuk input ini. Untuk mengedit dan mengatur semua item untuk input ini ke nilai yang sama, klik atau tekan di sini, jika tidak maka akan mempertahankan nilai masing-masing.",
                            "restore": "Batalkan Perubahan",
                            "noMulti": "Masukan ini dapat diubah satu per satu, tetapi bukan bagian dari grup."
                        },
                        "edit": {
                            "title": "Edit inputan",
                            "submit": "Edit",
                            "button": "Edit"
                        },
                        "error": {
                            "system": "Terjadi kesalahan pada system. (<a target=\"\\\" rel=\"\\ nofollow\" href=\"\\\">Informasi Selebihnya<\/a>)."
                        }
                    }
                }
            });
        }
        // (function($) {
        //     $.fn.inputFilter = function(inputFilter) {
        //         return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
        //             if (inputFilter(this.value)) {
        //                 this.oldValue = this.value;
        //                 this.oldSelectionStart = this.selectionStart;
        //                 this.oldSelectionEnd = this.selectionEnd;
        //             } else if (this.hasOwnProperty("oldValue")) {
        //                 this.value = this.oldValue;
        //                 this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        //             } else {
        //                 this.value = "";
        //             }
        //         });
        //     };
        // }(jQuery));
    </script>
</body>

</html>
