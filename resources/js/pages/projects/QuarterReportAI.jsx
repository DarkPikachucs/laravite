import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { budgetCodeData } from './apiBudgetService';
import { projectData } from './apiProjectService';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const QuarterReportAI = () => {
  const [openItems, setOpenItems] = useState({});
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [faculties, setFaculties] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  const [count, setCount] = useState(0);
  const [budgetCodes, setBudgetCodes] = useState([]);

  const toggleItem = (id) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const addCommas = (param) => {
    return Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(param);
  };

  async function fetchBudgetData() {
    try {
      const result = await budgetCodeData();
      setBudgetCodes(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async function fetchProjectData() {
    try {
      const result = await projectData();
      setProjects(result);
      setLoading(false)
      setSuccess(true);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false)
      setSuccess(true);
    }
  }

  useEffect(() => {
    //fetchProjectData();
    //fetchBudgetData();

    // ข้อมูลจำลองของคณะ
    const facultyData = [
      { id: 1, section_id: 1, name: "มหาวิทยาลัยราชภัฎเพชรบูรณ์" },
      { id: 102, section_id: 102, name: "คณะครุศาสตร์" },
      { id: 103, section_id: 103, name: "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม" },
      { id: 104, section_id: 104, name: "คณะมนุษยศาสตร์และสังคมศาสตร์" },
      { id: 105, section_id: 105, name: "คณะวิทยาการจัดการ" },
      { id: 106, section_id: 106, name: "คณะวิทยาศาสตร์และเทคโนโลยี" },
      { id: 112, section_id: 112, name: "คณะพยาบาลศาสตร์" },
      { id: 107, section_id: 107, name: "สถาบันวิจัยและพัฒนา" },
      { id: 108, section_id: 108, name: "สำนักวิทยบริการและเทคโนโลยีสารสนเทศ" },
      { id: 109, section_id: 109, name: "สำนักศิลปะและวัฒนธรรม" },
      { id: 110, section_id: 110, name: "สำนักส่งเสริมวิชาการและงานทะเบียน" },
      { id: 111, section_id: 111, name: "สังกัดอธิการบดี" },
      { id: 113, section_id: 113, name: "โครงการศูนย์อุทยานวิทยาศาสตร์และเทคโนโลยีเพื่อนวัตกรรม" },
      { id: 114, section_id: 114, name: "บัณฑิตวิทยาลัย" },
      { id: 115, section_id: 115, name: "โครงการจัดตั้งวิทยาลัยนานาชาติ มหาวิทยาลัยราชภัฏเพชรบูรณ์" },
      { id: 116, section_id: 116, name: "โรงเรียนสาธิตมหาวิทยาลัยราชภัฏเพชรบูรณ์" },

      { id: 101, section_id: 101, name: "สำนักงานอธิการบดี" },
      { id: 10101, section_id: 10101, name: "กองกลาง" },
      { id: 10102, section_id: 10102, name: "กองนโยบายและแผน" },
      { id: 10103, section_id: 10103, name: "กองพัฒนานักศึกษา" },
      { id: 10105, section_id: 10105, name: "กองอาคารสถานที่" },
    ];
    setFaculties(facultyData);
    setSelectedFaculty(facultyData[0]); // เลือกคณะแรกเป็นค่าเริ่มต้

  }, []);


  useEffect(() => {
    setLoading(true)
    fetch(`${API_BASE_URL}/projects?year=2025`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setProjects(data.data)

        //const projrctGroup = Object.groupBy(data.data, ({ type }) => type);

        setLoading(false)
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false)
        setSuccess(true);
      });

    fetch(`${API_BASE_URL}/budgets?year=2568`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setBudgetCodes(data.data)

        //const projrctGroup = Object.groupBy(data.data, ({ type }) => type);

        setLoading(false)
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false)
        setSuccess(true);
      });
  }, []);

  return (
    <>
      <div className="flex min-h-screen bg-gray-50 font-(family-name:'Sarabun')">
        {/* Sidebar คณะ */}
        <div className="w-1/4 p-4 bg-white shadow-md">
          <h2 className="mb-3 text-xl font-bold">หน่วยงาน</h2>
          <ul>
            {faculties.map((faculty) => (
              <li key={faculty.id}
                className={`p-2 cursor-pointer ${selectedFaculty.section_id === faculty.section_id ? "bg-blue-500 text-white" : "hover:bg-gray-200"
                  }`}
                onClick={() => setSelectedFaculty(faculty)}
              >
                {faculty.name}
              </li>
            ))}
          </ul>
        </div>

        {/* รายการโครงการ */}
        <div className="w-3/4 p-4">
          <h2 className="mb-3 text-2xl font-bold">โครงการภายใต้หน่วยงาน {budgetCodes.filter(item => item.section_code == selectedFaculty.section_id).length}</h2>
          <div class="grid grid-cols-1 gap-4 px-4 my-8 sm:grid-cols-4 sm:px-8">

            <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
              <div class="p-4 bg-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2">
                  </path>
                </svg>
              </div>
              <div class="px-4 text-gray-700">
                <h3 class="text-sm tracking-wider">รหัสงบประมาณ</h3>
                <p class="text-3xl">{budgetCodes.filter(item => item.section_code == selectedFaculty.section_id).length}</p>
              </div>
            </div>

            <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
              <div class="p-4 bg-indigo-400"><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z">
                </path>
              </svg></div>
              <div class="px-4 text-gray-700">
                <h3 class="text-sm tracking-wider">กิจกรรมที่ต้องรายงาน</h3>
                <p class="text-3xl">{budgetCodes.filter(item => item.section_code == selectedFaculty.section_id).reduce((acc, item) => acc + item.activity.length, 0)}</p>
              </div>
            </div>

            <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
              <div class="p-4 bg-green-400"><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z">
                </path>
              </svg></div>
              <div class="px-4 text-gray-700">
                <h3 class="text-sm tracking-wider">Total Member</h3>
                <p class="text-3xl"></p>
              </div>
            </div>

            <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
              <div class="p-4 bg-red-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4">
                  </path>
                </svg>
              </div>
              <div class="px-4 text-gray-700">
                <h3 class="text-sm tracking-wider">งบประมาณ</h3>

                <p>
                </p>
                <p class="text-xl">
                  {addCommas(budgetCodes.filter(item => item.section_code == selectedFaculty.section_id)
                    .reduce((acc, item) => acc + item.activity.reduce((acc2, act2) => acc2 + act2.budget_sum, 0), 0))}
                </p>

              </div>
            </div>
          </div>
          <ul className="space-y-3">
            {!success ? (
              <div>
                <div style={{ display: "flex" }}>
                  <div class="mx-auto w-full max-w-xl rounded-md border border-blue-300 p-4">
                    <div class="flex animate-pulse space-x-4">
                      <div class="size-10 rounded-full bg-gray-200"></div>
                      <div class="flex-1 space-y-6 py-1">
                        <div class="h-2 rounded bg-gray-200"></div>
                        <div class="space-y-3">
                          <div class="grid grid-cols-3 gap-4">
                            <div class="col-span-2 h-2 rounded bg-gray-200"></div>
                            <div class="col-span-1 h-2 rounded bg-gray-200"></div>
                          </div>
                          <div class="h-2 rounded bg-gray-200"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              budgetCodes.length > 0 ? (
                budgetCodes.filter(
                  item => item.section_code == selectedFaculty.section_id
                ).map((project) => (
                  <li key={project.project_code} className={`p-2 bg-white border-l-8 rounded-md shadow-md 
                  ${projects.filter((pj) => project.activity.filter((act) => pj.parent_id == act.activity) != 0).length == 0 ?
                      "border-gray-500" : "border-blue-500"} `}>
                    <div className="flex justify-between">
                      <h3 className="w-full text-sm font-medium hover:cursor-pointer" onClick={() => toggleItem(project.project_code)}>
                        {project.activity.filter((activity) => projects.filter((project) => project.project_code == activity.activity) != 0)}
                        {project.status == "approved" ? (
                          <div class="flex-none rounded-full bg-emerald-500/20 p-1">
                            <div class="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                          </div>

                        ) : null} {project.project_code} {project.description} ({projects.filter((pj) => project.activity.filter((act) => pj.parent_id == act.activity) != 0).length})
                        ฿{addCommas(project.budget_sum)}
                      </h3>
                      <button
                        onClick={() => toggleItem(project.project_code)}
                        className="flex justify-end font-semibold text-left w-7"
                      >
                        <span>{openItems[project.project_code] ? "▲" : "▼"}</span>
                      </button>
                    </div>
                    {openItems[project.project_code] && (
                      <ul className="mt-2 ml-4 text-gray-700">
                        <div class="container mx-auto p-6">
                          <div class="relative border-l border-gray-200 dark:border-gray-700 ml-3">

                            {project.activity.map((act, index) => (
                              <div class="mb-10 ml-6">
                                <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">

                                </span>
                                <h3 class="flex items-center mb-1 text-lg font-semibold text-gray-900 ">{act.activity} {act.description}</h3>
                                <time class="block mb-2 text-sm font-normal leading-none text-gray-500 dark:text-gray-500">จำนวน {projects.filter((project) => project.parent_id == act.activity).length} โครงการ</time>
                                <div class="mb-4 text-base font-normal text-gray-500 ">
                                  {projects.filter((project) => project.parent_id == act.activity)
                                    .map((project) => (
                                      <div>
                                        <div className='text-sm text-gray-700'>{project.id} {project.name} <a href={`https://e-strategic.pcru.ac.th/project/${project.uuid}/preview`} target="_blank" className="text-lg text-gray-500">🔗</a></div>
                                        {project.activity.map((activity) => (
                                          <div className='pl-2 text-sm text-gray-900'>

                                            {activity.quarter_report.length > 0 && (
                                              <fieldset class="text-md max-w-full border-2 border-indigo-400 rounded-lg px-4 py-2">
                                                <legend class="px-1 font-semibold dark:text-gray-800">{!activity.name.includes("กิจกรรม") ? "กิจกรรม" : ""}{activity.name}</legend>
                                                <ul class="bg-white rounded-lg shadow divide-y divide-gray-200 max-w-full">
                                                  {activity.quarter_report.reverse().map((quarterReport) => (
                                                    <li class="px-6 py-4">
                                                      <div class="flex justify-between">
                                                        <span class="font-semibold text-md">ไตรมาส {quarterReport.quarter}</span>
                                                        <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">ไตรมาส {quarterReport.quarter}</span>
                                                      </div>


                                                      <div class="">
                                                        <dl class="grid grid-cols-[max-content_1fr] gap-x-8 gap-y-2">
                                                          <dt class="">งบประมาณเบิกจ่าย:</dt>
                                                          <dd class="">{addCommas(quarterReport.pay)}</dd>
                                                          <dt class="">ระยะเวลา:</dt>
                                                          <dd class="">{new Date(quarterReport.start_at).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric', })}
                                                            - {new Date(quarterReport.end_at).toLocaleDateString('th-TH', {
                                                              year: 'numeric', month: 'long', day: 'numeric',
                                                            })}</dd>
                                                          <dt class="">ผู้ร่วมโครงการ:</dt>
                                                          <dd class="">
                                                            <pre>{quarterReport.participant}</pre>
                                                          </dd>
                                                          <dt class="">ผลการดำเนินงาน:</dt>
                                                          <dd class="">{quarterReport.result}</dd>
                                                          <dt class="">ปัญหา/อุปสรรค:</dt>
                                                          <dd class="">{quarterReport.issue}</dd>
                                                          <dt class="">ลิงก์ที่เผยแพร่:</dt>
                                                          <dd class="text-blue-500 hover:text-blue-700"><Link to={quarterReport.publish_url} target="_blank" rel="noopener noreferrer">{quarterReport.publish_url}</Link></dd>
                                                          <dt class="">ลิงก์ไฟล์รูปภาพ:</dt>
                                                          <dd class="text-blue-500 hover:text-blue-700"><Link to={quarterReport.image_url} target="_blank" rel="noopener noreferrer">{quarterReport.image_url}</Link></dd>
                                                          <dt class="">กลุ่มเป้าหมาย:</dt>
                                                          <dd class="">{activity.targetgroup.map((targetgroup) => (
                                                            <div>{targetgroup.name} {targetgroup.amount} {targetgroup.project_unit.name}</div>
                                                          ))}</dd>
                                                          <dt class="">สรุปความ:</dt>
                                                          <dd class=""><p>{!project.name.includes("โครงการ") ? "โครงการ" : ""}{project.name}มีการจัดกิจกรรม{activity.name} ระหว่างวันที่ {new Date(quarterReport.start_at).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric', })}
                                                            - {new Date(quarterReport.end_at).toLocaleDateString('th-TH', {
                                                              year: 'numeric', month: 'long', day: 'numeric',
                                                            })} เพื่อ{quarterReport.result} ดำเนินงานโครงการโดย{quarterReport.participant} </p></dd>
                                                        </dl>
                                                      </div>
                                                    </li>
                                                  ))}
                                                </ul>
                                              </fieldset>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    ))}
                                </div>
                              </div>


                            ))}
                          </div>
                        </div>
                        {/*project.activity.map((act, index) => (
                          <li key={index} className="py-1">

                            <div className="flex-grow w-full px-3 py-2 text-black bg-gray-100 border-l-8 border-orange-500 rounded-md">

                              <div className='text-sm'>{act.activity} {act.description}</div>
                              <div className='pl-4'>
                                {projects.filter((project) => project.parent_id == act.activity)
                                    .map((project) =>(
                                    <div>
                                        <div className='text-sm'>{project.id} {project.name}</div>
                                        {project.activity.map((activity) =>(
                                            <div className='pl-2 text-sm'>
                                                {activity.quarter_report.length > 0 && (
                                                    <fieldset class="text-md max-w-full border-2 border-indigo-400 rounded-lg px-4 py-2">
                                                        <legend class="px-1 font-semibold dark:text-gray-800">{activity.name}</legend>
                                                        <ul class="bg-white rounded-lg shadow divide-y divide-gray-200 max-w-full">
                                                        {activity.quarter_report.map((quarterReport) => (
                                                            <li class="px-6 py-4">
                                                                <div class="flex justify-between">
                                                                    <span class="font-semibold text-md">ไตรมาส {quarterReport.quarter}</span>
                                                                    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">ไตรมาส {quarterReport.quarter}</span>
                                                                </div>
                                                                <p class="text-gray-700"><pre>{quarterReport.participant}</pre></p>
                                                                <p class="text-gray-700">{quarterReport.result}</p>
                                                                <div>{new Date(quarterReport.start_at).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric', })}
                                                                    - {new Date(quarterReport.end_at).toLocaleDateString('th-TH', {year: 'numeric', month: 'long',day: 'numeric',
                                                                })}</div>

                                                                <h6>สรุปความ</h6>
                                                                <div className='pl-2'>
                                                                    <p>โครงการ{project.name}มีการจัดกิจกรรม{activity.name} ระหว่างวันที่ {new Date(quarterReport.start_at).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric', })}
                                                                    - {new Date(quarterReport.end_at).toLocaleDateString('th-TH', {year: 'numeric', month: 'long',day: 'numeric',
                                                                })} เพื่อ{quarterReport.result} ดำเนินงานโครงการโดย{quarterReport.participant} โดยมีผู้เข้าร่วมโครงการ</p>
                                                                </div>
                                                            </li>
                                                        ))}
                                                        </ul>
                                                    </fieldset>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                              </div>
                            </div>
                          </li>
                        ))*/}
                      </ul>
                    )}
                  </li>
                ))
              ) : (
                <p>ไม่มีโครงการในคณะนี้</p>
              )
            )}
          </ul>
        </div>

        {/* Modal แสดงรายละเอียดโครงการ */}
        {selectedProject && (
          <div className="fixed inset-0 flex items-center justify-center w-auto bg-black bg-opacity-50">
            <div className="w-2/3 p-6 bg-white rounded-lg shadow-lg">
              <h2 className="text-xl font-bold">{selectedProject.id}</h2>
              <p className="mt-2">{selectedProject.name}</p>
              <ul class="bg-white shadow overflow-hidden sm:rounded-md max-w-full mx-auto mt-16">
                {selectedProject.activity.map((act, index) => (
                  <li className='flex justify-between'>
                    <div class="px-4 py-5 sm:px-6">
                      <div class="flex items-center justify-between">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">{act.name}</h3>
                      </div>
                      <div class="mt-2 flex items-center justify-between">
                        <p class="mt-1 max-w-2xl text-sm text-gray-500">{act.location[0] ? "📍" + act.location[0].location : ''}</p>
                      </div>
                    </div>
                    <div class="px-4 py-5 sm:px-6 hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <div className='flex items-center justify-center h-16 p-4 px-4 py-6 text-gray-400 transition duration-500 transform bg-gray-100 border-2 border-gray-600 rounded-lg sm:h-16 hover:scale-110 '>
                        <Link to={`/gvh/${selectedProject.id}/${act.id}`} target="_blank" rel="noopener noreferrer"
                          className="font-medium text-indigo-600 hover:text-indigo-500">
                          สำรวจ</Link>
                      </div>

                    </div>
                  </li>
                ))}
              </ul>

              <button onClick={() => setSelectedProject(null)}
                className="px-4 py-2 mt-4 text-white bg-red-500 rounded">ปิด</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default QuarterReportAI;
