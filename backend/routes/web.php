<?php

use App\Http\Scientists\Scientists;
use Illuminate\Support\Facades\Route;

use Illuminate\Support\Facades\DB;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
Route::group(['middleware' => 'cors'], function () {

Route::get('/', function () {
  try {
        DB::connection()->getPdo();
        if(DB::connection()->getDatabaseName()){
            //echo DB::connection()->getTablePrefix();
            echo "Connected: " . DB::connection()->getDatabaseName();
        }else{
            die("Could not find the database. Please check your configuration.");
        }
    } catch (\Exception $e) {
        die("Check your configuration.");
    }
});

Route::get("/scientists", [Scientists::class, 'getScientists']);
Route::get("/scientist/{id}", [Scientists::class, 'getScientist']);


});

