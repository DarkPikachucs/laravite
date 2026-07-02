import React, { useState, useEffect } from 'react';

const PibullGameTable = () => {
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

        rawData.forEach(curr => {
          // Check if there is a sport and event data
          if (curr[5] && curr[5].trim() !== '') {
            const participantName = curr[0];
            const organization = curr[4];
            allParticipantsSet.add(participantName);
            const allEvents = curr[5].split(',').map(item => item.trim());

            allEvents.forEach(eventStr => {
              // Use regex to get event number and sport name
              const eventNumberMatch = eventStr.match(/^(\d+)/);
              const sportNameMatch = eventStr.match(/(\d+)\s+(.+?)\s+.*$/);

              const eventNumber = eventNumberMatch ? parseInt(eventNumberMatch[1], 10) : 9999;
              const sportName = sportNameMatch ? sportNameMatch[2] : 'อื่นๆ';
              const eventDetails = eventStr;

              // Find existing event in the array to add participant
              let existingEvent = allEventsData.find(e => e.eventDetails === eventDetails);
              if (existingEvent) {
                existingEvent.participants.push({ name: participantName, organization });
              } else {
                allEventsData.push({
                  eventNumber,
                  sportName,
                  eventDetails,
                  participants: [{ name: participantName, organization }]
                });
              }
            });
          }
        });

        // Sort the flat array by event number
        allEventsData.sort((a, b) => a.eventNumber - b.eventNumber);

        // Rebuild the grouped structure for rendering with rowSpan
        const groupedData = {};
        allEventsData.forEach(event => {
          if (!groupedData[event.sportName]) {
            groupedData[event.sportName] = [];
          }
          groupedData[event.sportName].push(event);
        });

        const cheerleaders = rawData.filter(item =>
          item[3] === 'เข้าร่วมกิจกรรมอื่นๆ (กองเชียร์ สันทนาการ) ณ มหาวิทยาลัยราชภัฏพิบูลสงคราม' && (!item[5] || item[5].trim() === '')
        );
        console.log(cheerleaders);

        // Calculate summary data
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

      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen font-sans bg-gray-100">
        <div className="text-xl font-semibold text-gray-700">กำลังโหลดข้อมูล...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen font-sans bg-gray-100">
        <div className="text-xl text-red-600">
          เกิดข้อผิดพลาดในการโหลดข้อมูล: {error}
        </div>
      </div>
    );
  }

  if (Object.keys(sportsData).length === 0) {
    return (
      <div className="flex items-center justify-center h-screen font-sans bg-gray-100">
        <div className="text-xl text-gray-700">ไม่พบข้อมูลกีฬา</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 font-sans bg-gray-100 sm:p-8">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden transform transition-transform duration-300 hover:scale-[1.01]">

        <div className="flex items-center justify-center p-6 text-white bg-blue-700 border-b-2 border-blue-200">
          <svg className="w-8 h-8 mr-3 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          <h1 className="text-3xl font-bold text-center sm:text-4xl">
            รายชื่อนักกีฬาแบ่งตามชนิดกีฬา
          </h1>
        </div>

        <div className="p-4 overflow-x-auto sm:p-6">
          <table className="w-full overflow-hidden text-left border-collapse rounded-lg table-auto">
            <thead className="text-white bg-blue-600">
              <tr>
                <th className="p-3 text-sm font-semibold tracking-wider uppercase sm:text-base">
                  ชนิดกีฬา
                </th>
                <th className="p-3 text-sm font-semibold tracking-wider uppercase sm:text-base">
                  รายการ
                </th>
                <th className="p-3 text-sm font-semibold tracking-wider uppercase sm:text-base">
                  รายชื่อนักกีฬา
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(sportsData).map(sportName => {
                const events = sportsData[sportName];
                return events.map((event, index) => (
                  <tr key={`${sportName}-${event.eventDetails}`} className="transition-colors duration-200 border-b border-gray-200 hover:bg-gray-50">
                    {index === 0 && (
                      <td rowSpan={events.length} className="p-3 text-sm font-medium text-gray-700 align-top border-r-2 border-gray-200 sm:text-base bg-gray-50">
                        {sportName}
                      </td>
                    )}
                    <td className="p-3 text-sm text-gray-600 align-top sm:text-base">
                      <div className="font-semibold">{event.eventDetails}</div>
                      <div className="mt-1 text-xs text-gray-500">
                        จำนวน: {event.participants.length} คน
                      </div>
                    </td>
                    <td className="p-3 text-sm text-gray-600 align-top sm:text-base">
                      {event.participants.map((participant, nameIndex) => (
                        <div key={nameIndex} className="my-1">
                          <span className="mr-2 font-bold text-blue-500">{nameIndex + 1}.</span>
                          <span className="font-medium">{participant.name}</span>
                          <span className="text-xs text-gray-500"> ({participant.organization})</span>
                        </div>
                      ))}
                    </td>
                  </tr>
                ));
              })}
            </tbody>
          </table>
        </div>

        <div className="p-4 overflow-x-auto sm:p-6">
          <table className="w-full overflow-hidden text-left border-collapse rounded-lg table-auto">
            <thead className="text-white bg-gradient-to-r from-pink-500 to-red-500">
              <tr>
                <th className="p-3 text-sm font-semibold tracking-wider uppercase sm:text-base">
                  #
                </th>
                <th className="p-3 text-sm font-semibold tracking-wider uppercase sm:text-base">
                  รายชื่อ กองเชียร์ สันทนาการ
                </th>
                <th className="p-3 text-sm font-semibold tracking-wider uppercase sm:text-base">
                  สังกัด
                </th>
                <th className="p-3 text-sm font-semibold tracking-wider uppercase sm:text-base">
                  หน่วยงาน
                </th>
              </tr>
            </thead>
            <tbody>
              {cheerleadersData.map((cheerleader, index) => (
                <tr key={`cheerleader-${index}`} className="transition-colors duration-200 border-b border-gray-200 hover:bg-gray-50">

                  <td className="p-3 text-sm font-medium text-gray-700 align-top border-r-2 border-gray-200 sm:text-base bg-gray-50">
                    {index + 1}.
                  </td>
                  <td className="p-3 text-sm text-gray-600 align-top sm:text-base">
                    {cheerleader[0]}
                  </td>

                  <td className="p-3 text-sm text-gray-600 align-top sm:text-base">
                    {cheerleader[2]}
                  </td>
                  <td className="p-3 text-sm text-gray-600 align-top sm:text-base">
                    {cheerleader[4]}
                  </td>

                </tr>

              ))}
            </tbody>
          </table>
        </div>




        <div className="p-6 text-gray-700 border-t-2 border-gray-200 rounded-b-lg bg-gray-50">
          <h2 className="mb-2 text-2xl font-bold">สรุปข้อมูล</h2>
          <ul className="space-y-1 text-sm list-disc list-inside sm:text-base">
            <li>จำนวนชนิดกีฬาทั้งหมด: <strong className="text-blue-600">{summaryData.totalSports}</strong> ชนิด</li>
            <li>จำนวนรายการแข่งขันทั้งหมด: <strong className="text-blue-600">{summaryData.totalEvents}</strong> รายการ</li>
            <li>จำนวนนักกีฬาทั้งหมด: <strong className="text-blue-600">{summaryData.totalParticipants}</strong> คน</li>
            <li>หมายเหตุ: ผู้เข้าร่วมกิจกรรมอื่นๆ (กองเชียร์) อีก <strong className="text-blue-600">{summaryData.totalCheerleaders}</strong> คน</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PibullGameTable;