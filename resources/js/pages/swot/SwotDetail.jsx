import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChevronRight, ArrowLeft, Target, Users, BookOpen, TrendingUp, BarChart3, Plus, AlertTriangle, X, Send, Shield, Zap, Edit, Save } from 'lucide-react';
import Cookies from 'js-cookie';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SwotDetail = () => {
  const navigate = useNavigate();
  const swotId = useParams().id; // Assuming the route is defined with :id
  const [swot, setSwot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [environmentData, setEnvironmentData] = useState({
    opportunities: [],
    threats: [],
    assessments: []
  });
  const [showAssessmentForm, setShowAssessmentForm] = useState(false);
  const [showAnalysisForm, setShowAnalysisForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState({ type: '', show: false });
  const [formData, setFormData] = useState({});
  const [saveStatus, setSaveStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);


  const [activeTab, setActiveTab] = useState('overview');
  const tabs = [
    { id: 'overview', label: 'ภาพรวม', icon: Target },
    { id: 'process', label: 'กระบวนการ', icon: TrendingUp },
    { id: 'environment', label: 'สภาพแวดล้อม', icon: BarChart3 },
    { id: 'strengths', label: 'จุดแข็งและจุดอ่อน', icon: Shield },
    //{ id: 'team', label: 'ทีมงาน', icon: Users },
    //{ id: 'resources', label: 'ทรัพยากร', icon: BookOpen }
  ];

  const processes = [
    { step: 1, title: 'การประเมินผลกระทบของสภาพแวดล้อม', desc: 'วิเคราะห์ปัจจัยภายนอกที่ส่งผลต่อองค์กร' },
    { step: 2, title: 'การวิเคราะห์จุดแข็งและจุดอ่อน', desc: 'ประเมินศักยภาพภายในองค์กร' },
    { step: 3, title: 'การระบุโอกาสและอุปสรรค', desc: 'หาปัจจัยเอื้อและอุปสรรคจากภายนอก' },
    { step: 4, title: 'การกำหนดกลยุทธ์', desc: 'พัฒนายุทธศาสตร์จากผลการวิเคราะห์' }
  ];

  const email = Cookies.get('email_first'); // Assuming you have a token for authentication

  useEffect(() => {
    if (!Cookies.get('email_first')) {
      navigate('/swot');
    }

    const fetchSwot = async () => {
      try {
        const csrf = document.querySelector('meta[name="csrf-token"]').getAttribute("content");
        const response = await fetch(`${API_BASE_URL}/swots/${swotId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrf,   // 👈 แนบ CSRF token
            "Accept": "application/json",
          },
          body: JSON.stringify({ email: Cookies.get('email_first') })
        });
        //await fetch(`${API_BASE_URL}/swots/${swotId}`);
        const data = await response.json();
        setSwot(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchSwot();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Display error message    
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
  }; // Placeholder for handleFormSubmit
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });

    console.log(formData);

  };

  const handleAddItem = (type) => {
    if (formData.title && formData.description) {
      const newItem = {
        id: Date.now(),
        title: formData.title,
        description: formData.description,
        impact: formData.impact,
        tags: formData.tags || []
      };

      if (type === 'opportunities' || type === 'threats') {
        setEnvironmentData(prev => ({
          ...prev,
          [type]: [...prev[type], newItem]
        }));
      } else if (type === 'strengths' || type === 'weaknesses') {
        setStrengthsWeaknessesData(prev => ({
          ...prev,
          [type]: [...prev[type], newItem]
        }));
      }

      setFormData({ title: '', description: '', impact: 'ปานกลาง', tags: [] });
      setShowAddForm({ type: '', show: false });
    }
  };

  const handleDeleteItem = (type, id) => {
    if (type === 'opportunities' || type === 'threats') {
      setEnvironmentData(prev => ({
        ...prev,
        [type]: prev[type].filter(item => item.id !== id)
      }));
    } else if (type === 'strengths' || type === 'weaknesses') {
      setStrengthsWeaknessesData(prev => ({
        ...prev,
        [type]: prev[type].filter(item => item.id !== id)
      }));
    }
  };

  const handleSaveToServer = async () => {
    setSaveStatus('saving');

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const dataToSave = {
        timestamp: new Date().toISOString(),
        userId: 'user123',
        projectId: 'swot-analysis-001',
        environmentAssessment: environmentData,
        strengthsWeaknessesAssessment: strengthsWeaknessesData,
        metadata: {
          version: '1.0',
          lastModified: new Date().toISOString(),
          totalItems: environmentData.opportunities.length + environmentData.threats.length +
            strengthsWeaknessesData.strengths.length + strengthsWeaknessesData.weaknesses.length
        }
      };

      console.log('Data saved to server:', dataToSave);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(''), 3000);

    } catch (error) {
      console.error('Error saving data:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };


  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 sm:p-6 lg:p-8">
      <div className="max-w-full mx-auto">
        <div className="mb-6">
          <button
            onClick={() => window.history.back()}
            className="group flex items-center px-4 py-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 text-gray-600 hover:text-blue-600 hover:bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
          >
            <ArrowLeft className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="font-medium">กลับไปหน้าหลัก</span>
          </button>
        </div>

        {/* Header Section */}
        <div className="mb-8 text-center lg:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600">
            <Target className="w-8 h-8 text-white" />
          </div>
          <h1 className="mb-4 text-2xl font-bold leading-tight text-gray-800 sm:text-3xl lg:text-4xl">
            {swot?.title}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {swot?.tagline}
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            เครื่องมือวิเคราะห์เชิงกลยุทธ์เพื่อพัฒนาองค์กรสู่ความเป็นเลิศทางการศึกษา
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-300 ${activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-200'
                  : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-blue-600 shadow-sm'
                  }`}
              >
                <Icon className="w-5 h-5 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-4 lg:gap-8">
          {/* Main Card */}
          <div className="lg:col-span-3">
            <div className="h-full p-6 border shadow-xl bg-white/80 backdrop-blur-sm rounded-3xl border-white/50 sm:p-8 lg:p-10">
              {activeTab === 'overview' && (
                <div>
                  <h2 className="flex items-center mb-6 text-2xl font-bold text-gray-800">
                    <div className="w-8 h-8 mr-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500"></div>
                    ภาพรวมการวิเคราะห์ SWOT
                  </h2>

                  <div className="space-y-6">
                    <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
                      <h3 className="mb-3 text-xl font-semibold text-gray-800">วัตถุประสงค์</h3>
                      <p className="leading-relaxed text-gray-700">
                        {swot?.objective}
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="p-4 border border-green-200 bg-green-50 rounded-xl">
                        <h4 className="mb-2 font-semibold text-green-800">Strengths</h4>
                        <p className="text-sm text-green-700">จุดแข็งขององค์กร</p>
                      </div>
                      <div className="p-4 border border-red-200 bg-red-50 rounded-xl">
                        <h4 className="mb-2 font-semibold text-red-800">Weaknesses</h4>
                        <p className="text-sm text-red-700">จุดอ่อนที่ต้องปรับปรุง</p>
                      </div>
                      <div className="p-4 border border-blue-200 bg-blue-50 rounded-xl">
                        <h4 className="mb-2 font-semibold text-blue-800">Opportunities</h4>
                        <p className="text-sm text-blue-700">โอกาสจากภายนอก</p>
                      </div>
                      <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-xl">
                        <h4 className="mb-2 font-semibold text-yellow-800">Threats</h4>
                        <p className="text-sm text-yellow-700">อุปสรรคและความเสี่ยง</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'process' && (
                <div>
                  <h2 className="flex items-center mb-6 text-2xl font-bold text-gray-800">
                    <TrendingUp className="w-8 h-8 mr-3 text-blue-600" />
                    กระบวนการดำเนินงาน
                  </h2>

                  <div className="space-y-6">
                    {processes.map((process, index) => (
                      <div key={index} className="flex items-start p-4 transition-all duration-300 group hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-2xl">
                        <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mr-4 font-bold text-white rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                          {process.step}
                        </div>
                        <div className="flex-1">
                          <h3 className="mb-2 text-lg font-semibold text-gray-800 transition-colors group-hover:text-blue-600">
                            {process.title}
                          </h3>
                          <p className="leading-relaxed text-gray-600">
                            {process.desc}
                          </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 transition-colors group-hover:text-blue-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'environment' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="flex items-center text-2xl font-bold text-gray-800">
                      <BarChart3 className="w-8 h-8 mr-3 text-blue-600" />
                      การประเมินผลกระทบของสภาพแวดล้อม
                    </h2>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setIsEditMode(!isEditMode)}
                        className={`flex items-center px-4 py-2 rounded-xl font-medium transition-all duration-300 ${isEditMode
                          ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                          : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                          }`}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        {isEditMode ? 'เสร็จสิ้นการแก้ไข' : 'แก้ไขข้อมูล'}
                      </button>

                      <button
                        onClick={handleSaveToServer}
                        disabled={saveStatus === 'saving'}
                        className="flex items-center px-4 py-2 text-white transition-all duration-300 bg-green-600 rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {saveStatus === 'saving' ? 'กำลังบันทึก...' : 'บันทึกข้อมูล'}
                      </button>
                    </div>
                  </div>

                  {saveStatus && (
                    <div className={`mb-4 p-3 rounded-xl ${saveStatus === 'success' ? 'bg-green-100 text-green-800' :
                      saveStatus === 'error' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                      {saveStatus === 'success' && '✅ บันทึกข้อมูลสำเร็จแล้ว'}
                      {saveStatus === 'error' && '❌ เกิดข้อผิดพลาดในการบันทึก'}
                      {saveStatus === 'saving' && '⏳ กำลังบันทึกข้อมูลไปยังเซิร์ฟเวอร์...'}
                    </div>
                  )}

                  <div className="space-y-8">
                    <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl">
                      <h3 className="flex items-center mb-4 text-xl font-semibold text-gray-800">
                        <AlertTriangle className="w-6 h-6 mr-2 text-blue-600" />
                        ปัจจัยภายนอกที่ส่งผลกระทบ
                      </h3>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="flex items-center font-semibold text-green-800">
                              <div className="w-4 h-4 mr-2 bg-green-500 rounded-full"></div>
                              โอกาส (Opportunities)
                            </h4>
                            {isEditMode && (
                              <button
                                onClick={() => setShowAddForm({ type: 'opportunities', show: true })}
                                className="flex items-center px-3 py-1 text-sm text-green-700 transition-colors bg-green-100 rounded-lg hover:bg-green-200"
                              >
                                <Plus className="w-4 h-4 mr-1" />
                                เพิ่ม
                              </button>
                            )}
                          </div>

                          <div className="space-y-3">
                            {environmentData.opportunities.map((item) => (
                              <div key={item.id} className="relative p-4 bg-white border-l-4 border-green-500 shadow-sm rounded-xl group">
                                {isEditMode && (
                                  <button
                                    onClick={() => handleDeleteItem('opportunities', item.id)}
                                    className="absolute flex items-center justify-center w-6 h-6 text-red-600 transition-colors bg-red-100 rounded-full opacity-0 top-2 right-2 hover:bg-red-200 group-hover:opacity-100"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                )}
                                <div className="font-medium text-gray-800">{item.title}</div>
                                <div className="mt-1 text-sm text-gray-600">{item.description}</div>
                                <div className="flex items-center mt-2">
                                  <span className={`text-xs px-2 py-1 rounded-full ${item.impact === 'สูง' ? 'bg-red-100 text-red-800' :
                                    item.impact === 'ปานกลาง' ? 'bg-yellow-100 text-yellow-800' :
                                      'bg-green-100 text-green-800'
                                    }`}>
                                    ผลกระทบ{item.impact}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>

                          {showAddForm.show && showAddForm.type === 'opportunities' && (
                            <div className="p-4 bg-white border-2 border-green-200 shadow-lg rounded-xl">
                              <h5 className="mb-3 font-semibold text-gray-800">เพิ่มโอกาสใหม่</h5>
                              <div className="space-y-3">
                                <input
                                  type="text"
                                  placeholder="ชื่อโอกาส"
                                  value={formData.title}
                                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                                <textarea
                                  placeholder="รายละเอียด"
                                  value={formData.description}
                                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                  className="w-full h-20 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                                <select
                                  value={formData.impact}
                                  onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                >
                                  <option value="ต่ำ">ผลกระทบต่ำ</option>
                                  <option value="ปานกลาง">ผลกระทบปานกลาง</option>
                                  <option value="สูง">ผลกระทบสูง</option>
                                </select>
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => handleAddItem('opportunities')}
                                    className="flex-1 py-2 text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
                                  >
                                    เพิ่ม
                                  </button>
                                  <button
                                    onClick={() => setShowAddForm({ type: '', show: false })}
                                    className="flex-1 py-2 text-white transition-colors bg-gray-500 rounded-lg hover:bg-gray-600"
                                  >
                                    ยกเลิก
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="flex items-center font-semibold text-red-800">
                              <div className="w-4 h-4 mr-2 bg-red-500 rounded-full"></div>
                              อุปสรรค (Threats)
                            </h4>
                            {isEditMode && (
                              <button
                                onClick={() => setShowAddForm({ type: 'threats', show: true })}
                                className="flex items-center px-3 py-1 text-sm text-red-700 transition-colors bg-red-100 rounded-lg hover:bg-red-200"
                              >
                                <Plus className="w-4 h-4 mr-1" />
                                เพิ่ม
                              </button>
                            )}
                          </div>

                          <div className="space-y-3">
                            {environmentData.threats.map((item) => (
                              <div key={item.id} className="relative p-4 bg-white border-l-4 border-red-500 shadow-sm rounded-xl group">
                                {isEditMode && (
                                  <button
                                    onClick={() => handleDeleteItem('threats', item.id)}
                                    className="absolute flex items-center justify-center w-6 h-6 text-red-600 transition-colors bg-red-100 rounded-full opacity-0 top-2 right-2 hover:bg-red-200 group-hover:opacity-100"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                )}
                                <div className="font-medium text-gray-800">{item.title}</div>
                                <div className="mt-1 text-sm text-gray-600">{item.description}</div>
                                <div className="flex items-center mt-2">
                                  <span className={`text-xs px-2 py-1 rounded-full ${item.impact === 'สูง' ? 'bg-red-100 text-red-800' :
                                    item.impact === 'ปานกลาง' ? 'bg-yellow-100 text-yellow-800' :
                                      'bg-green-100 text-green-800'
                                    }`}>
                                    ผลกระทบ{item.impact}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>

                          {showAddForm.show && showAddForm.type === 'threats' && (
                            <div className="p-4 bg-white border-2 border-red-200 shadow-lg rounded-xl">
                              <h5 className="mb-3 font-semibold text-gray-800">เพิ่มอุปสรรคใหม่</h5>
                              <div className="space-y-3">
                                <input
                                  type="text"
                                  placeholder="ชื่ออุปสรรค"
                                  value={formData.title}
                                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                />
                                <textarea
                                  placeholder="รายละเอียด"
                                  value={formData.description}
                                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                  className="w-full h-20 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                />
                                <select
                                  value={formData.impact}
                                  onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                >
                                  <option value="ต่ำ">ผลกระทบต่ำ</option>
                                  <option value="ปานกลาง">ผลกระทบปานกลาง</option>
                                  <option value="สูง">ผลกระทบสูง</option>
                                </select>
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => handleAddItem('threats')}
                                    className="flex-1 py-2 text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
                                  >
                                    เพิ่ม
                                  </button>
                                  <button
                                    onClick={() => setShowAddForm({ type: '', show: false })}
                                    className="flex-1 py-2 text-white transition-colors bg-gray-500 rounded-lg hover:bg-gray-600"
                                  >
                                    ยกเลิก
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl">
                      <h3 className="flex items-center mb-4 text-xl font-semibold text-gray-800">
                        <BarChart3 className="w-6 h-6 mr-2 text-gray-600" />
                        สรุปข้อมูลที่บันทึก
                      </h3>

                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="p-4 text-center bg-white shadow-sm rounded-xl">
                          <div className="text-2xl font-bold text-green-600">{environmentData.opportunities.length}</div>
                          <div className="text-sm text-gray-600">โอกาส</div>
                        </div>
                        <div className="p-4 text-center bg-white shadow-sm rounded-xl">
                          <div className="text-2xl font-bold text-red-600">{environmentData.threats.length}</div>
                          <div className="text-sm text-gray-600">อุปสรรค</div>
                        </div>
                        <div className="p-4 text-center bg-white shadow-sm rounded-xl">
                          <div className="text-2xl font-bold text-blue-600">
                            {environmentData.opportunities.length + environmentData.threats.length}
                          </div>
                          <div className="text-sm text-gray-600">รวมทั้งหมด</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'strengths' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="flex items-center mb-6 text-2xl font-bold text-gray-800">
                      <Shield className="w-8 h-8 mr-3 text-blue-600" />
                      การวิเคราะห์จุดแข็งและจุดอ่อน
                    </h2>

                    <button
                      onClick={() => setShowAnalysisForm(true)}
                      className="flex items-center px-4 py-2 text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      เพิ่มการวิเคราะห์
                    </button>
                  </div>

                  {/* Assessment Form Modal */}
                  {showAnalysisForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                      <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-xl font-bold text-gray-800">เพิ่มการวิเคราะห์จุดแข็งและจุดอ่อน</h3>
                          <button
                            onClick={() => setShowAnalysisForm(false)}
                            className="p-2 transition-colors rounded-full hover:bg-gray-100"
                          >
                            <X className="w-5 h-5 text-gray-500" />
                          </button>
                        </div>

                        <form onSubmit={handleFormSubmit} className="space-y-6">
                          {/* Type Selection */}
                          <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">ประเภท</label>
                            <div className="grid grid-cols-2 gap-3">
                              <button
                                type="button"
                                onClick={() => handleInputChange('type', 'strength')}
                                className={`p-3 rounded-xl border-2 transition-all ${formData.type === 'strength'
                                  ? 'border-green-500 bg-green-50 text-green-700'
                                  : 'border-gray-200 hover:border-green-300'
                                  }`}
                              >
                                <div className="font-medium">จุดแข็ง</div>
                                <div className="text-sm text-gray-500">Strengths</div>
                              </button>

                              <button
                                type="button"
                                onClick={() => handleInputChange('type', 'weakness')}
                                className={`p-3 rounded-xl border-2 transition-all ${formData.type === 'weakness'
                                  ? 'border-red-500 bg-red-50 text-red-700'
                                  : 'border-gray-200 hover:border-red-300'
                                  }`}
                              >
                                <div className="font-medium">จุดอ่อน</div>
                                <div className="text-sm text-gray-500">Weaknesses</div>
                              </button>
                            </div>
                          </div>

                          {/* Title */}
                          <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">หัวข้อ</label>
                            <input
                              type="text"
                              value={formData.title}
                              onChange={(e) => handleInputChange('title', e.target.value)}
                              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="ระบุหัวข้อการวิเคาราะห์"
                              required
                            />
                          </div>

                          {/* Description */}
                          <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">รายละเอียด</label>
                            <textarea
                              value={formData.description}
                              onChange={(e) => handleInputChange('description', e.target.value)}
                              rows={3}
                              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="อธิบายรายละเอียดของปัจจัยนี้"
                              required
                            />
                          </div>

                          {/* Assessment Levels */}
                          <div className="grid gap-4 md:grid-cols-3">
                            {/* Impact */}
                            <div>
                              <label className="block mb-2 text-sm font-medium text-gray-700">ระดับผลกระทบ</label>
                              <select
                                value={formData.impact}
                                onChange={(e) => handleInputChange('impact', e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              >
                                <option value="low">ต่ำ</option>
                                <option value="medium">ปานกลาง</option>
                                <option value="high">สูง</option>
                              </select>
                            </div>

                            {/* Probability */}
                            <div>
                              <label className="block mb-2 text-sm font-medium text-gray-700">ความเป็นไปได้</label>
                              <select
                                value={formData.probability}
                                onChange={(e) => handleInputChange('probability', e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              >
                                <option value="low">ต่ำ</option>
                                <option value="medium">ปานกลาง</option>
                                <option value="high">สูง</option>
                              </select>
                            </div>

                            {/* Importance */}
                            <div>
                              <label className="block mb-2 text-sm font-medium text-gray-700">ความสำคัญ</label>
                              <select
                                value={formData.importance}
                                onChange={(e) => handleInputChange('importance', e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              >
                                <option value="low">ต่ำ</option>
                                <option value="medium">ปานกลาง</option>
                                <option value="high">สูง</option>
                              </select>
                            </div>
                          </div>

                          {/* Submit Buttons */}
                          <div className="flex justify-end pt-4 space-x-3 border-t">
                            <button
                              type="button"
                              onClick={() => setShowAnalysisForm(false)}
                              className="px-6 py-2 text-gray-700 transition-colors border border-gray-300 rounded-xl hover:bg-gray-50"
                            >
                              ยกเลิก
                            </button>

                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="flex items-center px-6 py-2 text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isSubmitting ? (
                                <>
                                  <div className="w-4 h-4 mr-2 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                                  กำลังบันทึก...
                                </>
                              ) : (
                                <>
                                  <Send className="w-4 h-4 mr-2" />
                                  บันทึกข้อมูล
                                </>
                              )}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}

                  <div className="space-y-8">
                    {/* Strengths vs Weaknesses */}
                    <div className="grid gap-6 lg:grid-cols-2">
                      {/* Strengths */}
                      <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl">
                        <h3 className="flex items-center mb-4 text-xl font-semibold text-green-800">
                          <Zap className="w-6 h-6 mr-2 text-green-600" />
                          จุดแข็ง (Strengths)
                        </h3>

                        <div className="space-y-4">
                          <div className="p-4 bg-white shadow-sm rounded-xl">
                            <div className="flex items-start">
                              <div className="flex items-center justify-center w-8 h-8 mt-1 mr-3 text-sm font-bold text-white bg-green-500 rounded-full">S1</div>
                              <div className="flex-1">
                                <div className="font-semibold text-gray-800">ชื่อเสียงและประวัติศาสตร์ที่ยาวนาน</div>
                                <div className="mt-1 text-sm text-gray-600">มีการยอมรับในระดับชาติและนานาชาติ</div>
                                <div className="flex items-center mt-2 space-x-2">
                                  <span className="px-2 py-1 text-xs text-green-800 bg-green-100 rounded-full">แบรนด์แข็งแกร่ง</span>
                                  <span className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded-full">เครือข่ายศิษย์เก่า</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="p-4 bg-white shadow-sm rounded-xl">
                            <div className="flex items-start">
                              <div className="flex items-center justify-center w-8 h-8 mt-1 mr-3 text-sm font-bold text-white bg-green-500 rounded-full">S2</div>
                              <div className="flex-1">
                                <div className="font-semibold text-gray-800">อาจารย์ที่มีความเชี่ยวชาญสูง</div>
                                <div className="mt-1 text-sm text-gray-600">คณาจารย์ที่มีคุณวุฒิและประสบการณ์</div>
                                <div className="flex items-center mt-2 space-x-2">
                                  <span className="px-2 py-1 text-xs text-green-800 bg-green-100 rounded-full">คุณภาพการสอน</span>
                                  <span className="px-2 py-1 text-xs text-purple-800 bg-purple-100 rounded-full">งานวิจัย</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="p-4 bg-white shadow-sm rounded-xl">
                            <div className="flex items-start">
                              <div className="flex items-center justify-center w-8 h-8 mt-1 mr-3 text-sm font-bold text-white bg-green-500 rounded-full">S3</div>
                              <div className="flex-1">
                                <div className="font-semibold text-gray-800">หลักสูตรที่หลากหลายและทันสมัย</div>
                                <div className="mt-1 text-sm text-gray-600">ครอบคลุมทุกระดับและสาขาวิชา</div>
                                <div className="flex items-center mt-2 space-x-2">
                                  <span className="px-2 py-1 text-xs text-green-800 bg-green-100 rounded-full">ความหลากหลาย</span>
                                  <span className="px-2 py-1 text-xs text-orange-800 bg-orange-100 rounded-full">ทันสมัย</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="p-4 bg-white shadow-sm rounded-xl">
                            <div className="flex items-start">
                              <div className="flex items-center justify-center w-8 h-8 mt-1 mr-3 text-sm font-bold text-white bg-green-500 rounded-full">S4</div>
                              <div className="flex-1">
                                <div className="font-semibold text-gray-800">สิ่งอำนวยความสะดวกที่ครบครัน</div>
                                <div className="mt-1 text-sm text-gray-600">อาคาร ห้องสมุด และเทคโนโลยีที่ทันสมัย</div>
                                <div className="flex items-center mt-2 space-x-2">
                                  <span className="px-2 py-1 text-xs text-green-800 bg-green-100 rounded-full">โครงสร้างพื้นฐาน</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Weaknesses */}
                      <div className="p-6 bg-gradient-to-br from-red-50 to-pink-100 rounded-2xl">
                        <h3 className="flex items-center mb-4 text-xl font-semibold text-red-800">
                          <AlertTriangle className="w-6 h-6 mr-2 text-red-600" />
                          จุดอ่อน (Weaknesses)
                        </h3>

                        <div className="space-y-4">
                          <div className="p-4 bg-white shadow-sm rounded-xl">
                            <div className="flex items-start">
                              <div className="flex items-center justify-center w-8 h-8 mt-1 mr-3 text-sm font-bold text-white bg-red-500 rounded-full">W1</div>
                              <div className="flex-1">
                                <div className="font-semibold text-gray-800">การปรับตัวต่อเทคโนโลยีที่ช้า</div>
                                <div className="mt-1 text-sm text-gray-600">การใช้เทคโนโลยีการศึกษายังไม่เป็นระบบ</div>
                                <div className="flex items-center mt-2 space-x-2">
                                  <span className="px-2 py-1 text-xs text-red-800 bg-red-100 rounded-full">Digital Gap</span>
                                  <span className="px-2 py-1 text-xs text-yellow-800 bg-yellow-100 rounded-full">ต้องพัฒนา</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="p-4 bg-white shadow-sm rounded-xl">
                            <div className="flex items-start">
                              <div className="flex items-center justify-center w-8 h-8 mt-1 mr-3 text-sm font-bold text-white bg-red-500 rounded-full">W2</div>
                              <div className="flex-1">
                                <div className="font-semibold text-gray-800">ระบบการบริหารจัดการที่ซับซ้อน</div>
                                <div className="mt-1 text-sm text-gray-600">กระบวนการตัดสินใจที่ใช้เวลานาน</div>
                                <div className="flex items-center mt-2 space-x-2">
                                  <span className="px-2 py-1 text-xs text-red-800 bg-red-100 rounded-full">ความล่าช้า</span>
                                  <span className="px-2 py-1 text-xs text-orange-800 bg-orange-100 rounded-full">ระบบราชการ</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="p-4 bg-white shadow-sm rounded-xl">
                            <div className="flex items-start">
                              <div className="flex items-center justify-center w-8 h-8 mt-1 mr-3 text-sm font-bold text-white bg-red-500 rounded-full">W3</div>
                              <div className="flex-1">
                                <div className="font-semibold text-gray-800">ข้อจำกัดด้านงบประมาณ</div>
                                <div className="mt-1 text-sm text-gray-600">การลงทุนในโครงการใหม่ที่จำกัด</div>
                                <div className="flex items-center mt-2 space-x-2">
                                  <span className="px-2 py-1 text-xs text-red-800 bg-red-100 rounded-full">งบประมาณ</span>
                                  <span className="px-2 py-1 text-xs text-gray-800 bg-gray-100 rounded-full">ข้อจำกัด</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="p-4 bg-white shadow-sm rounded-xl">
                            <div className="flex items-start">
                              <div className="flex items-center justify-center w-8 h-8 mt-1 mr-3 text-sm font-bold text-white bg-red-500 rounded-full">W4</div>
                              <div className="flex-1">
                                <div className="font-semibold text-gray-800">การสื่อสารภายในที่ไม่มีประสิทธิภาพ</div>
                                <div className="mt-1 text-sm text-gray-600">ข้อมูลไม่เชื่อมโยงระหว่างหน่วยงาน</div>
                                <div className="flex items-center mt-2 space-x-2">
                                  <span className="px-2 py-1 text-xs text-red-800 bg-red-100 rounded-full">การสื่อสาร</span>
                                  <span className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded-full">ข้อมูล</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Plans */}
                    <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl">
                      <h3 className="flex items-center mb-4 text-xl font-semibold text-gray-800">
                        <Target className="w-6 h-6 mr-2 text-indigo-600" />
                        แผนการดำเนินงาน
                      </h3>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="p-4 bg-white shadow-sm rounded-xl">
                          <h4 className="mb-3 font-semibold text-green-800">การใช้ประยุกต์จุดแข็ง</h4>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-center"><ChevronRight className="w-4 h-4 mr-2 text-green-500" />พัฒนาโปรแกรมพิเศษสำหรับศิษย์เก่าที่โดดเด่น</li>
                            <li className="flex items-center"><ChevronRight className="w-4 h-4 mr-2 text-green-500" />ขยายเครือข่ายความร่วมมือกับสถาบันชั้นนำ</li>
                            <li className="flex items-center"><ChevronRight className="w-4 h-4 mr-2 text-green-500" />เปิดหลักสูตรใหม่ที่ตอบโจทย์ตลาดแรงงาน</li>
                          </ul>
                        </div>

                        <div className="p-4 bg-white shadow-sm rounded-xl">
                          <h4 className="mb-3 font-semibold text-red-800">การปรับปรุงจุดอ่อน</h4>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-center"><ChevronRight className="w-4 h-4 mr-2 text-red-500" />จัดฝึกอบรมเทคโนโลยีการศึกษาให้บุคลากร</li>
                            <li className="flex items-center"><ChevronRight className="w-4 h-4 mr-2 text-red-500" />ปรับปรุงระบบการบริหารจัดการให้คล่องตัว</li>
                            <li className="flex items-center"><ChevronRight className="w-4 h-4 mr-2 text-red-500" />หาแหล่งงบประมาณเพิ่มเติมจากภาคเอกชน</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'team' && (
                <div>
                  <h2 className="flex items-center mb-6 text-2xl font-bold text-gray-800">
                    <Users className="w-8 h-8 mr-3 text-blue-600" />
                    ทีมงานและผู้รับผิดชอบ
                  </h2>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl">
                      <h3 className="mb-4 text-lg font-semibold text-gray-800">คณะกรรมการ</h3>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-center"><div className="w-2 h-2 mr-3 bg-blue-500 rounded-full"></div>ประธานคณะกรรมการ</li>
                        <li className="flex items-center"><div className="w-2 h-2 mr-3 bg-blue-500 rounded-full"></div>กรรมการด้านวิชาการ</li>
                        <li className="flex items-center"><div className="w-2 h-2 mr-3 bg-blue-500 rounded-full"></div>กรรมการด้านบริหาร</li>
                      </ul>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl">
                      <h3 className="mb-4 text-lg font-semibold text-gray-800">ทีมวิเคราะห์</h3>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-center"><div className="w-2 h-2 mr-3 bg-purple-500 rounded-full"></div>นักวิเคราะห์นโยบาย</li>
                        <li className="flex items-center"><div className="w-2 h-2 mr-3 bg-purple-500 rounded-full"></div>นักวิจัยสถาบัน</li>
                        <li className="flex items-center"><div className="w-2 h-2 mr-3 bg-purple-500 rounded-full"></div>ผู้เชี่ยวชาญภายนอก</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'resources' && (
                <div>
                  <h2 className="flex items-center mb-6 text-2xl font-bold text-gray-800">
                    <BookOpen className="w-8 h-8 mr-3 text-blue-600" />
                    ทรัพยากรและเครื่องมือ
                  </h2>

                  <div className="space-y-6">
                    <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-100 rounded-2xl">
                      <h3 className="mb-4 text-lg font-semibold text-gray-800">เครื่องมือวิเคราะห์</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-white rounded-lg shadow-sm">
                          <div className="text-sm font-medium text-gray-800">SWOT Matrix</div>
                        </div>
                        <div className="p-3 bg-white rounded-lg shadow-sm">
                          <div className="text-sm font-medium text-gray-800">TOWS Analysis</div>
                        </div>
                        <div className="p-3 bg-white rounded-lg shadow-sm">
                          <div className="text-sm font-medium text-gray-800">Porter's 5 Forces</div>
                        </div>
                        <div className="p-3 bg-white rounded-lg shadow-sm">
                          <div className="text-sm font-medium text-gray-800"><a href="https://blog.skooldio.com/what-is-pestel-framework/" target="_blank">PESTLE Analysis</a> </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-gradient-to-r from-orange-50 to-amber-100 rounded-2xl">
                      <h3 className="mb-4 text-lg font-semibold text-gray-800">แหล่งข้อมูล</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center"><ChevronRight className="w-4 h-4 mr-2 text-orange-500" />รายงานประจำปีของสถาบัน</li>
                        <li className="flex items-center"><ChevronRight className="w-4 h-4 mr-2 text-orange-500" />สถิติการศึกษาระดับชาติ</li>
                        <li className="flex items-center"><ChevronRight className="w-4 h-4 mr-2 text-orange-500" />การสำรวจความพึงพอใจ</li>
                        <li className="flex items-center"><ChevronRight className="w-4 h-4 mr-2 text-orange-500" />การวิจัยเชิงคุณภาพ</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <div className="p-6 border shadow-xl bg-white/80 backdrop-blur-sm rounded-3xl border-white/50">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">ความคืบหน้า</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-gray-600">การเก็บข้อมูล</span>
                    <span className="font-medium text-blue-600">85%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" style={{ width: '85%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-gray-600">การวิเคราะห์</span>
                    <span className="font-medium text-blue-600">60%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" style={{ width: '60%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-gray-600">รายงานผล</span>
                    <span className="font-medium text-gray-400">0%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-gray-300 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="p-6 border shadow-xl bg-white/80 backdrop-blur-sm rounded-3xl border-white/50">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">สถิติ</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">ผู้เข้าร่วม</span>
                  <span className="text-2xl font-bold text-blue-600">{swot?.user_progress?.length}</span>
                </div>
                {/*<div className="flex items-center justify-between">
                  <span className="text-gray-600">แผนกที่เข้าร่วม</span>
                  <span className="text-2xl font-bold text-purple-600">8</span>
                </div>*/}
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">ข้อมูลที่รวบรวม</span>
                  <span className="text-2xl font-bold text-green-600">{swot?.raw_strength?.length + swot?.raw_weakness?.length + swot?.raw_opportunity?.length + swot?.raw_threat?.length}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-6 border shadow-xl bg-white/80 backdrop-blur-sm rounded-3xl border-white/50">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">การดำเนินการด่วน</h3>
              <div className="space-y-3">
                <button className="flex items-center justify-between w-full p-3 transition-all duration-300 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl hover:from-blue-100 hover:to-purple-100 group"
                  onClick={() => window.history.back()}>
                  <div className="flex items-center">
                    <Target className="w-5 h-5 mr-3 text-blue-600" />
                    <span className="font-medium text-gray-700">หน้าหลัก</span>
                  </div>
                  <ArrowLeft className="w-4 h-4 text-gray-400 transition-all duration-300 rotate-180 group-hover:text-blue-500" />
                </button>

                <button className="flex items-center justify-between w-full p-3 transition-all duration-300 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 group">
                  <div className="flex items-center">
                    <Target className="w-5 h-5 mr-3 text-green-600" />
                    <span className="font-medium text-gray-700">เริ่มวิเคราะห์ใหม่</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 transition-all duration-300 group-hover:text-green-500" />
                </button>
              </div>
            </div>

            {/* Timeline */}
            <div className="p-6 border shadow-xl bg-white/80 backdrop-blur-sm rounded-3xl border-white/50">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">กำหนดการ</h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <div className="w-3 h-3 mr-3 bg-green-500 rounded-full"></div>
                  <div>
                    <div className="font-medium text-gray-800">เริ่มโครงการ</div>
                    <div className="text-gray-500">1 ก.ย. 2567</div>
                  </div>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-3 h-3 mr-3 bg-blue-500 rounded-full"></div>
                  <div>
                    <div className="font-medium text-gray-800">วิเคราะห์ข้อมูล</div>
                    <div className="text-gray-500">15 ก.ย. 2567</div>
                  </div>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-3 h-3 mr-3 bg-gray-300 rounded-full"></div>
                  <div>
                    <div className="font-medium text-gray-500">สรุปผล</div>
                    <div className="text-gray-400">30 ก.ย. 2567</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SwotDetail;