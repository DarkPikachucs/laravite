import React, { useState } from 'react';
import { ChevronRight, Target, Users, BookOpen, TrendingUp } from 'lucide-react';

const SwotAnalysisCard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'ภาพรวม', icon: Target },
    { id: 'process', label: 'กระบวนการ', icon: TrendingUp },
    { id: 'team', label: 'ทีมงาน', icon: Users },
    { id: 'resources', label: 'ทรัพยากร', icon: BookOpen }
  ];

  const processes = [
    { step: 1, title: 'การประเมินผลกระทบของสภาพแวดล้อม', desc: 'วิเคราะห์ปัจจัยภายนอกที่ส่งผลต่อองค์กร' },
    { step: 2, title: 'การวิเคราะห์จุดแข็งและจุดอ่อน', desc: 'ประเมินศักยภาพภายในองค์กร' },
    { step: 3, title: 'การระบุโอกาสและอุปสรรค', desc: 'หาปัจจัยเอื้อและอุปสรรคจากภายนอก' },
    { step: 4, title: 'การกำหนดกลยุทธ์', desc: 'พัฒนายุทธศาสตร์จากผลการวิเคราะห์' }
  ];

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-8 text-center lg:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600">
            <Target className="w-8 h-8 text-white" />
          </div>
          <h1 className="mb-4 text-2xl font-bold leading-tight text-gray-800 sm:text-3xl lg:text-4xl">
            SWOT แผนยุทธศาสตร์มหาวิทยาลัย<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              และสถาบันศาสนา ด้านการศึกษา
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
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {/* Main Card */}
          <div className="lg:col-span-2">
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
                        เพื่อพัฒนายุทธศาสตร์ที่เหมาะสมสำหรับสถาบันการศึกษาในยุคดิจิทัล
                        โดยการวิเคราะห์จุดแข็ง จุดอ่อน โอกาส และอุปสรรคอย่างเป็นระบบ
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
                          <div className="text-sm font-medium text-gray-800">PESTLE Analysis</div>
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
              <h3 className="mb-4 text-lg font-semibold text-gray-800">สถิติด่วน</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">ผู้เข้าร่วม</span>
                  <span className="text-2xl font-bold text-blue-600">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">แผนกที่เข้าร่วม</span>
                  <span className="text-2xl font-bold text-purple-600">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">ข้อมูลที่รวบรวม</span>
                  <span className="text-2xl font-bold text-green-600">156</span>
                </div>
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
};

export default SwotAnalysisCard;