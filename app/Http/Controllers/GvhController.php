<?php

namespace App\Http\Controllers;

use App\Models\GVH;
use Illuminate\Http\Request;

class GvhController extends Controller
{
  // แสดงรายการข้อมูลทั้งหมด
  public function index()
  {
      return response()->json(GVH::all(), 200);
  }

  // แสดงข้อมูลเดี่ยวตาม ID
  public function score($uuid)
  {
    $gvh = Gvh::where('pp_project_code', $uuid)->get();
    if (!$gvh) {
        return response()->json(['message' => 'Data not found'], 404);
    }
    return response()->json($gvh, 200);
  }

  // แสดงข้อมูลเดี่ยวตาม ID
  public function show($id)
  {
      $gvh = Gvh::find($id);
      if (!$gvh) {
          return response()->json(['message' => 'Data not found'], 404);
      }
      return response()->json($gvh, 200);
  }

  // สร้างข้อมูลใหม่
  public function store(Request $request)
  {
      $validated = $request->validate([
        'year' => 'required|string',
        'pp_project_code' => 'required|string',
        'phrase' => 'required|string',
        'gender' => 'required|in:male,female,none',
        'age' => 'required',
        'career'=> 'required',
        'career_other'=> '',
        'education'=> 'required',
        'zipcode'=> 'required',
        'province'=> 'required',
        'amphoe'=> 'required',
        'district'=> 'required',
        'townshipName'=> 'required',
        'section_1_1'=> 'required',
        'section_1_2'=> 'required',
        'section_1_3'=> 'required',
        'section_1_4'=> 'required',
        'section_1_5'=> 'required',
        'section_2_1'=> 'required',
        'section_2_2'=> 'required',
        'section_2_3'=> 'required',
        'section_2_4'=> 'required',
        'section_2_5'=> 'required',
        'section_3_1'=> 'required',
        'section_3_2'=> 'required',
        'section_3_3'=> 'required',
        'section_3_4'=> 'required',
        'section_3_5'=> 'required',
        'section_4_1'=> 'required',
        'section_4_2'=> 'required',
        'section_4_3'=> 'required',
        'section_4_4'=> 'required',
        'section_4_5'=> 'required',
        'section_5_1'=> 'required',
        'section_5_2'=> 'required',
        'section_5_3'=> 'required',
        'section_5_4'=> 'required',
        'section_5_5'=> 'required',
        'section_6_1'=> 'required',
        'section_6_2'=> 'required',
        'section_6_3'=> 'required',
        'section_6_4'=> 'required',
        'section_6_5'=> 'required',
        'total_gvh'=> 'required',
          // เพิ่ม validation ตามต้องการ
      ]);

      $gvh = Gvh::create($validated);
      return response()->json($gvh, 201);
  }

  // อัปเดตข้อมูล
  public function update(Request $request, $id)
  {
      $gvh = Gvh::find($id);
      if (!$gvh) {
          return response()->json(['message' => 'Data not found'], 404);
      }

      $gvh->update($request->all());
      return response()->json($gvh, 200);
  }

  // ลบข้อมูล
  public function destroy($id)
  {
      $gvh = Gvh::find($id);
      if (!$gvh) {
          return response()->json(['message' => 'Data not found'], 404);
      }

      $gvh->delete();
      return response()->json(['message' => 'Data deleted successfully'], 200);
  }
}