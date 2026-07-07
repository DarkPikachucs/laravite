<x-phy70::layouts.master>
  <link
    href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Prompt:wght@300;400;500;600;700&family=IBM+Plex+Sans+Thai:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
    rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js"></script>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>

  @php
  // ---- Per-issue color + icon mapping (ประเด็นการพัฒนา) --------------
  // สร้างสีแบบ dynamic ให้ "ทุกประเด็น" มีสีของตัวเอง (ไม่ตกเป็นสีเทาเหมือนกันหมด)
  $issuePalette = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#a855f7', '#ec4899', '#3b82f6', '#14b8a6',
  '#f97316', '#8b5cf6', '#e11d48'];
  $issueIconCycle = ['activity', 'mountain', 'heart', 'child', 'flag'];
  $hexToRgba = fn($hex, $a = 0.12) => sprintf('rgba(%d,%d,%d,%s)', hexdec(substr(ltrim($hex, '#'), 0, 2)),
  hexdec(substr(ltrim($hex, '#'), 2, 2)), hexdec(substr(ltrim($hex, '#'), 4, 2)), $a);
  $pickIssueIcon = function ($name) {
  if (preg_match('/ท่องเที่ยว|เที่ยว/u', $name)) return 'mountain';
  if (preg_match('/สุขภาพ|สุขภาวะ|สาธารณสุข|การแพทย์|ผู้สูงอายุ|เปราะบาง/u', $name)) return 'heart';
  if (preg_match('/เด็ก|เยาวชน|การศึกษา|เรียน/u', $name)) return 'child';
  if (preg_match('/เกษตร|ผลิตภาพ|อุตสาหกรรม|เศรษฐกิจ|แปรรูป/u', $name)) return 'activity';
  return null;
  };
  // เรียงประเด็นตามงบมาก→น้อยก่อน แล้วรวมประเด็นอื่นที่เหลือ เพื่อให้สีคงที่ทั้งหน้า
  $issueOrder = $budgetByIssue->keys()->merge($projects->pluck('province_issue'))->filter(fn($v) => filled($v))
  ->unique()->values();
  $issueMeta = [];
  foreach ($issueOrder as $idx => $isName) {
  $col = $issuePalette[$idx % count($issuePalette)];
  $issueMeta[$isName] = [
  'color' => $col,
  'bg' => $hexToRgba($col),
  'icon' => $pickIssueIcon($isName) ?? $issueIconCycle[$idx % count($issueIconCycle)],
  ];
  }
  $issueDefault = ['color' => '#64748b', 'bg' => 'rgba(100,116,139,0.12)', 'icon' => 'flag'];
  $issueCounts = $projects->groupBy('province_issue')->map->count();
  $maxIssueBudget = $budgetByIssue->max() ?: 1;

  // ---- Area palette for the layer map (พื้นที่เป้าหมาย) --------------
  $areaPalette = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#a855f7', '#ec4899', '#3b82f6'];
  $maxAreaBudget = $budgetByArea->max() ?: 1;

  // ---- Guideline color map (แนวทางการพัฒนา) -------------------------
  $guidelinePalette = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#a855f7', '#ec4899', '#3b82f6'];
  $guidelineList = $details->pluck('guideline')->unique()->values();
  $guidelineColors = [];
  foreach ($guidelineList as $gi => $g) { $guidelineColors[$g] = $guidelinePalette[$gi % count($guidelinePalette)]; }

  // ---- Approx lat/lng of Phetchabun sub-districts / ตำบล (real map) --
  $areaCoords = [
  'ต.ในเมือง (อ.เมืองเพชรบูรณ์)' => [16.4189, 101.1591],
  'ต.ท่าพล (อ.เมืองเพชรบูรณ์)' => [16.5108, 101.1189],
  'ต.วังชมภู (อ.เมืองเพชรบูรณ์)' => [16.2842, 101.0339],
  'ต.หล่มสัก (อ.หล่มสัก)' => [16.7756, 101.2419],
  'ต.น้ำก้อ (อ.หล่มสัก)' => [16.7025, 101.1494],
  'ต.หล่มเก่า (อ.หล่มเก่า)' => [16.8869, 101.2103],
  'ต.วังบาล (อ.หล่มเก่า)' => [16.8158, 101.0906],
  'ต.นาซำ (อ.หล่มเก่า)' => [16.9236, 101.2481],
  'ต.ท่าโรง (อ.วิเชียรบุรี)' => [15.6569, 101.1072],
  'ต.พุเตย (อ.วิเชียรบุรี)' => [15.5544, 101.0331],
  'ต.ชนแดน (อ.ชนแดน)' => [16.1783, 100.8103],
  'ต.ดงขุย (อ.ชนแดน)' => [16.2519, 100.7606],
  'ต.ศรีเทพ (อ.ศรีเทพ)' => [15.4675, 101.1436],
  'ต.ซับสมอทอด (อ.บึงสามพัน)' => [15.7936, 101.0508],
  // ---- District (อำเภอ) level centroids — ใช้เมื่อพื้นที่มาในรูป "อ.xxx" --
  'อ.เมืองเพชรบูรณ์' => [16.4189, 101.1591],
  'อ.หล่มสัก' => [16.7756, 101.2419],
  'อ.หล่มเก่า' => [16.8869, 101.2103],
  'อ.วิเชียรบุรี' => [15.6569, 101.1072],
  'อ.ศรีเทพ' => [15.4675, 101.1436],
  'อ.หนองไผ่' => [15.9962, 101.1172],
  'อ.บึงสามพัน' => [15.7936, 101.0508],
  'อ.ชนแดน' => [16.1783, 100.8103],
  'อ.วังโป่ง' => [16.3603, 100.8283],
  'อ.น้ำหนาว' => [16.7922, 101.5314],
  'อ.เขาค้อ' => [16.6644, 101.0453],
  ];

  // ---- Per-tambon aggregation with issue & guideline breakdown -------
  // (แต่ละกิจกรรมมี target_area + guideline, ส่วน "ประเด็น" อยู่ที่โครงการ)
  $tambonAgg = [];
  foreach ($projects as $p) {
  $issue = $p['province_issue'];
  foreach ($p['details'] as $d) {
  $t = $d['target_area'];
  if (!isset($tambonAgg[$t])) {
  $tambonAgg[$t] = ['budget' => 0, 'acts' => 0, 'issues' => [], 'guides' => []];
  }
  $tambonAgg[$t]['budget'] += $d['budget'];
  $tambonAgg[$t]['acts'] += 1;
  $tambonAgg[$t]['issues'][$issue] = ($tambonAgg[$t]['issues'][$issue] ?? 0) + $d['budget'];
  $tambonAgg[$t]['guides'][$d['guideline']] = ($tambonAgg[$t]['guides'][$d['guideline']] ?? 0) + $d['budget'];
  }
  }

  // Combine area aggregates + coords + colors into a map-ready payload
  $areaMapData = [];
  $ai = 0;
  foreach ($tambonAgg as $area => $agg) {
  // dominant issue / guideline (มากสุดตามงบ) + breakdown list พร้อมสี
  arsort($agg['issues']);
  arsort($agg['guides']);
  $issueBreak = [];
  foreach ($agg['issues'] as $is => $b) {
  $issueBreak[] = ['name' => $is, 'budget' => $b, 'color' => ($issueMeta[$is]['color'] ?? $issueDefault['color'])];
  }
  $guideBreak = [];
  foreach ($agg['guides'] as $g => $b) {
  $guideBreak[] = ['name' => $g, 'budget' => $b, 'color' => ($guidelineColors[$g] ?? '#64748b')];
  }
  $areaMapData[] = [
  'name' => $area,
  'budget' => $agg['budget'],
  'acts' => $agg['acts'],
  'color' => $areaPalette[$ai % count($areaPalette)], // สีมุมมอง "ตำบล"
  'lat' => $areaCoords[$area][0] ?? 16.42,
  'lng' => $areaCoords[$area][1] ?? 101.15,
  'pct' => round($agg['budget'] / $maxAreaBudget * 100),
  'issues' => $issueBreak,
  'guides' => $guideBreak,
  'domIssue' => $issueBreak[0],
  'domGuide' => $guideBreak[0],
  ];
  $ai++;
  }

  // ---- Per-year scope builder (ภาพรวม + รายปี) ----------------------
  // สร้าง payload สรุปข้อมูลไว้ล่วงหน้าทั้ง "ภาพรวม" และแต่ละปีงบ เพื่อให้
  // JS สลับมุมมองรายปีได้ทันทีโดยไม่ต้องโหลดหน้าใหม่ (ตัวเลข/กราฟ/แผนที่/ตาราง).
  // $budOf(detail) = งบของกิจกรรมนั้นในสโคปที่กำลังคิด (ภาพรวม = งบรวม, รายปี = งบปีนั้น)
  $buildScope = function ($budOf) use ($projects, $issueMeta, $issueDefault, $areaPalette, $areaCoords,
  $guidelineColors) {
  // งบต่อโครงการ (ตามลำดับเดียวกับ $projects) + ต่อกิจกรรม (flatten ตามลำดับ view)
  $projBudget = [];
  $detailBudget = [];
  $issueBudget = [];
  $issueCount = [];
  $agencyBudget = [];
  $areaBudget = [];
  $areaActs = [];
  $groupBudget = [];
  $tambon = [];
  $di = 0;
  foreach ($projects as $pi => $p) {
  $issue = $p['province_issue'];
  $pb = 0;
  foreach ($p['details'] as $d) {
  $b = $budOf($d);
  $detailBudget[$di] = $b;
  $di++;
  $pb += $b;
  $t = $d['target_area'];
  $areaBudget[$t] = ($areaBudget[$t] ?? 0) + $b;
  if ($b > 0) $areaActs[$t] = ($areaActs[$t] ?? 0) + 1;
  $groupBudget[$d['target_group']] = ($groupBudget[$d['target_group']] ?? 0) + $b;
  if (!isset($tambon[$t])) $tambon[$t] = ['budget' => 0, 'acts' => 0, 'issues' => [], 'guides' => []];
  $tambon[$t]['budget'] += $b;
  if ($b > 0) $tambon[$t]['acts'] += 1;
  $tambon[$t]['issues'][$issue] = ($tambon[$t]['issues'][$issue] ?? 0) + $b;
  $tambon[$t]['guides'][$d['guideline']] = ($tambon[$t]['guides'][$d['guideline']] ?? 0) + $b;
  }
  $projBudget[$pi] = $pb;
  $issueBudget[$issue] = ($issueBudget[$issue] ?? 0) + $pb;
  if ($pb > 0) $issueCount[$issue] = ($issueCount[$issue] ?? 0) + 1;
  $agencyBudget[$p['operating_agency']] = ($agencyBudget[$p['operating_agency']] ?? 0) + $pb;
  }
  arsort($issueBudget);
  arsort($agencyBudget);
  arsort($areaBudget);
  arsort($groupBudget);

  $maxIssue = max(1, ...(count($issueBudget) ? array_values($issueBudget) : [1]));
  $maxArea = max(1, ...(count($areaBudget) ? array_values($areaBudget) : [1]));

  // การ์ดประเด็น (สีคงที่ตาม issueMeta ทั้งหน้า)
  $issues = [];
  foreach ($issueBudget as $name => $bud) {
  $m = $issueMeta[$name] ?? $issueDefault;
  $issues[] = ['name' => $name, 'budget' => $bud, 'count' => $issueCount[$name] ?? 0,
  'pct' => round($bud / $maxIssue * 100), 'color' => $m['color'], 'bg' => $m['bg'], 'icon' => $m['icon']];
  }

  // รายการพื้นที่ (layer-map list ใต้แผนที่) + payload แผนที่
  $areaList = [];
  $areaMap = [];
  $ai = 0;
  foreach ($areaBudget as $area => $bud) {
  $color = $areaPalette[$ai % count($areaPalette)];
  $agg = $tambon[$area];
  arsort($agg['issues']);
  arsort($agg['guides']);
  $issueBreak = [];
  foreach ($agg['issues'] as $is => $b) {
  if ($b <= 0) continue;
  $issueBreak[] = ['name' => $is, 'budget' => $b, 'color' => ($issueMeta[$is]['color'] ?? $issueDefault['color'])];
  }
  $guideBreak = [];
  foreach ($agg['guides'] as $g => $b) {
  if ($b <= 0) continue;
  $guideBreak[] = ['name' => $g, 'budget' => $b, 'color' => ($guidelineColors[$g] ?? '#64748b')];
  }
  $pct = round($bud / $maxArea * 100);
  $areaList[] = ['name' => $area, 'budget' => $bud, 'acts' => $areaActs[$area] ?? 0, 'pct' => $pct,
  'color' => $color, 'rank' => $ai + 1];
  $areaMap[] = [
  'name' => $area, 'budget' => $bud, 'acts' => $areaActs[$area] ?? 0, 'color' => $color,
  'lat' => $areaCoords[$area][0] ?? 16.42, 'lng' => $areaCoords[$area][1] ?? 101.15, 'pct' => $pct,
  'issues' => $issueBreak, 'guides' => $guideBreak,
  'domIssue' => $issueBreak[0] ?? ['name' => '—', 'budget' => 0, 'color' => '#64748b'],
  'domGuide' => $guideBreak[0] ?? ['name' => '—', 'budget' => 0, 'color' => '#64748b'],
  ];
  $ai++;
  }

  // top 5 โครงการตามงบในสโคปนี้
  $topIdx = collect($projBudget)->sortDesc()->take(5)->keys();
  $top = [];
  foreach ($topIdx as $pi) {
  if (($projBudget[$pi] ?? 0) <= 0) continue;
  $top[] = ['name' => $projects[$pi]['project_name'], 'agency' => $projects[$pi]['operating_agency'],
  'budget' => $projBudget[$pi]];
  }

  $totalBudget = array_sum($detailBudget);
  $activeProjects = count(array_filter($projBudget, fn($b) => $b > 0));

  return [
  'kpi' => [
  'projects' => $activeProjects,
  'activities' => count(array_filter($detailBudget, fn($b) => $b > 0)),
  'total_budget' => $totalBudget,
  'agencies' => collect($projects)->filter(fn($p, $pi) => ($projBudget[$pi] ?? 0) > 0)
  ->pluck('operating_agency')->unique()->count(),
  'target_areas' => count(array_filter($areaBudget, fn($b) => $b > 0)),
  'avg_budget' => $activeProjects ? round($totalBudget / $activeProjects) : 0,
  ],
  'issues' => $issues,
  'agency' => ['labels' => array_keys($agencyBudget), 'values' => array_values($agencyBudget)],
  'group' => ['labels' => array_keys($groupBudget), 'values' => array_values($groupBudget)],
  'areaList' => $areaList,
  'areaMap' => $areaMap,
  'top' => $top,
  'projBudget' => array_map(fn($pi) => $projBudget[$pi] ?? 0, array_keys($projBudget)),
  'detailBudget' => $detailBudget,
  ];
  };

  // ภาพรวม = งบรวมของกิจกรรม / รายปี = งบเฉพาะปีนั้นใน yearly_budgets
  $scopes = ['overview' => $buildScope(fn($d) => $d['budget'])];
  foreach ($years as $y) {
  $scopes[$y] = $buildScope(fn($d) => $d['yearly_budgets'][$y] ?? 0);
  }

  // Stacked bar — งบประมาณรายปี (แกน X = ปี, ซ้อนสีตามประเด็น) สำหรับโหมดภาพรวม
  $stackIssues = collect($scopes['overview']['issues'])->pluck('name');
  $stackedSeries = [];
  foreach ($stackIssues as $isName) {
  $m = $issueMeta[$isName] ?? $issueDefault;
  $data = [];
  foreach ($years as $y) {
  $row = collect($scopes[$y]['issues'])->firstWhere('name', $isName);
  $data[] = $row ? $row['budget'] : 0;
  }
  $stackedSeries[] = ['name' => $isName, 'color' => $m['color'], 'data' => $data];
  }
  $stackedTotals = [];
  foreach ($years as $y) { $stackedTotals[] = $scopes[$y]['kpi']['total_budget']; }

  // ---- Per-issue project drilldown payload --------------------------
  // จัดกลุ่มโครงการตาม "ประเด็น" พร้อมกิจกรรมของแต่ละโครงการ และแนบ pindex/dindex
  // (ลำดับเดียวกับตาราง data-pindex/data-dindex) เพื่อให้ modal คำนวณงบตามปีที่เลือกได้
  $issueProjects = [];
  $dIdx = 0;
  foreach ($projects as $pi => $p) {
  $isName = $p['province_issue'];
  $acts = [];
  foreach ($p['details'] as $d) {
  $acts[] = [
  'dindex' => $dIdx,
  'activity' => $d['activity'],
  'guideline' => $d['guideline'],
  'target_area' => $d['target_area'],
  'target_group' => $d['target_group'],
  'budget' => $d['budget'],
  ];
  $dIdx++;
  }
  $issueProjects[$isName][] = [
  'pindex' => $pi,
  'db_id' => $p['db_id'],
  'id' => $p['project_id'],
  'name' => $p['project_name'],
  'agency' => $p['operating_agency'],
  'guideline' => $p['province_guideline'],
  'budget' => $p['total_budget'],
  'acts' => $acts,
  ];
  }

  // ---- Inline SVG path library --------------------------------------
  $svgIcons = [
  'activity' => '
  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />',
  'mountain' => '
  <path d="m8 3 4 8 5-5 5 15H2L8 3z" />',
  'heart' => '
  <path
    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
  ',
  'child' => '
  <circle cx="12" cy="5" r="2.4" />
  <path d="M12 7.4v6m0 0-3 4.6m3-4.6 3 4.6M8 10.2h8" />',
  'flag' => '
  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
  <line x1="4" y1="22" x2="4" y2="15" />',
  'pin' => '
  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
  <circle cx="12" cy="10" r="3" />',
  'layers' => '
  <polygon points="12 2 2 7 12 12 22 7 12 2" />
  <polyline points="2 17 12 22 22 17" />
  <polyline points="2 12 12 17 22 12" />',
  ];
  @endphp

  <style>
    :root {
      --bg-base: #f3f5fb;
      --bg-surface: #ffffff;
      --border: #e6e9f2;
      --border-hover: #c7cde0;
      --primary: #6366f1;
      --primary-soft: rgba(99, 102, 241, 0.10);
      --secondary: #0891b2;
      --success: #059669;
      --warning: #d97706;
      --danger: #dc2626;
      --text-main: #1e293b;
      --text-muted: #64748b;
      --text-faint: #94a3b8;
      --shadow-card: 0 1px 2px rgba(16, 24, 40, 0.04), 0 8px 24px rgba(16, 24, 40, 0.06);
      --shadow-hover: 0 4px 8px rgba(16, 24, 40, 0.06), 0 16px 40px rgba(16, 24, 40, 0.10);
      --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: var(--bg-base) !important;
      color: var(--text-main);
      font-family: 'Outfit', 'Prompt', 'IBM Plex Sans Thai', sans-serif;
      min-height: 100vh;
      overflow-x: hidden;
      position: relative;
    }

    .bg-glow-1,
    .bg-glow-2 {
      position: fixed;
      border-radius: 50%;
      pointer-events: none;
      z-index: 0;
    }

    .bg-glow-1 {
      width: 620px;
      height: 620px;
      top: -280px;
      left: -220px;
      background: radial-gradient(circle, rgba(99, 102, 241, 0.10) 0%, transparent 70%);
    }

    .bg-glow-2 {
      width: 520px;
      height: 520px;
      bottom: -180px;
      right: -120px;
      background: radial-gradient(circle, rgba(8, 145, 178, 0.09) 0%, transparent 70%);
    }

    .dashboard-container {
      max-width: 1440px;
      margin: 0 auto;
      padding: 40px 24px;
      position: relative;
      z-index: 10;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
      flex-wrap: wrap;
      gap: 20px;
    }

    .logo-section {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .logo-icon {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 20px rgba(99, 102, 241, 0.30);
    }

    .logo-title {
      font-size: 26px;
      font-weight: 700;
      letter-spacing: -0.5px;
      color: var(--text-main);
    }

    .logo-subtitle {
      font-size: 12px;
      color: var(--secondary);
      font-family: 'JetBrains Mono', monospace;
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    .btn-secondary {
      background: #fff;
      border: 1px solid var(--border);
      color: var(--text-main);
      padding: 10px 18px;
      border-radius: 12px;
      font-family: inherit;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      text-decoration: none;
      transition: var(--transition-smooth);
      box-shadow: var(--shadow-card);
    }

    .btn-secondary:hover {
      border-color: var(--border-hover);
      box-shadow: var(--shadow-hover);
    }

    .mockup-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(217, 119, 6, 0.10);
      border: 1px solid rgba(217, 119, 6, 0.25);
      color: var(--warning);
      padding: 5px 12px;
      border-radius: 99px;
      font-size: 12px;
      font-weight: 500;
    }

    .live-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(5, 150, 105, 0.10);
      border: 1px solid rgba(5, 150, 105, 0.25);
      color: var(--success);
      padding: 5px 12px;
      border-radius: 99px;
      font-size: 12px;
      font-weight: 500;
    }

    /* Empty state — shown wherever a section has no data yet */
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      text-align: center;
      color: var(--text-muted);
      padding: 40px 20px;
      width: 100%;
    }

    .empty-state.compact {
      padding: 28px 16px;
    }

    .empty-icon {
      width: 52px;
      height: 52px;
      border-radius: 14px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--primary-soft);
      color: var(--primary);
    }

    .empty-title {
      font-size: 15px;
      font-weight: 600;
      color: var(--text-main);
    }

    .empty-desc {
      font-size: 13px;
      color: var(--text-muted);
      max-width: 420px;
      line-height: 1.5;
    }

    .empty-cell {
      text-align: center;
      color: var(--text-muted);
      padding: 36px 16px !important;
      font-size: 13.5px;
    }

    .glass-card {
      background: var(--bg-surface);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 24px;
      transition: var(--transition-smooth);
      box-shadow: var(--shadow-card);
    }

    .glass-card:hover {
      border-color: var(--border-hover);
      box-shadow: var(--shadow-hover);
    }

    .page-title {
      font-size: 24px;
      font-weight: 700;
      font-family: 'Prompt', sans-serif;
      margin-bottom: 6px;
      color: var(--text-main);
    }

    .page-desc {
      color: var(--text-muted);
      font-size: 14px;
      margin-bottom: 28px;
    }

    /* Year selector (ภาพรวม + รายปี) */
    .year-selector {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 6px;
      background: var(--bg-surface);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 6px;
      margin-bottom: 24px;
      box-shadow: var(--shadow-card);
      width: fit-content;
      max-width: 100%;
    }

    .year-btn {
      appearance: none;
      border: none;
      background: transparent;
      color: var(--text-muted);
      font-family: inherit;
      font-size: 13.5px;
      font-weight: 600;
      padding: 9px 18px;
      border-radius: 10px;
      cursor: pointer;
      transition: var(--transition-smooth);
      white-space: nowrap;
    }

    .year-btn:hover {
      background: var(--primary-soft);
      color: var(--primary);
    }

    .year-btn.active {
      background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
      color: #fff;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.30);
    }

    .year-btn small {
      font-weight: 500;
      opacity: 0.75;
      font-size: 11px;
      margin-left: 5px;
      font-family: 'JetBrains Mono', monospace;
    }

    .scope-note {
      font-size: 13px;
      color: var(--text-muted);
      margin: -12px 0 22px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .scope-note b {
      color: var(--primary);
    }

    /* Dim rows/cards that have no budget in the selected year */
    .is-zero {
      opacity: 0.38;
      filter: grayscale(0.4);
    }

    /* Elements shown only in overview mode (hidden when a year is picked) */
    .overview-only.hide-scope {
      display: none;
    }

    /* KPI cards */
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
      gap: 20px;
      margin-bottom: 28px;
    }

    .kpi-card {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .kpi-head {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .kpi-icon {
      width: 40px;
      height: 40px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .kpi-label {
      font-size: 13px;
      color: var(--text-muted);
      font-weight: 500;
      line-height: 1.3;
    }

    .kpi-value {
      font-size: 30px;
      font-weight: 700;
      color: var(--text-main);
      font-family: 'Outfit', sans-serif;
    }

    .kpi-unit {
      font-size: 13px;
      color: var(--text-faint);
      font-weight: 500;
      margin-left: 4px;
    }

    /* Charts */
    .charts-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
      margin-bottom: 28px;
    }

    .chart-card {
      display: flex;
      flex-direction: column;
    }

    .chart-canvas-wrap {
      position: relative;
      height: 300px;
      margin-top: 12px;
    }

    @media (max-width: 900px) {
      .charts-grid {
        grid-template-columns: 1fr;
      }
    }

    .section-title {
      font-size: 17px;
      font-weight: 600;
      font-family: 'Prompt', sans-serif;
      display: flex;
      align-items: center;
      gap: 10px;
      color: var(--text-main);
    }

    .section-sub {
      font-size: 13px;
      color: var(--text-muted);
      margin-top: 4px;
    }

    .section-block {
      margin-bottom: 28px;
    }

    /* Issue cards (ประเด็นการพัฒนา) */
    .issue-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 18px;
      margin-top: 18px;
    }

    .issue-card {
      position: relative;
      background: #fff;
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 18px 18px 16px;
      overflow: hidden;
      transition: var(--transition-smooth);
      cursor: pointer;
    }

    .issue-card:hover {
      box-shadow: var(--shadow-hover);
      transform: translateY(-2px);
    }

    .issue-card:focus-visible {
      outline: 2px solid var(--primary);
      outline-offset: 2px;
    }

    /* affordance: "คลิกเพื่อดูรายโครงการ" ที่มุมล่างขวาของการ์ด */
    .issue-drill {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-top: 12px;
      font-size: 12px;
      font-weight: 600;
      opacity: 0.85;
    }

    .issue-drill svg {
      transition: transform 0.25s ease;
    }

    .issue-card:hover .issue-drill svg {
      transform: translateX(3px);
    }

    .issue-accent {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
    }

    .issue-top {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 14px;
    }

    .issue-icon {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .issue-name {
      font-size: 14px;
      font-weight: 600;
      line-height: 1.4;
      color: var(--text-main);
    }

    .issue-count {
      font-size: 12px;
      color: var(--text-muted);
      margin-top: 2px;
    }

    .issue-budget {
      font-size: 22px;
      font-weight: 700;
      font-family: 'Outfit', sans-serif;
    }

    .issue-budget small {
      font-size: 12px;
      font-weight: 500;
      color: var(--text-faint);
      margin-left: 4px;
    }

    .issue-bar {
      height: 7px;
      border-radius: 99px;
      background: #eef1f7;
      overflow: hidden;
      margin-top: 12px;
    }

    .issue-bar-fill {
      height: 100%;
      border-radius: 99px;
      transition: width 0.6s ease;
    }

    /* Real map (ข้อมูลพื้นที่) */
    .area-map-wrap {
      position: relative;
      margin-top: 18px;
      height: 480px;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid var(--border);
      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.4);
    }

    #areaMap {
      width: 100%;
      height: 100%;
      background: #eaeef5;
    }

    .leaflet-popup-content-wrapper {
      border-radius: 12px;
      box-shadow: var(--shadow-hover);
    }

    .leaflet-popup-content {
      margin: 12px 14px;
      font-family: 'Outfit', 'IBM Plex Sans Thai', sans-serif;
    }

    .map-pop-name {
      font-size: 14px;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 6px;
    }

    .map-pop-row {
      display: flex;
      justify-content: space-between;
      gap: 18px;
      font-size: 12.5px;
      color: #475569;
      padding: 2px 0;
    }

    .map-pop-row b {
      font-family: 'JetBrains Mono', monospace;
      color: #1e293b;
    }

    .map-legend {
      position: absolute;
      z-index: 500;
      bottom: 14px;
      right: 14px;
      background: rgba(255, 255, 255, 0.95);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 10px 12px;
      box-shadow: var(--shadow-card);
      font-size: 11px;
      color: var(--text-muted);
      max-width: 190px;
    }

    .map-legend-title {
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 6px;
      font-size: 12px;
    }

    .map-legend-item {
      display: flex;
      align-items: center;
      gap: 7px;
      padding: 2px 0;
    }

    .map-legend-dot {
      border-radius: 50%;
      background: #6366f1;
      opacity: 0.55;
      flex-shrink: 0;
    }

    /* Leaflet layer selector — ให้ใช้ฟอนต์เดียวกับหน้าเว็บ */
    .leaflet-control-layers {
      border: 1px solid var(--border) !important;
      border-radius: 12px !important;
      box-shadow: var(--shadow-card) !important;
      padding: 8px 6px !important;
      background: rgba(255, 255, 255, 0.97) !important;
      font-family: 'Outfit', 'IBM Plex Sans Thai', sans-serif !important;
    }

    .leaflet-control-layers-expanded {
      padding: 8px 8px !important;
    }

    .leaflet-control-layers-list {
      margin: 0;
    }

    .leaflet-control-layers-base label {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0;
      padding: 6px 10px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 500;
      color: var(--text-main);
      transition: background 0.15s ease;
    }

    .leaflet-control-layers-base label:hover {
      background: var(--primary-soft);
    }

    .leaflet-control-layers-base label>span {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .leaflet-control-layers-selector {
      width: 15px;
      height: 15px;
      margin: 0 !important;
      accent-color: var(--primary);
      cursor: pointer;
      flex-shrink: 0;
    }

    .leaflet-control-layers-separator {
      margin: 6px 4px;
      border-top-color: var(--border);
    }

    /* Layer mapping list (ranked legend below the map) */
    .layer-map {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-top: 18px;
    }

    .layer-row {
      position: relative;
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 15px 20px;
      border-radius: 14px;
      background: #fff;
      border: 1px solid var(--border);
      overflow: hidden;
      transition: var(--transition-smooth);
    }

    .layer-row:hover {
      transform: translateX(5px);
      box-shadow: var(--shadow-hover);
      border-color: var(--border-hover);
    }

    .layer-fill {
      position: absolute;
      inset: 0 auto 0 0;
      opacity: 0.10;
      transition: width 0.6s ease;
      z-index: 0;
    }

    .layer-edge {
      position: absolute;
      inset: 0 auto 0 0;
      width: 4px;
      z-index: 1;
    }

    .layer-rank {
      position: relative;
      z-index: 2;
      width: 26px;
      height: 26px;
      border-radius: 8px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 700;
      color: #fff;
    }

    .layer-pin {
      position: relative;
      z-index: 2;
      width: 40px;
      height: 40px;
      border-radius: 11px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .layer-info {
      position: relative;
      z-index: 2;
      flex: 1;
      min-width: 0;
    }

    .layer-name {
      font-size: 14.5px;
      font-weight: 600;
      color: var(--text-main);
    }

    .layer-sub {
      font-size: 12px;
      color: var(--text-muted);
      margin-top: 2px;
    }

    .layer-stats {
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      gap: 22px;
      flex-shrink: 0;
    }

    .layer-stat {
      text-align: right;
    }

    .layer-stat-value {
      font-size: 16px;
      font-weight: 700;
      font-family: 'JetBrains Mono', monospace;
      color: var(--text-main);
    }

    .layer-stat-label {
      font-size: 11px;
      color: var(--text-faint);
    }

    @media (max-width: 720px) {
      .layer-stats {
        flex-direction: column;
        align-items: flex-end;
        gap: 6px;
      }
    }

    /* Tables */
    .table-responsive {
      width: 100%;
      overflow-x: auto;
      margin-top: 16px;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 13px;
      white-space: nowrap;
    }

    .data-table th {
      padding: 14px 16px;
      border-bottom: 1px solid var(--border);
      color: var(--text-muted);
      font-weight: 600;
      position: sticky;
      top: 0;
      background: #f8fafc;
      text-align: left;
    }

    .data-table td {
      padding: 13px 16px;
      border-bottom: 1px solid var(--border);
      color: var(--text-main);
      vertical-align: top;
    }

    .data-table tr:hover td {
      background: #f8fafc;
    }

    .cell-clip {
      max-width: 240px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .code-cell {
      font-family: 'JetBrains Mono', monospace;
      color: var(--secondary);
      font-size: 12px;
    }

    .num-cell {
      text-align: right;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 600;
    }

    .chip {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 3px 10px;
      border-radius: 99px;
      font-size: 12px;
      font-weight: 500;
      background: rgba(99, 102, 241, 0.12);
      color: #4f46e5;
    }

    .chip-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .chip-cyan {
      background: rgba(8, 145, 178, 0.12);
      color: #0e7490;
    }

    .chip-emerald {
      background: rgba(5, 150, 105, 0.12);
      color: #047857;
    }

    .rank-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 26px;
      height: 26px;
      border-radius: 8px;
      font-weight: 700;
      font-size: 13px;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      color: #fff;
    }

    /* ===== Issue drilldown modal (รายละเอียดรายโครงการต่อประเด็น) ===== */
    .modal-overlay {
      position: fixed;
      inset: 0;
      z-index: 2000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      background: rgba(15, 23, 42, 0.45);
      backdrop-filter: blur(3px);
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.25s ease, visibility 0.25s ease;
    }

    .modal-overlay.open {
      opacity: 1;
      visibility: visible;
    }

    .modal-panel {
      background: var(--bg-surface);
      border: 1px solid var(--border);
      border-radius: 22px;
      box-shadow: var(--shadow-hover);
      width: min(880px, 100%);
      max-height: calc(100vh - 48px);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      transform: translateY(16px) scale(0.98);
      transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .modal-overlay.open .modal-panel {
      transform: translateY(0) scale(1);
    }

    .modal-head {
      position: relative;
      display: flex;
      align-items: flex-start;
      gap: 14px;
      padding: 22px 24px;
      border-bottom: 1px solid var(--border);
    }

    .modal-head-accent {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
    }

    .modal-head-icon {
      width: 46px;
      height: 46px;
      border-radius: 13px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .modal-title {
      font-size: 18px;
      font-weight: 700;
      font-family: 'Prompt', sans-serif;
      color: var(--text-main);
      line-height: 1.35;
    }

    .modal-sub {
      font-size: 13px;
      color: var(--text-muted);
      margin-top: 3px;
    }

    .modal-sub b {
      font-family: 'JetBrains Mono', monospace;
      color: var(--text-main);
    }

    /* "ดูรายละเอียด (แบบ จ.1)" — ลิงก์ไปหน้าสรุปโครงการรายประเด็น */
    .modal-summary-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-top: 12px;
      padding: 7px 14px;
      border: 1px solid var(--border);
      border-radius: 10px;
      background: #fff;
      font-size: 13px;
      font-weight: 600;
      text-decoration: none;
      cursor: pointer;
      transition: var(--transition-smooth);
    }

    .modal-summary-link svg {
      transition: transform 0.25s ease;
    }

    .modal-summary-link:hover {
      box-shadow: var(--shadow-hover);
      transform: translateY(-1px);
    }

    .modal-summary-link:hover svg:last-child {
      transform: translateX(3px);
    }

    .modal-close {
      position: absolute;
      top: 16px;
      right: 16px;
      width: 34px;
      height: 34px;
      border-radius: 10px;
      border: 1px solid var(--border);
      background: #fff;
      color: var(--text-muted);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: var(--transition-smooth);
    }

    .modal-close:hover {
      border-color: var(--border-hover);
      color: var(--text-main);
      background: var(--bg-base);
    }

    .modal-body {
      padding: 18px 24px 24px;
      overflow-y: auto;
    }

    .mp-card {
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 16px 18px;
      margin-bottom: 14px;
      background: #fff;
    }

    .mp-card:last-child {
      margin-bottom: 0;
    }

    /* Clickable project card → opens the จ.1-1 project brief */
    a.mp-card {
      display: block;
      text-decoration: none;
      color: inherit;
      cursor: pointer;
    }

    a.mp-card:hover {
      border-color: var(--border-hover);
      box-shadow: var(--shadow-hover);
      transform: translateY(-2px);
    }

    .mp-brief-hint {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px dashed var(--border);
      font-size: 12px;
      font-weight: 600;
    }

    .mp-brief-hint svg {
      transition: transform 0.25s ease;
    }

    a.mp-card:hover .mp-brief-hint svg {
      transform: translateX(3px);
    }

    .mp-top {
      display: flex;
      align-items: flex-start;
      gap: 14px;
    }

    .mp-name {
      font-size: 14.5px;
      font-weight: 600;
      color: var(--text-main);
      line-height: 1.4;
    }

    .mp-meta {
      font-size: 12.5px;
      color: var(--text-muted);
      margin-top: 4px;
      display: flex;
      flex-wrap: wrap;
      gap: 6px 14px;
    }

    .mp-budget {
      text-align: right;
      flex-shrink: 0;
    }

    .mp-budget-val {
      font-size: 16px;
      font-weight: 700;
      font-family: 'JetBrains Mono', monospace;
    }

    .mp-budget-lbl {
      font-size: 11px;
      color: var(--text-faint);
    }

    .mp-acts {
      margin-top: 12px;
      border-top: 1px dashed var(--border);
      padding-top: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .mp-act {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 12.5px;
    }

    .mp-act-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      flex-shrink: 0;
      background: var(--text-faint);
    }

    .mp-act-name {
      flex: 1;
      min-width: 0;
      color: var(--text-main);
    }

    .mp-act-area {
      color: var(--text-muted);
      font-size: 11.5px;
      white-space: nowrap;
    }

    .mp-act-budget {
      font-family: 'JetBrains Mono', monospace;
      font-weight: 600;
      color: var(--text-main);
      flex-shrink: 0;
      white-space: nowrap;
    }

    .mp-act.is-zero,
    .mp-card.is-zero {
      opacity: 0.4;
    }

    @media (max-width: 560px) {
      .mp-top {
        flex-direction: column;
      }

      .mp-budget {
        text-align: left;
      }
    }
  </style>

  <div class="bg-glow-1"></div>
  <div class="bg-glow-2"></div>

  <div class="dashboard-container">
    <!-- Header -->
    <header class="header">
      <div class="logo-section">
        <div class="logo-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 3v18h18" />
            <path d="M18 17V9" />
            <path d="M13 17V5" />
            <path d="M8 17v-3" />
          </svg>
        </div>
        <div>
          <h1 class="logo-title">Phetchabun Project Dashboard</h1>
          <span class="logo-subtitle">ภาพรวมข้อมูลโครงการ จังหวัดเพชรบูรณ์ 2571-2575</span>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <span class="live-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          ข้อมูลจริง · {{ number_format($projects->count()) }} โครงการ
        </span>
        <a href="{{ route('phy70.linkage') }}" class="btn-secondary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          การเชื่อมโยง
        </a>
        {{-- เมนูประเมินคุณภาพถูกปิดไว้ชั่วคราว
        <a href="{{ route('phy70.scorecard') }}" class="btn-secondary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
          ประเมินคุณภาพ
        </a>
        --}}
        <a href="{{ route('phy70.index') }}" class="btn-secondary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          กลับหน้าหลัก
        </a>
      </div>
    </header>

    <h2 class="page-title">แดชบอร์ดสรุปข้อมูลโครงการ</h2>
    <p class="page-desc">ภาพรวมเชิงวิเคราะห์ของโครงการและกิจกรรมภายใต้แผนพัฒนาจังหวัด — สรุปงบประมาณ ประเด็นการพัฒนา
      พื้นที่และกลุ่มเป้าหมาย</p>

    @if($projects->isEmpty())
    <!-- No proposals in the database yet -->
    <div class="glass-card">
      <div class="empty-state">
        <div class="empty-icon" style="width: 64px; height: 64px; border-radius: 18px;">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 3v18h18" />
            <path d="M18 17V9" />
            <path d="M13 17V5" />
            <path d="M8 17v-3" />
          </svg>
        </div>
        <div class="empty-title" style="font-size: 18px;">ยังไม่มีข้อมูลโครงการ</div>
        <div class="empty-desc">ยังไม่มีข้อเสนอโครงการในระบบ เมื่อมีการบันทึกข้อเสนอโครงการแล้ว
          แดชบอร์ดจะแสดงสรุปงบประมาณ ประเด็นการพัฒนา พื้นที่ และกลุ่มเป้าหมายโดยอัตโนมัติ</div>
        <a href="{{ route('phy70.proposal.create') }}" class="btn-secondary" style="margin-top: 6px;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          เพิ่มข้อเสนอโครงการ
        </a>
      </div>
    </div>
    @else

    <!-- Year selector (ภาพรวม + รายปี) -->
    <div class="year-selector" id="yearSelector">
      <button type="button" class="year-btn active" data-scope="overview">ภาพรวม<small>ทุกปี</small></button>
      @foreach($years as $y)
      <button type="button" class="year-btn" data-scope="{{ $y }}">ปี {{ $y }}</button>
      @endforeach
    </div>
    <div class="scope-note" id="scopeNote" style="display: none;">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
      <span>กำลังแสดงเฉพาะงบประมาณของ <b id="scopeNoteYear"></b> — รายการที่ไม่มีงบในปีนี้จะถูกจางลง</span>
    </div>

    <!-- KPI cards -->
    <div class="kpi-grid">
      <div class="glass-card kpi-card">
        <div class="kpi-head">
          <div class="kpi-icon" style="background: rgba(99,102,241,0.12);">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <span class="kpi-label">จำนวนโครงการทั้งหมด</span>
        </div>
        <div class="kpi-value"><span id="kpi-projects">{{ number_format($kpi['projects']) }}</span><span class="kpi-unit">โครงการ</span></div>
      </div>

      <div class="glass-card kpi-card">
        <div class="kpi-head">
          <div class="kpi-icon" style="background: rgba(8,145,178,0.12);">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0e7490" stroke-width="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <span class="kpi-label">จำนวนกิจกรรมทั้งหมด</span>
        </div>
        <div class="kpi-value"><span id="kpi-activities">{{ number_format($kpi['activities']) }}</span><span class="kpi-unit">กิจกรรม</span></div>
      </div>

      <div class="glass-card kpi-card">
        <div class="kpi-head">
          <div class="kpi-icon" style="background: rgba(5,150,105,0.12);">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#047857" stroke-width="2">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <span class="kpi-label">งบประมาณรวมทั้งหมด</span>
        </div>
        @php
            $budgetVal = $kpi['total_budget'];
            $budgetDisplay = $budgetVal > 1000000 ? number_format($budgetVal / 1000000, 2) : number_format($budgetVal);
            $budgetUnit = $budgetVal > 1000000 ? 'ล้านบาท' : 'บาท';
        @endphp
        <div class="kpi-value"><span id="kpi-total_budget">{{ $budgetDisplay }}</span><span id="kpi-total_budget-unit" class="kpi-unit">{{ $budgetUnit }}</span></div>
      </div>

      <div class="glass-card kpi-card">
        <div class="kpi-head">
          <div class="kpi-icon" style="background: rgba(217,119,6,0.12);">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2">
              <path d="M3 21h18" />
              <path d="M5 21V7l8-4v18" />
              <path d="M19 21V11l-6-4" />
            </svg>
          </div>
          <span class="kpi-label">หน่วยงานดำเนินการ</span>
        </div>
        <div class="kpi-value"><span id="kpi-agencies">{{ number_format($kpi['agencies']) }}</span><span class="kpi-unit">หน่วยงาน</span></div>
      </div>

      <div class="glass-card kpi-card">
        <div class="kpi-head">
          <div class="kpi-icon" style="background: rgba(168,85,247,0.12);">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9333ea" stroke-width="2">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <span class="kpi-label">พื้นที่เป้าหมาย</span>
        </div>
        <div class="kpi-value"><span id="kpi-target_areas">{{ number_format($kpi['target_areas']) }}</span><span class="kpi-unit">ตำบล</span></div>
      </div>

      <div class="glass-card kpi-card">
        <div class="kpi-head">
          <div class="kpi-icon" style="background: rgba(236,72,153,0.12);">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#db2777" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            </svg>
          </div>
          <span class="kpi-label">งบประมาณเฉลี่ย/โครงการ</span>
        </div>
        @php
            $avgBudgetVal = $kpi['avg_budget'];
            $avgBudgetDisplay = $avgBudgetVal > 1000000 ? number_format($avgBudgetVal / 1000000, 2) : number_format($avgBudgetVal);
            $avgBudgetUnit = $avgBudgetVal > 1000000 ? 'ล้านบาท' : 'บาท';
        @endphp
        <div class="kpi-value"><span id="kpi-avg_budget">{{ $avgBudgetDisplay }}</span><span id="kpi-avg_budget-unit" class="kpi-unit">{{ $avgBudgetUnit }}</span></div>
      </div>
    </div>

    <!-- Issue cards (ประเด็นการพัฒนา — icon + สีต่อประเด็น) -->
    <div class="glass-card section-block">
      <h3 class="section-title" style="color: var(--primary);">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">{!!
          $svgIcons['flag'] !!}</svg>
        ประเด็นการพัฒนาของจังหวัด
      </h3>
      <p class="section-sub">งบประมาณและจำนวนโครงการแยกตามประเด็นการพัฒนา — แต่ละประเด็นมีสีและไอคอนกำกับ</p>
      <div class="issue-grid">
        @forelse(collect($budgetByIssue)->sortKeys() as $issue => $budget)
        @php $m = $issueMeta[$issue] ?? $issueDefault; @endphp
        <div class="issue-card" data-issue="{{ $issue }}" role="button" tabindex="0"
          aria-label="ดูรายละเอียดรายโครงการของประเด็น {{ $issue }}">
          <div class="issue-accent" style="background: {{ $m['color'] }};"></div>
          <div class="issue-top">
            <div class="issue-icon" style="background: {{ $m['bg'] }};">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="{{ $m['color'] }}" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">{!! $svgIcons[$m['icon']] !!}</svg>
            </div>
            <div style="min-width: 0;">
              <div class="issue-name">{{ $issue }}</div>
              <div class="issue-count"><span class="js-issue-count">{{ $issueCounts[$issue] ?? 0 }}</span> โครงการ</div>
            </div>
          </div>
          <div class="issue-budget" style="color: {{ $m['color'] }};"><span class="js-issue-budget">{{
            number_format($budget) }}</span><small>บาท</small>
          </div>
          <div class="issue-bar">
            <div class="issue-bar-fill js-issue-bar"
              style="width: {{ round($budget / $maxIssueBudget * 100) }}%; background: {{ $m['color'] }};"></div>
          </div>
          <div class="issue-drill" style="color: {{ $m['color'] }};">
            คลิกเพื่อดูรายโครงการ
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"
              stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>
        @empty
        <div class="empty-state compact">
          <div class="empty-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round">{!! $svgIcons['flag'] !!}</svg></div>
          <div class="empty-title">ยังไม่มีข้อมูลประเด็นการพัฒนา</div>
          <div class="empty-desc">ยังไม่มีข้อเสนอที่ระบุประเด็นการพัฒนาของจังหวัด</div>
        </div>
        @endforelse
      </div>
    </div>

    <!-- Budget by fiscal year (stacked by issue) — overview only -->
    <div class="glass-card section-block overview-only" id="yearlyBudgetSection">
      <h3 class="section-title" style="color: var(--primary);">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="20" x2="12" y2="10" />
          <line x1="18" y1="20" x2="18" y2="4" />
          <line x1="6" y1="20" x2="6" y2="16" />
        </svg>
        งบประมาณรายปีงบประมาณ (2571–2575)
      </h3>
      <p class="section-sub">การกระจายงบประมาณในแต่ละปีงบ ซ้อนสีตามประเด็นการพัฒนา —
        คลิกที่ปุ่มปีด้านบนเพื่อเจาะดูข้อมูลเฉพาะปีนั้นทั้งแดชบอร์ด</p>
      @if($budgetByIssue->sum() <= 0)
      <div class="empty-state compact">
        <div class="empty-title">ยังไม่มีข้อมูลงบประมาณรายปี</div>
        <div class="empty-desc">ยังไม่มีโครงการที่ระบุการแบ่งงบประมาณรายปี</div>
      </div>
      @else
      <div class="chart-canvas-wrap" style="height: 340px;"><canvas id="chartYearly"></canvas></div>
      @endif
    </div>

    <!-- Charts row: guideline + agency -->
    <div class="charts-grid">
      <div class="glass-card chart-card">
        <h3 class="section-title" style="color: var(--secondary);">สัดส่วนงบประมาณตามประเด็นการพัฒนา</h3>
        @if($budgetByIssue->sum() <= 0) <div class="empty-state compact">
          <div class="empty-title">ยังไม่มีข้อมูลงบประมาณตามประเด็น</div>
          <div class="empty-desc">ยังไม่มีโครงการที่ระบุประเด็นการพัฒนาและงบประมาณ</div>
      </div>
      @else
      <div class="chart-canvas-wrap"><canvas id="chartIssue"></canvas></div>
      @endif
    </div>
    <div class="glass-card chart-card">
      <h3 class="section-title" style="color: var(--success);">งบประมาณตามหน่วยงานดำเนินการ</h3>
      @if($budgetByAgency->sum() <= 0) <div class="empty-state compact">
        <div class="empty-title">ยังไม่มีข้อมูลงบประมาณตามหน่วยงาน</div>
        <div class="empty-desc">ยังไม่มีโครงการที่ระบุหน่วยงานและงบประมาณ</div>
    </div>
    @else
    <div class="chart-canvas-wrap"><canvas id="chartAgency"></canvas></div>
    @endif
  </div>
  </div>

  <!-- Layer mapping (ข้อมูลพื้นที่) -->
  <div class="glass-card section-block">
    <h3 class="section-title" style="color: var(--warning);">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round">{!! $svgIcons['layers'] !!}</svg>
      ข้อมูลพื้นที่ — Layer Mapping
    </h3>
    <p class="section-sub">แผนที่จังหวัดเพชรบูรณ์ ระดับตำบล — เลือกมุมมอง (Layer) ที่มุมขวาบนของแผนที่: <b>ดูเป็นตำบล /
        ประเด็น / แนวทาง</b> · ขนาดวงกลม = งบประมาณ · คลิกหมุดเพื่อดูรายละเอียดแยกตามมุมมอง</p>

    <div class="area-map-wrap">
      <div id="areaMap"></div>
      <div class="map-legend" id="mapLegend">
        <div class="map-legend-title">ขนาดวงกลม = งบประมาณ</div>
        <div class="map-legend-item"><span class="map-legend-dot" style="width:10px;height:10px;"></span> งบน้อย</div>
        <div class="map-legend-item"><span class="map-legend-dot" style="width:18px;height:18px;"></span> ปานกลาง</div>
        <div class="map-legend-item"><span class="map-legend-dot" style="width:26px;height:26px;"></span> งบสูง</div>
      </div>
    </div>

    <div class="layer-map">
      @forelse($budgetByArea as $area => $budget)
      @php
      $ci = $loop->index % count($areaPalette);
      $color = $areaPalette[$ci];
      $acts = $activitiesByArea[$area] ?? 0;
      $pct = round($budget / $maxAreaBudget * 100);
      @endphp
      <div class="layer-row" data-area="{{ $area }}">
        <div class="layer-fill js-area-fill" style="width: {{ $pct }}%; background: {{ $color }};"></div>
        <div class="layer-edge" style="background: {{ $color }};"></div>
        <div class="layer-rank" style="background: {{ $color }};">{{ $loop->iteration }}</div>
        <div class="layer-pin" style="background: {{ $color }}1f;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="{{ $color }}" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">{!! $svgIcons['pin'] !!}</svg>
        </div>
        <div class="layer-info">
          <div class="layer-name">{{ $area }}</div>
          <div class="layer-sub">สัดส่วนงบประมาณ <span class="js-area-pct">{{ $pct }}</span>% ของพื้นที่สูงสุด</div>
        </div>
        <div class="layer-stats">
          <div class="layer-stat">
            <div class="layer-stat-value js-area-acts">{{ number_format($acts) }}</div>
            <div class="layer-stat-label">กิจกรรม</div>
          </div>
          <div class="layer-stat">
            <div class="layer-stat-value js-area-budget" style="color: {{ $color }};">{{ number_format($budget) }}</div>
            <div class="layer-stat-label">บาท</div>
          </div>
        </div>
      </div>
      @empty
      <div class="empty-state compact">
        <div class="empty-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">{!! $svgIcons['pin'] !!}</svg></div>
        <div class="empty-title">ยังไม่มีข้อมูลพื้นที่เป้าหมาย</div>
        <div class="empty-desc">ยังไม่มีกิจกรรมที่ระบุพื้นที่เป้าหมายและงบประมาณ</div>
      </div>
      @endforelse
    </div>
  </div>

  <!-- Charts row: target group + top projects -->
  <div class="charts-grid">
    <div class="glass-card chart-card">
      <h3 class="section-title" style="color: #db2777;">งบประมาณตามกลุ่มเป้าหมาย</h3>
      @if($budgetByTargetGroup->sum() <= 0) <div class="empty-state compact">
        <div class="empty-title">ยังไม่มีข้อมูลกลุ่มเป้าหมาย</div>
        <div class="empty-desc">ยังไม่มีกิจกรรมที่ระบุกลุ่มเป้าหมายและงบประมาณ</div>
    </div>
    @else
    <div class="chart-canvas-wrap"><canvas id="chartGroup"></canvas></div>
    @endif
  </div>
  <div class="glass-card chart-card">
    <h3 class="section-title" style="color: #9333ea;">5 โครงการงบประมาณสูงสุด</h3>
    <div id="topProjects" style="margin-top: 16px; display: flex; flex-direction: column; gap: 12px;">
      @forelse($topProjects as $i => $p)
      <div
        style="display: flex; align-items: center; gap: 14px; background: #f8fafc; border: 1px solid var(--border); padding: 12px 14px; border-radius: 12px;">
        <span class="rank-badge">{{ $i + 1 }}</span>
        <div style="flex: 1; min-width: 0;">
          <div class="cell-clip" style="max-width: 100%; font-weight: 600; font-size: 13.5px;"
            title="{{ $p['project_name'] }}">{{ $p['project_name'] }}</div>
          <div style="font-size: 12px; color: var(--text-muted);">{{ $p['operating_agency'] }}</div>
        </div>
        <div style="text-align: right; flex-shrink: 0;">
          <div style="font-family: 'JetBrains Mono', monospace; font-weight: 700; color: var(--text-main);">{{
            number_format($p['total_budget']) }}</div>
          <div style="font-size: 11px; color: var(--text-faint);">บาท</div>
        </div>
      </div>
      @empty
      <div class="empty-state compact">
        <div class="empty-title">ยังไม่มีข้อมูลโครงการ</div>
      </div>
      @endforelse
    </div>
  </div>
  </div>

  <!-- Project table -->
  <div class="glass-card section-block">
    <h3 class="section-title" style="color: var(--secondary);">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
      ตารางข้อมูลโครงการ (project)
    </h3>
    <div class="table-responsive" style="max-height: 520px; overflow-y: auto;">
      <table class="data-table">
        <thead>
          <tr>
            <th>รหัสโครงการ</th>
            <th>ชื่อโครงการ</th>
            <th>ประเด็นการพัฒนาของจังหวัด</th>
            <th>หลักการและเหตุผล</th>
            <th>วัตถุประสงค์ของโครงการ</th>
            <th>หน่วยงานดำเนินการ</th>
            <th>ผลผลิต</th>
            <th>ผลลัพธ์</th>
            <th style="text-align: right;">งบประมาณรวม (บาท)</th>
          </tr>
        </thead>
        <tbody>
          @forelse($projects as $p)
          @php $im = $issueMeta[$p['province_issue']] ?? $issueDefault; @endphp
          <tr data-pindex="{{ $loop->index }}">
            <td class="code-cell">{{ $p['project_id'] }}</td>
            <td style="font-weight: 600; white-space: normal; min-width: 220px;">{{ $p['project_name'] }}</td>
            <td><span class="chip" style="background: {{ $im['bg'] }}; color: {{ $im['color'] }};"><span
                  class="chip-dot" style="background: {{ $im['color'] }};"></span>{{ $p['province_issue'] }}</span></td>
            <td class="cell-clip" title="{{ $p['rationale'] }}">{{ $p['rationale'] }}</td>
            <td class="cell-clip" title="{{ $p['objective'] }}">{{ $p['objective'] }}</td>
            <td class="cell-clip" title="{{ $p['operating_agency'] }}">{{ $p['operating_agency'] }}</td>
            <td class="cell-clip" title="{{ $p['output'] }}">{{ $p['output'] }}</td>
            <td class="cell-clip" title="{{ $p['outcome'] }}">{{ $p['outcome'] }}</td>
            <td class="num-cell js-pbudget">{{ number_format($p['total_budget']) }}</td>
          </tr>
          @empty
          <tr>
            <td colspan="9" class="empty-cell">ยังไม่มีข้อมูลโครงการ</td>
          </tr>
          @endforelse
        </tbody>
        <tfoot>
          <tr>
            <td colspan="8" style="text-align: right; font-weight: 600; color: var(--text-muted);">รวมงบประมาณทั้งสิ้น
            </td>
            <td class="num-cell" id="projTableTotal" style="color: var(--success); font-size: 15px;">{{
              number_format($kpi['total_budget']) }}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>

  <!-- Project detail table -->
  <div class="glass-card section-block">
    <h3 class="section-title" style="color: var(--primary);">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
      ตารางรายละเอียดกิจกรรม (project_detail)
    </h3>
    <div class="table-responsive" style="max-height: 520px; overflow-y: auto;">
      <table class="data-table">
        <thead>
          <tr>
            <th>รหัสกิจกรรม (PK)</th>
            <th>รหัสโครงการ (FK)</th>
            <th>แนวทางการพัฒนา</th>
            <th>พื้นที่เป้าหมาย</th>
            <th>กลุ่มเป้าหมาย</th>
            <th>กิจกรรม</th>
            <th style="text-align: right;">งบประมาณ (บาท)</th>
            <th>ผู้รับผิดชอบ</th>
            <th>หน่วยงานรับผิดชอบ</th>
            <th>หน่วยงานที่เกี่ยวข้อง</th>
          </tr>
        </thead>
        <tbody>
          @if($details->isEmpty())
          <tr>
            <td colspan="10" class="empty-cell">ยังไม่มีข้อมูลกิจกรรม</td>
          </tr>
          @endif
          @php $di = 0; @endphp
          @foreach($projects as $p)
          @foreach($p['details'] as $d)
          <tr data-dindex="{{ $di }}">
            <td class="code-cell">{{ $d['activity_id'] }}</td>
            <td class="code-cell" style="color: var(--text-muted);">{{ $p['project_id'] }}</td>
            <td><span class="chip chip-cyan">{{ $d['guideline'] }}</span></td>
            <td><span class="chip chip-emerald">{{ $d['target_area'] }}</span></td>
            <td>{{ $d['target_group'] }}</td>
            <td style="white-space: normal; min-width: 220px;">{{ $d['activity'] }}</td>
            <td class="num-cell js-dbudget">{{ number_format($d['budget']) }}</td>
            <td>{{ $d['responsible_person'] }}</td>
            <td class="cell-clip" title="{{ $d['responsible_agency'] }}">{{ $d['responsible_agency'] }}</td>
            <td class="cell-clip" title="{{ $d['related_agency'] }}">{{ $d['related_agency'] }}</td>
          </tr>
          @php $di++; @endphp
          @endforeach
          @endforeach
        </tbody>
      </table>
    </div>
  </div>

  <!-- Issue drilldown modal (รายละเอียดรายโครงการต่อประเด็น) -->
  <div class="modal-overlay" id="issueModal" role="dialog" aria-modal="true" aria-labelledby="issueModalTitle">
    <div class="modal-panel">
      <div class="modal-head">
        <div class="modal-head-accent" id="issueModalAccent"></div>
        <div class="modal-head-icon" id="issueModalIcon"></div>
        <div style="min-width: 0; flex: 1;">
          <div class="modal-title" id="issueModalTitle">—</div>
          <div class="modal-sub" id="issueModalSub"></div>
          <a id="issueModalSummary" class="modal-summary-link" href="#" target="_blank" rel="noopener">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18" />
              <path d="M9 21V9" />
            </svg>
            ดูรายละเอียด (แบบ จ.1)
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"
              stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
        <button type="button" class="modal-close" id="issueModalClose" aria-label="ปิด">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
      <div class="modal-body" id="issueModalBody"></div>
    </div>
  </div>
  @endif
  </div>

  @unless($projects->isEmpty())
  <script>
    // ---- Precomputed per-scope payloads (ภาพรวม + รายปี) ----
        const SCOPES = @json($scopes);
        const YEARS  = @json($years);
        const STACKED = { years: @json($years), series: @json($stackedSeries), totals: @json($stackedTotals) };

        // Per-issue project drilldown (สำหรับ modal รายโครงการต่อประเด็น)
        const ISSUE_PROJECTS = @json($issueProjects);
        const ISSUE_META     = @json($issueMeta);
        const ISSUE_DEFAULT  = @json($issueDefault);
        const SVG_ICONS      = @json($svgIcons);
        // URL แม่แบบสำหรับหน้ารายละเอียดโครงการ (แบบ จ.1-1) — แทน __ID__ ด้วย db_id
        const BRIEF_URL      = @json(route('phy70.project.brief', ['id' => '__ID__']));
        // URL หน้าสรุปโครงการรายประเด็น (แบบ จ.1) — ต่อท้ายด้วย ?issue=ชื่อประเด็น
        const SUMMARY_URL    = @json(route('phy70.issue.summary'));
        let currentScope = 'overview';   // อัปเดตตามปุ่มปีที่เลือก เพื่อให้ modal ใช้งบปีเดียวกัน

        const bahtFmt = (v) => new Intl.NumberFormat('th-TH').format(Math.round(v || 0));
        const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

        // ================= Leaflet area map =================
        const areaMap = L.map('areaMap', { scrollWheelZoom: true, zoomControl: true });
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(areaMap);

        const popHead = (a) =>
            '<div class="map-pop-name">' + esc(a.name) + '</div>' +
            '<div class="map-pop-row"><span>งบประมาณรวม</span><b>' + bahtFmt(a.budget) + ' บาท</b></div>' +
            '<div class="map-pop-row"><span>จำนวนกิจกรรม</span><b>' + bahtFmt(a.acts) + ' กิจกรรม</b></div>';

        const popBreak = (items, title) => {
            let h = '<div class="map-pop-row" style="margin-top:6px;font-weight:600;color:#1e293b;"><span>แยกตาม' + title + '</span><span></span></div>';
            items.forEach(it => {
                h += '<div class="map-pop-row"><span><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:' + it.color + ';margin-right:6px;"></span>' + esc(it.name) + '</span><b>' + bahtFmt(it.budget) + '</b></div>';
            });
            return h;
        };

        const makeMarker = (a, maxB, color, popupHtml) => {
            const r = 10 + (a.budget / maxB) * 20;   // radius 10 → 30 px by budget
            const m = L.circleMarker([a.lat, a.lng], {
                radius: r, color: color, weight: 2, fillColor: color, fillOpacity: 0.45
            });
            m.bindPopup(popupHtml);
            m.bindTooltip(a.name, { direction: 'top', offset: [0, -r] });
            return m;
        };

        const layerTambon = L.layerGroup();
        const layerIssue  = L.layerGroup();
        const layerGuide  = L.layerGroup();

        // (Re)build the three marker layers from a scope's areaMap payload.
        function buildMapLayers(areaData) {
            layerTambon.clearLayers(); layerIssue.clearLayers(); layerGuide.clearLayers();
            const maxB = Math.max(...areaData.map(a => a.budget), 1);
            areaData.forEach(a => {
                if (a.budget <= 0) return; // hide areas with no budget in this scope
                layerTambon.addLayer(makeMarker(a, maxB, a.color,
                    popHead(a) + '<div class="map-pop-row"><span>สัดส่วนงบ</span><b>' + a.pct + '%</b></div>'));
                layerIssue.addLayer(makeMarker(a, maxB, a.domIssue.color,
                    popHead(a) + popBreak(a.issues, 'ประเด็น')));
                layerGuide.addLayer(makeMarker(a, maxB, a.domGuide.color,
                    popHead(a) + popBreak(a.guides, 'แนวทาง')));
            });
        }

        buildMapLayers(SCOPES.overview.areaMap);
        layerTambon.addTo(areaMap); // มุมมองเริ่มต้น

        L.control.layers({
            'ดูเป็นตำบล':   layerTambon,
            'ดูเป็นประเด็น': layerIssue,
            'ดูเป็นแนวทาง':  layerGuide,
        }, null, { collapsed: false, position: 'topright' }).addTo(areaMap);

        // ---- Dynamic legend ต่อ layer ----
        const issueLegend = @json(collect($scopes['overview']['areaMap'])->flatMap->issues->unique('name')->values());
        const guideLegend = @json(collect($scopes['overview']['areaMap'])->flatMap->guides->unique('name')->values());
        const legendEl = document.getElementById('mapLegend');

        const sizeLegend =
            '<div class="map-legend-title">ขนาดวงกลม = งบประมาณ</div>' +
            '<div class="map-legend-item"><span class="map-legend-dot" style="width:10px;height:10px;"></span> งบน้อย</div>' +
            '<div class="map-legend-item"><span class="map-legend-dot" style="width:18px;height:18px;"></span> ปานกลาง</div>' +
            '<div class="map-legend-item"><span class="map-legend-dot" style="width:26px;height:26px;"></span> งบสูง</div>';

        const colorLegend = (title, items) => {
            let h = '<div class="map-legend-title">' + title + '</div>';
            items.forEach(it => {
                h += '<div class="map-legend-item"><span class="map-legend-dot" style="width:12px;height:12px;opacity:1;background:' + it.color + ';"></span> ' + esc(it.name) + '</div>';
            });
            return h;
        };

        const setLegend = (name) => {
            if (name === 'ดูเป็นประเด็น')      legendEl.innerHTML = colorLegend('สีตามประเด็นการพัฒนา', issueLegend);
            else if (name === 'ดูเป็นแนวทาง')  legendEl.innerHTML = colorLegend('สีตามแนวทางการพัฒนา', guideLegend);
            else                               legendEl.innerHTML = sizeLegend;
        };
        areaMap.on('baselayerchange', (e) => setLegend(e.name));

        const initBounds = SCOPES.overview.areaMap.map(a => [a.lat, a.lng]);
        if (initBounds.length) {
            areaMap.fitBounds(initBounds, { padding: [50, 50] });
        } else {
            areaMap.setView([16.42, 101.15], 9);
        }
        setTimeout(() => areaMap.invalidateSize(), 200);

        // ================= Chart.js =================
        Chart.defaults.color = '#475569';
        Chart.defaults.font.family = "'Outfit', 'IBM Plex Sans Thai', sans-serif";
        Chart.defaults.font.size = 12;

        const palette = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#a855f7', '#ec4899', '#3b82f6'];
        const gridColor = 'rgba(15,23,42,0.06)';
        const surfaceBorder = '#ffffff';
        const ov = SCOPES.overview;

        // Budget by issue (doughnut) — สีตรงกับการ์ดประเด็น
        let chartIssue = null;
        if (document.getElementById('chartIssue')) {
            chartIssue = new Chart(document.getElementById('chartIssue'), {
                type: 'doughnut',
                data: {
                    labels: ov.issues.map(i => i.name),
                    datasets: [{ data: ov.issues.map(i => i.budget), backgroundColor: ov.issues.map(i => i.color), borderColor: surfaceBorder, borderWidth: 3 }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false, cutout: '60%',
                    plugins: {
                        legend: { position: 'bottom', labels: { padding: 14, usePointStyle: true, boxWidth: 8 } },
                        tooltip: { callbacks: { label: (ctx) => ' ' + ctx.label + ': ' + bahtFmt(ctx.raw) + ' บาท' } }
                    }
                }
            });
        }

        // Budget by operating agency (horizontal bar)
        let chartAgency = null;
        if (document.getElementById('chartAgency')) {
            chartAgency = new Chart(document.getElementById('chartAgency'), {
                type: 'bar',
                data: {
                    labels: ov.agency.labels,
                    datasets: [{ label: 'งบประมาณ (บาท)', data: ov.agency.values, backgroundColor: 'rgba(5,150,105,0.75)', borderColor: '#059669', borderWidth: 1, borderRadius: 8 }]
                },
                options: {
                    indexAxis: 'y', responsive: true, maintainAspectRatio: false,
                    plugins: { legend: { display: false }, tooltip: { callbacks: { label: (ctx) => ' ' + bahtFmt(ctx.raw) + ' บาท' } } },
                    scales: {
                        x: { grid: { color: gridColor }, ticks: { callback: (v) => bahtFmt(v) } },
                        y: { grid: { display: false }, ticks: { callback: function(v){ const l = this.getLabelForValue(v); return l.length > 22 ? l.slice(0,22)+'…' : l; } } }
                    }
                }
            });
        }

        // Budget by target group (pie)
        let chartGroup = null;
        if (document.getElementById('chartGroup')) {
            chartGroup = new Chart(document.getElementById('chartGroup'), {
                type: 'pie',
                data: {
                    labels: ov.group.labels,
                    datasets: [{ data: ov.group.values, backgroundColor: palette, borderColor: surfaceBorder, borderWidth: 3 }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom', labels: { padding: 14, usePointStyle: true, boxWidth: 8 } },
                        tooltip: { callbacks: { label: (ctx) => ' ' + ctx.label + ': ' + bahtFmt(ctx.raw) + ' บาท' } }
                    }
                }
            });
        }

        // Budget by fiscal year (stacked by issue) — overview only, static
        if (document.getElementById('chartYearly')) {
            new Chart(document.getElementById('chartYearly'), {
                type: 'bar',
                data: {
                    labels: STACKED.years.map(y => 'ปี ' + y),
                    datasets: STACKED.series.map(se => ({ label: se.name, data: se.data, backgroundColor: se.color, borderColor: surfaceBorder, borderWidth: 1, borderRadius: 4 }))
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom', labels: { padding: 12, usePointStyle: true, boxWidth: 8 } },
                        tooltip: {
                            callbacks: {
                                label: (ctx) => ' ' + ctx.dataset.label + ': ' + bahtFmt(ctx.raw) + ' บาท',
                                footer: (items) => 'รวมทั้งปี: ' + bahtFmt(items.reduce((s, i) => s + i.raw, 0)) + ' บาท'
                            }
                        }
                    },
                    scales: {
                        x: { stacked: true, grid: { display: false } },
                        y: { stacked: true, grid: { color: gridColor }, ticks: { callback: (v) => bahtFmt(v) } }
                    }
                }
            });
        }

        const updateChart = (ch, labels, data, colors) => {
            if (!ch) return;
            ch.data.labels = labels;
            ch.data.datasets[0].data = data;
            if (colors) ch.data.datasets[0].backgroundColor = colors;
            ch.update();
        };

        // ================= Scope switching (ภาพรวม / รายปี) =================
        const setText = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };

        const topRowHtml = (p, i) =>
            '<div style="display:flex;align-items:center;gap:14px;background:#f8fafc;border:1px solid var(--border);padding:12px 14px;border-radius:12px;">' +
            '<span class="rank-badge">' + (i + 1) + '</span>' +
            '<div style="flex:1;min-width:0;"><div class="cell-clip" style="max-width:100%;font-weight:600;font-size:13.5px;" title="' + esc(p.name) + '">' + esc(p.name) + '</div>' +
            '<div style="font-size:12px;color:var(--text-muted);">' + esc(p.agency) + '</div></div>' +
            '<div style="text-align:right;flex-shrink:0;"><div style="font-family:\'JetBrains Mono\',monospace;font-weight:700;color:var(--text-main);">' + bahtFmt(p.budget) + '</div>' +
            '<div style="font-size:11px;color:var(--text-faint);">บาท</div></div></div>';

        function renderScope(key) {
            const s = SCOPES[key];
            if (!s) return;
            const isOverview = key === 'overview';
            currentScope = key;
            if (issueModal.classList.contains('open') && openIssueName) openIssueModal(openIssueName);

            // KPIs
            setText('kpi-projects', bahtFmt(s.kpi.projects));
            setText('kpi-activities', bahtFmt(s.kpi.activities));
            let tb = s.kpi.total_budget || 0;
            if (tb > 1000000) {
                setText('kpi-total_budget', (tb / 1000000).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}));
                setText('kpi-total_budget-unit', 'ล้านบาท');
            } else {
                setText('kpi-total_budget', bahtFmt(tb));
                setText('kpi-total_budget-unit', 'บาท');
            }
            setText('kpi-agencies', bahtFmt(s.kpi.agencies));
            setText('kpi-target_areas', bahtFmt(s.kpi.target_areas));
            let ab = s.kpi.avg_budget || 0;
            if (ab > 1000000) {
                setText('kpi-avg_budget', (ab / 1000000).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}));
                setText('kpi-avg_budget-unit', 'ล้านบาท');
            } else {
                setText('kpi-avg_budget', bahtFmt(ab));
                setText('kpi-avg_budget-unit', 'บาท');
            }

            // Issue cards
            const issueByName = {}; s.issues.forEach(i => issueByName[i.name] = i);
            document.querySelectorAll('.issue-card[data-issue]').forEach(card => {
                const row = issueByName[card.dataset.issue];
                const b = row ? row.budget : 0;
                const bd = card.querySelector('.js-issue-budget'); if (bd) bd.textContent = bahtFmt(b);
                const ct = card.querySelector('.js-issue-count'); if (ct) ct.textContent = row ? row.count : 0;
                const bar = card.querySelector('.js-issue-bar'); if (bar) bar.style.width = (row ? row.pct : 0) + '%';
                card.classList.toggle('is-zero', b <= 0);
            });

            // Area layer-map rows
            const areaByName = {}; s.areaList.forEach(a => areaByName[a.name] = a);
            document.querySelectorAll('.layer-row[data-area]').forEach(rowEl => {
                const a = areaByName[rowEl.dataset.area];
                const b = a ? a.budget : 0;
                const bd = rowEl.querySelector('.js-area-budget'); if (bd) bd.textContent = bahtFmt(b);
                const ac = rowEl.querySelector('.js-area-acts'); if (ac) ac.textContent = bahtFmt(a ? a.acts : 0);
                const pc = rowEl.querySelector('.js-area-pct'); if (pc) pc.textContent = a ? a.pct : 0;
                const fl = rowEl.querySelector('.js-area-fill'); if (fl) fl.style.width = (a ? a.pct : 0) + '%';
                rowEl.classList.toggle('is-zero', b <= 0);
            });

            // Top 5 projects
            const topEl = document.getElementById('topProjects');
            if (topEl) {
                topEl.innerHTML = s.top.length
                    ? s.top.map((p, i) => topRowHtml(p, i)).join('')
                    : '<div class="empty-state compact"><div class="empty-title">ยังไม่มีข้อมูลโครงการในช่วงที่เลือก</div></div>';
            }

            // Project table
            document.querySelectorAll('tr[data-pindex]').forEach(tr => {
                const b = s.projBudget[+tr.dataset.pindex] || 0;
                const cell = tr.querySelector('.js-pbudget'); if (cell) cell.textContent = bahtFmt(b);
                tr.classList.toggle('is-zero', b <= 0);
            });
            setText('projTableTotal', bahtFmt(s.kpi.total_budget));

            // Detail table
            document.querySelectorAll('tr[data-dindex]').forEach(tr => {
                const b = s.detailBudget[+tr.dataset.dindex] || 0;
                const cell = tr.querySelector('.js-dbudget'); if (cell) cell.textContent = bahtFmt(b);
                tr.classList.toggle('is-zero', b <= 0);
            });

            // Charts
            updateChart(chartIssue, s.issues.map(i => i.name), s.issues.map(i => i.budget), s.issues.map(i => i.color));
            updateChart(chartAgency, s.agency.labels, s.agency.values);
            updateChart(chartGroup, s.group.labels, s.group.values);

            // Map
            buildMapLayers(s.areaMap);

            // Overview-only sections
            document.querySelectorAll('.overview-only').forEach(el => el.classList.toggle('hide-scope', !isOverview));

            // Scope note
            const note = document.getElementById('scopeNote');
            if (note) {
                if (isOverview) { note.style.display = 'none'; }
                else { note.style.display = 'flex'; setText('scopeNoteYear', 'ปีงบประมาณ ' + key); }
            }
        }

        document.querySelectorAll('#yearSelector .year-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('#yearSelector .year-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderScope(btn.dataset.scope);
                setTimeout(() => areaMap.invalidateSize(), 120);
            });
        });

        // ================= Issue drilldown modal =================
        // คลิกการ์ดประเด็น → แสดงรายโครงการ (พร้อมกิจกรรม) ของประเด็นนั้น
        // งบที่แสดงอิงตามปีที่เลือก (currentScope) — projBudget/detailBudget ตาม index
        const issueModal = document.getElementById('issueModal');
        let openIssueName = null;

        function openIssueModal(name) {
            const projects = ISSUE_PROJECTS[name] || [];
            const meta = ISSUE_META[name] || ISSUE_DEFAULT;
            const scope = SCOPES[currentScope] || SCOPES.overview;
            const pBud = scope.projBudget || [];
            const dBud = scope.detailBudget || [];
            openIssueName = name;

            // เตรียมรายการโครงการพร้อมงบตามสโคป แล้วเรียงงบมาก→น้อย
            let totalBudget = 0, activeCount = 0;
            const rows = projects.map(p => {
                const b = pBud[p.pindex] != null ? pBud[p.pindex] : p.budget;
                totalBudget += b;
                if (b > 0) activeCount++;
                return { p, b };
            }).sort((a, b) => b.b - a.b);

            // Header
            document.getElementById('issueModalAccent').style.background = meta.color;
            const iconEl = document.getElementById('issueModalIcon');
            iconEl.style.background = meta.bg;
            iconEl.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="' + meta.color +
                '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + (SVG_ICONS[meta.icon] || SVG_ICONS.flag) + '</svg>';
            document.getElementById('issueModalTitle').textContent = name;
            const scopeLabel = currentScope === 'overview' ? 'ทุกปีงบประมาณ' : ('ปีงบประมาณ ' + currentScope);
            document.getElementById('issueModalSub').innerHTML =
                '<b>' + bahtFmt(activeCount) + '</b> โครงการ · งบรวม <b>' + bahtFmt(totalBudget) + '</b> บาท · ' + esc(scopeLabel);

            // ปุ่ม "ดูรายละเอียด (แบบ จ.1)" → หน้าสรุปโครงการรายประเด็น
            const summaryLink = document.getElementById('issueModalSummary');
            if (summaryLink) {
                summaryLink.href = SUMMARY_URL + '?issue=' + encodeURIComponent(name);
                summaryLink.style.color = meta.color;
                summaryLink.style.borderColor = meta.color;
            }

            // Body — การ์ดต่อโครงการ + รายการกิจกรรม
            const body = document.getElementById('issueModalBody');
            if (!rows.length) {
                body.innerHTML = '<div class="empty-state compact"><div class="empty-title">ยังไม่มีข้อมูลโครงการในประเด็นนี้</div></div>';
            } else {
                body.innerHTML = rows.map(({ p, b }) => {
                    const acts = (p.acts || []).map(a => {
                        const ab = dBud[a.dindex] != null ? dBud[a.dindex] : a.budget;
                        return '<div class="mp-act' + (ab <= 0 ? ' is-zero' : '') + '">' +
                            '<span class="mp-act-dot" style="background:' + meta.color + ';"></span>' +
                            '<span class="mp-act-name">' + esc(a.activity || a.guideline || 'กิจกรรม') + '</span>' +
                            '<span class="mp-act-area">' + esc(a.target_area || '') + '</span>' +
                            '<span class="mp-act-budget">' + bahtFmt(ab) + ' ฿</span></div>';
                    }).join('');
                    const href = p.db_id != null ? BRIEF_URL.replace('__ID__', encodeURIComponent(p.db_id)) : null;
                    const hint = href
                        ? '<div class="mp-brief-hint" style="color:' + meta.color + ';">ดูรายละเอียดโครงการ (แบบ จ.1-1)' +
                          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></div>'
                        : '';
                    const open = href ? '<a class="mp-card' + (b <= 0 ? ' is-zero' : '') + '" href="' + href + '">' : '<div class="mp-card' + (b <= 0 ? ' is-zero' : '') + '">';
                    const close = href ? '</a>' : '</div>';
                    return open +
                        '<div class="mp-top">' +
                        '<div style="flex:1;min-width:0;">' +
                        '<div class="mp-name">' + esc(p.name) + '</div>' +
                        '<div class="mp-meta">' +
                        '<span>รหัส: ' + esc(p.id) + '</span>' +
                        '<span>หน่วยงาน: ' + esc(p.agency || '—') + '</span>' +
                        (p.guideline ? '<span>แนวทาง: ' + esc(p.guideline) + '</span>' : '') +
                        '</div></div>' +
                        '<div class="mp-budget"><div class="mp-budget-val" style="color:' + meta.color + ';">' + bahtFmt(b) + '</div>' +
                        '<div class="mp-budget-lbl">บาท</div></div></div>' +
                        (acts ? '<div class="mp-acts">' + acts + '</div>' : '') +
                        hint +
                        close;
                }).join('');
            }

            issueModal.classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        function closeIssueModal() {
            issueModal.classList.remove('open');
            document.body.style.overflow = '';
            openIssueName = null;
        }

        document.querySelectorAll('.issue-card[data-issue]').forEach(card => {
            card.addEventListener('click', () => openIssueModal(card.dataset.issue));
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openIssueModal(card.dataset.issue); }
            });
        });
        document.getElementById('issueModalClose').addEventListener('click', closeIssueModal);
        issueModal.addEventListener('click', (e) => { if (e.target === issueModal) closeIssueModal(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && issueModal.classList.contains('open')) closeIssueModal(); });
  </script>
  @endunless
</x-phy70::layouts.master>