<div class="sidebar-panel bg-white">
    <div class="gull-brand pr-3 text-center mt-4 mb-2 d-flex justify-content-center align-items-center">
        <img class="pl-3" src="{{ asset('') }}assets/dist-assets/images/logo.png" alt="alt" />
        <span class="ml-2 item-name text-20 text-primary font-weight-700">SEPEKAN</span>
        <div class="sidebar-compact-switch ml-auto"><span></span></div>
    </div>
    <!--  user -->
    <div class="scroll-nav ps ps--active-y" data-perfect-scrollbar="data-perfect-scrollbar" data-suppress-scroll-x="true">
        <div class="side-nav">
            <div class="main-menu">
                <ul class="metismenu" id="menu">
                    <hr style="margin-top:10px;margin-bottom:10px;">
                    <li class="Ul_li--hover"><a href="{{ route('admin.index') }}"><i
                                class="i-Home1 text-20 mr-2 text-muted"></i><span
                                class="item-name text-15 text-muted">Dashboard</span></a></li>
                    <hr style="margin-top:0px;margin-bottom:10px;">
                    <li class="Ul_li--hover"><a class="has-arrow" href="#"><i
                                class="i-Pen-2 text-20 mr-2 text-muted"></i><span
                                class="item-name text-15 text-muted">Entri Data</span></a>
                        <ul class="mm-collapse">
                            <li class="item-name"><a href="{{ route('kes.indikator') }}"><i
                                        class="nav-icon i-Smile mr-2 text-muted"></i><span
                                        class="text-muted">Kesejahteraan</span></a></li>
                            <li class="item-name"><a href="{{ route('kes.bantuan') }}"><i
                                        class="nav-icon i-Financial mr-2 text-muted"></i><span
                                        class="text-muted">Bantuan
                                    </span></a></li>

                            <li class="Ul_li--hover"><a class="has-arrow" href="#"><i
                                        class="i-Checked-User text-20 mr-2 text-muted"></i><span
                                        class="item-name text-15 text-muted">Data Penduduk</span></a>
                                <ul class="mm-collapse">
                                    <li class="item-name"><a href="{{ route('penduduk') }}"><i
                                                class="nav-icon i-Add-User mr-2 text-muted"></i><span
                                                class="text-muted">Penduduk</span></a></li>
                                    <li class="item-name"><a href="{{ route('penduduk.pekerjaan') }}"><i
                                                class="nav-icon i-Management mr-2 text-muted"></i><span
                                                class="text-muted">Pekerjaan</span></a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li class="Ul_li--hover"><a class="has-arrow" href="#"><i
                                class="i-Letter-Open text-20 mr-2 text-muted"></i><span
                                class="item-name text-15 text-muted">Laporan</span></a>
                        <ul class="mm-collapse">
                            <li class="item-name"><a href="{{ route('laporan.kesejahteraan') }}"><i
                                        class="nav-icon i-Arrow-Next mr-2 text-muted"></i><span
                                        class="text-muted">Kesejahteraan
                                    </span></a></li>
                            <li class="item-name"><a href="{{ route('laporan.bantuan') }}"><i
                                        class="nav-icon i-Arrow-Next mr-2 text-muted"></i><span
                                        class="text-muted">Bantuan
                                    </span></a></li>
                            <li class="item-name"><a href="{{ route('laporan.penduduk') }}"><i
                                        class="nav-icon i-Arrow-Next mr-2 text-muted"></i><span
                                        class="text-muted">Penduduk
                                    </span></a></li>
                            <li class="item-name"><a href="{{ route('laporan.keluarga') }}"><i
                                        class="nav-icon i-Arrow-Next mr-2 text-muted"></i><span
                                        class="text-muted">Keluarga
                                    </span></a></li>
                        </ul>
                    </li>
                    <li class="Ul_li--hover"><a class="has-arrow" href="#"><i
                                class="i-Gear text-20 mr-2 text-muted"></i><span
                                class="item-name text-15 text-muted">Komponen</span></a>
                        <ul class="mm-collapse">
                            <li class="item-name"><a href="{{ route('penyakit') }}"><i
                                        class="nav-icon i-Arrow-Next mr-2 text-muted"></i><span
                                        class="text-muted">Penyakit
                                    </span></a></li>
                            <li class="item-name"><a href="{{ route('pekerjaan') }}"><i
                                        class="nav-icon i-Arrow-Next mr-2 text-muted"></i><span
                                        class="text-muted">Pekerjaan</span></a></li>
                            <li class="item-name"><a href="{{ route('bantuan') }}"><i
                                        class="nav-icon i-Arrow-Next mr-2 text-muted"></i><span
                                        class="text-muted">Bantuan</span></a></li>

                            <li class="Ul_li--hover"><a class="has-arrow" href="#"><i
                                        class="i-Check text-20 mr-2 text-muted"></i><span
                                        class="item-name text-15 text-muted">Indikator</span></a>
                                <ul class="mm-collapse">
                                    <li class="item-name"><a href="{{ route('rumah') }}"><i
                                                class="nav-icon i-Arrow-Next mr-2 text-muted"></i><span
                                                class="text-muted">Kepemilikan Rumah</span></a></li>
                                    <li class="item-name"><a href="{{ route('atap') }}"><i
                                                class="nav-icon i-Arrow-Next mr-2 text-muted"></i><span
                                                class="text-muted">
                                                Atap Terluas</span></a></li>
                                    <li class="item-name"><a href="{{ route('dinding') }}"><i
                                                class="nav-icon i-Arrow-Next mr-2 text-muted"></i><span
                                                class="text-muted">Dinding Terluas</span></a></li>
                                    <li class="item-name"><a href="{{ route('lantai') }}"><i
                                                class="nav-icon i-Arrow-Next mr-2 text-muted"></i><span
                                                class="text-muted">Lantai Terluas</span></a></li>
                                    <li class="item-name"><a href="{{ route('penerangan') }}"><i
                                                class="nav-icon i-Arrow-Next mr-2 text-muted"></i><span
                                                class="text-muted">Jenis Penerangan</span></a></li>
                                    <li class="item-name"><a href="{{ route('jamban') }}"><i
                                                class="nav-icon i-Arrow-Next mr-2 text-muted"></i><span
                                                class="text-muted">Jamban</span></a></li>
                                    <li class="item-name"><a href="{{ route('sumber.air') }}"><i
                                                class="nav-icon i-Arrow-Next mr-2 text-muted"></i><span
                                                class="text-muted">Sumber Air Minum</span></a></li>
                                    <li class="item-name"><a href="{{ route('bahan.bakar') }}"><i
                                                class="nav-icon i-Arrow-Next mr-2 text-muted"></i><span
                                                class="text-muted">Bahan Bakar</span></a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <div class="ps__rail-x" style="left: 0px; bottom: 0px;">
            <div class="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px;"></div>
        </div>
        <div class="ps__rail-y" style="top: 0px; height: 404px; right: 0px;">
            <div class="ps__thumb-y" tabindex="0" style="top: 0px; height: 325px;"></div>
        </div>
        <div class="ps__rail-x" style="left: 0px; bottom: 0px;">
            <div class="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px;"></div>
        </div>
        <div class="ps__rail-y" style="top: 0px; height: 404px; right: 0px;">
            <div class="ps__thumb-y" tabindex="0" style="top: 0px; height: 325px;"></div>
        </div>
    </div>
    <!--  side-nav-close -->
</div>
