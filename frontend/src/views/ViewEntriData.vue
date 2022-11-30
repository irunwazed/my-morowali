
<template>
  <div id="app">
    <div class="main-content pt-4">
      <div class="breadcrumb">
        <h1>Entri Data</h1>
        <ul>
          <li><a href="href">Form</a></li>
          <li>Data keluarga</li>
        </ul>
      </div>
      <div class="separator-breadcrumb border-top"></div>
      <div class="row">
        <div class="col-md-12">
          <div class="card primary-card mb-4">
            <div class="card-header bg-primary"></div>
            <div class="card-body">
              <form>
                <div class="row text-left">
                  <div class="col-md-2 col-sm-12 my-2">
                    <label for="v_kecamatan"><b>Kecamatan</b> </label>
                    <vSelect :options=options></vSelect>
                  </div>
                  <div class="col-md-2 col-sm-12 my-2">
                    <label for="v_desa_kel"><b>Desa / Kelurahan</b></label>
                    <vSelect :options=options></vSelect>
                  </div>
                  <div class="col-md-2 col-sm-12 my-2">
                    <label for="v_pekerjaan"><b>Pekerjaan</b> </label>
                    <vSelect :options=options></vSelect>
                  </div>
                  <div class="col-md-2 col-sm-12 my-2">
                    <label for="v_keluarga"><b>Keluarga</b> </label>
                    <vSelect :options=options></vSelect>
                  </div>
                  <div class="col-md-2 col-sm-12 my-2">
                    <label for="v_kk"><b>Nomor Kartu Keluarga</b> </label>
                    <vSelect :options=options ></vSelect>
                  </div>
                  <div class="col-md-2 col-sm-12 my-2" style="text-align: right;">
                    <button class="btn btn-primary" style="margin-top:25px;padding-top:10px;"><i class="text-20 i-Magnifi-Glass1"></i></button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div><!-- end of main-content -->
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select'

import 'vue-select/dist/vue-select.css';

export default {
  // declare Select2Component
  components: { vSelect },
  data() {
    return {
      options: [
        { 'code': 'op1', 'label': 'value2' },
        { 'code': 'op1', 'label': 'value1' }
      ],
    }
  },
  // methods: {
  //   onchange(val) {
  //     console.log(val);
  //   },
  //   onselect({ id, text }) {
  //     console.log({ id, text })
  //   }
  // }
}
</script>