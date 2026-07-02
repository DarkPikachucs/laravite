<?php

namespace App\CustomApps\DataReport\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DataReportController extends Controller
{
    public function index()
    {
        return view('app-data-report::index');
    }

    public function generate(Request $request)
    {
        $validated = $request->validate([
            'report_type' => 'required|string',
            'date_from' => 'nullable|date',
            'date_to' => 'nullable|date|after_or_equal:date_from',
            'format' => 'required|in:html,csv,json',
        ]);

        // TODO: Generate report based on type and date range
        return redirect()->route('app.data-report.index')
            ->with('success', 'รายงานถูกสร้างเรียบร้อยแล้ว');
    }

    public function export(Request $request)
    {
        // TODO: Export data as CSV/JSON
        return response()->streamDownload(function () {
            // Generate CSV content
        }, 'export.csv');
    }

    public function history()
    {
        return view('app-data-report::history');
    }
}
