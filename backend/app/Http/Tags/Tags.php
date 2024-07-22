<?php

namespace  App\Http\Tags;


use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use function GuzzleHttp\json_decode;
use function GuzzleHttp\json_encode;




class Tags extends Controller {

    public function getTags(): JsonResponse{
        $tags = DB::select('select * from tag');
        return response()->json($tags);
    }
    public function createTag(Request $request): JsonResponse {
        $bodyEncode = $request->getContent();
        $body = json_decode($bodyEncode);
        DB::table("tag")->insert(["name"=> $body->{'name'}]);
        return response()->json(["inserted"=> 1]);
    }
    public function createTable(): string {
        try {
            Schema::create('tag', function(Blueprint $table){
            $table->id();
            $table->string('name');

        });
            return "Table created successful";
        } catch(\Exception  $e) {
            die("casi". $e);
        }
        return "Cannot create Table";
    }
    public function build(Request $request): JsonResponse {
        $body = $request->getContent();
        if(json_decode($body)->{'drop'}) {
        Schema::dropIfExists('tag');
        }
        if(!Schema::hasTable('tag')){
         return response()->json(['message'=> $this->createTable()]);
        }else {
         return response()->json(['message'=> 'Table already exists']);
        }
    }
}






