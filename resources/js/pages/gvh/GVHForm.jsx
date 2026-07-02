import React, { useState, useEffect, use } from 'react';
import { BrowserRouter as Router, useParams } from "react-router-dom";
import { Button, notification, Space } from 'antd';
import axiosInstance, { getCSRFToken } from "./../../axios";
import { CreateInput } from "thai-address-autocomplete-react";
//import { useAuth } from '../../contexts/AuthContext';

const InputThaiAddress = CreateInput();
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const GVHForm = () => {
  //let token = document.head.querySelector('meta[name="csrf-token"]');
  const { year, uuid, phrase } = useParams();
  //const [year, setYears] = useState("");
  const [projects, setProjects] = useState({});
  const [loading, setLoading] = useState(true);
  //const { setUser, csrfToken } = useAuth();
  //const [ error, setError] = React.useState(null);
  let [formData, setFormData] = useState({
    year: year,
    pp_project_code: '',
    phrase: phrase,
    gender: '',
    age: '',
    career: '',
    career_other: '',
    education: '',
    zipcode: '',
    province: '',
    amphoe: '',
    district: '',
    townshipName: '',
    section_1_1: '',
    section_1_2: '',
    section_1_3: '',
    section_1_4: '',
    section_1_5: '',
    // ... เพิ่มฟิลด์อื่น ๆ ตามที่ต้องการ
    total_gvh: '',
  });
  let [address, setAddress] = useState({
    district: "", // ตำบล tambol
    amphoe: "", // อำเภอ amphoe
    province: "", // จังหวัด changwat
    zipcode: "", // รหัสไปรษณีย์ postal code
  });
  const handleAddressChange = (scope) => (value) => {
    setAddress((oldAddr) => ({
      ...oldAddr,
      [scope]: value,
    }));

    setFormData({
      ...formData,
      [scope]: value,
    });
  };

  const handleAddressSelect = (address) => {
    setAddress(address);
    setFormData({
      ...formData,
      zipcode: address.zipcode,
      province: address.province,
      amphoe: address.amphoe,
      district: address.district,
    });
  };

  //searchParams.get("__firebase_request_key")
  const [api, contextHolder] = notification.useNotification();
  const openNotification = pauseOnHover => () => {
    api.open({
      message: 'Notification Title',
      description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      showProgress: true,
      pauseOnHover,
    });
  };

  const formInitData = [
    {
      section: "1. ด้านวิถีชีวิตแบบพอเพียงของชุมชน",
      questions: [
        "1.1 คนในชุมชนมีลักษณะเป็นกัลยาณมิตรหรือเป็นเพื่อนบ้านที่ดี มีการช่วยเหลือ แบ่งปัน และคอยห่วงใยทุกข์สุขซึ่งกันและกัน",
        "1.2 คนในชุมชนมีดำเนินชีวิตแบบพอมี โดยไม่เบียดเบียนตนเองและผู้อื่น",
        "1.3 คนในชุมชนเข้าประชุม และจัดเวทีประชาคมต่าง ๆ ในชุมชนอย่างสม่ำเสมอ",
        "1.4 คนในชุมชนได้รับความยุติธรรมจากการใช้กฎ ระเบียบในชุมชน และได้รับประโยชน์จากเครือข่ายชุมชน",
        "1.5 ครัวเรือนในชุมชนมีประกอบอาชีพที่สุจริต",
      ],
    },
    {
      section: "2. ด้านสุขภาวะและความมั่นคงของครอบครัว",
      questions: [
        "2.1 คนในชุมชนมีสุขภาพกายดี",
        "2.2 คนในชุมชนมีสุขภาพจิตดี",
        "2.3 ครอบครัวมีความอบอุ่น สมาชิกในครอบครัวมีกิจกรรมร่วมกัน",
        "2.4 ครอบครัวมีความปลอดภัยในชีวิตและทรัพย์สินไม่มีการก่อคดีอาชญากรรม ยาเสพติดและอบายมุขในชุมชน",
        "2.5 สมาชิกในครอบครัวพึ่งตนเองได้ ไม่เป็นภาระให้กับคนในครอบครัวหรือชุมชน",
      ],
    },
    {
      section: "3. เศรษฐกิจครัวเรือนเข้มแข็ง",
      questions: [
        "3.1 ครัวเรือนในชุมชน มีความเป็นไท ไม่มีหนี้สินติดค้างใครหรือนอกชุมชน",
        "3.2 คนในชุมชน มีงานทำและมีรายได้เพียงพอกับรายจ่ายที่เกิดขึ้น",
        "3.3 ครัวเรือนในชุมชน มีโภคทรัพย์ที่ได้มาโดยสุจริต",
        "3.4 ครัวเรือนในชุมชนได้ใช้ทรัพย์ที่ได้มาโดยชอบ สำหรับเลี้ยงเลี้ยงผู้ควรเลี้ยง และบำเพ็ญประโยชน์",
        "3.5 ครัวเรือนในชุมชนมีเงินฝากไว้กับสถาบันการเงินในชุมชน",
      ],
    },
    {
      section: "4. ด้านการบริหารจัดการชุมชน",
      questions: [
        "4.1 คนในชุมชนมีส่วนร่วมในการคิด ตัดสินใจและดำเนินการในกิจกรรมของชุมชนอย่างเป็นอิสระ",
        "4.2 ชุมชนมีแผนชุมชนในการกำหนดทิศทางการพัฒนาชุมชนของตนเองในอนาคตไว้เป็นลายลักษณ์อักษร",
        "4.3 คนในชุมชนรวมกลุ่มบริหารจัดการอาชีพหรือวิสาหกิจชุมชนร่วมกันจนทำให้เศรษฐกิจชุมชนเข้มแข็ง",
        "4.4 ชุมชนมีผู้นำที่ดีและเก่ง ที่มีความเอาใจใส่ต่อลูกบ้านช่วยเหลือชุมชนและสามารถแก้ไขปัญหาชุมชนได้",
        "4.5 ชุมชนมีความเกื้อกูล พึ่งพาซึ่งกันและกันที่ดีต่อกัน",
      ],
    },
    {
      section: "5. ด้านธรรมชาติและการจัดสรรทรัพยากรชุมชน",
      questions: [
        "5.1 ชุมชนมีระบบนิเวศที่สมดุลและการมีพื้นที่สีเขียวในชุมชนเพิ่มมากขึ้น",
        "5.2 คนในชุมชนได้รับการเรียนรู้ธรรมชาติ เพื่อการดำรงชีวิตอยู่ตลอดเวลา",
        "5.3 คนในชุมชนแสดงออกถึงการมีจิตสำนึกรักและห่วงแหนต่อธรรมชาติและสิ่งแวดล้อมในชุมชน",
        "5.4 คนในชุมชนมีความรัก ความผูกพันและภาคภูมิใจต่อชุมชนของตนเอง",
        "5.5 คนในชุมชนได้รับการปฏิบัติอย่างเท่าเทียมกันในด้านกฎระเบียบ และเครือข่ายของชุมชน",
      ],
    },
    {
      section: "6. ด้านการศึกษาและการจัดสวัสดิการชุมชน",
      questions: [
        "6.1 คนในชุมชนได้รับการศึกษาที่มีคุณภาพ สามารถนำมาประยุกต์ในการดำรงชีวิตประจำวันได้",
        "6.2 คนในชุมชนได้รับโอกาสในการเรียนรู้ และเข้าถึงแหล่งเรียนรู้ในชุมชนได้อย่างเท่าเทียมกัน",
        "6.3 ครัวเรือนในชุมชน นำเอาภูมิปัญญาท้องถิ่นมาพัฒนาต่อยอดและสร้างมูลค่าเพิ่มได้มากขึ้น",
        "6.4 ในชุมชนมีกองทุนสวัสดิการไว้ให้การช่วยเหลือ สนับสนุนผู้ด้อยโอกาส ตลอดจนช่วยเหลือเกี่ยวกับการเกิด การศึกษา การประกอบอาชีพและการเสียชีวิตของคนในชุมชนอย่างทั่วถึง",
        "6.5 ชุมชนมีกิจกรรมส่งเสริมคุณธรรม จริยธรรมให้แก่คนทุกเพศทุกวัยในชุมชนอย่างทั่วถึง",
      ],
    },
  ];

  const options = [
    { id: "O3_1", value: "5", label: "สุขมากที่สุด" },
    { id: "O3_2", value: "4", label: "สุขมาก" },
    { id: "O3_3", value: "3", label: "สุขปานกลาง" },
    { id: "O3_4", value: "2", label: "สุขน้อย" },
    { id: "O3_5", value: "1", label: "สุขน้อยที่สุด" },
  ];

  const [selected, setSelected] = useState("");
  const handleTotalChange = (e) => {
    setSelected(e.target.value);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    //await csrfToken();
    e.preventDefault();

    setFormData({
      ...formData,
      year: year,
      zipcode: address.zipcode,
      province: address.province,
      amphoe: address.amphoe,
      district: address.district,
    });
    try {
      //await getCSRFToken();
      const response = await axiosInstance.post('/gvhs', { ...formData, year: year });  // ส่งข้อมูลไปยัง API
      if (response.status === 201) {
        alert('เพิ่มข้อมูลสำเร็จ');
        openNotification(false);
        setFormData({  // รีเซ็ตฟอร์มหลังจากบันทึกข้อมูลสำเร็จ
          year: year,
          pp_project_code: '',
          gender: '',
          age: '',
          career: '',
          career_other: '',
          education: '',

          section_1_1: '',
          section_1_2: '',
          section_1_3: '',
          section_1_4: '',
          section_1_5: '',
          total_gvh: '',
        });
      }
      window.location.reload();
    } catch (error) {
      console.error('เกิดข้อผิดพลาด:', error);
      alert('เกิดข้อผิดพลาดในการเพิ่มข้อมูล');
    }
  };

  useEffect(() => {
    document.title = `แบบประเมินความสุขมวลรวม (GVH) ของครัวเรือน${phrase == 'before' ? 'ก่อน' : 'หลัง'}ที่เข้าร่วมโครงการ ${loading ? '...' : projects.id}`;
  }, [loading, projects]);

  useEffect(() => {
    getCSRFToken()
    fetch(`${API_BASE_URL}/projects/${year}/${uuid}` + '?method=minimize')
      //fetch('http://laravite.test/api/projects')
      .then((response) => response.json())
      .then((data) => {
        setProjects(data)
        //setYears(new Date(data.budget_year).getFullYear() + 543);

        setFormData({
          ...formData,
          pp_project_code: data.id,
          year: data.budget_year,
        });
        setLoading(false);

      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <>
      <div >
        {contextHolder}
        <div className="w-full px-4 lg:w-12/12 xl:w-12/12 font-[Sarabun]">
          <section className="p-0 sm:p-4">
            <div className="flex-col md:flex">
              <h2 className="text-sm tracking-wide text-center uppercase md:w-3/3 sm:text-lg">แบบประเมินความสุขมวลรวม (GVH) ของครัวเรือน{phrase == 'before' ? 'ก่อน' : 'หลัง'}ที่เข้าร่วมโครงการ {loading ? '...' : projects.id}</h2>
              <h3 className="mb-6 text-sm tracking-wide text-center uppercase md:w-3/3 sm:text-sm">ผลผลิตมหาวิทยาลัยราชภัฏเพื่อการพัฒนาท้องถิ่น ประจำปีงบประมาณ พ.ศ. {year} มหาวิทยาลัยราชภัฏเพชรบูรณ์</h3>
            </div>

            <div className='pb-6 sm:ml-4'>
              <div>โครงการ : {loading ? '...' : projects.name}</div>
            </div>

            {loading ? (
              <div class="min-h-screen bg-white">

                <div class=" mx-auto px-4 py-8">
                  <div class="animate-pulse space-y-4">
                    <div class="h-5 bg-gray-300 rounded w-2/12"></div>
                    <div class="h-4 bg-gray-300 rounded w-3/12"></div>
                    <div class="h-4 bg-gray-300 rounded w-4/12"></div>
                    <div class="h-4 bg-gray-300 rounded w-7/12"></div>
                    <div class="h-4 bg-gray-300 rounded w-7/12"></div>
                    <div class="h-4 bg-gray-300 rounded"></div>
                    <div class="h-4 bg-gray-300 rounded w-3/4"></div>
                  </div>

                  <div class="animate-pulse space-y-4 mt-12">
                    <div class="h-4 bg-gray-300 rounded w-2/3"></div>
                    <div class="h-4 bg-gray-300 rounded"></div>
                    <div class="h-4 bg-gray-300 rounded"></div>
                    <div class="h-4 bg-gray-300 rounded w-1/2"></div>
                    <div class="h-4 bg-gray-300 rounded"></div>
                    <div class="h-4 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </div>
            ) : (
              <form action="#" method="post" onSubmit={handleSubmit}>

                <div className="p-0 bg-white sm:p-6">
                  <h2 className="text-lg font-bold">ตอนที่ 1 ข้อมูลทั่วไปของผู้ตอบแบบสอบถาม</h2>
                  <p className="mt-2 text-sm">
                    คำชี้แจง: จงทำเครื่องหมาย <span className="font-bold">✓</span> ในช่องที่ตรงกับความเป็นจริงของท่านมากที่สุด
                  </p>

                  <div className="w-full mt-6 space-y-6">
                    <div className="mb-8 md:flex">
                      <label className="w-2/12 font-bold">1. เพศ</label>
                      <div class="items-center grid grid-cols-2 sm:grid-cols-3 gap-x-4 lg:w-6/12 md:w-10/12">
                        <label class="flex items-center">
                          <input type="radio" name="gender" value="male" onChange={handleChange} required class="mr-2 scale-150 cursor-pointer" /> 1. ชาย
                        </label>
                        <label class="flex items-center">
                          <input type="radio" name="gender" value="female" onChange={handleChange} required class="mr-2 scale-150 cursor-pointer" /> 2. หญิง
                        </label>
                      </div>
                    </div>


                    <div className="w-full mb-8 md:flex">
                      <label className="w-2/12 font-bold">2. อายุ</label>
                      <div className="grid items-center grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1 lg:w-6/12 md:w-10/12">
                        <label>
                          <input type="radio" name="age" value="<26" onChange={handleChange} required className="mr-2 scale-150 cursor-pointer" /> 1. ต่ำกว่า 26 ปี
                        </label>
                        <label>
                          <input type="radio" name="age" value="26-35" onChange={handleChange} required className="mr-2 scale-150 cursor-pointer" /> 2. 26 – 35 ปี
                        </label>
                        <label>
                          <input type="radio" name="age" value="36-45" onChange={handleChange} required className="mr-2 scale-150 cursor-pointer" /> 3. 36 – 45 ปี
                        </label>
                        <label>
                          <input type="radio" name="age" value="46-55" onChange={handleChange} required className="mr-2 scale-150 cursor-pointer" /> 4. 46 – 55 ปี
                        </label>
                        <label>
                          <input type="radio" name="age" value=">55" onChange={handleChange} required className="mr-2 scale-150 cursor-pointer" /> 5. สูงกว่า 55 ปี
                        </label>
                      </div>
                    </div>


                    <div className="w-full mb-8 md:flex">
                      <label className="w-2/12 font-bold">3. อาชีพ</label>
                      <div className="grid items-center grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-3 lg:w-6/12 md:w-10/12">
                        <label>
                          <input type="radio" name="career" value="farmer" onChange={handleChange} required className="mr-2 scale-150 cursor-pointer" /> 1. เกษตรกร
                        </label>
                        <label>
                          <input type="radio" name="career" value="government" onChange={handleChange} required className="mr-2 scale-150 cursor-pointer" /> 2. รับราชการ
                        </label>
                        <label>
                          <input type="radio" name="career" value="employee" onChange={handleChange} required className="mr-2 scale-150 cursor-pointer" /> 3. รับจ้าง
                        </label>
                        <label>
                          <input type="radio" name="career" value="business" onChange={handleChange} required className="mr-2 scale-150 cursor-pointer" /> 4. ประกอบการค้า/ค้าขาย
                        </label>
                        <label className="col-span-2 ">
                          <input type="radio" name="career" value="other" onChange={handleChange} required className="mr-2 scale-150 cursor-pointer" /> 5. อื่น ๆ
                          <input type="text" name="career_other" value={formData.career_other} onChange={handleChange} placeholder="โปรดระบุ" required disabled={formData.career !== 'other'}
                            className="h-8 px-3 py-1 ml-4 text-sm leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:ring-1 focus:ring-blue-200 focus:outline-none focus:border-blue-400"
                          />
                        </label>
                      </div>
                    </div>


                    <div className="mb-8 md:flex">
                      <label className="w-2/12 font-bold">4. ระดับการศึกษา</label>
                      <div className="grid grid-cols-2 gap-y-1 gap-x-4">
                        <label>
                          <input type="radio" name="education" value="primary" onChange={handleChange} required className="mr-2 scale-150 cursor-pointer" /> 1. ประถมศึกษา
                        </label>
                        <label>
                          <input type="radio" name="education" value="secondary" onChange={handleChange} required className="mr-2 scale-150 cursor-pointer" /> 2. มัธยมศึกษา
                        </label>
                        <label>
                          <input type="radio" name="education" value="vocational" onChange={handleChange} required className="mr-2 scale-150 cursor-pointer" /> 3. อาชีวศึกษา/อนุปริญญาหรือเทียบเท่า
                        </label>
                        <label>
                          <input type="radio" name="education" value="bachelor" onChange={handleChange} required className="mr-2 scale-150 cursor-pointer" /> 4. ปริญญาตรี
                        </label>
                        <label>
                          <input type="radio" name="education" value="higher" onChange={handleChange} required className="mr-2 scale-150 cursor-pointer" /> 5. สูงกว่าปริญญาตรี
                        </label>
                      </div>
                    </div>

                    <div className="mb-8 md:flex">
                      <label className="w-2/12 font-bold">5. พื้นที่ดำเนินการโครงการ</label>
                      <div className=" lg:w-6/12 md:w-10/12">
                        <div>
                          <label for="townshipName" className="block mb-2 text-sm font-normal text-gray-900">หมู่บ้าน</label>
                          <input type="text" name="townshipName" id="townshipName" placeholder="หมู่บ้าน" required onChange={handleChange}
                            className="w-full h-8 px-3 py-1 text-sm leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:ring-1 focus:ring-blue-200 focus:outline-none focus:border-blue-400" />
                        </div>
                        <div className='grid grid-cols-2 gap-x-4'>
                          <div>
                            <label className='text-sm'>ตำบล</label>
                            <InputThaiAddress.District
                              value={address["district"]}
                              onChange={handleAddressChange("district")}
                              onSelect={handleAddressSelect}
                              autoCompleteProps={{
                                placeholder: "ตำบล",
                              }}
                            />
                          </div>

                          <div>
                            <label className='text-sm'>อำเภอ</label>
                            <InputThaiAddress.Amphoe
                              value={address["amphoe"]}
                              onChange={handleAddressChange("amphoe")}
                              onSelect={handleAddressSelect}
                              autoCompleteProps={{
                                placeholder: "อำเภอ",
                              }}
                            />
                          </div>
                          <div>
                            <label className='text-sm'>จังหวัด</label>
                            <InputThaiAddress.Province
                              value={address["province"]}
                              onChange={handleAddressChange("province")}
                              onSelect={handleAddressSelect}
                              autoCompleteProps={{
                                placeholder: "จังหวัด",
                              }}
                            />
                          </div>
                          <div>
                            <label className='text-sm'>รหัสไปรษณีย์</label>
                            <InputThaiAddress.Zipcode
                              value={address["zipcode"]}
                              onChange={handleAddressChange("zipcode")}
                              onSelect={handleAddressSelect}
                              autoCompleteProps={{
                                placeholder: "รหัสไปรษณีย์",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mb-8 border border-b-0 border-t-1 border-x-0 border-cream-dark">
                  <div className="md:w-full">
                    <div class="p-6 bg-white">
                      <h2 class="text-lg font-bold">ตอนที่ 2 การประเมินความสุขมวลรวม (GVH) ของครัวเรือนที่เข้าร่วมโครงการ</h2>
                      <p class="mt-2 text-sm">
                        การประเมินความสุขมวลรวม (GVH) เป็นแบบสอบถามชนิดมาตรส่วนประมาณค่า (Rating Scale) 5 ระดับ ซึ่งมี 6 องค์ประกอบ 30 ตัวชี้วัด
                        ขอให้ท่านได้โปรดแสดงความคิดเห็นเกี่ยวกับค่าระดับของความสุขมวลรวมของท่าน โดยการทำเครื่องหมาย
                        <span class="font-bold">✓</span> ลงในช่องที่ตรงกับความคิดเห็นของท่าน ซึ่งแต่ละระดับมีความหมายดังนี้:
                      </p>
                      <ul class="mt-2 ml-8 list-none text-sm">
                        <li>5 หมายถึง ค่าความสุขมวลรวม (GVH) ของครัวเรือนที่เข้าร่วมโครงการ อยู่ในระดับดีมาก</li>
                        <li>4 หมายถึง ค่าความสุขมวลรวม (GVH) ของครัวเรือนที่เข้าร่วมโครงการ อยู่ในระดับดี</li>
                        <li>3 หมายถึง ค่าความสุขมวลรวม (GVH) ของครัวเรือนที่เข้าร่วมโครงการ อยู่ในระดับปานกลาง</li>
                        <li>2 หมายถึง ค่าความสุขมวลรวม (GVH) ของครัวเรือนที่เข้าร่วมโครงการ อยู่ในระดับน้อย</li>
                        <li>1 หมายถึง ค่าความสุขมวลรวม (GVH) ของครัวเรือนที่เข้าร่วมโครงการ อยู่ในระดับน้อยมาก</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-2 md:flex-1 mb:mt-0 md:px-3">
                    <div className="p-4 bg-gray-100 rounded-lg">
                      <table className="w-full border border-collapse border-gray-300">
                        <thead>
                          <tr className="bg-gray-300">
                            <th rowSpan="2" className="w-5/6 p-2 border border-gray-400">ตัวชี้วัดที่ทำให้เกิดความสุขมวลรวม (GVH) ของครัวเรือนที่เข้าร่วมโครงการ</th>
                            <th colSpan="5" className="p-2 border border-gray-400">ค่าระดับการปฏิบัติ</th>
                          </tr>
                          <tr className="bg-gray-200">
                            <th className="p-2 border border-gray-400">5</th>
                            <th className="p-2 border border-gray-400">4</th>
                            <th className="p-2 border border-gray-400">3</th>
                            <th className="p-2 border border-gray-400">2</th>
                            <th className="p-2 border border-gray-400">1</th>
                          </tr>
                        </thead>
                        <tbody>
                          {formInitData.map((section, index) => (
                            <React.Fragment key={index}>
                              <tr className="bg-gray-300">
                                <td className="p-2 font-bold border border-gray-300" colSpan="6">
                                  {section.section}
                                </td>
                              </tr>
                              {section.questions.map((question, qIndex) => (
                                <tr key={qIndex}>
                                  <td className="p-2 border border-gray-300">{question}</td>
                                  {[5, 4, 3, 2, 1].map((value) => (
                                    <td key={value} className="text-center border border-gray-300">
                                      <input
                                        type="radio"
                                        name={`section_${index + 1}_${qIndex + 1}`}
                                        value={value}
                                        onChange={handleChange}
                                        className="p-2 scale-150 cursor-pointer"
                                        required
                                      />
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mb-8 border border-b-0 border-t-1 border-x-0 border-cream-dark">
                  <div className="md:w-full">
                    <legend className="pb-2 text-lg font-bold tracking-wide "><span className='underline'>ตอนที่ 3</span>  การประเมินความสุขมวลรวมของท่านและชุมชนของท่าน</legend>
                    <p className='pb-2 text-xs text-gray-600 indent-6'>
                      เมื่อพิจารณาจากตัวชี้วัดที่ทำให้เกิด<span className='font-semibold underline'>ความสุขมวลรวม (GVH)</span> ของครัวเรือนที่เข้าร่วมโครงการ ดังกล่าวข้างต้นแล้ว ท่านคิดว่า
                      <span className='font-semibold underline'>ตัวท่าน</span>มีความสุขโดยรวมอยู่ใน<span className='font-semibold underline'>ระดับใด</span>
                    </p>
                  </div>

                  <div className="mt-2 md:flex-1 mb:mt-0 md:px-3">

                    <div className="mb-4 md:flex">
                      <div className="md:flex-1 md:pr-3">
                        <label className="block text-xs font-bold tracking-wide uppercase text-charcoal-darker">ความสุขมวลรวม (GVH) ของครัวเรือนที่เข้าร่วมโครงการ</label>
                        <div className="flex w-full">
                          <div className="grid w-full grid-cols-5 gap-2 p-2 bg-gray-200 rounded-xl">
                            {options.map((option) => (
                              <div key={option.id} className='text-center transition-all duration-300 rounded-lg hover:bg-gray-300'>
                                <input
                                  type="radio"
                                  name="total_gvh"
                                  id={option.id}
                                  value={option.value}
                                  className="p-2 scale-150 cursor-pointer peer"
                                  checked={formData.total_gvh === option.value}
                                  //onChange={handleTotalChange}
                                  onChange={handleChange}
                                  required
                                />
                                <label
                                  htmlFor={option.id}
                                  className="block p-2 text-center transition-all duration-300 cursor-pointer select-none rounded-xl peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
                                >
                                  <span
                                    className={`inline-block transform transition-all duration-300 ${selected === option.value ? "scale-110 opacity-100" : "opacity-90"
                                      }`}
                                  >
                                    {option.label}
                                  </span>
                                </label>

                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="items-center justify-center mb-6 border border-b-0 md:flex border-t-1 border-x-0 border-cream-dark">
                  <div className="items-center justify-center px-3 text-center">
                    <input type="hidden" name="sponsor" value="0" />
                    <input className="px-4 py-2 font-bold text-white bg-blue-500 border border-blue-700 rounded cursor-pointer hover:bg-blue-700 hover:bg-brick-dark" type="submit" value="ส่งแบบสำรวจ" />
                  </div>
                </div>
              </form>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default GVHForm;
