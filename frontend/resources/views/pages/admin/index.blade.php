@extends('temp.temp')

@section('judul', 'Dashboard - SEPEKAN')

@section('tambah_css')
@endsection

@section('isi')

    <div class="row">
        <div class="col-lg-12 col-md-12">
            <!-- CARD ICON-->
            <div class="row">
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="card card-icon mb-4">
                        <div class="card-body text-center"><i class="i-Add-User"></i>
                            <p class="text-muted mt-2 mb-2">Jumlah Penduduk</p>
                            <p class="text-primary text-24 line-height-1 m-0"><span id="jum_pen"></span></p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="card card-icon mb-4">
                        <div class="card-body text-center"><i class="i-MaleFemale"></i>
                            <p class="text-muted mt-2 mb-2">Jumlah Keluarga</p>
                            <p class="text-primary text-24 line-height-1 m-0"><span id="jum_kel"></span></p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="card card-icon mb-4">
                        <div class="card-body text-center"><i class="i-Financial"></i>
                            <p class="text-muted mt-2 mb-2">Jumlah Bantuan</p>
                            <p class="text-primary text-24 line-height-1 m-0"><span id="jum_ban"></span></p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="card card-icon mb-4">
                        <div class="card-body text-center"><i class="i-Smile"></i>
                            <p class="text-muted mt-2 mb-2">Jumlah Data Kesejahteraan</p>
                            <p class="text-primary text-24 line-height-1 m-0"><span id="jum_kes"></span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-3 col-md-12">
            <div class="mb-2 text-center"style="font-size: 20px;">
                <b>Tahun {{ date('Y') }}</b>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="card card-icon mb-4">
                        <div class="card-body text-center"><i class="i-Financial"></i>
                            <p class="text-muted mt-2 mb-2">Jumlah Bantuan</p>
                            <p class="text-primary text-24 line-height-1 m-0"><span id="jum_ban_tah"></span></p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="card card-icon mb-4">
                        <div class="card-body text-center"><i class="i-Smile"></i>
                            <p class="text-muted mt-2 mb-2">Jumlah Data Kesejahteraan</p>
                            <p class="text-primary text-24 line-height-1 m-0"><span id="jum_ban_kes"></span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-3 col-md-12">
            <div class="card">
                <div class="card-body">
                    <div class="card-title text-center">Jumlah Penduduk Per Kecamatan</div>
                    <div id="chart_jum_kec"></div>
                </div>
            </div>
        </div>
        <div class="col-lg-6 col-md-12">
            <div class="card">
                <div class="card-body">
                    <div class="card-title text-center">Jumlah Data Kesejahteraan Tahunan</div>
                    <div id="chart_jum_kes_tah"></div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('tambah_js')

    <script src="{{ asset('') }}assets/dist-assets/js/plugins/apexcharts.min.js"></script>
    <script src="{{ asset('') }}assets/dist-assets/js/plugins/apexcharts.dataseries.js"></script>

    <script>
        var data_pen = []
        var kecamat = []
        var jumPenduduk = []
        var jumKeluarga = []
        var jumBantuan = []
        var jumDataKesejahteraan = []
        var jumBantuanTahunIni = []
        var jumDataKesejahteraanTahunIni = []
        var tahun = []

        var ki1 = []
        var ki2 = []
        var ki3 = []
        var ki4 = []
        var ki5 = []
        penperkec();

        $(document).ready(function() {});


        function penperkec() {
            $.ajax({
                type: "GET",
                url: "{{ env('API_URL') }}/kemiskinan/get/beranda",
                headers: {
                    "Authorization": "Bearer {{ Session::get('token') }}"
                },
                success: function(data) {
                    if (data.statusCode != '200') {
                        return
                    }

                    jumPenduduk = data.data.jumPenduduk
                    jumKeluarga = data.data.jumKeluarga
                    jumBantuan = data.data.jumBantuan
                    jumDataKesejahteraan = data.data.jumDataKesejahteraan
                    jumBantuanTahunIni = data.data.jumBantuanTahunIni
                    jumDataKesejahteraanTahunIni = data.data.jumDataKesejahteraanTahunIni

                    $('#jum_pen').text(jumPenduduk);
                    $('#jum_kel').text(jumKeluarga);
                    $('#jum_ban').text(jumBantuan);
                    $('#jum_kes').text(jumDataKesejahteraan);
                    $('#jum_ban_tah').text(jumBantuanTahunIni);
                    $('#jum_ban_kes').text(jumDataKesejahteraanTahunIni);

                    let jumPendudukPerKec = data.data.jumPendudukPerKec
                    for (let i = 0; i < jumPendudukPerKec.length; i++) {
                        kecamat.push(`${jumPendudukPerKec[i].nama}`);
                        data_pen.push(jumPendudukPerKec[i].jum_penduduk);
                    }

                    let jumDataKesejahteraanTahunan = data.data.jumDataKesejahteraanTahunan
                    for (let i = 0; i < jumDataKesejahteraanTahunan.length; i++) {
                        if (jumDataKesejahteraanTahunan[i].status_kesejahteraan == 1) {
                            ki1.push(jumDataKesejahteraanTahunan[i].jumlah);
                        } else if (jumDataKesejahteraanTahunan[i].status_kesejahteraan == 2) {
                            ki2.push(jumDataKesejahteraanTahunan[i].jumlah);
                        } else if (jumDataKesejahteraanTahunan[i].status_kesejahteraan == 3) {
                            ki3.push(jumDataKesejahteraanTahunan[i].jumlah);
                        } else if (jumDataKesejahteraanTahunan[i].status_kesejahteraan == 4) {
                            ki4.push(jumDataKesejahteraanTahunan[i].jumlah);
                        } else if (jumDataKesejahteraanTahunan[i].status_kesejahteraan == 5) {
                            ki5.push(jumDataKesejahteraanTahunan[i].jumlah);
                        }
                        tahun.push(`${jumDataKesejahteraanTahunan[i].tahun}`);
                        tahun = [...new Set(tahun)];
                    }
                    chart_1();
                    chart_2();
                },
                error: function(error) {
                    console.log(error);
                }
            });
        }

        function chart_1() {
            let options = {
                chart: {
                    width: '100%',
                    type: 'donut' // width: 450

                },
                series: data_pen,
                labels: kecamat,
                theme: {
                    monochrome: {
                        enabled: false
                    }
                },
                //  title: {
                //      text: ""
                //  },
                legend: {
                    position: 'bottom',
                    show: true,
                },
                dataLabels: {
                    enabled: true,
                    // enabledOnSeries: data_pen,
                    formatter: function(val, opt) {
                        return opt.w.config.series[opt.seriesIndex]
                    },
                },
                tooltip: {
                    onDatasetHover: {
                        highlightDataSeries: true,
                    },
                    y: {
                        formatter: function(val) {
                            return "" + val + " Jiwa"
                        }
                    }
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 310
                        },
                        legend: {
                            position: 'bottom',
                            show: true,
                        }
                    }
                }],
            };
            const chart_pen = new ApexCharts(document.querySelector("#chart_jum_kec"), options);
            chart_pen.render();

        }

        function chart_2() {

            var options2 = {
                series: [{
                    name: 'Sangat Miskin',
                    data: ki1
                }, {
                    name: 'Miskin',
                    data: ki2
                }, {
                    name: 'Rentan Miskin',
                    data: ki3
                }, {
                    name: 'Menuju Miskin',
                    data: ki3
                }, {
                    name: 'Middle Class',
                    data: ki5
                }],
                chart: {
                    type: 'bar',
                    height: 350
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '80%',
                        // endingShape: 'rounded'
                    },
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent']
                },
                xaxis: {
                    categories: tahun,
                },
                yaxis: {
                    title: {
                        text: 'Jumlah Jiwa'
                    }
                },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    y: {
                        formatter: function(val) {
                            return val + " Jiwa"
                        }
                    }
                }
            };

            var chart_kes = new ApexCharts(document.querySelector("#chart_jum_kes_tah"), options2);
            chart_kes.render();
        }
    </script>
@endsection
