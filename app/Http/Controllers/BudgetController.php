<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Storage;

class BudgetController extends Controller
{
    //
    public function getBudgets(Request $request){
        $year = $request->year;
        $file = 'budget'. $year .'ServiceApi.json';
        //dd($file );
        //dd(now()->diffInHours(Carbon::createFromTimestamp(Storage::disk('temp')->lastModified($file))));
        //dd(Carbon::createFromTimestamp(Storage::disk('temp')->lastModified($file))->diffInHours(now()));
        //dd(Storage::disk('temp')->exists($file));
        if (Storage::disk('temp')->exists($file) && Carbon::createFromTimestamp(Storage::disk('temp')->lastModified($file))->diffInHours(now()) < 24) {
            return json_decode(Storage::disk('temp')->get($file), true);

        }else{
            Storage::disk('temp')->delete($file);

            $client = new Client();
            $apiUrl = "https://budget.pcru.ac.th/api"."/pmis-projects/$year";
            $APIkey = "Z6DWUdP4brLFVbtTgr2Of88sZQJW0wkf24phR1dvvGztfjc36zDWc2ihpz6X2bwq";

            try {
                // Make a GET request to the OpenWeather API
                $response = $client->request('GET',  $apiUrl, [
                    'headers' => [
                        'Authorization' => $APIkey
                    ]
                ]);

                // Get the response body as an array
                $activity = json_decode($response->getBody()->getContents(), true);
                Storage::disk('temp')->put($file, \json_encode($activity));

                return $activity;

            } catch (\Exception $e) {
                // Handle any errors that occur during the API request
                return view('api_error', ['error' => $e->getMessage()]);
            }
        }
    }
}