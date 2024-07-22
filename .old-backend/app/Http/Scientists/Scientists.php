<?php

namespace App\Http\Scientists;


use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use function GuzzleHttp\json_decode;
use function GuzzleHttp\json_encode;

function decodeArray(object $object, string $toDecode): array{
return json_decode($object->{$toDecode});
}

class Scientists extends Controller
{
        public function getScientists(): JsonResponse {
        $scientists = DB::select('select * from scientist');
        $array = array();
        for ($i=0; $i < count($scientists); $i++) {
            $object = $scientists[$i];
           $object->{'tags'} = decodeArray($scientists[$i], 'tags');
           $object->{'phrases'} = decodeArray($scientists[$i], 'phrases');
            $array[] = $object;
        }
        return response()->json($array);
    }
        public function getScientist(string $id):JsonResponse {
           $scientist = DB::table('scientist')->where('id', $id)->get();
           $object = json_decode($scientist)[0];
           $object->{'tags'} = decodeArray($scientist[0], 'tags');
           $object->{'phrases'} = decodeArray($scientist[0], 'phrases');
            return response()->json($object);
        }
        public function getScientistsByTag(string $tag): JsonResponse {
        $scientists = DB::table('scientist')->whereJsonContains('tags', $tag)->get();
        $array = array();
        for ($i=0; $i < count($scientists); $i++) {
            $object = $scientists[$i];
           $object->{'tags'} = decodeArray($scientists[$i], 'tags');
           $object->{'phrases'} = decodeArray($scientists[$i], 'phrases');
            $array[] = $object;
        }
        return response()->json($array);
        }
        public function getScientistsByTextSearched(string $text):JsonResponse {
        $scientists = DB::select("SELECT * FROM scientist WHERE phrases LIKE '%$text%'");
        $array = array();
        for ($i=0; $i < count($scientists); $i++) {
            $object = $scientists[$i];
           $object->{'tags'} = decodeArray($scientists[$i], 'tags');
           $object->{'phrases'} = decodeArray($scientists[$i], 'phrases');
            $array[] = $object;
        }
        return response()->json($array);
        }

    public function createScientist(Request $request):JsonResponse {
        $bodyEncode = $request->getContent();
        $body = json_decode($bodyEncode);
        DB::table('scientist')->insert(['name'=> $body->{'name'}, 'career'=> $body->{'career'}, 'web'=> $body->{'web'}, 'about'=>$body->{'about'},'image'=> $body->{'image'}, 'tags'=> json_encode($body->{'tags'}),'phrases'=> json_encode($body->{'phrases'})]);
         return response()->json(["inserted"=> 1]);
    }

    public function createTable(): string {
        try {
            Schema::create('scientist', function(Blueprint $table){
            $table->id();
            $table->string('name');
            $table->string('career');
            $table->string('image');
            $table->string('web');
            $table->json('tags');
            $table->string('about');
            $table->json('phrases')->index('phrases');

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
        Schema::dropIfExists('scientist');
        }
        if(!Schema::hasTable('scientist')){
         return response()->json(['message'=> $this->createTable()]);
        }else {
         return response()->json(['message'=> 'Table already exists']);
        }
    }
}
