import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';
import { Building2, TrendingUp, Users, DollarSign, Target, ChevronDown, ChevronRight, Award, RefreshCw, AlertCircle, Loader } from 'lucide-react';
import { useSearchParams } from "react-router-dom";

const StrategicDashboard = () => {
  const [success, setSuccess] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [expandedUnit, setExpandedUnit] = useState(null);
  const [data, setData] = useState({
    stats: null,
    departments: [],
    projects: [],
    performance: [],
    quarterlyBudget: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [searchParams] = useSearchParams();
  const year = searchParams.get("year") || new Date().getFullYear(); // ใช้ปีปัจจุบันเป็นค่าเริ่มต้นถ้าไม่มีการระบุปีใน URL

  // API Configuration
  const API_BASE_URL = 'https://survey.pcru.ac.th/api'; // แก้ไข URL ตาม API จริง
  const API_ENDPOINTS = {
    dataReportSummary: `/projects/${year}?method=minimize&layout=strategics`,
    stats: '/api/dashboard/stats',
    departments: '/api/dashboard/departments',
    projects: '/api/dashboard/projects',
    performance: '/api/dashboard/performance',
    quarterlyBudget: '/api/dashboard/quarterly-budget'
  };

  // Project groups configuration (9 groups based on activity IDs 411-419)
  // เพิ่ม helper function จัดกลุ่มโครงการ 411-419
  const projectGroups = ['411', '412', '413', '414', '415', '416', '417', '418', '419'];

  const groupedProjects = projectGroups.map((id) => {
    const projectsInGroup = data.projects.filter(p => p.main_activity_id === id);
    return {
      activityId: id,
      name: `โครงการ ${id}`, // จะปรับเป็นชื่อจริงถ้ามี
      count: projectsInGroup.length,
      budget: projectsInGroup.reduce((sum, p) => sum + (p.budget || 0), 0)
    };
  });

  const [selectedDept, setSelectedDept] = useState(null);

  // handler เมื่อคลิก bar
  const handleBarClick = (data) => {
    setSelectedDept(data); // data จะมี { name, projects, budget, ... }
  };
  // Mock API call function - แทนที่ด้วย API จริง
  const mockApiCall = (endpoint, delay = 1000) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        switch (endpoint) {
          case API_ENDPOINTS.stats:
            resolve({
              totalProjects: 114,
              totalActivities: 190,
              totalMembers: 'N/A',
              totalBudget: 569746308.53
            });
            break;
          case API_ENDPOINTS.departments:
            resolve([
              { id: 1, name: 'คณะเทคโนโลยี', projects: 15, budget: 120500000, completion: 85 },
              { id: 2, name: 'คณะมนุษยศาสตร์', projects: 12, budget: 98750000, completion: 72 },
              { id: 3, name: 'คณะวิทยาการจัดการ', projects: 8, budget: 65200000, completion: 90 },
              { id: 4, name: 'คณะวิทยาศาสตร์และเทคโนโลยี', projects: 18, budget: 145300000, completion: 78 },
              { id: 5, name: 'คณะพยาบาลศาสตร์', projects: 6, budget: 42100000, completion: 95 },
              { id: 6, name: 'สถาบันวิจัยและพัฒนา', projects: 10, budget: 89650000, completion: 68 },
              { id: 7, name: 'สำนักวิทยบริการและเทคโนโลยีสารสนเทศ', projects: 14, budget: 105420000, completion: 82 },
              { id: 8, name: 'สำนักศิลปะและวัฒนธรรม', projects: 9, budget: 72180000, completion: 88 }
            ]);
            break;
          case API_ENDPOINTS.projects:
            resolve([
              {
                unitId: 1,
                unitName: 'มหาวิทยาลัยราชภัฏพิบูลสงคราม',
                projects: [
                  { code: '68-1-221-04', name: 'พุทธตามาราสวิ', budget: 8209600, type: '(0)', status: 'active' },
                  { code: '68-1-221-05', name: 'พุทธตามาราสวิ', budget: 8134175, type: '(0)', status: 'completed' },
                  { code: '68-1-231-30', name: 'คำสำคัญปกไฮค', budget: 8163280, type: '(0)', status: 'active' },
                  { code: '68-1-231-31', name: 'งบลงทุนพัฒนาพิเศษพัฒนาเทคโนโลยีรายผล', budget: 8134175, type: '(2)', status: 'planning' },
                  { code: '68-1-231-32', name: 'คำสำคัญปกไฮค', budget: 83279900, type: '(0)', status: 'active' },
                  { code: '68-1-231-33', name: 'คำสำคัญและควบ', budget: 8700000, type: '(0)', status: 'active' },
                  { code: '68-1-231-35', name: 'โครงการบริหารจัดการพลังงานพิเศษในใหม่', budget: 8201100, type: '(1)', status: 'completed' },
                  { code: '68-1-231-38', name: 'โครงการบริหารจัดการขุ่มย์คลมูด TOEFL ITP', budget: 86534534, type: '(2)', status: 'active' },
                  { code: '68-1-231-39', name: 'โครงการบริหารจัดการขุ่มย์คลมูด HSK', budget: 82068, type: '(0)', status: 'planning' },
                  { code: '68-1-231-40', name: 'คำสำหลักการลาใหม่พาราก Solar rooftop', budget: 84800000, type: '(0)', status: 'active' },
                  { code: '68-1-231-41', name: 'คำพนันพิเคตะรรมการประคักษ์ภณมการณศึกษา', budget: 81013500, type: '(4)', status: 'active' },
                  { code: '68-1-231-42', name: 'โครงการพัฒนาความเป็นเลิศของงค์บุคลากรและพัฒนาทำสึทนัมใจประติษฐมประการ พ.ศ. 2567', budget: 8700000, type: '(4)', status: 'completed' },
                  { code: '68-1-231-44', name: 'เงินมาศกลิ่ง บุมมะพิจพิเลิดพานาการประปา', budget: 81034316, type: '(0)', status: 'active' },
                  { code: '68-1-221-06', name: 'กองพุทธตามาราฏคากร', budget: 830665450, type: '(0)', status: 'active' }
                ]
              }
            ]);
            break;
          case API_ENDPOINTS.performance:
            resolve([
              { unit: 'เทคโนโลยี', efficiency: 92, budget_usage: 87, timeline: 89, quality: 94 },
              { unit: 'มนุษยศาสตร์', efficiency: 78, budget_usage: 82, timeline: 75, quality: 81 },
              { unit: 'วิทยาการจัดการ', efficiency: 95, budget_usage: 91, timeline: 97, quality: 93 },
              { unit: 'วิทยาศาสตร์', efficiency: 81, budget_usage: 85, timeline: 79, quality: 84 },
              { unit: 'พยาบาล', efficiency: 97, budget_usage: 94, timeline: 98, quality: 96 },
              { unit: 'วิจัยและพัฒนา', efficiency: 74, budget_usage: 78, timeline: 71, quality: 76 }
            ]);
            break;
          case API_ENDPOINTS.quarterlyBudget:
            resolve([
              { quarter: 'Q1', planned: 142436577, actual: 138925430, department1: 45200000, department2: 38750000, department3: 32500000 },
              { quarter: 'Q2', planned: 142436577, actual: 145680250, department1: 48300000, department2: 42150000, department3: 35800000 },
              { quarter: 'Q3', planned: 142436577, actual: 139875600, department1: 46800000, department2: 41200000, department3: 34200000 },
              { quarter: 'Q4', planned: 142436577, actual: 145159028, department1: 49150000, department2: 43680000, department3: 36950000 }
            ]);
            break;
          default:
            resolve([]);
        }
      }, delay);
    });
  };

  // Real API call function - เปิดใช้งานเมื่อมี API จริง
  const fetchFromAPI = async (endpoint) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}` // หากต้องการ authentication
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  };

  // Load data from API
  const loadData = async (showLoader = true) => {
    if (showLoader) setLoading(true);
    setError(null);

    try {
      // เรียก API แบบ parallel
      /*const [stats, departments, projects, performance, quarterlyBudget] = await Promise.all([
        mockApiCall(API_ENDPOINTS.stats), // เปลี่ยนเป็น fetchFromAPI(API_ENDPOINTS.stats) เมื่อมี API จริง
        mockApiCall(API_ENDPOINTS.departments),
        mockApiCall(API_ENDPOINTS.projects),
        mockApiCall(API_ENDPOINTS.performance),
        mockApiCall(API_ENDPOINTS.quarterlyBudget)
      ]);

      setData({
        stats,
        departments,
        projects,
        performance,
        quarterlyBudget
      });*/

      const [response] = await Promise.all([
        fetchFromAPI(API_ENDPOINTS.dataReportSummary), // เปลี่ยนเป็น fetchFromAPI(API_ENDPOINTS.stats) เมื่อมี API จริง

        //mockApiCall(API_ENDPOINTS.departments),
      ]);
      //console.log(response);
      const projects = response.filter(project => project.output_id === '04') || [];
      //console.log(response.filter((project) => ['411', '412', '413', '414', '415', '416', '417', '418', '419'].includes(project.id.split('-')[2])).length);
      console.log(projects);
      const sections = Object.values(response).map(item => item.section);
      const tmp_departments = sections.filter((section, index, self) =>
        index === self.findIndex((t) => t.id === section.id)
      );

      const departments = tmp_departments.map((dept) => ({
        id: dept.id,
        name: dept.name,
        projects: projects.filter(project => project.section_id === dept.id).length,
        budget: projects.filter(project => project.section_id === dept.id).reduce((sum, project) => sum + (project.budget || 0), 0),
        p411: projects.filter(project => project.section_id === dept.id && project.main_activity_id === '411').length,
      }));

      const stats = {
        totalProjects: projects.length,
        totalActivities: response.filter((project) => ['411', '412', '413', '414', '415', '416', '417', '418', '419'].includes(project.id.split('-')[2])).flatMap((project) => project.activity).length,
        totalMembers: departments.length || 'N/A', // เปลี่ยนเป็นข้อมูลจริงเมื่อมี
        totalBudget: response.filter(project => project.output_id === '04').reduce((sum, project) => sum + (project.budget || 0), 0)
      };

      const performance = response.performance || [];
      const quarterlyBudget = response.quarterlyBudget || [];

      console.log('Projects:', stats);
      //projects.

      setData({
        stats,
        departments,
        projects,
        performance,
        quarterlyBudget
      });

      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error loading data:', error);
      setError('ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    loadData();

    // Auto-refresh every 5 minutes
    const interval = setInterval(() => {
      loadData(false);
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Get main stats from API data
  const mainStats = data.stats ? [
    { title: 'จำนวนโครงการ', value: data.stats?.totalProjects, icon: Building2, color: 'bg-blue-500' },
    { title: 'กิจกรรมทั้งหมด', value: data.stats?.totalActivities, icon: Target, color: 'bg-purple-500' },
    { title: 'หน่วยงาน', value: data.stats?.totalMembers, icon: Users, color: 'bg-green-500' },
    { title: 'งบประมาณ', value: data.stats.totalBudget, suffix: 'บาท', icon: DollarSign, color: 'bg-red-500' }
  ] : [];


  const formatNumber = (num) => {
    return new Intl.NumberFormat('th-TH').format(num);
  };

  const formatBudget = (budget) => {
    if (budget >= 1000000) {
      return (budget / 1000000).toFixed(1) + 'M';
    } else if (budget >= 1000) {
      return (budget / 1000).toFixed(0) + 'K';
    }
    return budget.toString();
  };

  const toggleUnit = (index) => {
    setExpandedUnit(expandedUnit === index ? null : index);
  };

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#84CC16', '#F97316'];

  // Loading component
  if (loading && !data.stats) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Loader className="w-12 h-12 mx-auto mb-4 text-blue-600 animate-spin" />
          <h2 className="mb-2 text-xl font-semibold text-gray-700">กำลังโหลดข้อมูล...</h2>
          <p className="text-gray-500">กรุณารอสักครู่</p>
        </div>
      </div>
    );
  }
  /*
    useEffect(async () => {
      setLoading(true)
      //await axios.get("/sanctum/csrf-cookie");
      await fetch(`${API_BASE_URL}/projects/2025?method=minimize&layout=strategics`)
        //fetch('http://laravite.test/api/projects')
        .then((response) => response.json())
        .then((data) => {
          //data.data.filter(project => project.output_id === '04');
   
          console.log(data.filter(project => project.output_id === '04'));
          setProjects(data.filter(project => project.output_id === '04'))
          //dataReportSummary();
          //const projrctGroup = Object.groupBy(data.data, ({ type }) => type);
   
          setLoading(false)
          setSuccess(true);
        })
        .catch((err) => {
          console.log(err.message);
          setLoading(false)
          setSuccess(true);
        });
    }, []);*/


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="p-6 text-white bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold">Dashboard โครงการยุทธศาสตร์</h1>
              <p className="text-blue-100">โครงการ</p>
              <div className="flex items-center mt-4 space-x-6 text-sm">
                <div className="flex items-center">
                  <Building2 className="w-4 h-4 mr-1" />
                  <span>หน่วยงาน: มหาวิทยาลัยราชภัฏเพชรบูรณ์</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>งบประมาณรวม: {data.stats ? formatBudget(data.stats.totalBudget) : 'N/A'} บาท</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <button
                onClick={() => loadData()}
                className="flex items-center px-4 py-2 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'กำลังอัพเดท...' : 'อัพเดทข้อมูล'}
              </button>
              {lastUpdated && (
                <p className="mt-2 text-xs text-blue-100">
                  อัพเดทล่าสุด: {lastUpdated.toLocaleString('th-TH')}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'ภาพรวม', icon: TrendingUp },
              { id: 'comparison', name: 'เปรียบเทียบหน่วยงาน', icon: Building2 },
              //{ id: 'performance', name: 'ประสิทธิภาพ', icon: Award },
              //{ id: 'projects', name: 'รายละเอียดโครงการ', icon: Target }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center px-3 py-4 text-sm font-medium border-b-2 transition-colors ${selectedTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="p-6 mx-auto max-w-7xl">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          {mainStats.map((stat, index) => (
            <div key={index} className="p-6 transition-shadow bg-white border-l-4 border-blue-500 rounded-lg shadow-md hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-bold text-gray-900">
                      {index === 3 ? formatNumber(stat.value) : stat.value}
                    </p>
                    {stat.suffix && (
                      <p className="ml-2 text-sm text-gray-500">{stat.suffix}</p>
                    )}
                  </div>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Content based on selected tab */}
        {selectedTab === 'overview' && (
          <div className="space-y-8">
            {data.departments.length > 0 && (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-1">
                <div className="p-6 bg-white rounded-lg shadow-md">
                  <h3 className="mb-4 text-lg font-semibold">การกระจายงบประมาณรายหน่วยงาน</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={data.departments}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="budget"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {data.departments.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatNumber(value) + ' บาท'} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="p-6 bg-white rounded-lg shadow-md">
                  <h3 className="mb-4 text-lg font-semibold">จำนวนโครงการรายหน่วยงาน</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data.departments}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        angle={-45}
                        textAnchor="end"
                        height={100}
                        interval={0}
                      />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="projects" fill="#3B82F6" onClick={handleBarClick}
                        cursor="pointer" />
                    </BarChart>
                  </ResponsiveContainer>

                  {selectedDept && (
                    <div className="p-4 mt-4 bg-gray-100 rounded-lg shadow">
                      <h4 className="mb-2 font-semibold">โครงการของ {selectedDept.name} ({selectedDept.budget?.toLocaleString()} บาท)</h4>
                      <ul className="text-sm list-disc list-inside">
                        {data.projects
                          .filter(p => p.section_id === selectedDept.id) // filter ตามหน่วยงานที่เลือก
                          .map((proj, index) => (
                            <li key={index}>
                              {proj.id} {proj.name} ({proj.budget?.toLocaleString()} บาท)
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </div>

              </div>
            )}

            {data.quarterlyBudget.length > 0 && (
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="mb-4 text-lg font-semibold">การเปรียบเทียบงบประมาณรายไตรมาส</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={data.quarterlyBudget}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" />
                    <YAxis tickFormatter={(value) => formatBudget(value)} />
                    <Tooltip formatter={(value) => [formatNumber(value) + ' บาท']} />
                    <Legend />
                    <Area type="monotone" dataKey="planned" stackId="1" stroke="#8884d8" fill="#8884d8" name="แผน" />
                    <Area type="monotone" dataKey="actual" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="ผลจริง" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}

            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="mb-4 text-lg font-semibold">โครงการหลัก 411-419</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={groupedProjects}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatNumber(value) + ' บาท'} />
                  <Legend />
                  <Bar dataKey="count" fill="#3B82F6" name="จำนวนโครงการ" />
                  <Bar dataKey="budget" fill="#10B981" name="งบประมาณ" />
                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>


        )}

        {selectedTab === 'comparison' && data.departments.length > 0 && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold">เปรียบเทียบประสิทธิภาพรายหน่วยงาน</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">หน่วยงาน</th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">จำนวนโครงการ</th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">งบประมาณ (ล้านบาท)</th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">% ความสำเร็จ</th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">สถานะ</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.departments.map((dept, index) => (
                      <tr key={dept.id || index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">{dept.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{dept.projects}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{(dept.budget / 1000000).toFixed(1)}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 h-2 mr-2 bg-gray-200 rounded-full">
                              <div
                                className="h-2 bg-blue-600 rounded-full"
                                style={{ width: `${dept.completion}%` }}
                              ></div>
                            </div>
                            <span>{dept.completion}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${dept.completion >= 90 ? 'text-green-800 bg-green-100' :
                            dept.completion >= 75 ? 'text-yellow-800 bg-yellow-100' :
                              'text-red-800 bg-red-100'
                            }`}>
                            {dept.completion >= 90 ? 'ดีเยี่ยม' : dept.completion >= 75 ? 'ปานกลาง' : 'ต้องปรับปรุง'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'performance' && data.performance.length > 0 && (
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="mb-4 text-lg font-semibold">ตัวชี้วัดประสิทธิภาพรายหน่วยงาน</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data.performance} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="unit" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="efficiency" fill="#3B82F6" name="ประสิทธิภาพ" />
                  <Bar dataKey="budget_usage" fill="#10B981" name="การใช้งบ" />
                  <Bar dataKey="timeline" fill="#F59E0B" name="ตรงเวลา" />
                  <Bar dataKey="quality" fill="#EF4444" name="คุณภาพ" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {data.performance.map((unit, index) => (
                <div key={index} className="p-6 bg-white rounded-lg shadow-md">
                  <h4 className="mb-4 text-lg font-semibold">{unit.unit}</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>ประสิทธิภาพ</span>
                        <span>{unit.efficiency}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-blue-600 rounded-full"
                          style={{ width: `${unit.efficiency}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>การใช้งบประมาณ</span>
                        <span>{unit.budget_usage}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-green-600 rounded-full"
                          style={{ width: `${unit.budget_usage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>การส่งตรงเวลา</span>
                        <span>{unit.timeline}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-yellow-600 rounded-full"
                          style={{ width: `${unit.timeline}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'projects' && data.projects.length > 0 && (
          <div className="space-y-6">
            {data.projects.map((unitData, unitIndex) => (
              <div key={unitIndex} className="bg-white rounded-lg shadow-md">
                <div
                  className="px-6 py-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleUnit(unitIndex)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{unitData.unitName}</h3>
                    <div className="flex items-center">
                      <span className="mr-2 text-sm text-gray-500">
                        {unitData.projects.length} โครงการ | งบประมาณรวม: {formatNumber(unitData.projects.reduce((sum, p) => sum + p.budget, 0))} บาท
                      </span>
                      {expandedUnit === unitIndex ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

                {expandedUnit === unitIndex && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">รหัสโครงการ</th>
                          <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">ชื่อโครงการ</th>
                          <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">งบประมาณ (บาท)</th>
                          <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">ประเภท</th>
                          <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">สถานะ</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {unitData.projects.map((project, projectIndex) => (
                          <tr key={projectIndex} className="hover:bg-gray-50">
                            <td className="px-6 py-4 font-mono text-sm text-blue-600 whitespace-nowrap">
                              {project.code}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              {project.name}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                              {formatNumber(project.budget)}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                              <span className="inline-flex px-2 py-1 text-xs font-medium text-gray-800 bg-gray-100 rounded-full">
                                {project.type}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}>
                                {getStatusText(project.status)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* API Configuration Info */}
        <div className="p-6 mt-8 border border-blue-200 rounded-lg bg-blue-50">
          <h4 className="mb-2 font-semibold text-blue-900">🔧 การตั้งค่า API Integration</h4>
          <div className="space-y-2 text-sm text-blue-800">
            <p><strong>API Base URL:</strong> {API_BASE_URL}</p>
            <p><strong>Endpoints:</strong></p>
            <ul className="ml-4 space-y-1 list-disc list-inside">
              <li>สถิติหลัก: <code className="px-1 bg-blue-100 rounded">{API_ENDPOINTS.stats}</code></li>
              <li>ข้อมูลหน่วยงาน: <code className="px-1 bg-blue-100 rounded">{API_ENDPOINTS.departments}</code></li>
              <li>รายการโครงการ: <code className="px-1 bg-blue-100 rounded">{API_ENDPOINTS.projects}</code></li>
              <li>ข้อมูลประสิทธิภาพ: <code className="px-1 bg-blue-100 rounded">{API_ENDPOINTS.performance}</code></li>
              <li>งบประมาณรายไตรมาส: <code className="px-1 bg-blue-100 rounded">{API_ENDPOINTS.quarterlyBudget}</code></li>
            </ul>
            <p className="mt-3"><strong>หมายเหตุ:</strong> ปัจจุบันใช้ Mock Data สำหรับทดสอบ เมื่อพร้อมใช้งาน API จริง ให้เปลี่ยนจาก <code className="px-1 bg-blue-100 rounded">mockApiCall()</code> เป็น <code className="px-1 bg-blue-100 rounded">fetchFromAPI()</code></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategicDashboard;