<?php

namespace App\Http\Controllers;

use App\Models\Swot;
use App\Services\SwotService;
use Illuminate\Http\Request;

class SwotController extends Controller
{
  protected $request;
   public function __construct(Request $request) {
        $this->request = $request;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if($this->request->has('status')) {
            $status = $this->request->input('status');
            return response()->json(Swot::where('status', $status)
                ->orderBy('id', 'desc')
                ->get(), 200);
        }else
            return response()->json(Swot::orderBy('id', 'desc')->get(), 200); 
          //  return response()->json(Swot::orderBy('id', 'desc')->get(), 200);     

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store( $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Swot $swot)
    {
      $swotTmp = new SwotService($swot->id);
      return response()->json($swotTmp->swot, 200); 
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Swot $swot)
    {
      $email = $this->request->input('email');
      //dd( $email);
      $rs_swot = Swot::with([
        'user_progress',
        'raw_strength' => function($q) use ($email) {
            $q->where('email', $email);
        },
        'raw_weakness' => function($q) use ($email) {
            $q->where('email', $email);
        },
        'raw_opportunity' => function($q) use ($email) {
            $q->where('email', $email);
        },
        'raw_threat' => function($q) use ($email) {
            $q->where('email', $email);
        }
      ])->find($swot->id);

      return response()->json($rs_swot, 200); 
    }

    /**
     * Update the specified resource in storage.
     */
    public function update( $request, Swot $swot)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Swot $swot)
    {
        //
    }
}