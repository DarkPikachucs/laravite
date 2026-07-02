<?php

namespace App\CustomApps\TaskManager\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TaskManagerController extends Controller
{
    public function index()
    {
        return view('app-task-manager::index');
    }

    public function create()
    {
        return view('app-task-manager::create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|in:low,medium,high',
            'due_date' => 'nullable|date',
        ]);

        // TODO: Save task to database or cache
        return redirect()->route('app.task-manager.index')
            ->with('success', 'งานถูกสร้างเรียบร้อยแล้ว');
    }

    public function edit($id)
    {
        return view('app-task-manager::edit', compact('id'));
    }

    public function update(Request $request, $id)
    {
        // TODO: Update task
        return redirect()->route('app.task-manager.index')
            ->with('success', 'งานถูกอัปเดตเรียบร้อยแล้ว');
    }

    public function destroy($id)
    {
        // TODO: Delete task
        return redirect()->route('app.task-manager.index')
            ->with('success', 'งานถูกลบเรียบร้อยแล้ว');
    }

    public function progress()
    {
        return view('app-task-manager::progress');
    }
}
