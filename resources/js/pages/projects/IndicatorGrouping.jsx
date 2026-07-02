import React, { useEffect, useState } from 'react';
import { partial_ratio } from 'fuzzball';
import stringSimilarity from 'string-similarity';

// Predefined Groups
const predefinedGroups = [
    { group: 0, keywords: ["จำนวนหมู่บ้าน/ชุมชน ที่ได้รับการพัฒนาสามารถแก้ไขปัญหาท้องถิ่น"] },
    { group: 1, keywords: ["จำนวนคนที่เข้าร่วมโครงการ"] },
    { group: 2, keywords: ["ครัวเรือนที่เข้าร่วมโครงการยุทธศาสตร์ร่วมกับมหาวิทยาลัยมีรายได้เพิ่มขึ้น","จำนวนครัวเรือนที่ยกระดับเศรษฐกิจ"] },
    { group: 3, keywords: ["ครัวเรือนที่เข้าร่วมโครงการยุทธศาสตร์มหาวิทยาลัยราชภัฏเพื่อการพัฒนาท้องถิ่น ได้รับการยกระดับให้พ้นเส้นความยากจน"] },
    { group: 4, keywords: ["รายได้ในชุมชนเป้าหมายเพิ่มขึ้นอย่างน้อย"] },
    { group: 5, keywords: ["ร้อยละของประชาชนที่เข้าร่วมโครงการมีความสุขมวลรวม GVH เพิ่มขึ้น","ประชาชนมีความสุขมวลรวม GVH เพิ่มขึ้น","จำนวนหมู่บ้าน/ชุมชน มี GVH เพิ่มขึ้นจากเดิม","ครัวเรือนที่มี GVH เพิ่มขึ้น"] },
    { group: 6, keywords: ["รายงาการประเมินผลกระทบทางสังคมจากการลงทุน (SROI)"] },

    { group: 7, keywords: ["ผลิตภัณฑ์ที่เป็นผลจากการพัฒนาตามโครงการพันธกิจสัมพันธ์สามารถแก้ไขปัญหาให้กับท้องถิ่น"] },
    { group: 8, keywords: ["จำนวนช่องทางการตลาด"] },
    { group: 9, keywords: ["ร้อยละของผู้ประกอบการมีรายได้เพิ่มขึ้น"] },

    { group: 10, keywords: ["ชุมชนในพื้นที่บริการของมหาวิทยาลัยที่ได้รับการพัฒนา หรือแก้ไขปัญหาด้วยกระบวนการวิศวกรสังคม"] },
    { group: 11, keywords: ["จำนวนนวัตกรรมชุมชนที่สามารถนำไปใช้ประโยชน์หรือสร้างผลกระทบที่ชัดเจนต่อชุมชน"] },
    { group: 12, keywords: ["จำนวนนักศึกษาที่ได้รับการพัฒนา Soft Skill วิศวกรสังคม"] },
    { group: 13, keywords: ["จำนวนนวัตกรรมชุมชนที่นำไปใช้ประโยชน์"] },
    { group: 14, keywords: ["ร้อยละของนักศึกษาที่เข้าร่วมกระบวนการ"] },

    { group: 15, keywords: ["ชุมชนต้นแบบด้านสิ่งแวดล้อม"] },
    { group: 16, keywords: ["จำนวนนวัตกรรมหรืองานวิจัยการใช้ประโยชน์จากพืช/สัตว์หรือวัฒนธรรมเพื่อเศรษฐกิจ"] },
    { group: 17, keywords: ["ศูนย์การเรียนรู้ต้นแบบที่ได้รับการยกระดับ"] },
    { group: 18, keywords: ["จำนวนศูนย์เรียนรู้"] },
    { group: 19, keywords: ["จำนวนองค์ความรู้หรือนวัตกรรม", "จำนวนนวัตกรรมยกระดับเศรษฐกิจ"] },
    { group: 20, keywords: ["จำนวนประชาชนที่เข้าร่วมถ่ายทอดองค์ความรู้สู่การพัฒนาการบริหารจัดการทรัพยากรชุมชน"] },

    { group: 21, keywords: ["นวัตกรรมทางการศึกษาที่เน้น learning outcome ของผู้เรียน และมีการวัดผลกระทบ (impact) การประเมินวัดผลผู้เรียนในโรงเรียน"] },
    { group: 22, keywords: ["โรงเรียนขนาดเล็กในเขตพื้นที่บริการที่เข้าร่วมการยกระดับคุณภาพการศึกษา"] },
    { group: 23, keywords: ["จำนวนผู้บริหาร ในเขตพื้นที่บริการ ร่วมโครงการพัฒนาการเป็นนวัตกรทางการศึกษาตามรูปแบบฐานสมรรถนะ PTRU Model"] },

    { group: 24, keywords: ["นวัตกรทางการศึกษาที่ได้รับการพัฒนา"] },

    { group: 25, keywords: ["ประชาชนที่ได้รับการพัฒนาสมรรถนะภาษาอังกฤษเพื่อยกระดับชุมชนสู่สากล"] },
    { group: 26, keywords: ["ร้อยละของนักศึกษาชั้นปีสุดท้ายผ่านเกณฑ์การวัดผลภาษาอังกฤษตามมาตรฐาน CEFR (B1)"] },
    { group: 27, keywords: ["จำนวนผู้ที่เข้าร่วมกิจกรรมส่งเสริมการเรียนรู้ตลอดชีวิตด้านการพัฒนาศักยภาพด้านภาษาอังกฤษ"] },

    { group: 28, keywords: ["ชุมชนต้นแบบดิจิทัลที่ได้รับการพัฒนาทักษะความรู้ด้านเทคโนโลยีดิจิทัล"] },

    { group: 29, keywords: ["จำนวนผู้ที่เข้าร่วมกิจกรรมส่งเสริมการเรียนรู้ตลอดชีวิตด้านการพัฒนาทักษะดิจิทัล"] },
    { group: 30, keywords: ["จำนวนประชาชนในพื้นที่ชุมชนเป้าหมายสามารถนำทักษะความรู้ด้านเทคโนโลยีดิจิทัลเพื่อใช้ประโยชน์ในการพัฒนาคุณภาพชีวิตด้านเศรษฐกิจ สังคม และสิ่งแวดล้อมให้ดีขึ้น"] },

    { group: 31, keywords: ["ชุมชนที่ได้รับการพัฒนา Soft Power"] },
    { group: 32, keywords: ["จำนวนองค์ความรู้อัตลักษณ์ศิลปวัฒนธรรมท้องถิ่น"] },
    { group: 33, keywords: ["จำนวนประชาชนที่เข้าร่วมถ่ายทอดองค์ความรู้สู่การเสริมสร้างศักยภาพชุมชน Soft Power บนฐานอัตลักษณ์ศิลปวัฒนธรรมท้องถิ่น"] },
    { group: 34, keywords: ["จำนวนประชาชน นักศึกษา บุคลากรที่เข้าร่วมโครงการมีองค์ความรู้ในการนำ Soft Power ไปต่อยอดในการสร้างรายได้"] },
    { group: 35, keywords: ["ต้นแบบโมเดลธุรกิจที่ได้รับการต่อยอดจาก Soft Power การพัฒนามีรายได้เพิ่มขึ้น"] },

];

