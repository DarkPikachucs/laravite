<div>
  <div class="font-bold text-right">{{ $payload['form_type'] ?? '' }}</div>
  {{-- <div class="text-center header-title">{{ $payload['document_title'] ?? '' }}</div>
  <div class="mb-4 font-bold text-center">จังหวัด {{ $payload['province'] ?? '' }}</div>

  <div class="mb-2"><strong>เป้าหมายการพัฒนาจังหวัด:</strong> {{ $payload['development_goal'] ?? '' }}</div>

  @if(!empty($request->main_project_name))
  <div class="mb-2" style="font-size: 16px;"><strong>แผนงาน/โครงการสำคัญ:</strong> {{ $request->main_project_name }}
  </div>
  @endif
  --}}
  @php
  $colspan = 12;
  @endphp
  <table>
    <thead>
      <tr>
        <th colspan="6">บัญชีรายการชุดโครงการสำคัญ</th>
        <th colspan="6">งบประมาณดำเนินการ</th>
      </tr>
      <tr>
        <th colspan="2" style="font-weight: normal;">แผนงาน/โครงการสำคัญ</th>
        <th style="font-weight: normal;">ยุทธศาสตร์/แผนแม่บทฯ</th>
        <th style="font-weight: normal;">แผนพัฒนาเศรษฐกิจและสังคมแห่งชาติ ฉบับที่ ๑๔</th>
        <th style="font-weight: normal;">เป้าหมายปละแนวทางการพัฒนาภาค</th>
        <th style="font-weight: normal; display: none;">แหล่ง งปม.</th>
        <th style="font-weight: normal;">หน่วยดำเนินการ</th>
        <th style="font-weight: normal;">พ.ศ. ๒๕๗๑</th>
        <th style="font-weight: normal;">พ.ศ. ๒๕๗๒</th>
        <th style="font-weight: normal;">พ.ศ. ๒๕๗๓</th>
        <th style="font-weight: normal;">พ.ศ. ๒๕๗๔</th>
        <th style="font-weight: normal;">พ.ศ. ๒๕๗๕</th>
        <th style="font-weight: normal;">พ.ศ. ๒๕๗๑-๒๕๗๕</th>
      </tr>
    </thead>
    <tbody>
      @if(count($proposals) > 0)
      @php
      // Group proposals
      $grouped = [];

      // Build lookup map for custom groups
      $customGroups = $request->custom_groups ?? [];
      if (is_string($customGroups)) {
      $customGroups = json_decode($customGroups, true);
      }
      $proposalGroupMap = [];
      $groupStrategyMap = [];
      if(is_array($customGroups)) {
      foreach($customGroups as $group) {
      $groupName = $group['group_name'] ?? 'ไม่ระบุชื่อกลุ่ม';
      $strategy = $group['strategy'] ?? '';
      $masterPlan = $group['master_plan'] ?? '';
      $plan14 = $group['plan14'] ?? '';
      $regionalGoal = $group['regional_goal'] ?? '';
      $pIds = $group['proposal_ids'] ?? [];

      if (!isset($groupStrategyMap[$groupName])) {
      $groupStrategyMap[$groupName] = [
      'strategy' => $strategy,
      'master_plan' => $masterPlan,
      'plan14' => $plan14,
      'regional_goal' => $regionalGoal,
      ];
      }

      foreach($pIds as $pId) {
      $proposalGroupMap[$pId] = $groupName;
      }
      }
      }

      foreach($proposals as $p) {
      if (!isset($proposalGroupMap[$p->id])) {
      continue;
      }

      $issue = $p->province_issue ?: 'ไม่ระบุประเด็นการพัฒนา';
      $plan = $p->plan ?: 'ไม่ระบุแผนงาน';

      // Use custom group name
      $project = $proposalGroupMap[$p->id];

      if(!isset($grouped[$issue])) {
      $grouped[$issue] = ['proposals' => [], 'plans' => []];
      }
      $grouped[$issue]['proposals'][] = $p;

      if(!isset($grouped[$issue]['plans'][$plan])) {
      $grouped[$issue]['plans'][$plan] = [];
      }
      if(!isset($grouped[$issue]['plans'][$plan][$project])) {
      $grouped[$issue]['plans'][$plan][$project] = [];
      }
      $grouped[$issue]['plans'][$plan][$project][] = $p;
      }
      @endphp

      <script>
        console.log('grouped', @json($grouped)); 
      </script>
      @foreach($grouped as $issueName => $issueData)
      @php
      $firstProp = $issueData['proposals'][0];
      @endphp
      <!-- Issue Row -->
      <tr style="background-color: #f8fafc;">
        <td colspan="{{ $colspan }}" style="font-weight: bold;">{{ $issueName }}</td>
        {{-- <td>
          @php
          $kpisText = [];
          // Aggregate KPIs from all proposals in this issue to avoid missing any
          foreach($issueData['proposals'] as $p) {
          $kpis = is_array($p->kpis) ? $p->kpis : [];
          foreach($kpis as $k) {
          if(isset($k['selected']) && $k['selected']) {
          if(!in_array($k['name'], $kpisText)) {
          $kpisText[] = $k['name'];
          }
          }
          }
          }
          @endphp
          {{ count($kpisText)>0?implode(',',$kpisText):'-' }}
        </td> --}}
      </tr>

      @foreach($issueData['plans'] as $planName => $projects)
      <!-- Plan Row -->
      <tr style="background-color: #f1f5f9;">
        <td colspan="{{ $colspan }}" style="padding-left: 10px;">
          <strong>แผนงานที่ {{ $loop->iteration }} <span style="color: #334155;">{{ $planName }}</span></strong>
        </td>
      </tr>

      @foreach($projects as $projectName => $props)
      <!-- Project Row -->
      @php
      $strategyNum = $groupStrategyMap[$projectName]['strategy'] ?? '';
      $mpNum = $groupStrategyMap[$projectName]['master_plan'] ?? '';

      $stratMpText = $strategyNum . '.' . $mpNum;

      $plan14 = $groupStrategyMap[$projectName]['plan14'] ?? '';
      $regionalGoal = $groupStrategyMap[$projectName]['regional_goal'] ?? '';
      @endphp
      <tr style="background-color: #fdf8f6;">
        <td colspan="2" style="padding-left: 20px;">
          <strong>โครงการสำคัญ: <span style="color: #c2410c;">{{ $projectName }}</span></strong>
        </td>
        <td class="font-bold text-center">{{ $stratMpText }}</td>
        <td class="font-bold text-center">{{ $plan14 }}</td>
        <td class="font-bold text-center">{{ $regionalGoal }}</td>
        <td class="text-center"></td>
        <td class="text-center"></td>
        <td class="text-center"></td>
        <td class="text-center"></td>
        <td class="text-center"></td>
        <td class="text-center"></td>
        <td class="text-center"></td>
      </tr>

      <!-- Activities Row -->
      @foreach($props as $p)
      <tr>
        <td>{{ $loop->iteration }}</td>
        <td>{{ $p->project_name }}</td>
        {{-- <td style="padding-left: 60px; background: #ffffff;">
          <ul style="margin-top: 5px; margin-bottom: 0; padding-left: 20px;">
            @php
            $activities = is_array($p->activities) ? $p->activities : [];
            @endphp
            @if(count($activities) > 0)
            @foreach($activities as $actIndex => $act)
            <li>{{ $act['name'] ?? 'กิจกรรมที่ ' . ($actIndex + 1) }} (งบประมาณ: {{ number_format($act['budget'] ?? 0)
              }} บาท)</li>
            @endforeach
            @else
            <li style="color: #94a3b8;">ไม่มีกิจกรรมย่อย</li>
            @endif
          </ul>
        </td> --}}
        <td class="text-center"></td>
        <td class="text-center"></td>
        <td class="text-center"></td>
        <td class="text-center">{{ $p->organization->name ?? '' }}</td>
        @php
        $acts = is_string($p->activities) ? json_decode($p->activities, true) : $p->activities;
        $actsColl = collect($acts);
        $sum2571 = $actsColl->sum('yearly_budgets.2571');
        $sum2572 = $actsColl->sum('yearly_budgets.2572');
        $sum2573 = $actsColl->sum('yearly_budgets.2573');
        $sum2574 = $actsColl->sum('yearly_budgets.2574');
        $sum2575 = $actsColl->sum('yearly_budgets.2575');
        @endphp
        <td class="text-right">{{ $sum2571 > 0 ? number_format($sum2571) : '' }}</td>
        <td class="text-center">{{ $sum2572 > 0 ? number_format($sum2572) : '' }}</td>
        <td class="text-center">{{ $sum2573 > 0 ? number_format($sum2573) : '' }}</td>
        <td class="text-center">{{ $sum2574 > 0 ? number_format($sum2574) : '' }}</td>
        <td class="text-center">{{ $sum2575 > 0 ? number_format($sum2575) : '' }}</td>

        <td class="text-center"></td>
      </tr>
      @endforeach
      @endforeach
      @endforeach
      @endforeach
      @else
      <tr>
        <td colspan="{{ $colspan }}" class="text-center">ไม่มีข้อมูลโครงการ</td>
      </tr>
      @endif
    </tbody>
  </table>
</div>