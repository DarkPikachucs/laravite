import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { budgetCodeData } from './apiBudgetService';
import { projectData } from './apiProjectService';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Input, Avatar, List, Space } from 'antd';

const { Search } = Input;
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const SearchProject = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [options, setOptions] = useState({});
  const [openItems, setOpenItems] = useState({});
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [faculties, setFaculties] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  const [count, setCount] = useState(0);
  const [budgetCodes, setBudgetCodes] = useState([]);

  const onSearch = (value, _e, info) => {
    setSearchTerm(value);
    console.log(info === null || info === void 0 ? void 0 : info.source, value);
  }

  const projectScanner = (project) => {
    //project id
    if (project.id.includes(searchTerm)) {
      return true
    }

    //project name
    if (project.name.includes(searchTerm)) {
      return true
    }

    //activity
    if (project.activity.filter(act => act.name.includes(searchTerm)).length != 0) {
      return true
    }

    //activity -> participant
    if (project.activity.filter(act => act.targetgroup.filter(participant => (participant.citizen_id && participant.citizen_id.includes(searchTerm)) || participant.name.includes(searchTerm)).length > 0).length != 0) {
      return true
    }

    //activity -> targetgroup
    if (project.activity.filter(act => act.targetgroup.filter(targetgroup => targetgroup.name.includes(searchTerm)).length > 0).length != 0) {
      return true
    }

    //activity -> location
    if (project.activity.filter(act => act.location.filter(location => location.location.includes(searchTerm)).length > 0).length != 0) {
      return true
    }

    //activity -> indicator

    //activity -> social_impact

    //output
    if (project.output && project.output.name.includes(searchTerm)) {
      return true
    }

    if (project.main_activity && project.main_activity.name.includes(searchTerm)) {
      return true
    }

    if (project.owner.filter(owner => owner.name.includes(searchTerm) || owner.idcard.includes(searchTerm)).length != 0) {
      return true
    }

    if (project.principle_and_reason && project.principle_and_reason.detail.includes(searchTerm)) {
      return true
    }

    if (project.objective && project.objective.detail.includes(searchTerm)) {
      return true
    }




    return false
  }


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


  useEffect(async () => {
    setLoading(true)
    await fetch(`${API_BASE_URL}/projects?year=2025`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProjects(data)

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
      <div className="min-h-screen bg-gray-50 font-(family-name:'Sarabun')">

        <div className="w-full p-4">
          <Search
            placeholder="Search..."
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </div>
        {/* รายการโครงการ */}
        <div className="w-full p-4">
          <h2 className="mb-3 text-2xl font-bold">โครงการ {projects.filter(project =>
            projectScanner(project)//project.name.includes(searchTerm)
          ).length}  of {searchTerm}</h2>
          <div class="grid grid-cols-1 gap-4 px-4 my-8 sm:grid-cols-4 sm:px-8">

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
              projects.length > 0 ? (
                projects.filter(
                  project => projectScanner(project)//project.name.includes(searchTerm)
                ).map((project) => (
                  <li key={project.id} className={`p-2 bg-white border-l-8 rounded-md shadow-md`}>
                    <div className="flex justify-between">
                      <h3 className="w-full text-sm font-medium hover:cursor-pointer" onClick={() => toggleItem(project.id)}>
                        {project.status == "approved" ? (
                          <div class="flex-none rounded-full bg-emerald-500/20 p-1">
                            <div class="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                          </div>

                        ) : null} {project.id} {project.name} ({project.activity.length}) ฿{addCommas(project.budget)}  <a href={`https://e-strategic.pcru.ac.th/project/${project.uuid}/preview`} target="_blank" className="text-lg text-gray-500">🔗</a>

                      </h3>
                      <button
                        onClick={() => toggleItem(project.id)}
                        className="flex justify-end font-semibold text-left w-7"
                      >
                        <span>{openItems[project.id] ? "▲" : "▼"}</span>
                      </button>
                    </div>
                    {openItems[project.id] && (
                      <ul className="mt-1 ml-2 text-gray-700">
                        <div class="container mx-auto p-6 text-sm font-medium">
                          <div class="relative border-l border-gray-200 dark:border-gray-700 ml-3">
                            <List
                              itemLayout="vertical"
                              size="large"

                              dataSource={project.activity}

                              renderItem={item => (
                                <List.Item
                                  key={item.name}
                                  actions={[
                                    <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                                    <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                                    <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                                  ]}
                                  classNames="text-sm font-medium"
                                >
                                  <List.Item.Meta
                                    avatar={<Avatar src={item.avatar} />}
                                    title={<a href={`https://e-strategic.pcru.ac.th/project/${project.uuid}/preview`} target="_blank">{item.name}</a>}
                                    description={item.description}
                                  />
                                  {item.content}
                                </List.Item>
                              )}
                            />
                            {project.activity.map((act, index) => (

                              <div></div>

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
        </div >

        {/* Modal แสดงรายละเอียดโครงการ */}
        {
          selectedProject && (
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
          )
        }
      </div >
    </>
  );
};

export default SearchProject;
