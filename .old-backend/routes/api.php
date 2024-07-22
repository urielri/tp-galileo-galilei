<?php

use Illuminate\Support\Facades\Route;
use App\Http\Scientists\Scientists;
use App\Http\Tags\Tags;

use Illuminate\Support\Facades\DB;
/*
 *
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::group(['middleware' => 'cors'], function () {
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
Route::get("/scientists/{tag}", [Scientists::class, 'getScientistsByTag']);
Route::get("/scientists/search/{text}", [Scientists::class, 'getScientistsByTextSearched']);


Route::get("/tags", [Tags::class, 'getTags']);
Route::post("/tags/init", [Tags::class, 'build']);
Route::post("/tag", [Tags::class, 'createTag']);

});

