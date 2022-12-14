$(document).on({
    ajaxStart: function () {
        $("#modal_loading").show();
    },
    ajaxStop: function () {
        $("#modal_loading").hide();
    },
    ajaxSuccess: function () {
        $("#modal_loading").hide();
    },
    ajaxError: function () {
        $("#modal_loading").hide();
        sweetRes("error", "500", "Server Error!");
    },
});

function getOPD(select) {
    $.ajax({
        type: "GET",
        url: baseAPI + "/organisasi/get/opd",
        headers: {
            Authorization: "Bearer " + bearer,
        },
        success: function (data) {
            // console.log(data);
            var htmlOptions = [];
            if (data.data.length) {
                html =
                    '<option value="" selected disabled>- Pilih OPD -</option>';
                htmlOptions[htmlOptions.length] = html;
                for (item in data.data) {
                    html =
                        '<option value="' +
                        data.data[item].kode +
                        '">' +
                        data.data[item].nama +
                        "</option>";
                    htmlOptions[htmlOptions.length] = html;
                }
                select.empty().append(htmlOptions.join(""));
            }
        },
        error: function (error) {
            console.log(error);
        },
    });
}

function getPekerjaan(pekerjaan) {
    $.ajax({
        type: "GET",
        url: baseAPI + "/kemiskinan/data/pekerjaan",
        headers: {
            Authorization: "Bearer " + bearer,
        },
        success: function (data) {
            // console.log(data);
            var htmlOptions = [];
            if (data.data.length) {
                html =
                    '<option value="" selected disabled>- Pilih Pekerjaan -</option>';
                htmlOptions[htmlOptions.length] = html;
                for (item in data.data) {
                    html =
                        '<option value="' +
                        data.data[item]._id +
                        '">' +
                        data.data[item].nama +
                        "</option>";
                    htmlOptions[htmlOptions.length] = html;
                }

                pekerjaan.empty().append(htmlOptions.join(""));
            }
        },
        error: function (error) {
            console.log(error);
        },
    });
}

function sweetRes(status, title, text) {
    Swal.fire({
        icon: status,
        title: title,
        text: text,
        customClass: {
            confirmButton: "btn btn-success",
        },
    });
}

function rupiah(number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(number);
}