// Preprocess text
function preprocess(text) {
    return text.toLowerCase().trim();
}

// Hybrid Matching
function mapIndicatorToGroup(indicator) {
    const processedIndicator = preprocess(indicator);

    const scores = predefinedGroups.map(({ group, keywords }) => {
        const maxScore = Math.max(...keywords.map(keyword =>
            stringSimilarity.compareTwoStrings(processedIndicator, preprocess(keyword))
        ));
        return { group, score: maxScore };
    });
    /*const scores = predefinedGroups.map(({ group, keywords }) => {
        const maxScore = Math.max(...keywords.map(keyword =>
            partial_ratio(processedIndicator, preprocess(keyword)) / 100  // แปลงคะแนนให้เป็น 0-1
        ));
        return { group, score: maxScore };
    });*/

    console.log('Scores:', scores);

    const bestMatch = scores.reduce((a, b) => (a.score > b.score ? a : b));
    return bestMatch.score > 0.6 ? bestMatch.group : null;  // threshold 0.6 ปรับตามเหมาะสม
}

function IndicatorGrouping({ indicators }) {
    const [groups, setGroups] = useState({});

    // เมื่อจัดกลุ่ม
    const handleGrouping = () => {
        const newGroups = {};

        indicators.forEach(indicator => {
            const group = mapIndicatorToGroup(indicator);

            if (group !== null) {
                newGroups[indicator] = group;
            } else {
                // ถ้าจับคู่ไม่ได้ - Human-in-the-loop
                /*const userSelectedGroup = prompt(`กรุณาเลือกกลุ่มสำหรับ: "${indicator}" (0-7)`);
                if (userSelectedGroup !== null) {
                    newGroups[indicator] = parseInt(userSelectedGroup, 10);
                }*/
                newGroups[indicator] = parseInt(99);
            }
        });

        setGroups(newGroups);
    };

    useEffect(() => {
        handleGrouping();
    }, []);

    return Object.entries(groups);

    return (
        <>
        {/*<div className="p-4">
            <h2 className="mb-2 text-lg font-bold">Indicator Grouping</h2>
            <button
                onClick={handleGrouping}
                className="px-4 py-2 text-white bg-blue-500 rounded"
            >
                จัดกลุ่มตัวชี้วัด
            </button>
            <div className="mt-4">
                {Object.entries(groups).map(([indicator, group]) => (
                    <div key={indicator} className="p-2 border-b">
                        <strong>{indicator}</strong> ➡️ กลุ่มที่ {group}
                    </div>
                ))}
            </div>
        </div>*/}
            <div className="mt-4">
                {Object.entries(groups).map(([indicator, group]) => (
                    <div key={indicator} className="p-2 border-b">
                        <strong>{indicator}</strong> ➡️ กลุ่มที่ {group}
                    </div>
                ))}
            </div>
        </>
    );
}

export default IndicatorGrouping;
