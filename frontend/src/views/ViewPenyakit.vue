
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
      <div class="row text-left">
        <div class="col-md-12">
          <div class="card primary-card mb-4">
            <div class="card-header bg-primary"></div>
            <div class="card-body">
              <div class="table-responsive p-3">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col" style="width:5px;">#</th>
                      <th scope="col">Nama</th>
                      <th scope="col">Keterangan</th>
                      <th scope="col" style="width:5px;"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(penyakit, index) in penyakit.data" :key="index">
                      <th scope="row">3</th>
                      <td>{{ penyakit.nama }}</td>
                      <td>{{ penyakit.createdAt }}</td>
                      <td>
                        <button class="btn btn-outline-success btn-sm mb-1" type="button"><i
                            class="nav-icon i-Pen-2"></i></button>
                        <button class="btn btn-outline-danger btn-sm" type="button"><i
                            class="nav-icon i-Close-Window"></i></button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div><!-- end of main-content -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { onMounted, ref } from 'vue'

export default {
  setup() {
    let penyakit = ref([]);

    onMounted(() => {
      const config = {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjEyMzQ1NiIsImlkIjoiNjM3ZGU3MDYyZGFjOWI4ZDVlMTMyNzhjIiwibGV2ZWwiOjQsImlhdCI6MTY2OTY3NTk4N30.hTg9PDp8MQ8tU7FkoWfIuHMIEwz5Lyl5eoS3r-tu6k8',
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        credentials: 'same-origin',
      };
      axios.get('http://127.0.0.1:3000/kemiskinan/data/penyakit', config)
        .then((result) => {
          penyakit.value = result.data
        }).catch((err) => {
          console.log(err.response)
        })
    });
    return {
      penyakit
    }
  }
}
</script>

<style>
a {
  text-decoration: none;
}
</style>>