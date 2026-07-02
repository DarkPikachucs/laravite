<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Config;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Env;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
  public function getProjectBudget(Request $request, $year){
    $projects = array();
    
    //$per_page = 400;
    $client = new Client();
    $apiUrl = config('services.estrategic_api.url')."export/project/budget/".$year;
    $APIkey = ['headers' => [ 'Authorization' => config('services.estrategic_api.key') ] ];

     try {
        // Make a GET request to the OpenWeather API
        $response = $client->request('GET', $apiUrl, $APIkey);
        
        $budgets = json_decode($response->getBody()->getContents(), true);
        $projects = array_merge($projects, $budgets);
        /*$links = $activity['links'];
        array_shift($links);
        array_shift($links);
        array_pop($links);

        foreach($links as $link){
            $apiUrl = $link['url']."&per_page=".$per_page;
            try {
              $client2 = new Client();
              $response2 = $client2->request('GET',  $apiUrl, $APIkey);
              $results2 = json_decode($response2->getBody()->getContents(), true);
              $data = $results2['data'];
              $projects = array_merge($projects, $data);
            } catch (\Exception $e) {
              dd($e->getMessage());
              return view('api_error', ['error' => $e->getMessage()]);
            }              
        }
*/
    } catch (\Exception $e) {
        dd($e->getMessage());
        // Handle any errors that occur during the API request
        return view('api_error', ['error' => $e->getMessage()]);
    }

    return \response()->json($projects, 200);
    
  }
    
    public function getProjects(Request $request){
      return \response()->json($this->getProjectsYear($request, $request->exists('year')? $request->year: now()->year), 200);
    }
    public function getProjectsYear(Request $request, $year){
        //$year = 2025;//$request->year; 
        set_time_limit(60);
        ini_set('max_execution_time', 60);
        ini_set('request_terminate_timeout', 60);


        $file = 'project'.$year.'ServiceApi.json';
        $projects = array();

        if (Storage::disk('temp')->exists($file) && Carbon::createFromTimestamp(Storage::disk('temp')->lastModified($file))->diffInHours(now()) < 24) {
            $projects =  json_decode(Storage::disk('temp')->get($file), true);
         
        }else{
            Storage::disk('temp')->delete($file);

            $per_page = 400;
            $client = new Client();
            //$apiUrl = env('ESTRATEGIC_API_URL')."export/projects/".$year."?page=1&per_page=".$per_page;
            //$apiUrl = config('services.estrategic_api.url')."export/projects/".$year."?page=1&per_page=".$per_page;
            $apiUrl = config('services.estrategic_api.url')."export/projects/".$year."/minimal?page=1&per_page=".$per_page;
            $APIkey = ['headers' => [ 'Authorization' => config('services.estrategic_api.key') ] ];
  
            //dd($apiUrl);
            try {
                // Make a GET request to the OpenWeather API
                $response = $client->request('GET', $apiUrl, $APIkey);

                $activity = json_decode($response->getBody()->getContents(), true);
                $projects = array_merge($projects, $activity['data']);
                $links = $activity['links'];
                
                array_shift($links);
                array_shift($links);
                array_pop($links);

                foreach($links as $link){
                    $apiUrl = $link['url']."&per_page=".$per_page;
                    //dd($apiUrl);
                    try {
                      $client2 = new Client();
                      $response2 = $client2->request('GET',  $apiUrl, $APIkey);
                      $results2 = json_decode($response2->getBody()->getContents(), true);
                      $data = $results2['data'];
                      $projects = array_merge($projects, $data);
                    } catch (\Exception $e) {
                      dd($e->getMessage());
                      return view('api_error', ['error' => $e->getMessage()]);
                    }              
                }

                if($projects != null)
                  Storage::disk('temp')->put($file, \json_encode($projects));
                
                //return ['data' => $this->minimizeProjects($request, $projects), 'total' => count($projects), 'links' => $links, 'totals' => $activity['total'], 'apiUrl' => $apiUrl ];
               /* var_dump($projects);






                         
                // Get the response body as an array
                $activity = json_decode($response->getBody()->getContents(), true);
                
                if($activity != null)
                  Storage::disk('temp')->put($file, \json_encode($activity));

                $results =  $activity;*/

            } catch (\Exception $e) {
               dd($e->getMessage());
                // Handle any errors that occur during the API request
                return view('api_error', ['error' => $e->getMessage()]);
            }
        }
        
        if ($request->has('method') && $request->method == 'sync') {
          return [
            'completed' => true, 
            'message' => 'Project data synchronized successfully.', 
            'count' => count($projects),
          ];
        }elseif(($request->has('method') && $request->method == 'minimize') || ($request->has('minimize') && $request->minimize == 'true')) {
          return $this->minimizeProjects($request, $projects);
        }else{
          return $projects;
        } 
    }

    public function getProjectByUuid(Request $request, $year, $uuid){
      $tmp = $this->getProjectsYear($request, $year);
      $arr = array_key_exists('data', $tmp)? $tmp['data']: $tmp;

      $results = array_filter($arr, function($project) use ($uuid) {
        return $project['uuid'] == $uuid;
      });
      
      return response()->json($results[array_key_first($results)]);//$results  ;
    }

    public function minimizeProjects(Request $request ,$results){
      /*$projects = $this->getProjectsYear($request, now()->year);*/
      $projects = array_key_exists('data', $results)? $results['data'] : $results;
      $minimized = [];
      foreach ($projects as $project) {
        if($request->has("layout") && $request->layout == 'strategics'){
           $minimized[] = [
            'id' => $project['id'],
            'uuid' => $project['uuid'],
            'name' => $project['name'],
            'budget' => $project['budget'],

            'parent_id' => $project['parent_id'],
            'owner' => $project['owner'],
            'output_id' => $project['output_id'],
            'main_activity_id' => $project['main_activity_id'],
            'budget_code_id' => $project['budget_code_id'],

            'section_id' => $project['section_id'],
            'section' => $project['section'],
            'activity' => $project['activity'],
            'year' => $project['year'],
            'status' => $project['status'],
          ];

        }elseif($request->has("layout") && $request->layout == 'quarterreport'){
          $minimized[] = [
            'id' => $project['id'],
            'uuid' => $project['uuid'],
            'name' => $project['name'],
            //'budget' => $project['budget'],
            
            'parent_id' => $project['parent_id'],
            'operational_plan' => $project['operational_plan'],
            'budget' => $project['budget'],
            'budget_transfer_in' => $project['budget_transfer_in'],
            'budget_transfer_out' => $project['budget_transfer_out'],
            'budget_pr' => $project['budget_pr'],
            'budget_ro' => $project['budget_ro'],
            'budget_po' => $project['budget_po'],
            'budget_pay' => $project['budget_pay'],
            'budget_amount' => $project['budget_amount'],
            
            'activity' => $project['activity'],
            'status' => $project['status'],
          ];

        }else{
          $minimized[] = [
            'id' => $project['id'],
            'uuid' => $project['uuid'],
            'name' => $project['name'],
            'budget' => $project['budget'],
            'section_id' => $project['section_id'],
            'section' => $project['section'],
            'activity' => $project['activity'],

            'output_id' => $project['output_id'],
            'main_activity_id' => $project['main_activity_id'],
            'budget_code_id' => $project['budget_code_id'],
            
            //'schedule' => $project['schedule'],
            'year' => $project['year'],
            'status' => $project['status'],
          ];
        }
      }
      return $minimized;
    }
    

    public function freeSearch(Request $request){
      $key = $request->key;
      $options = $request->options; 

      
    }

    public function getStrategicDashboard(Request $request){
      $projects = $this->getProjectsYear($request, now()->year);
      return response()->json([
        'data' => $projects,
        'total' => count($projects),
      ]);
    }

    public function getStrategicProjects(Request $request){
      $projects = $this->getProjectsYear($request, now()->year);
      $projects = $this->minimizeProjects($request, $projects);
      return response()->json([
        'total' => count($projects),
        'projects' => $projects,
      ]);
    }
}