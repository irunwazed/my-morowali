<template>
    <div class="sidebar-panel bg-white">
        <div class="gull-brand pr-3 text-center mt-4 mb-2 d-flex justify-content-center align-items-center">
            <img class="pl-3" src="assets/dist-assets/images/logo.png" alt="alt" />
            <span class="ml-2 item-name text-20 text-primary font-weight-700">SEPAKAD</span>
            <div class="sidebar-compact-switch ml-auto"><span></span></div>
        </div>
        <!--  user -->
        <div class="scroll-nav ps ps--active-y" data-perfect-scrollbar="data-perfect-scrollbar"
            data-suppress-scroll-x="true">
            <div class="side-nav">
                <div class="main-menu">
                    <ul class="metismenu" id="menu">
                        <hr style="margin-top:10px;margin-bottom:10px;">
                        <li class="Ul_li--hover">
                            <router-link to="/"><i class="i-Home1 text-20 mr-2 text-muted"> </i><span
                                    class="item-name text-15 text-muted">Dashboard</span></router-link>
                        </li>
                        <hr style="margin-top:0px;margin-bottom:10px;">
                        <li class="Ul_li--hover"><a class="has-arrow" href="#"><i
                                    class="i-Pen-2 text-20 mr-2 text-muted"></i><span
                                    class="item-name text-15 text-muted">Entri Data</span></a>
                            <ul class="mm-collapse">
                                <router-link to="/entri-data"><i class="nav-icon i-Arrow-Next"> </i><span
                                        class="item-name text-15 text-muted">Penduduk</span>
                                </router-link>
                                <router-link to="/data-penyakit"><i class="nav-icon i-Arrow-Next"> </i><span
                                        class="item-name text-15 text-muted">Penyakit</span>
                                </router-link>

                            </ul>
                        </li>
                        <li class="Ul_li--hover"><a class="has-arrow" href="#"><i
                                    class="i-Letter-Open text-20 mr-2 text-muted"></i><span
                                    class="item-name text-15 text-muted">Laporan</span></a>
                            <ul class="mm-collapse">
                                <router-link to="/entriData"><i class="nav-icon i-Arrow-Next"> </i><span
                                        class="item-name text-15 text-muted">Indikator</span>
                                </router-link>
                                <router-link to="/entriData"><i class="nav-icon i-Arrow-Next"> </i><span
                                        class="item-name text-15 text-muted">Bantuan</span>
                                </router-link>
                                <router-link to="/entriData"><i class="nav-icon i-Arrow-Next"> </i><span
                                        class="item-name text-15 text-muted">Kesejahteraan</span>
                                </router-link>
                                <router-link to="/entriData"><i class="nav-icon i-Arrow-Next"> </i><span
                                        class="item-name text-15 text-muted">Penduduk</span>
                                </router-link>
                            </ul>
                        </li>
                        <li class="Ul_li--hover"><a class="has-arrow" href="#"><i
                                    class="i-File-Clipboard-File--Text text-20 mr-2 text-muted"></i><span
                                    class="item-name text-15 text-muted">Survei</span></a>
                            <ul class="mm-collapse">
                                <router-link to="/entriData"><i class="nav-icon i-Arrow-Next"> </i><span
                                        class="item-name text-15 text-muted">Permintaan Survei Keluarga</span>
                                </router-link>
                            </ul>
                        </li>

                        <li class="Ul_li--hover"><a class="has-arrow" href="#"><i
                                    class="i-Gear text-20 mr-2 text-muted"></i><span
                                    class="item-name text-15 text-muted">Pengaturan</span></a>
                            <ul class="mm-collapse">
                                <router-link to="/entriData"><i class="nav-icon i-Male"> </i><span
                                        class="item-name text-15 text-muted">Pengguna</span>
                                </router-link>
                                <router-link to="/entriData"><i class="nav-icon i-MaleFemale"> </i><span
                                        class="item-name text-15 text-muted">Keluarga</span>
                                </router-link>
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

    <div class="switch-overlay"></div>
</template>

<style>
li a {
    text-decoration: none;
}
</style>
