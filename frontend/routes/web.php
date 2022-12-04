<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Controller;
use App\Http\Controllers\LoginController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get("/", [Controller::class, 'index'])->name('index');
Route::get("/login", [LoginController::class, 'index'])->name('login');
Route::post("/login", [LoginController::class, 'login'])->name('postlogin');
Route::get("/logout", [LoginController::class, 'logout'])->name('logout');

Route::group(['middleware' => 'cek_login'], function () {
    Route::group(['middleware' => 'cek_level:2'], function () {
        Route::prefix("/admin")->group(function () {

            Route::get("/", [Controller::class, 'admin'])->name('admin.index');

            Route::prefix("/data")->group(function () {
                Route::get("/penduduk", [Controller::class, 'penduduk'])->name('penduduk');
                Route::get("/pekerjaan-penduduk", [Controller::class, 'pekerjaan_penduduk'])->name('penduduk.pekerjaan');
                Route::get("/keluarga", [Controller::class, 'keluarga'])->name('keluarga');
                Route::get("/penyakit", [Controller::class, 'penyakit'])->name('penyakit');
                Route::get("/pekerjaan", [Controller::class, 'pekerjaan'])->name('pekerjaan');
                Route::get("/bantuan", [Controller::class, 'bantuan'])->name('bantuan');
            });

            Route::prefix("/indikator")->group(function () {
                Route::get("/rumah", [Controller::class, 'rumah'])->name('rumah');
                Route::get("/atap", [Controller::class, 'atap'])->name('atap');
                Route::get("/bahan-bakar", [Controller::class, 'bahan_bakar'])->name('bahan.bakar');
                Route::get("/dinding", [Controller::class, 'dinding'])->name('dinding');
                Route::get("/jamban", [Controller::class, 'jamban'])->name('jamban');
                Route::get("/lantai", [Controller::class, 'lantai'])->name('lantai');
                Route::get("/penerangan", [Controller::class, 'penerangan'])->name('penerangan');
                Route::get("/rumah", [Controller::class, 'rumah'])->name('rumah');
                Route::get("/sumber-air", [Controller::class, 'sumber_air'])->name('sumber.air');
            });

            Route::prefix("/kesejahteraan")->group(function () {
                Route::get("/indikator", [Controller::class, 'kes_indi'])->name('kes.indikator');
                Route::get("/bantuan", [Controller::class, 'kes_ban'])->name('kes.bantuan');
            });
        });
    });


    // Route::group(['middleware' => 'cek_level:3'], function () {
    //     Route::get("/admin2", [LoginController::class, 'admin'])->name('admin.index2');
    // });
});