function dateformat(date) {
    var date = new Date(date);
    formattedDate =
        (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
        "-" +
        (date.getMonth() > 8
            ? date.getMonth() + 1
            : "0" + (date.getMonth() + 1)) +
        "-" +
        date.getFullYear();
    return formattedDate;
}

function dateformatEdit(date) {
    var date = new Date(date);
    formattedDate =
        date.getFullYear() +
        "-" +
        (date.getMonth() > 8
            ? date.getMonth() + 1
            : "0" + (date.getMonth() + 1)) +
        "-" +
        (date.getDate() > 9 ? date.getDate() : "0" + date.getDate());
    return formattedDate;
}

if ($.fn.dataTable) {
    $.extend(true, $.fn.dataTable.defaults, {
        language: {
            emptyTable: "Tidak ada data yang tersedia pada tabel ini",
            info: "Menampilkan _START_ sampai _END_ dari _TOTAL_ data",
            infoEmpty: "Menampilkan 0 sampai 0 dari 0 data",
            infoFiltered: "(disaring dari _MAX_ data keseluruhan)",
            lengthMenu: "Tampilkan _MENU_ data",
            loadingRecords: "Sedang memuat...",
            processing: "Sedang memproses...",
            search: "Cari:",
            zeroRecords: "Tidak ditemukan data yang sesuai",
            thousands: "'",
            paginate: {
                first: "Pertama",
                last: "Terakhir",
                next: "⫸",
                previous: "⫷",
            },
            aria: {
                sortAscending: ": aktifkan untuk mengurutkan kolom ke atas",
                sortDescending: ": aktifkan untuk mengurutkan kolom menurun",
            },
            autoFill: {
                cancel: "Batalkan",
                fill: "Isi semua sel dengan <i>%d</i>",
                fillHorizontal: "Isi sel secara horizontal",
                fillVertical: "Isi sel secara vertikal",
            },
            buttons: {
                collection:
                    "Kumpulan <span class='ui-button-icon-primary ui-icon ui-icon-triangle-1-s'/>",
                colvis: "Visibilitas Kolom",
                colvisRestore: "Kembalikan visibilitas",
                copy: "Salin",
                copySuccess: {
                    1: "1 baris disalin ke papan klip",
                    _: "%d baris disalin ke papan klip",
                },
                copyTitle: "Salin ke Papan klip",
                csv: "CSV",
                excel: "Excel",
                pageLength: {
                    "-1": "Tampilkan semua baris",
                    1: "Tampilkan 1 baris",
                    _: "Tampilkan %d baris",
                },
                pdf: "PDF",
                print: "Cetak",
                copyKeys:
                    "Tekan ctrl atau u2318 + C untuk menyalin tabel ke papan klip.<br /><br />Untuk membatalkan, klik pesan ini atau tekan esc.",
            },
            searchBuilder: {
                add: "Tambah Kondisi",
                button: {
                    0: "Cari Builder",
                    _: "Cari Builder (%d)",
                },
                clearAll: "Bersihkan Semua",
                condition: "Kondisi",
                data: "Data",
                deleteTitle: "Hapus filter",
                leftTitle: "Ke Kiri",
                logicAnd: "Dan",
                logicOr: "Atau",
                rightTitle: "Ke Kanan",
                title: {
                    0: "Cari Builder",
                    _: "Cari Builder (%d)",
                },
                value: "Nilai",
                conditions: {
                    date: {
                        after: "Setelah",
                        before: "Sebelum",
                        between: "Diantara",
                        empty: "Kosong",
                        equals: "Sama dengan",
                        not: "Tidak sama",
                        notBetween: "Tidak diantara",
                        notEmpty: "Tidak kosong",
                    },
                    number: {
                        between: "Diantara",
                        empty: "Kosong",
                        equals: "Sama dengan",
                        gt: "Lebih besar dari",
                        gte: "Lebih besar atau sama dengan",
                        lt: "Lebih kecil dari",
                        lte: "Lebih kecil atau sama dengan",
                        not: "Tidak sama",
                        notBetween: "Tidak diantara",
                        notEmpty: "Tidak kosong",
                    },
                    string: {
                        contains: "Berisi",
                        empty: "Kosong",
                        endsWith: "Diakhiri dengan",
                        equals: "Sama Dengan",
                        not: "Tidak sama",
                        notEmpty: "Tidak kosong",
                        startsWith: "Diawali dengan",
                    },
                    array: {
                        equals: "Sama dengan",
                        empty: "Kosong",
                        contains: "Berisi",
                        not: "Tidak",
                        notEmpty: "Tidak kosong",
                        without: "Tanpa",
                    },
                },
            },
            searchPanes: {
                clearMessage: "Bersihkan Semua",
                count: "{total}",
                countFiltered: "{shown} ({total})",
                title: "Filter Aktif - %d",
                collapse: {
                    0: "Panel Pencarian",
                    _: "Panel Pencarian (%d)",
                },
                emptyPanes: "Tidak Ada Panel Pencarian",
                loadMessage: "Memuat Panel Pencarian",
            },
            infoThousands: ",",
            searchPlaceholder: "Kata kunci pencarian ...",
            select: {
                1: "%d baris terpilih",
                _: "%d baris terpilih",
                cells: {
                    1: "1 sel terpilih",
                    _: "%d sel terpilih",
                },
                columns: {
                    1: "1 kolom terpilih",
                    _: "%d kolom terpilih",
                },
            },
            datetime: {
                previous: "Sebelumnya",
                next: "Selanjutnya",
                hours: "Jam",
                minutes: "Menit",
                seconds: "Detik",
                unknown: "-",
                amPm: ["am", "pm"],
            },
            editor: {
                close: "Tutup",
                create: {
                    button: "Tambah",
                    submit: "Tambah",
                    title: "Tambah inputan baru",
                },
                remove: {
                    button: "Hapus",
                    submit: "Hapus",
                    confirm: {
                        _: "Apakah Anda yakin untuk menghapus %d baris?",
                        1: "Apakah Anda yakin untuk menghapus 1 baris?",
                    },
                    title: "Hapus inputan",
                },
                multi: {
                    title: "Beberapa Nilai",
                    info: "Item yang dipilih berisi nilai yang berbeda untuk input ini. Untuk mengedit dan mengatur semua item untuk input ini ke nilai yang sama, klik atau tekan di sini, jika tidak maka akan mempertahankan nilai masing-masing.",
                    restore: "Batalkan Perubahan",
                    noMulti:
                        "Masukan ini dapat diubah satu per satu, tetapi bukan bagian dari grup.",
                },
                edit: {
                    title: "Edit inputan",
                    submit: "Edit",
                    button: "Edit",
                },
                error: {
                    system: 'Terjadi kesalahan pada system. (<a target="\\" rel="\\ nofollow" href="\\">Informasi Selebihnya</a>).',
                },
            },
        },
    });
}