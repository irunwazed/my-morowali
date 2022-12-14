<!DOCTYPE html>
<html lang="en" dir="">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
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
    <script>
        var baseAPI = "{{ env('API_URL') }}";
        var bearer = "{{ Session::get('token') }}"
    </script>
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
    <script src="{{ asset('') }}assets/dist-assets/js/extra.js"></script>

    @yield('tambah_js')
</body>

</html>
