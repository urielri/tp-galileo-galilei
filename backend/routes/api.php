<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Scientists\Scientists;
use Illuminate\Support\Facades\DB;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post("/scientist", [Scientists::class, 'createScientist']);
Route::post("scientist/init", [Scientists::class, 'build']);
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




