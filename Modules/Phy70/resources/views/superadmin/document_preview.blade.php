<!DOCTYPE html>
<html lang="th">

<head>
  <meta charset="UTF-8">
  <title>{{ $payload['form_type'] ?? 'เอกสาร' }}</title>
  <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Sarabun', sans-serif;
      margin: 0;
      padding: 20px;
      background: #e5e7eb;
    }

    .page {
      width: {{ isset($request) && $request->page_orientation === 'portrait' ? '210mm' : '297mm' }};
      min-height: {{ isset($request) && $request->page_orientation === 'portrait' ? '297mm' : '210mm' }};
      padding: 20mm;
      margin: 10mm auto;
      background: white;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    @media print {
      @page {
        size: {{ isset($request) && $request->page_orientation === 'portrait' ? 'A4 portrait' : 'A4 landscape' }};
        margin: 0;
      }
      body {
        background: none;
      }

      .page {
        margin: 0;
        box-shadow: none;
        width: 100%;
      }
    }

    .text-right {
      text-align: right;
    }

    .text-center {
      text-align: center;
    }

    .font-bold {
      font-weight: bold;
    }

    .mb-4 {
      margin-bottom: 1rem;
    }

    .mb-2 {
      margin-bottom: 0.5rem;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
      font-size: 14px;
    }

    th,
    td {
      border: 1px solid #000;
      padding: 8px;
      vertical-align: top;
    }

    th {
      background-color: #f3f4f6;
      text-align: center;
    }

    .header-title {
      font-size: 18px;
      font-weight: bold;
    }
  </style>
</head>

<body>

  <div class="page">
    @if(isset($payload['form_type']) && $payload['form_type'] == 'แบบ จ.1')
    @include('phy70::superadmin.templates.j1')
    @else
    <table>
      <thead>
        <tr>
          @foreach($payload['columns'] ?? [] as $col)
          <th>{{ $col['label'] }}</th>
          @endforeach
        </tr>
      </thead>
      <tbody>
        @if(count($proposals) > 0)
        @foreach($proposals as $index => $p)
        <tr>
          @foreach($payload['columns'] ?? [] as $col)
          @php
          $field = $col['field'];
          $value = $p->$field ?? '-';
          if (is_array($value) || is_object($value)) {
          $value = json_encode($value, JSON_UNESCAPED_UNICODE);
          }
          @endphp
          <td>{{ $value }}</td>
          @endforeach
        </tr>
        @endforeach
        @else
        <tr>
          <td colspan="{{ count($payload['columns'] ?? []) }}" class="text-center">ไม่มีข้อมูลโครงการ</td>
        </tr>
        @endif
      </tbody>
    </table>
    @endif

    <div class="text-center" style="margin-top: 40px;">
      <button onclick="window.print()"
        style="padding: 10px 20px; cursor: pointer; background: #2563eb; color: #fff; border: none; border-radius: 4px; font-family: 'Sarabun', sans-serif;">พิมพ์เอกสาร</button>
    </div>
  </div>

  <style>
    @media print {
      button {
        display: none !important;
      }
    }
  </style>
</body>

</html>