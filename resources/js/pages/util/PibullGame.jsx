import React, { useState, useEffect } from 'react';
import { Trophy, Users, User, MapPin, Medal, ChevronDown, ChevronUp, Search, Filter, Activity, Heart, Star, Award, Sparkles, Building, Phone, Table, UserRoundPlus } from 'lucide-react';

const PibullGame = () => {
  const [sportsData, setSportsData] = useState({});
  const [cheerleadersData, setCheerleedersData] = useState([]);
  const [summaryData, setSummaryData] = useState({
    totalSports: 0,
    totalEvents: 0,
    totalParticipants: 0,
    totalCheerleaders: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSports, setExpandedSports] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('ทั้งหมด');
  const [hoveredCard, setHoveredCard] = useState(null);

  const [activeTab, setActiveTab] = useState('sports');
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    const apiUrl = 'https://script.google.com/macros/s/AKfycbxeTkIHelBHDlqS3mBUsJgjk7cgtwvEwPFf7v2jB2HbOrGC0e2Fv-XDZaP7tpsUv_5n/exec';

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const rawData = await response.json();

        const allParticipantsSet = new Set();
        const allEventsData = [];
        const cheerleaders = [];

        rawData.forEach(curr => {
          if (curr[5] && curr[5].trim() !== '') {
            const participantName = curr[0];
            const organization = curr[4];
            allParticipantsSet.add(participantName);
            const allEvents = curr[5].split(',').map(item => item.trim());

            allEvents.forEach(eventStr => {
              const eventNumberMatch = eventStr.match(/^(\d+)/);
              const sportNameMatch = eventStr.match(/(\d+)\s+(.+?)\s+.*$/);

              const eventNumber = eventNumberMatch ? parseInt(eventNumberMatch[1], 10) : 9999;
              const sportName = sportNameMatch ? sportNameMatch[2] : 'อื่นๆ';
              const eventDetails = eventStr;

              let existingEvent = allEventsData.find(e => e.eventDetails === eventDetails);
              if (existingEvent) {
                existingEvent.participants.push({
                  name: participantName,
                  organization,
                  imageUrl: curr[6] || null,
                  phone: curr[1] || '', // Assuming phone is in index 1
                  email: curr[2] || ''  // Assuming email is in index 2
                });
              } else {
                allEventsData.push({
                  eventNumber,
                  sportName,
                  eventDetails,
                  participants: [{
                    name: participantName,
                    organization,
                    imageUrl: curr[6] || null,
                    phone: curr[1] || '',
                    email: curr[2] || ''
                  }]
                });
              }
            });
          }

          // Check for cheerleaders
          if (curr[3] === 'เข้าร่วมกิจกรรมอื่นๆ (กองเชียร์ สันทนาการ) ณ มหาวิทยาลัยราชภัฏพิบูลสงคราม' && (!curr[5] || curr[5].trim() === '')) {
            cheerleaders.push({
              name: curr[0],
              organization: curr[4] || 'ไม่ระบุ',
              phone: curr[1] || '',
              email: curr[2] || '',
              imageUrl: curr[6] || null,
              role: 'กองเชียร์'
            });
          }
        });

        allEventsData.sort((a, b) => a.eventNumber - b.eventNumber);

        const groupedData = {};
        allEventsData.forEach(event => {
          if (!groupedData[event.sportName]) {
            groupedData[event.sportName] = [];
          }
          groupedData[event.sportName].push(event);
        });

        const totalSportsCount = Object.keys(groupedData).length;
        const totalEventsCount = allEventsData.length;
        const totalParticipantsCount = allParticipantsSet.size;
        const totalCheerleadersCount = cheerleaders.length;

        setSportsData(groupedData);
        setCheerleedersData(cheerleaders);
        setSummaryData({
          totalSports: totalSportsCount,
          totalEvents: totalEventsCount,
          totalParticipants: totalParticipantsCount,
          totalCheerleaders: totalCheerleadersCount,
        });

        // Initially expand all sports
        const initialExpanded = {};
        Object.keys(groupedData).forEach(sport => {
          initialExpanded[sport] = true;
        });
        setExpandedSports(initialExpanded);

      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleSport = (sport) => {
    setExpandedSports(prev => ({
      ...prev,
      [sport]: !prev[sport]
    }));
  };

  const handleImageError = (key) => {
    setImageErrors(prev => ({ ...prev, [key]: true }));
  };

  const filteredSportsData = () => {
    let filtered = { ...sportsData };

    if (selectedSport !== 'ทั้งหมด') {
      filtered = { [selectedSport]: sportsData[selectedSport] };
    }

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const result = {};

      Object.keys(filtered).forEach(sport => {
        const filteredEvents = filtered[sport].map(event => {
          const filteredParticipants = event.participants.filter(p =>
            p.name.toLowerCase().includes(searchLower) ||
            p.organization.toLowerCase().includes(searchLower)
          );

          if (filteredParticipants.length > 0) {
            return { ...event, participants: filteredParticipants };
          }

          if (event.eventDetails.toLowerCase().includes(searchLower)) {
            return event;
          }

          return null;
        }).filter(Boolean);

        if (filteredEvents.length > 0 || sport.toLowerCase().includes(searchLower)) {
          result[sport] = filteredEvents.length > 0 ? filteredEvents : filtered[sport];
        }
      });

      return result;
    }

    return filtered;
  };

  const filteredCheerleaders = () => {
    if (!searchTerm) return cheerleadersData;

    const searchLower = searchTerm.toLowerCase();
    return cheerleadersData.filter(person =>
      person.name.toLowerCase().includes(searchLower) ||
      person.organization.toLowerCase().includes(searchLower)
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 mx-auto mb-4 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
            <Trophy className="absolute w-8 h-8 text-blue-600 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
          </div>
          <div className="text-xl font-semibold text-gray-700 animate-pulse">กำลังโหลดข้อมูลนักกีฬา...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
        <div className="p-8 text-center bg-white shadow-2xl rounded-2xl">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-red-100 rounded-full">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="text-xl font-semibold text-red-600">เกิดข้อผิดพลาดในการโหลดข้อมูล</div>
          <div className="mt-2 text-gray-600">{error}</div>
        </div>
      </div>
    );
  }

  const sports = filteredSportsData();
  const cheerleaders = filteredCheerleaders();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/4">
            <div className="w-64 h-64 bg-white rounded-full opacity-5 animate-pulse"></div>
          </div>
          <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-3/4">
            <div className="bg-white rounded-full w-96 h-96 opacity-5 animate-pulse"></div>
          </div>
        </div>

        <div className="relative z-10 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Trophy className="w-16 h-16 text-yellow-300 animate-bounce" />
              </div>
              <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
                ระบบจัดการข้อมูลนักกีฬา
              </h1>
              <p className="mt-3 text-xl text-blue-100">
                มหาวิทยาลัยราชภัฏเพชรบูรณ์
              </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-4 mt-10 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Medal, label: 'ชนิดกีฬา', value: summaryData.totalSports, color: 'from-yellow-400 to-orange-500' },
                { icon: Activity, label: 'รายการแข่งขัน', value: summaryData.totalEvents, color: 'from-green-400 to-teal-500' },
                { icon: Users, label: 'นักกีฬา', value: summaryData.totalParticipants, color: 'from-blue-400 to-indigo-500' },
                { icon: Heart, label: 'กองเชียร์', value: summaryData.totalCheerleaders, color: 'from-pink-400 to-red-500' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="relative group"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity`}></div>
                  <div className="relative p-6 transition-transform duration-300 transform bg-white shadow-xl rounded-xl hover:scale-105">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{item.label}</p>
                        <p className="mt-1 text-3xl font-bold text-gray-900">
                          {item.value.toLocaleString()}
                        </p>
                      </div>
                      <div className={`p-3 bg-gradient-to-r ${item.color} rounded-lg transform transition-transform ${hoveredCard === index ? 'rotate-12 scale-110' : ''}`}>
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>


      <div className="max-w-xl px-4 py-4 mx-auto sm:px-6 lg:px-8" onClick={() => window.open('https://forms.gle/khqxA3aqtDxy6Lmm9', '_blank')}>
        <div class="overflow-hidden transition-all duration-300 transform bg-white shadow-xl rounded-2xl hover:shadow-2xl">
          <div class="p-4 cursor-pointer bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 group">
            <div class="flex items-center justify-center">
              <div class="flex items-center space-x-4">
                <UserRoundPlus className="w-6 h-6 text-white" />
                <div>
                  <h2 class="text-2xl font-bold text-white">เพิ่มรายชื่อ</h2>

                </div>
              </div>


            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="sticky top-0 z-20 bg-white shadow-lg">
        <div className="px-2 mx-auto sm:px-4 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">

            {/* ปุ่มสลับ tab */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setActiveTab('sports')}
                className={`px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-all ${activeTab === 'sports'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                `}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>นักกีฬา</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('cheerleaders')}
                className={`px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-all
            ${activeTab === 'cheerleaders'
                    ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
          `}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>กองเชียร์</span>
                </div>
              </button>
            </div>

            {/* ปุ่มตาราง */}
            <div className="flex flex-2">
              <button
                onClick={() => window.open('/pibulgames/table', '_blank')}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg sm:text-base hover:bg-gray-200"
              >
                <div className="flex items-center justify-center space-x-2">
                  <Table className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>ตารางรายชื่อ</span>
                </div>
              </button>
            </div>
          </div>

          {/* Search + Filter */}
          <div className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
              <input
                type="text"
                placeholder={activeTab === 'sports'
                  ? "ค้นหาชื่อนักกีฬา, องค์กร หรือรายการ..."
                  : "ค้นหาชื่อกองเชียร์หรือองค์กร..."}
                className="w-full py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-lg sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {activeTab === 'sports' && (
              <div className="flex items-center flex-shrink-0 gap-2">
                <Filter className="hidden w-5 h-5 text-gray-600 sm:block" />
                <select
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={selectedSport}
                  onChange={(e) => setSelectedSport(e.target.value)}
                >
                  <option value="ทั้งหมด">ทุกชนิดกีฬา</option>
                  {Object.keys(sportsData).map(sport => (
                    <option key={sport} value={sport}>{sport}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </div>




      {/* Main Content */}
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {activeTab === 'sports' ? (
          // Sports Tab Content
          Object.keys(sports).length === 0 ? (
            <div className="py-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gray-100 rounded-full">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700">ไม่พบข้อมูลที่ค้นหา</h3>
              <p className="mt-2 text-gray-500">ลองค้นหาด้วยคำค้นอื่น หรือเลือกชนิดกีฬาอื่น</p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.keys(sports).map((sportName, sportIndex) => {
                const events = sports[sportName];
                const isExpanded = expandedSports[sportName];
                const totalAthletes = events.reduce((sum, event) => sum + event.participants.length, 0);

                return (
                  <div key={sportName} className="overflow-hidden transition-all duration-300 transform bg-white shadow-xl rounded-2xl hover:shadow-2xl">
                    {/* Sport Header */}
                    <div
                      className="p-6 cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-600 group"
                      onClick={() => toggleSport(sportName)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-white rounded-lg bg-opacity-20">
                            <Trophy className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold text-white">{sportName}</h2>
                            <div className="flex items-center mt-1 space-x-4 text-blue-100">
                              <span className="flex items-center">
                                <Activity className="w-4 h-4 mr-1" />
                                {events.length} รายการ
                              </span>
                              <span className="flex items-center">
                                <Users className="w-4 h-4 mr-1" />
                                {totalAthletes} นักกีฬา
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="p-2 transition-all bg-white rounded-lg bg-opacity-20 group-hover:bg-opacity-30">
                          {isExpanded ?
                            <ChevronUp className="w-6 h-6 text-white" /> :
                            <ChevronDown className="w-6 h-6 text-white" />
                          }
                        </div>
                      </div>
                    </div>

                    {/* Events List */}
                    {isExpanded && (
                      <div className="p-6 bg-gray-50">
                        <div className="space-y-4">
                          {events.map((event, eventIndex) => (
                            <div key={eventIndex} className="p-5 transition-shadow bg-white shadow-md rounded-xl hover:shadow-lg">
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2">
                                    <Award className="w-5 h-5 text-indigo-600" />
                                    <h3 className="text-lg font-semibold text-gray-800">
                                      {event.eventDetails}
                                    </h3>
                                  </div>
                                  <span className="inline-flex items-center px-3 py-1 mt-2 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
                                    {event.participants.length} นักกีฬา
                                  </span>
                                </div>
                              </div>

                              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                {event.participants.map((participant, pIndex) => (
                                  <div key={pIndex} className={`flex items-center p-3 transition-all border border-gray-200 rounded-lg bg-gray-50 group ${participant?.email == 'สโมสรอาจารย์และข้าราชการ' ? 'hover:bg-blue-50 hover:border-blue-300' : 'hover:bg-green-50 hover:border-blue-300'}`}>
                                    <div className="flex items-center w-full space-x-3">
                                      {false && participant?.imageUrl && !imageErrors[`${sportName}-${eventIndex}-${pIndex}`] ? (
                                        <img
                                          src={participant?.imageUrl}
                                          alt={participant?.name}
                                          className="object-cover w-12 h-12 border-2 border-blue-300 rounded-full"
                                          onError={() => handleImageError(`${sportName}-${eventIndex}-${pIndex}`)}
                                        />
                                      ) : (
                                        <div className="flex items-center justify-center w-12 h-12 text-lg font-bold text-white rounded-full bg-gradient-to-r from-blue-400 to-indigo-500">
                                          {pIndex + 1}
                                        </div>
                                      )}
                                      <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-900 truncate">
                                          {participant.name}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">
                                          {participant.organization}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )
        ) : (
          // Cheerleaders Tab Content
          <div className="space-y-6">
            <div className="overflow-hidden bg-white shadow-xl rounded-2xl">
              <div className="p-6 bg-gradient-to-r from-pink-500 to-red-500">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white rounded-lg bg-opacity-20">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">กองเชียร์และผู้ร่วมกิจกรรม</h2>
                    <p className="mt-1 text-pink-100">จำนวนทั้งหมด {cheerleaders.length} คน</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {cheerleaders.length === 0 ? (
                  <div className="py-12 text-center">
                    <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-semibold text-gray-700">ไม่พบข้อมูลกองเชียร์</h3>
                    <p className="mt-2 text-gray-500">ลองค้นหาด้วยคำค้นอื่น</p>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {cheerleaders.map((person, index) => (
                      <div key={index} className="p-4 transition-all duration-300 transform border border-pink-200 bg-gradient-to-br from-pink-50 to-red-50 rounded-xl hover:shadow-lg hover:scale-105">
                        <div className="flex flex-col items-center text-center">
                          {false && person?.imageUrl && !imageErrors[`cheerleader-${index}`] ? (
                            <img
                              src={person?.imageUrl}
                              alt={person.name}
                              className="object-cover w-20 h-20 mb-3 border-pink-300 rounded-full shadow-md border-3"
                              onError={() => handleImageError(`cheerleader-${index}`)}
                            />
                          ) : (
                            <div className="flex items-center justify-center w-20 h-20 mb-3 rounded-full shadow-md bg-gradient-to-r from-pink-400 to-red-400">
                              <User className="w-10 h-10 text-white" />
                            </div>
                          )}

                          <h3 className="text-lg font-semibold text-gray-800">{person.name}</h3>

                          <div className="flex items-center justify-center mt-2 space-x-1">
                            <MapPin className="w-3 h-3 text-gray-500" />
                            <p className="text-xs text-gray-600">{person.organization}</p>
                          </div>

                          <div className="flex items-center justify-center mt-3 space-x-2">
                            <span className="px-3 py-1 text-xs font-medium text-white rounded-full shadow-sm bg-gradient-to-r from-pink-500 to-red-500">
                              กองเชียร์
                            </span>
                            <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                          </div>

                          {(person.phone || person.email) && (
                            <div className="w-full pt-3 mt-3 border-t border-pink-200">
                              {false && person.phone && (
                                <div className="flex items-center justify-center mb-1 text-xs text-gray-600">
                                  <Phone className="w-3 h-3 mr-1" />
                                  <span>{person.phone}</span>
                                </div>
                              )}
                              {person.email && (
                                <div className="flex items-center justify-center text-xs text-gray-600">
                                  <Building className="w-3 h-3 mr-1" />
                                  <span className="truncate">{person.email}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Cheerleader Statistics */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="p-6 bg-white border border-pink-200 shadow-lg rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">องค์กรที่เข้าร่วม</p>
                    <p className="mt-1 text-2xl font-bold text-gray-900">
                      {new Set(cheerleaders.map(c => c.organization)).size}
                    </p>
                  </div>
                  <div className="p-3 bg-pink-100 rounded-lg">
                    <Users className="w-6 h-6 text-pink-600" />
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white border border-red-200 shadow-lg rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">พลังเชียร์</p>
                    <p className="mt-1 text-2xl font-bold text-gray-900">100%</p>
                  </div>
                  <div className="p-3 bg-red-100 rounded-lg">
                    <Heart className="w-6 h-6 text-red-600 animate-pulse" />
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white border border-orange-200 shadow-lg rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">ความสามัคคี</p>
                    <p className="mt-1 text-2xl font-bold text-gray-900">เต็ม 💯</p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Sparkles className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-12 bg-gray-900">
        <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Star className="w-6 h-6 mr-1 text-yellow-400" />
              <Star className="w-6 h-6 mr-1 text-yellow-400" />
              <Star className="w-6 h-6 text-yellow-400" />
            </div>
            <p className="text-gray-400">
              © 2025 มหาวิทยาลัยราชภัฏเพชรบูรณ์ - ระบบจัดการข้อมูลนักกีฬา
            </p>
            <p className="mt-2 text-sm text-gray-500">
              7605
            </p>
          </div>
        </div>
      </footer>
    </div >
  );
};

export default PibullGame;