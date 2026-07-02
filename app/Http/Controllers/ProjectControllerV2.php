<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Config;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Env;
use Illuminate\Support\Facades\Storage;

class ProjectControllerV2 extends Controller
{
    public function getProjects(Request $request){
      return $this->getProjectsYear($request, now()->year);
    }
    public function getProjectsYear(Request $request, $year){
        //$year = 2025;//$request->year; 
        $projects = array();
        $file = 'project'.$year.'ServiceApi.json';
        //dd(now()->diffInHours(Carbon::createFromTimestamp(Storage::disk('temp')->lastModified($file))));
        //dd(Carbon::createFromTimestamp(Storage::disk('temp')->lastModified($file))->diffInHours(now()));
        //dd(Storage::disk('temp')->exists($file));
        if (false && Storage::disk('temp')->exists($file) && Carbon::createFromTimestamp(Storage::disk('temp')->lastModified($file))->diffInHours(now()) < 24) {
            $results =  json_decode(Storage::disk('temp')->get($file), true);
         
        }else{
            Storage::disk('temp')->delete($file);

            $client = new Client();
            $apiUrl = env('ESTRATEGIC_API_URL')."export/projects/".$year."?page=1&per_page=300";
            $APIkey = [
                        'headers' => [
                            'Authorization' => env('ESTRATEGIC_API_KEY')
                        ]
                      ];
  





            try {
                // Make a GET request to the OpenWeather API
                $client = new Client();
                $response = $client->request('GET',  $apiUrl, $APIkey);

                $results = json_decode($response->getBody()->getContents(), true);
                $projects =  array_merge($projects, $results['data']);
                $links = $results['links'];
                array_shift($links);
                array_shift($links);
                array_pop($links);

                foreach($links as $link){
                    $apiUrl = $link['url']."&per_page=300";
                    try {
                      $client2 = new Client();
                      $response2 = $client2->request('GET',  $link['url'], $APIkey);
                      $results2 = json_decode($response2->getBody()->getContents(), true);
                      $data = $results2['data'];
                      $projects = array_merge($projects, $data);
                    } catch (\Exception $e) {
                      dd($e->getMessage());
                        return view('api_error', ['error' => $e->getMessage()]);
                    }              
                }
                

                //$activity = json_decode($projects, true);
                $activity = $projects;
                Storage::disk('temp')->put($file, \json_encode($activity));
                
                return response()->json(['data' => $projects, 'total' => count($projects), 'links' => $links, 'totals' => $results['total'], 'apiUrl' => $apiUrl , 'data2' => $data] , 200);
                var_dump($projects);









                //var_dump($results);


                //var_dump($response->getBody()->getContents());
                $response = $client->request('GET',  $apiUrl, $APIkey);
                // Get the response body as an array
                $activity = json_decode($response->getBody()->getContents(), true);
                Storage::disk('temp')->put($file, \json_encode($activity));

                $results =  $activity;


            } catch (\Exception $e) {
               dd($e->getMessage());
                // Handle any errors that occur during the API request
                return view('api_error', ['error' => $e->getMessage()]);
            }
        }

        if ($request->has('minimize') && $request->minimize == 'true') {
          return response()->json($this->minimizeProjects($request, $results));
        }else{
          return response()->json($results);
        } 
    }

    public function getProjectByUuid(Request $request, $year, $uuid){
      $tmp = $this->getProjectsYear($request, now()->year);
      $arr = $tmp['data'];

      $results = array_filter($arr, function($project) use ($uuid) {
        return $project['uuid'] == $uuid;
      });
      
      return response()->json($results[array_key_first($results)]);//$results  ;
    }

    public function minimizeProjects(Request $request ,$results){
      /*$projects = $this->getProjectsYear($request, now()->year);*/
      $projects = $results['data'];
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
            //'schedule' => $project['schedule'],
            'year' => $project['year'],
            'status' => $project['status'],
          ];
        }
      }
      return $minimized;

      //Too slow to unset all elements
      /*foreach ($projects as &$el) {
        unset($el['output_id']);
        unset($el['plan_id']);
        unset($el['main_activity_id']);
        unset($el['parent_id']);
        unset($el['budget_code_id']);
        unset($el['is_import']);
        unset($el['creator_id']);
        unset($el['created_at']);
        unset($el['updated_at']);
        unset($el['deleted_at']);
        unset($el['status']);
        unset($el['process_status']);
        unset($el['no_budget project']);
        unset($el['is_owner']);
        unset($el['is_editable']);
        unset($el['is_deleteable']);
        unset($el['parent']);
        unset($el['all_parents']);
        unset($el['output']);
        unset($el['plan']);
        unset($el['main_activity']);
        unset($el['project_type']);
        unset($el['principle_and_reason']);
        unset($el['objective']);
        unset($el['operational_plan']);
        unset($el['approver']);

        unset($el['level']);
        unset($el['project_year']);
        unset($el['budget_year']);
        unset($el['project_year']);
        unset($el['budget']);
        unset($el['budget_transfer_in']);
        unset($el['budget_transfer_out']);
        unset($el['budget_pr']);
        unset($el['budget_ro']);
        unset($el['budget_po']);
        unset($el['budget_pay']);
        unset($el['budget_amount']);
        unset($el['percen_complete']);
        unset($el['year']);
        unset($el['no_budget_project']);
        unset($el['budget_start_at']);
        unset($el['budget_end_at']);
        unset($el['balances']);
        unset($el['child']);
        unset($el['expected_result']);
        unset($el['budget_code']);
        unset($el['creator']);
        unset($el['wait_approve']);
        unset($el['current_wait_approve']);
        unset($el['last_approve']);
        unset($el['schedule']);
        unset($el['schedule_remark']);
        unset($el['users']);
        unset($el['action_plans']);

      }
      return $projects;*/
    }
    

    public function freeSearch(Request $request){
      $key = $request->key;
      $options = $request->options; 

      
    }
}