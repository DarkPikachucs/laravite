import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Navbar from "../components/Navbars/AuthNavbar";
import Footer from "../components/Footers/Footer";

import teamImage from '../assets/img/team-2-800x800.jpg';

export default function StrategicUser() {
  const [data, setData] = useState({ projects: [] });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const users = [
      {
        "id": "9d83e135-3137-4d5e-b918-04f32101cdcf",
        "idcard": "3101000501748",
        "code": "131005",
        "name": "รองศาสตราจารย์ ดร.สรวงพร กุศลส่ง",
        "position": "รองคณบดี/รองผู้อำนวยการ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:37:26.000000Z",
        "updated_at": "2024-11-17T19:37:26.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e135-3137-4d5e-b918-04f32101cdcf",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e135-2584-4ef1-98c2-945db79f6edf",
        "idcard": "3650101043219",
        "code": "132002",
        "name": "นางภาวนา จันทรสมบัติ",
        "position": "หัวหน้าสำนักงานคณบดี",
        "contact": "0819530793",
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "bGZOzV",
        "created_at": "2024-11-17T19:37:26.000000Z",
        "updated_at": "2024-12-16T08:35:45.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e135-2584-4ef1-98c2-945db79f6edf",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1a9-60b4-40a3-bf35-3281fb6d49e9",
        "idcard": "3670100096084",
        "code": "133001",
        "name": "นางสาวศิรดา แสงนก",
        "position": "ผู้อำนวยการกองหรือเทียบเท่า",
        "contact": "0877861909",
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": "7604895758",
        "telegram_link_code": "5hhQWA",
        "created_at": "2024-11-17T19:38:42.000000Z",
        "updated_at": "2025-01-03T02:37:34.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1a9-60b4-40a3-bf35-3281fb6d49e9",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1a9-6b40-4eb1-8873-b1a9c08b4c64",
        "idcard": "3530100585787",
        "code": "133005",
        "name": "นางสาวระพีพร ระวิโรจน์",
        "position": "หัวหน้าสำนักงานคณบดี",
        "contact": "056721166",
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "Q5FdlS",
        "created_at": "2024-11-17T19:38:42.000000Z",
        "updated_at": "2025-01-06T05:05:53.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1a9-6b40-4eb1-8873-b1a9c08b4c64",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1a9-6f7e-487c-8158-5b7a38c12e29",
        "idcard": "3679900033077",
        "code": "134002",
        "name": "นางวาสนา สุขประเสริฐ",
        "position": "หัวหน้าสำนักงานคณบดี",
        "contact": "8505",
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": "7992387953",
        "telegram_link_code": "3Pjem2",
        "created_at": "2024-11-17T19:38:42.000000Z",
        "updated_at": "2025-03-10T08:27:47.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1a9-6f7e-487c-8158-5b7a38c12e29",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1a9-73e5-485b-aeb7-87b588d92c12",
        "idcard": "3720900448260",
        "code": "134003",
        "name": "นางสาวหนึ่งฤทัย บุญมี",
        "position": "หัวหน้าสำนักงานผู้อำนวยการ",
        "contact": "0846206532",
        "email": null,
        "email_verified_at": null,
        "section_id": "108",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "OF9YVN",
        "created_at": "2024-11-17T19:38:42.000000Z",
        "updated_at": "2025-01-29T04:01:21.000000Z",
        "deleted_at": null,
        "section": {
          "id": "108",
          "name": "สำนักวิทยบริการและเทคโนโลยีสารสนเทศ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1a9-73e5-485b-aeb7-87b588d92c12",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1a9-78b8-4985-8ac9-2f5235d9c898",
        "idcard": "3670300418557",
        "code": "134005",
        "name": "นางใกล้รุ่ง เกตะวันดี",
        "position": "ผู้อำนวยการสำนักงานอธิการบดี",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "5JLtO1",
        "created_at": "2024-11-17T19:38:42.000000Z",
        "updated_at": "2024-12-20T07:41:35.000000Z",
        "deleted_at": null,
        "section": {
          "id": "101",
          "name": "สำนักงานอธิการบดี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1a9-78b8-4985-8ac9-2f5235d9c898",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1a9-7ddb-42de-bd4b-5c8cb5f13a51",
        "idcard": "3679900094980",
        "code": "135001",
        "name": "รองศาสตราจารย์ ดร.ธีระภัทรา เอกผาชัยสวัสดิ์",
        "position": "รองศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:42.000000Z",
        "updated_at": "2024-11-17T19:38:42.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1a9-7ddb-42de-bd4b-5c8cb5f13a51",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1a9-83b1-4a6e-a7d6-def54d5842a5",
        "idcard": "3670400275405",
        "code": "135002",
        "name": "อาจารย์มานะ อินพรมมี",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:42.000000Z",
        "updated_at": "2024-11-17T19:38:42.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1a9-83b1-4a6e-a7d6-def54d5842a5",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1a9-89dd-4754-ac14-cc2b4df75ee4",
        "idcard": "3650400622377",
        "code": "137002",
        "name": "อาจารย์ไพโรจน์ พรเจริญ",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:42.000000Z",
        "updated_at": "2024-11-17T19:38:42.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1a9-89dd-4754-ac14-cc2b4df75ee4",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1a9-8fd3-456f-8ed8-5f4b68754aa3",
        "idcard": "3100600705718",
        "code": "137003",
        "name": "ผู้ช่วยศาสตราจารย์ทัสนันทน์ ตรีนันทรัตน์",
        "position": "รองคณบดี/รองผู้อำนวยการ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "l49knI",
        "created_at": "2024-11-17T19:38:42.000000Z",
        "updated_at": "2024-12-06T04:21:35.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1a9-8fd3-456f-8ed8-5f4b68754aa3",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1a9-95f9-4b5b-b92c-e4e0cfe15ee8",
        "idcard": "3679900112139",
        "code": "137008",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.ปวีณา โทนแก้ว",
        "position": "รองคณบดี/รองผู้อำนวยการ",
        "contact": "0897058811",
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": "7836786521",
        "telegram_link_code": "HLM1RQ",
        "created_at": "2024-11-17T19:38:42.000000Z",
        "updated_at": "2025-03-12T03:01:14.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1a9-95f9-4b5b-b92c-e4e0cfe15ee8",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1a9-9c1a-43b0-9ad1-06820b9b10cd",
        "idcard": "3600400023015",
        "code": "138002",
        "name": "นางสาวถนิม สกุลมา",
        "position": "ผู้อำนวยการกองหรือเทียบเท่า",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "6ngsrx",
        "created_at": "2024-11-17T19:38:42.000000Z",
        "updated_at": "2025-03-12T09:25:53.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1a9-9c1a-43b0-9ad1-06820b9b10cd",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1a9-a26f-47b8-98b9-955ee26c426d",
        "idcard": "3659900637380",
        "code": "139005",
        "name": "อาจารย์ ดร.ณัฐแก้ว ข้องรอด",
        "position": "รองคณบดีฝ่ายวิชาการและการประกันคุณภาพการศึกษา",
        "contact": "0894611924",
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "jsPFcx",
        "created_at": "2024-11-17T19:38:42.000000Z",
        "updated_at": "2025-01-13T06:43:41.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1a9-a26f-47b8-98b9-955ee26c426d",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1a9-a876-486a-9450-7455fcab4dea",
        "idcard": "3679900113704",
        "code": "140001",
        "name": "นางสาวชัชชญา อัตตะชีวะ",
        "position": "หัวหน้าสำนักงานคณบดี",
        "contact": "0829926989",
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": "7640764934",
        "telegram_link_code": "zB3PLg",
        "created_at": "2024-11-17T19:38:42.000000Z",
        "updated_at": "2025-02-24T03:07:53.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1a9-a876-486a-9450-7455fcab4dea",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          },
          {
            "uuid": "9de1769b-14df-43c3-818f-4c7056472c6e",
            "name": "admin_org",
            "description": "ผู้ดูแลหน่วยงาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1a9-a876-486a-9450-7455fcab4dea",
              "role_id": "9de1769b-14df-43c3-818f-4c7056472c6e"
            }
          }
        ]
      },
      {
        "id": "9d83e1a9-aea1-4d39-89d6-b1d6f47ba6ad",
        "idcard": "3160600762100",
        "code": "140002",
        "name": "อาจารย์พริมาดา บัวหลวง",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "yypIV1",
        "created_at": "2024-11-17T19:38:42.000000Z",
        "updated_at": "2025-03-07T02:49:13.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1a9-aea1-4d39-89d6-b1d6f47ba6ad",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1a9-b4a5-4e23-bfab-b0e3ed29ddda",
        "idcard": "3670200812709",
        "code": "140007",
        "name": "อาจารย์สุนทรีย์ รอดดิษฐ์",
        "position": "อาจารย์",
        "contact": "0824041220",
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "isu9m2",
        "created_at": "2024-11-17T19:38:42.000000Z",
        "updated_at": "2025-02-06T03:34:41.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1a9-b4a5-4e23-bfab-b0e3ed29ddda",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1a9-ba87-443b-bc19-c0693f71135d",
        "idcard": "3609700224782",
        "code": "140009",
        "name": "อาจารย์อัคกะบัทคาน ปาทาน",
        "position": "รองคณบดี/รองผู้อำนวยการ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:42.000000Z",
        "updated_at": "2024-11-17T19:38:42.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1a9-ba87-443b-bc19-c0693f71135d",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1a9-c0ce-4384-a0d4-89213a111663",
        "idcard": "3740100927538",
        "code": "140010",
        "name": "รองศาสตราจารย์ ดร.พณณา ตั้งวรรณวิทย์",
        "position": "รองศาสตราจารย์",
        "contact": "0653294514",
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "VaJ8VO",
        "created_at": "2024-11-17T19:38:42.000000Z",
        "updated_at": "2025-01-24T09:22:11.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1a9-c0ce-4384-a0d4-89213a111663",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1a9-c733-4a96-99eb-abcd7cb343fa",
        "idcard": "3670101603532",
        "code": "140011",
        "name": "รองศาสตราจารย์ ดร.พวงผกา แก้วกรม",
        "position": "รองศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:42.000000Z",
        "updated_at": "2024-11-17T19:38:42.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1a9-c733-4a96-99eb-abcd7cb343fa",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1a9-cd85-46ed-a216-d77f51deed6c",
        "idcard": "3670500574501",
        "code": "140013",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.อัญชนา ศรีเรืองฤทธิ์",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:42.000000Z",
        "updated_at": "2024-11-17T19:38:42.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1a9-cd85-46ed-a216-d77f51deed6c",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1a9-d3bf-4d90-b489-4c190eb37e3f",
        "idcard": "3519900034996",
        "code": "140014",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.เดือนฉาย ไชยบุตร",
        "position": "รองอธิบดีฝ่ายวิชาการและเทคโนโลยีสารสนเทศ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": "7358738606",
        "telegram_link_code": "p9zfIP",
        "created_at": "2024-11-17T19:38:42.000000Z",
        "updated_at": "2025-01-27T03:03:32.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1a9-d3bf-4d90-b489-4c190eb37e3f",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1a9-da25-4894-8f4f-17552f63dca3",
        "idcard": "3679900048694",
        "code": "140015",
        "name": "อาจารย์ปิยพงศ์ บางใบ",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": "8126952744",
        "telegram_link_code": "aELI6j",
        "created_at": "2024-11-17T19:38:42.000000Z",
        "updated_at": "2025-01-22T07:03:01.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1a9-da25-4894-8f4f-17552f63dca3",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1a9-e08b-4ee6-b2c9-8be52e1601b7",
        "idcard": "3100600705734",
        "code": "140016",
        "name": "ผู้ช่วยศาสตราจารย์ฐิณาภัณฑ์ นิธิยุวิทย์",
        "position": "รองคณบดี/รองผู้อำนวยการ",
        "contact": "0818277944",
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "FvR3xm",
        "created_at": "2024-11-17T19:38:42.000000Z",
        "updated_at": "2025-03-05T03:49:47.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1a9-e08b-4ee6-b2c9-8be52e1601b7",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1a9-e6e6-4c43-9d73-06d6b830109c",
        "idcard": "3300101063557",
        "code": "141001",
        "name": "อาจารย์สุชิรา นวลกำแหง",
        "position": "อาจารย์",
        "contact": "0910311168",
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "S67Nzf",
        "created_at": "2024-11-17T19:38:42.000000Z",
        "updated_at": "2025-02-06T06:42:08.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1a9-e6e6-4c43-9d73-06d6b830109c",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1a9-ed44-45cb-8067-a2f2fc3d7e7c",
        "idcard": "3309800094476",
        "code": "141004",
        "name": "อาจารย์พิพัฒน์ ชนาเทพาพร",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": "8121688440",
        "telegram_link_code": "DjPm0e",
        "created_at": "2024-11-17T19:38:42.000000Z",
        "updated_at": "2025-01-29T03:54:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1a9-ed44-45cb-8067-a2f2fc3d7e7c",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1a9-f348-4dcc-97c9-4d4f1bb8b388",
        "idcard": "3950100563950",
        "code": "141008",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.เสาวภา ชูมณี",
        "position": "รองคณบดีฝ่ายศูนย์วิทยาศาสตร์",
        "contact": "0882723349",
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": "7726288657",
        "telegram_link_code": "5slu2f",
        "created_at": "2024-11-17T19:38:42.000000Z",
        "updated_at": "2025-01-10T23:17:40.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1a9-f348-4dcc-97c9-4d4f1bb8b388",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1a9-f9cd-4aa2-bf1e-40b107b3b8a9",
        "idcard": "3679900094955",
        "code": "141010",
        "name": "อาจารย์จิตรนันท์ ศรีเจริญ",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:42.000000Z",
        "updated_at": "2024-11-17T19:38:42.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1a9-f9cd-4aa2-bf1e-40b107b3b8a9",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1aa-002f-46d2-82e0-a6382f48e26f",
        "idcard": "3670300329112",
        "code": "141011",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.สำราญ ท้าวเงิน",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:42.000000Z",
        "updated_at": "2024-11-17T19:38:42.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1aa-002f-46d2-82e0-a6382f48e26f",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1aa-0689-413b-825d-347fef32e170",
        "idcard": "3410401059899",
        "code": "141013",
        "name": "รองศาสตราจารย์ ดร.ชัยณรงค์ ขันผนึก",
        "position": "รองศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:42.000000Z",
        "updated_at": "2024-11-17T19:38:42.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1aa-0689-413b-825d-347fef32e170",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1aa-0ce0-4579-a9ca-cadb608d5970",
        "idcard": "3500700029320",
        "code": "141014",
        "name": "รองศาสตราจารย์ทิวาพร ขันผนึก",
        "position": "รองคณบดี/รองผู้อำนวยการ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:42.000000Z",
        "updated_at": "2024-11-17T19:38:42.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1aa-0ce0-4579-a9ca-cadb608d5970",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1aa-1343-45b8-8664-13fd26a04288",
        "idcard": "3730100697915",
        "code": "141015",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.กอบกาญจน์ วิเศษรัมย์",
        "position": "ผู้ช่วยอธิการบดีฝ่ายบัณฑิตศึกษา",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:42.000000Z",
        "updated_at": "2024-11-17T19:38:42.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1aa-1343-45b8-8664-13fd26a04288",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1aa-199a-45dd-8e94-f4ce3f266051",
        "idcard": "3501300387530",
        "code": "143001",
        "name": "รองศาสตราจารย์ ดร.ปิยรัตน์ มูลศรี",
        "position": "คณบดี",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:42.000000Z",
        "updated_at": "2024-11-17T19:38:42.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1aa-199a-45dd-8e94-f4ce3f266051",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1aa-1ffa-4abf-be05-23f5c8f15bf1",
        "idcard": "3670700341209",
        "code": "143002",
        "name": "ผู้ช่วยศาสตราจารย์จันทร์พิมพ์ มีเปี่ยม",
        "position": "ผู้อำนวยการกองหรือเทียบเท่า",
        "contact": "0854239903",
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "vdVNiH",
        "created_at": "2024-11-17T19:38:42.000000Z",
        "updated_at": "2024-12-18T07:32:11.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1aa-1ffa-4abf-be05-23f5c8f15bf1",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1aa-264f-42d7-b1e5-e58a6c63d9d2",
        "idcard": "3500300043953",
        "code": "143004",
        "name": "อาจารย์ ดร.ประยูร ไชยบุตร",
        "position": "ผู้อำนวยการกองหรือเทียบเท่า",
        "contact": "0821922536",
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "JrpK7N",
        "created_at": "2024-11-17T19:38:43.000000Z",
        "updated_at": "2025-01-29T07:27:13.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1aa-264f-42d7-b1e5-e58a6c63d9d2",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1aa-2ca7-4fa3-a0fd-297114f72754",
        "idcard": "3679900031384",
        "code": "144002",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.ตรีนุช เอลลิส",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:43.000000Z",
        "updated_at": "2024-11-17T19:38:43.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1aa-2ca7-4fa3-a0fd-297114f72754",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1aa-32bb-4811-969a-080e6aa1899d",
        "idcard": "3670100792404",
        "code": "145001",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.แขก บุญมาทัน",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:43.000000Z",
        "updated_at": "2024-11-17T19:38:43.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1aa-32bb-4811-969a-080e6aa1899d",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1aa-390d-4db6-b8eb-ea6ec981724e",
        "idcard": "3420500383058",
        "code": "146002",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.กฤษติญา มูลศรี",
        "position": "รองคณบดี/รองผู้อำนวยการ",
        "contact": "0826695094",
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "GVOAIU",
        "created_at": "2024-11-17T19:38:43.000000Z",
        "updated_at": "2025-02-10T04:27:29.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1aa-390d-4db6-b8eb-ea6ec981724e",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1aa-3f09-4806-bf79-91c8ef2a752e",
        "idcard": "3310700815734",
        "code": "147002",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.นงลักษณ์ อานี",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:43.000000Z",
        "updated_at": "2024-11-17T19:38:43.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1aa-3f09-4806-bf79-91c8ef2a752e",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1aa-452c-4655-a026-82262397a6b2",
        "idcard": "3660800385101",
        "code": "147003",
        "name": "อาจารย์ ดร.พรรณภรณ์ ขันธพัทธ์",
        "position": "รองคณบดี",
        "contact": "0951616153",
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "Fvd1sI",
        "created_at": "2024-11-17T19:38:43.000000Z",
        "updated_at": "2024-12-25T04:13:38.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1aa-452c-4655-a026-82262397a6b2",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1aa-4b25-4780-adbe-467392f02c0a",
        "idcard": "3401200325444",
        "code": "147004",
        "name": "อาจารย์ ดร.นิคม โยกัญญา",
        "position": "รองอธิการบดี",
        "contact": "0990541313",
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "fgwPHo",
        "created_at": "2024-11-17T19:38:43.000000Z",
        "updated_at": "2025-01-08T08:43:20.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1aa-4b25-4780-adbe-467392f02c0a",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1aa-5168-4484-8ee5-fa2d82e4e06d",
        "idcard": "3679900117921",
        "code": "147005",
        "name": "ผู้ช่วยศาสตราจารย์วิทยา หนูช่างสิงห์",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "hGv4kt",
        "created_at": "2024-11-17T19:38:43.000000Z",
        "updated_at": "2025-01-22T06:44:18.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1aa-5168-4484-8ee5-fa2d82e4e06d",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1aa-57d8-4012-9545-2c4da947d701",
        "idcard": "3670101056388",
        "code": "147007",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.ธิดารักษ์ ลือชา",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:43.000000Z",
        "updated_at": "2024-11-17T19:38:43.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1aa-57d8-4012-9545-2c4da947d701",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1aa-5e4c-469a-b180-75fcbea684d2",
        "idcard": "3670500057400",
        "code": "148002",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.สุเทพ ธรรมะตระกูล",
        "position": "รองคณบดี/รองผู้อำนวยการ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:43.000000Z",
        "updated_at": "2024-11-17T19:38:43.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1aa-5e4c-469a-b180-75fcbea684d2",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1aa-6484-49fe-8b70-8ec1eabfa567",
        "idcard": "3160101304351",
        "code": "148003",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.สมใจ กงเติม",
        "position": "รองผู้อำนวยการฝ่ายวิชาการ",
        "contact": "0819535130",
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "AvN9z8",
        "created_at": "2024-11-17T19:38:43.000000Z",
        "updated_at": "2025-01-02T09:31:24.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1aa-6484-49fe-8b70-8ec1eabfa567",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1aa-6a8b-43bd-bcd3-5976535152c1",
        "idcard": "3160100362480",
        "code": "148004",
        "name": "ผู้ช่วยศาสตราจารย์อิศราพร ชัยงาม",
        "position": "รองคณบดี/รองผู้อำนวยการ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:43.000000Z",
        "updated_at": "2024-11-17T19:38:43.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1aa-6a8b-43bd-bcd3-5976535152c1",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1aa-70a2-47e8-8b16-8b45646a3aa9",
        "idcard": "3670101625773",
        "code": "148006",
        "name": "อาจารย์สุภาพร บางใบ",
        "position": "ผู้อำนวยการกองหรือเทียบเท่า",
        "contact": "0659259422",
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "x1tjZf",
        "created_at": "2024-11-17T19:38:43.000000Z",
        "updated_at": "2025-01-07T07:29:02.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1aa-70a2-47e8-8b16-8b45646a3aa9",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1aa-7696-4ea3-b6e5-ffe10a6354ea",
        "idcard": "3670700517102",
        "code": "150005",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.อาภาภรณ์ วรรณา",
        "position": "รองคณบดี/รองผู้อำนวยการ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:43.000000Z",
        "updated_at": "2024-11-17T19:38:43.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1aa-7696-4ea3-b6e5-ffe10a6354ea",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1aa-7cc5-4364-ae4f-3caf6bbd713a",
        "idcard": "3120200052202",
        "code": "152001",
        "name": "นางสาวจิรภา คชหิรัญ",
        "position": "หัวหน้างาน",
        "contact": "0894532441",
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "Wk2fQx",
        "created_at": "2024-11-17T19:38:43.000000Z",
        "updated_at": "2025-01-17T07:48:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1aa-7cc5-4364-ae4f-3caf6bbd713a",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1aa-830c-4ea0-b080-1ba8dc749da6",
        "idcard": "3102201303642",
        "code": "156003",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.ชนัญ ศรีชีวิน",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:43.000000Z",
        "updated_at": "2024-11-17T19:38:43.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1aa-830c-4ea0-b080-1ba8dc749da6",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1aa-8914-470e-b5d1-1372ec5cec24",
        "idcard": "3679900043412",
        "code": "156004",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.บุษยากร ตีระพฤติกุลชัย",
        "position": "อาจารย์",
        "contact": "0846119123",
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "wxPJZ4",
        "created_at": "2024-11-17T19:38:43.000000Z",
        "updated_at": "2024-12-13T06:56:30.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1aa-8914-470e-b5d1-1372ec5cec24",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1aa-8f49-4b06-aebf-ceb7dbb92e07",
        "idcard": "3670100790363",
        "code": "200021",
        "name": "นายทศพร ทองแท้",
        "position": "ช่างตกแต่งสถานที่",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:43.000000Z",
        "updated_at": "2024-11-17T19:38:43.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1aa-8f49-4b06-aebf-ceb7dbb92e07",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1be-f9ed-428a-9fd6-011ca49c29dd",
        "idcard": "3679900146220",
        "code": "200022",
        "name": "นางนิภาพร นาคเมือง",
        "position": "พนักงานห้องปฏิบัติการ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "aI8vex",
        "created_at": "2024-11-17T19:38:56.000000Z",
        "updated_at": "2025-01-09T08:45:29.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1be-f9ed-428a-9fd6-011ca49c29dd",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1bf-045b-4718-86cb-93ea47c46488",
        "idcard": "3670101299817",
        "code": "200023",
        "name": "นายสมยศ อ่องยิ่ง",
        "position": "ช่างเชื่อม",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:56.000000Z",
        "updated_at": "2024-11-17T19:38:56.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1bf-045b-4718-86cb-93ea47c46488",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1bf-08f1-47d7-a5f5-8b2849a6a602",
        "idcard": "3670100166678",
        "code": "200024",
        "name": "นายไพฑูรย์ บานเย็นงาม",
        "position": "พนักงานห้องปฏิบัติการ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:56.000000Z",
        "updated_at": "2024-11-17T19:38:56.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1bf-08f1-47d7-a5f5-8b2849a6a602",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1bf-0d97-4369-bed9-300fa37dd864",
        "idcard": "3679900011065",
        "code": "200026",
        "name": "นางสาวณัฐมน สังเกตุดี",
        "position": "พนักงานธุรการ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:56.000000Z",
        "updated_at": "2024-11-17T19:38:56.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10103",
          "name": "กองพัฒนานักศึกษา"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1bf-0d97-4369-bed9-300fa37dd864",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1bf-127e-44f0-88ac-e1965146e8dc",
        "idcard": "3670301270197",
        "code": "200029",
        "name": "นายนิคม ปาคำ",
        "position": "ช่างไฟฟ้า",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:56.000000Z",
        "updated_at": "2024-11-17T19:38:56.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1bf-127e-44f0-88ac-e1965146e8dc",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1bf-17ca-4c91-84b6-e9bf5a44e02c",
        "idcard": "3670400015632",
        "code": "200034",
        "name": "นางดวงณภัทร ศรีจริยา",
        "position": "พนักงานธุรการ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:56.000000Z",
        "updated_at": "2024-11-17T19:38:56.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1bf-17ca-4c91-84b6-e9bf5a44e02c",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1bf-1dea-42c7-8e22-f2d4246ed752",
        "idcard": "3640100652548",
        "code": "231001",
        "name": "นางสาวสังวาลย์ ฉิมคง",
        "position": "พนักงานธุรการ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:56.000000Z",
        "updated_at": "2024-11-17T19:38:56.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1bf-1dea-42c7-8e22-f2d4246ed752",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1bf-2432-4a03-b013-aaf818db1bdb",
        "idcard": "5670100033275",
        "code": "238001",
        "name": "นายประจวบ สกลนครดี",
        "position": "พนักงานห้องปฏิบัติการ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:56.000000Z",
        "updated_at": "2024-11-17T19:38:56.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1bf-2432-4a03-b013-aaf818db1bdb",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1bf-29e8-4709-bd15-8c3aacc685ab",
        "idcard": "3600300319087",
        "code": "349086",
        "name": "นายมนตรี ปลีเอี่ยม",
        "position": "นักวิชาการโสตทัศนศึกษา",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:56.000000Z",
        "updated_at": "2024-11-17T19:38:56.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1bf-29e8-4709-bd15-8c3aacc685ab",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1bf-2f9b-4393-9ffe-fa119746ee30",
        "idcard": "1679900189283",
        "code": "355021",
        "name": "นายกฤษดา ชูละออง",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:56.000000Z",
        "updated_at": "2024-11-17T19:38:56.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1bf-2f9b-4393-9ffe-fa119746ee30",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1bf-35a0-4b6f-a5ae-6c70ed62e3ec",
        "idcard": "1679900013657",
        "code": "355027",
        "name": "นายกรกฎ ดีดาร์",
        "position": "นักวิชาการช่างศิลป์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:56.000000Z",
        "updated_at": "2024-11-17T19:38:56.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1bf-35a0-4b6f-a5ae-6c70ed62e3ec",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1bf-3bb8-493b-905b-5284ab71a9d3",
        "idcard": "1679900034506",
        "code": "355337",
        "name": "นางสาวประภาพรรณ บัวบาง",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": "0804749463",
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": "7822936237",
        "telegram_link_code": "gbByCf",
        "created_at": "2024-11-17T19:38:56.000000Z",
        "updated_at": "2025-01-10T02:32:24.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1bf-3bb8-493b-905b-5284ab71a9d3",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          },
          {
            "uuid": "9de1769b-14df-43c3-818f-4c7056472c6e",
            "name": "admin_org",
            "description": "ผู้ดูแลหน่วยงาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1bf-3bb8-493b-905b-5284ab71a9d3",
              "role_id": "9de1769b-14df-43c3-818f-4c7056472c6e"
            }
          }
        ]
      },
      {
        "id": "9d83e1bf-4200-4c32-82d9-7d47ef2aab67",
        "idcard": "1679900128918",
        "code": "355338",
        "name": "นายวิศัลย์ แสงนก",
        "position": "นักวิชาการเครื่องกล",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:56.000000Z",
        "updated_at": "2024-11-17T19:38:56.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1bf-4200-4c32-82d9-7d47ef2aab67",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1bf-4851-44fc-b6aa-01d7ef344035",
        "idcard": "1659900358263",
        "code": "364032",
        "name": "นายปราการ สุวรรณเจริญ",
        "position": "วิศวกร (พลังงาน)",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "40PZQn",
        "created_at": "2024-11-17T19:38:56.000000Z",
        "updated_at": "2025-03-18T08:24:35.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1bf-4851-44fc-b6aa-01d7ef344035",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1bf-4ea3-4913-9aad-83c58f48ff9a",
        "idcard": "1679900221756",
        "code": "364033",
        "name": "นายธีระวัฒน์ อินไข",
        "position": "วิศวกร (ประปา)",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:56.000000Z",
        "updated_at": "2024-11-17T19:38:56.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1bf-4ea3-4913-9aad-83c58f48ff9a",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1bf-5499-4a0e-9ec3-a8293d749f31",
        "idcard": "1179900330428",
        "code": "364034",
        "name": "นายฐิติกร ตั้งจิต",
        "position": "วิศวกร (ประปา)",
        "contact": "0910264392",
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "y5Xd7Z",
        "created_at": "2024-11-17T19:38:56.000000Z",
        "updated_at": "2024-12-13T07:12:16.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1bf-5499-4a0e-9ec3-a8293d749f31",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1bf-5acb-4068-a9fa-3d547fba6a11",
        "idcard": "1509901169937",
        "code": "364035",
        "name": "นายนันทวุฒิ โพธิวัฒตะ",
        "position": "วิศวกร (ไฟฟ้า)",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "UZfDQi",
        "created_at": "2024-11-17T19:38:56.000000Z",
        "updated_at": "2024-12-13T06:29:48.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1bf-5acb-4068-a9fa-3d547fba6a11",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1bf-60b1-4359-a40a-b9464fa20613",
        "idcard": "1679800252927",
        "code": "364037",
        "name": "นายธนพร สิลา",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป (ภูมิสถาปัตย์)",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "1NBeDU",
        "created_at": "2024-11-17T19:38:56.000000Z",
        "updated_at": "2025-02-03T02:03:40.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1bf-60b1-4359-a40a-b9464fa20613",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1bf-66e1-4e38-baf4-f5b48b290148",
        "idcard": "1679900371456",
        "code": "364038",
        "name": "นางสาวกนกพร วาพิลัย",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป (ออกแบบ)",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "scj3GC",
        "created_at": "2024-11-17T19:38:56.000000Z",
        "updated_at": "2025-01-10T09:16:35.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1bf-66e1-4e38-baf4-f5b48b290148",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1bf-6ccf-4fe4-92d4-85d37377e794",
        "idcard": "3630100662799",
        "code": "364039",
        "name": "นายออมสิน พรมแก้ว",
        "position": "วิศวกร (สื่อสาร)",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "108",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:56.000000Z",
        "updated_at": "2024-11-17T19:38:56.000000Z",
        "deleted_at": null,
        "section": {
          "id": "108",
          "name": "สำนักวิทยบริการและเทคโนโลยีสารสนเทศ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1bf-6ccf-4fe4-92d4-85d37377e794",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1bf-72f9-462f-a3d1-cc03e8c72c83",
        "idcard": "1670700109580",
        "code": "364040",
        "name": "นายศุภกร ละมัย",
        "position": "พนักงานบริการทั่วไป (เครื่องปรับอากาศ)",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:56.000000Z",
        "updated_at": "2024-11-17T19:38:56.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1bf-72f9-462f-a3d1-cc03e8c72c83",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1bf-78e8-491a-bb61-3f11fff9f41f",
        "idcard": "1679900149541",
        "code": "364041",
        "name": "นายนที เสือราช",
        "position": "วิศวกร (เครื่องกล)",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:56.000000Z",
        "updated_at": "2024-11-17T19:38:56.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1bf-78e8-491a-bb61-3f11fff9f41f",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1bf-7f21-4fc9-8a71-d2b66137c22a",
        "idcard": "1640600034332",
        "code": "364042",
        "name": "นางสาวเกวลี น้อมเศียร",
        "position": "นักวิชาการพัสดุ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1bf-7f21-4fc9-8a71-d2b66137c22a",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1bf-854c-45b3-8d6e-025d991b10ff",
        "idcard": "1679800225032",
        "code": "364043",
        "name": "นางสาวธีร์ชานัน ผาบัว",
        "position": "นักวิชาการเงินและบัญชี",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1bf-854c-45b3-8d6e-025d991b10ff",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1bf-8b59-4544-ab64-03de3e5ee476",
        "idcard": "3670100095711",
        "code": "364044",
        "name": "นางสุภาวดี แจ้งจันทร์",
        "position": "นักจัดการงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1bf-8b59-4544-ab64-03de3e5ee476",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1bf-91c7-44d4-b495-a8ef13025f73",
        "idcard": "1679900149311",
        "code": "365045",
        "name": "นางสาวชนาภา เอมอารมณ์",
        "position": "นักวิชาการเงินและบัญชี",
        "contact": "0898581639",
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "zEiqLy",
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-12-13T06:49:18.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1bf-91c7-44d4-b495-a8ef13025f73",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1bf-9832-4af5-b232-582c14a005b9",
        "idcard": "1679900485818",
        "code": "365047",
        "name": "นางสาวกรองทราย แก้วบาง",
        "position": "นักวิชาการเงินและบัญชี",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1bf-9832-4af5-b232-582c14a005b9",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1bf-9eab-4b1d-a259-e467eca22bf4",
        "idcard": "1679900482282",
        "code": "367048",
        "name": "นางสาวสุทธิชา เอี่ยมอ๋อง",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": "0861419582",
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": "7908303173",
        "telegram_link_code": "Rdfwx6",
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2025-01-29T02:23:38.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1bf-9eab-4b1d-a259-e467eca22bf4",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1bf-a4ed-4da7-a227-99c5065a62c7",
        "idcard": "1670100152654",
        "code": "367049",
        "name": "ว่าที่ ร.ต.หญิงสุนิสา คำแก่",
        "position": "นักวิชาการศึกษา",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "qcYJsm",
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2025-02-27T04:53:43.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1bf-a4ed-4da7-a227-99c5065a62c7",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1bf-ab81-411d-bfca-9df3c5193533",
        "idcard": "1400500151835",
        "code": "367050",
        "name": "นายอรรถนพ ปลื้มใจ",
        "position": "บุคลากร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1bf-ab81-411d-bfca-9df3c5193533",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9e2ed595-fa8c-4266-abfc-faa8d816bfd9",
        "idcard": "1670500331831",
        "code": "368051",
        "name": "นางสาววรัตม์ฐนัน ยอดพีระ",
        "position": "นักประชาสัมพันธ์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "1010102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2025-02-11T02:11:31.000000Z",
        "updated_at": "2025-02-11T02:11:31.000000Z",
        "deleted_at": null,
        "section": {
          "id": "1010102",
          "name": "งานเลขานุการผู้บริหาร"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9e2ed595-fa8c-4266-abfc-faa8d816bfd9",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9e2ed596-eef3-4c5f-aad0-4736c6e9dd6e",
        "idcard": "3670200446061",
        "code": "368052",
        "name": "นางสาวดวงกมล วังคีรี",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "1080102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2025-02-11T02:11:31.000000Z",
        "updated_at": "2025-02-11T02:11:31.000000Z",
        "deleted_at": null,
        "section": {
          "id": "1080102",
          "name": "งานหอสมุดกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9e2ed596-eef3-4c5f-aad0-4736c6e9dd6e",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1bf-b221-44ad-9e14-2a285ebd2036",
        "idcard": "5670300050921",
        "code": "449131",
        "name": "นางสาวจุฑามาศ กุดดี",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1bf-b221-44ad-9e14-2a285ebd2036",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1bf-b844-48b5-a87d-3751875bdff1",
        "idcard": "3670101316134",
        "code": "449133",
        "name": "นางถนอม มาโพธิ์",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1bf-b844-48b5-a87d-3751875bdff1",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1bf-bebb-412a-b28c-45dae9d5df74",
        "idcard": "3670100662756",
        "code": "449135",
        "name": "นางปิ่น ครุธลา",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1bf-bebb-412a-b28c-45dae9d5df74",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1bf-c4dd-4c10-847e-2ddfe811bffb",
        "idcard": "3670100093468",
        "code": "449143",
        "name": "นายละไมล์ แก้วใหญ่",
        "position": "พนักงานสถานที่",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1bf-c4dd-4c10-847e-2ddfe811bffb",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1bf-cae3-4c0e-86a3-bab5194b6171",
        "idcard": "3670100960307",
        "code": "449148",
        "name": "นายหนึ่ง จันทร์ทอง",
        "position": "พนักงานสถานที่",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1bf-cae3-4c0e-86a3-bab5194b6171",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1bf-d159-4615-ba8b-d0839e9a857b",
        "idcard": "3670101376200",
        "code": "449166",
        "name": "นางรสิตา หนูตะเภา",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1bf-d159-4615-ba8b-d0839e9a857b",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1bf-d76a-4be7-b790-24a82baa0dc1",
        "idcard": "3670101376048",
        "code": "449195",
        "name": "นายสมเกียรติ ปิ่นสุก",
        "position": "พนักงานสถานที่",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1bf-d76a-4be7-b790-24a82baa0dc1",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1bf-de2d-4c37-8747-67952fefe99f",
        "idcard": "3670101355946",
        "code": "449202",
        "name": "นางทอด ไชยราช",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1bf-de2d-4c37-8747-67952fefe99f",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1bf-e488-4ca5-bf6f-9576e01bfab3",
        "idcard": "3670100854477",
        "code": "449203",
        "name": "นางวาด จักรเสน",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1bf-e488-4ca5-bf6f-9576e01bfab3",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1bf-eae5-4dac-b24e-ca9e268c3998",
        "idcard": "3679900018329",
        "code": "449204",
        "name": "นางกัลยกร ลำใย",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1bf-eae5-4dac-b24e-ca9e268c3998",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1bf-f135-411e-84fe-d70305c6de23",
        "idcard": "3670100497216",
        "code": "449223",
        "name": "นางกุหลาบ ทูลตา",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1bf-f135-411e-84fe-d70305c6de23",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1bf-f7a0-4d70-a8b2-13e61dd082f6",
        "idcard": "3670300129636",
        "code": "449248",
        "name": "นายสำเภา ขวัญอ่อน",
        "position": "พนักงานรักษาความปลอดภัย",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1bf-f7a0-4d70-a8b2-13e61dd082f6",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1bf-fe0f-4333-a34d-b07b86b330d1",
        "idcard": "3670301269237",
        "code": "449249",
        "name": "นายนิยม วงศรีรัก",
        "position": "พนักงานรักษาความปลอดภัย",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1bf-fe0f-4333-a34d-b07b86b330d1",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c0-0456-45b7-95ef-274d7381e72d",
        "idcard": "3670100015963",
        "code": "449250",
        "name": "นายสมบูรณ์ ปานแก้ว",
        "position": "พนักงานรักษาความปลอดภัย",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c0-0456-45b7-95ef-274d7381e72d",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c0-0ab1-4ac5-aa6f-a6dd64f313eb",
        "idcard": "5670190023941",
        "code": "449251",
        "name": "นายบุญชู ครุธลา",
        "position": "พนักงานรักษาความปลอดภัย",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c0-0ab1-4ac5-aa6f-a6dd64f313eb",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c0-1107-41f1-992e-aecd36c7e4a6",
        "idcard": "3670300125541",
        "code": "449256",
        "name": "นายสงวน อ่อนศรี",
        "position": "พนักงานรักษาความปลอดภัย",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c0-1107-41f1-992e-aecd36c7e4a6",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c0-171f-4148-8fc6-97dce59a3e8d",
        "idcard": "3670300415353",
        "code": "449257",
        "name": "นางคำเพียร จันทร์เกิน",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c0-171f-4148-8fc6-97dce59a3e8d",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c0-1d5a-499c-8057-98c0182a69e6",
        "idcard": "3670101378300",
        "code": "449261",
        "name": "นายสายลม พานทองคำ",
        "position": "พนักงานสถานที่",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10103",
          "name": "กองพัฒนานักศึกษา"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c0-1d5a-499c-8057-98c0182a69e6",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c0-237b-4a3f-a74c-6442ffc568aa",
        "idcard": "3670100283186",
        "code": "450032",
        "name": "นายวันชัย สีโถ",
        "position": "พนักงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10103",
          "name": "กองพัฒนานักศึกษา"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c0-237b-4a3f-a74c-6442ffc568aa",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c0-29bc-4aa7-a383-742935fcefab",
        "idcard": "3670200446061",
        "code": "450042",
        "name": "นางสาวดวงกมล วังคีรี",
        "position": "เจ้าหน้าที่ปฏิบัติการห้องสมุด",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "108",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "108",
          "name": "สำนักวิทยบริการและเทคโนโลยีสารสนเทศ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c0-29bc-4aa7-a383-742935fcefab",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c0-2fee-4779-892c-5bb04c671dbd",
        "idcard": "3670100103447",
        "code": "451003",
        "name": "นางธนาภา เอี่ยมศรี",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c0-2fee-4779-892c-5bb04c671dbd",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c0-365c-4969-b352-63f1714069cc",
        "idcard": "3670101421540",
        "code": "550006",
        "name": "นางสาวโฉมฉาย พิชัย",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c0-365c-4969-b352-63f1714069cc",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c0-3cbd-475a-b865-c25b6cf7bf25",
        "idcard": "1670100013662",
        "code": "551021",
        "name": "นายรุ่งโรจน์ ทูลตา",
        "position": "พนักงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c0-3cbd-475a-b865-c25b6cf7bf25",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c0-4322-43db-8c9c-b5ff750fa9d4",
        "idcard": "3670100960293",
        "code": "553003",
        "name": "นางภารณี พรมสวย",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c0-4322-43db-8c9c-b5ff750fa9d4",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c0-4967-418d-9e4e-324760dc9d3c",
        "idcard": "3410601190808",
        "code": "553062",
        "name": "นายดุชิต ศรีสุนาครัว",
        "position": "พนักงานสถานที่",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c0-4967-418d-9e4e-324760dc9d3c",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c0-4f99-4788-bf8e-13ed48292177",
        "idcard": "3350800203161",
        "code": "553063",
        "name": "นายปรีชา บุญกิจ",
        "position": "พนักงานสถานที่",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c0-4f99-4788-bf8e-13ed48292177",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c0-55fc-4e50-a97b-ecc6f81a0dd7",
        "idcard": "3670101610784",
        "code": "553066",
        "name": "นายธัญพิสิทธิ์ รังษีสกรณ์",
        "position": "พนักงานขับรถยนต์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c0-55fc-4e50-a97b-ecc6f81a0dd7",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c0-5c73-4a24-bae1-c488d9c8ae34",
        "idcard": "3670101412885",
        "code": "553068",
        "name": "นายบุญเรือง จันทร์ทอง",
        "position": "พนักงานสถานที่",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c0-5c73-4a24-bae1-c488d9c8ae34",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c0-62d5-44e6-8dff-8455f34c9bb0",
        "idcard": "3670100207234",
        "code": "553071",
        "name": "นางสายรุ้ง ศรีสุนาครัว",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c0-62d5-44e6-8dff-8455f34c9bb0",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c0-6929-4066-8f87-74b55553ebdc",
        "idcard": "3670100952410",
        "code": "553072",
        "name": "นางสาวทองปาน ไทยช้อย",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c0-6929-4066-8f87-74b55553ebdc",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c0-6f83-4d0a-b80a-a8c57ee3d478",
        "idcard": "1670100134338",
        "code": "553073",
        "name": "นางนรินทร มีทอง",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c0-6f83-4d0a-b80a-a8c57ee3d478",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c0-7611-4831-9d09-50a0679caa04",
        "idcard": "1679900049945",
        "code": "553089",
        "name": "นางสาวจตุพร บุญมาก",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c0-7611-4831-9d09-50a0679caa04",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c0-7c97-4f0f-8724-a3ca7983f11a",
        "idcard": "3670100279111",
        "code": "553090",
        "name": "นางอมรพรรณ์ เศรษฐี",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c0-7c97-4f0f-8724-a3ca7983f11a",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c0-82f7-4fbd-9f8f-c14bde4fc732",
        "idcard": "3670100954218",
        "code": "553098",
        "name": "นางณัฐชยาพร ใจใหญ่",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "2VpMO9",
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2025-01-22T08:14:28.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c0-82f7-4fbd-9f8f-c14bde4fc732",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c0-895b-4352-8273-5a20c52ff24e",
        "idcard": "3670100107086",
        "code": "553099",
        "name": "นายคอม เสือราช",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c0-895b-4352-8273-5a20c52ff24e",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c0-8f9f-40b7-bff5-949277b3a98c",
        "idcard": "3120200535521",
        "code": "553100",
        "name": "นางสาวสุรางค์รัตน์ จันตราแจ่ม",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c0-8f9f-40b7-bff5-949277b3a98c",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c0-95ba-4b34-aa8b-e29d1dfbf325",
        "idcard": "3670100279120",
        "code": "554140",
        "name": "นายขจร พรหมนนท์",
        "position": "พนักงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c0-95ba-4b34-aa8b-e29d1dfbf325",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c0-9c1e-4565-8532-14d11a08cf5b",
        "idcard": "3670101024125",
        "code": "554155",
        "name": "นางบังอร สายคำพล",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c0-9c1e-4565-8532-14d11a08cf5b",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c0-a226-4cf9-8432-421b361e721f",
        "idcard": "4670100009732",
        "code": "554245",
        "name": "นางวันวิภา สุกแก้ว",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c0-a226-4cf9-8432-421b361e721f",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c0-a85a-478c-b544-becfd1f2f70e",
        "idcard": "3670100103412",
        "code": "554247",
        "name": "นายจำเนย สุกแก้ว",
        "position": "พนักงานสถานที่",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c0-a85a-478c-b544-becfd1f2f70e",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c0-ae7c-494b-9c76-07af19d9b817",
        "idcard": "3670100477622",
        "code": "554249",
        "name": "นางลัดดา แก้วท้วม",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c0-ae7c-494b-9c76-07af19d9b817",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c0-b4d4-4c5f-9710-1697cfca1c8f",
        "idcard": "3670100214923",
        "code": "555289",
        "name": "นายทนงศักดิ์ สุขแสง",
        "position": "พนักงานขับรถยนต์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c0-b4d4-4c5f-9710-1697cfca1c8f",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c0-bb2b-4026-b46b-6ee724575351",
        "idcard": "3640500291836",
        "code": "555335",
        "name": "นางสาวเกศรา ปัญทะนา",
        "position": "พนักงานปฏิบัติการ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c0-bb2b-4026-b46b-6ee724575351",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c0-c13b-41d1-b7fa-a2bf591d6661",
        "idcard": "3670100358879",
        "code": "555377",
        "name": "นายนพฤทธิ์ ทิพย์เคลือบ",
        "position": "พนักงานขับรถยนต์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c0-c13b-41d1-b7fa-a2bf591d6661",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c0-c79b-49d9-8a9c-e2cb3e47d1f2",
        "idcard": "3320300082969",
        "code": "556410",
        "name": "นายสรรพัชญ์วาริช ใจใหญ่",
        "position": "พนักงานสถานที่",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "108",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "108",
          "name": "สำนักวิทยบริการและเทคโนโลยีสารสนเทศ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c0-c79b-49d9-8a9c-e2cb3e47d1f2",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c0-cdb6-495f-8202-12f41d972316",
        "idcard": "5670100092182",
        "code": "556438",
        "name": "นางนิษา อินทร์พูล",
        "position": "พนักงานปฏิบัติการ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c0-cdb6-495f-8202-12f41d972316",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c0-d409-45bb-a01e-0e0e597b2b34",
        "idcard": "3670100935361",
        "code": "556450",
        "name": "นายสมไชย เรืองนา",
        "position": "พนักงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c0-d409-45bb-a01e-0e0e597b2b34",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c0-da23-4346-b03f-88ac97607865",
        "idcard": "3670100864995",
        "code": "556464",
        "name": "นางสาวดวงพร เพ็งดี",
        "position": "พนักงานสถานที่",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c0-da23-4346-b03f-88ac97607865",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c0-e06f-4d6c-93b9-bdc0a436ec63",
        "idcard": "3670100953963",
        "code": "557471",
        "name": "นางเรณุกา ศรีพันนาม",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c0-e06f-4d6c-93b9-bdc0a436ec63",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c0-e6c9-48b0-8182-af5966a68766",
        "idcard": "1679900116308",
        "code": "557486",
        "name": "นายสุบิน หมื่นชนะสงคราม",
        "position": "พนักงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c0-e6c9-48b0-8182-af5966a68766",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c0-ece7-4957-82a3-10f32134670b",
        "idcard": "3130300085277",
        "code": "557489",
        "name": "นางสาวสุลัดดา วันมี",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c0-ece7-4957-82a3-10f32134670b",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c0-f332-46bc-b7b5-8c88f014c23c",
        "idcard": "3670100360377",
        "code": "557491",
        "name": "นางทองมี สายคำยศ",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c0-f332-46bc-b7b5-8c88f014c23c",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c0-f941-411d-8754-0bd1d9e10beb",
        "idcard": "3670100509761",
        "code": "557494",
        "name": "นางน้ำเพชร ทาทอน",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c0-f941-411d-8754-0bd1d9e10beb",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c0-ffa9-4963-8b25-70f916f1d22a",
        "idcard": "3670100107043",
        "code": "557495",
        "name": "นางบัวขาว งามเอี่ยม",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:57.000000Z",
        "updated_at": "2024-11-17T19:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c0-ffa9-4963-8b25-70f916f1d22a",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c1-0610-4346-bb7a-1c494c5215df",
        "idcard": "3679900185233",
        "code": "557502",
        "name": "นายจักวัน อุทัยสา",
        "position": "พนักงานขับรถยนต์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:58.000000Z",
        "updated_at": "2024-11-17T19:38:58.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c1-0610-4346-bb7a-1c494c5215df",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c1-0c77-40fd-84ef-0a5e23330457",
        "idcard": "3670300824423",
        "code": "558506",
        "name": "นายบุญเพ็ง คำตื้อ",
        "position": "พนักงานขับรถยนต์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:58.000000Z",
        "updated_at": "2024-11-17T19:38:58.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c1-0c77-40fd-84ef-0a5e23330457",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c1-12c6-41a0-9936-a890ddde105f",
        "idcard": "3670101533429",
        "code": "558512",
        "name": "นางสาวสุภาวงค์ ฉุนจัตุรัส",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:58.000000Z",
        "updated_at": "2024-11-17T19:38:58.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10103",
          "name": "กองพัฒนานักศึกษา"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c1-12c6-41a0-9936-a890ddde105f",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c1-1930-4923-bc50-e65d368c421b",
        "idcard": "5679900003166",
        "code": "558516",
        "name": "นายอาทิตย์ เรืองกาญจนพงศ์",
        "position": "พนักงานรักษาความปลอดภัย",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:58.000000Z",
        "updated_at": "2024-11-17T19:38:58.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c1-1930-4923-bc50-e65d368c421b",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c1-1fa7-4a1c-aaa8-e3b5b0df9224",
        "idcard": "3430300340282",
        "code": "558532",
        "name": "นางสกาวเดือน อ่อนโอน",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "108",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:58.000000Z",
        "updated_at": "2024-11-17T19:38:58.000000Z",
        "deleted_at": null,
        "section": {
          "id": "108",
          "name": "สำนักวิทยบริการและเทคโนโลยีสารสนเทศ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c1-1fa7-4a1c-aaa8-e3b5b0df9224",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c1-2637-4226-bab5-e3f76a8dd345",
        "idcard": "1401700137322",
        "code": "558540",
        "name": "นางสาวประภาศิริ ทูลตา",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:58.000000Z",
        "updated_at": "2024-11-17T19:38:58.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c1-2637-4226-bab5-e3f76a8dd345",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c1-2c4f-4cc5-a2fc-99efcbb27438",
        "idcard": "3670100410064",
        "code": "559544",
        "name": "นางธนพร แสนลัด",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "108",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:58.000000Z",
        "updated_at": "2024-11-17T19:38:58.000000Z",
        "deleted_at": null,
        "section": {
          "id": "108",
          "name": "สำนักวิทยบริการและเทคโนโลยีสารสนเทศ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c1-2c4f-4cc5-a2fc-99efcbb27438",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c1-32c0-4a57-9ae0-eadef1bd06a9",
        "idcard": "3670101028881",
        "code": "559553",
        "name": "นายดำรงค์ เศรษฐี",
        "position": "พนักงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:58.000000Z",
        "updated_at": "2024-11-17T19:38:58.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c1-32c0-4a57-9ae0-eadef1bd06a9",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c1-393e-4b56-bf5d-6cd6271736ed",
        "idcard": "3670101300840",
        "code": "559556",
        "name": "นายไกรศร สีสุก",
        "position": "พนักงานรักษาความปลอดภัย",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:58.000000Z",
        "updated_at": "2024-11-17T19:38:58.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c1-393e-4b56-bf5d-6cd6271736ed",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c1-3fa5-4e8d-97a1-f0aeeb65ed29",
        "idcard": "3670100078337",
        "code": "559561",
        "name": "นางไพริน หมอนทอง",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:58.000000Z",
        "updated_at": "2024-11-17T19:38:58.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c1-3fa5-4e8d-97a1-f0aeeb65ed29",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c1-462a-4113-8a1f-2ddc79e98b58",
        "idcard": "3670100791424",
        "code": "560565",
        "name": "นายจักรกฤษณ์ ทัดช่อม่วง",
        "position": "พนักงานสถานที่",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:58.000000Z",
        "updated_at": "2024-11-17T19:38:58.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c1-462a-4113-8a1f-2ddc79e98b58",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c1-4c51-4c9f-80a5-5bcd9ca3c7a6",
        "idcard": "3679900121065",
        "code": "560568",
        "name": "อาจารย์โอลิเวอร์ อุ่นละม้าย",
        "position": "อาจารย์ประจำพิเศษ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "1",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:58.000000Z",
        "updated_at": "2024-11-17T19:38:58.000000Z",
        "deleted_at": null,
        "section": {
          "id": "1",
          "name": "มหาวิทยาลัยราชภัฎเพชรบูรณ์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c1-4c51-4c9f-80a5-5bcd9ca3c7a6",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c1-52ca-4a75-9cf2-bd7f1145812d",
        "idcard": "3670301275962",
        "code": "560578",
        "name": "นายสุรศักดิ์ ใต้กิ",
        "position": "พนักงานรักษาความปลอดภัย",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:58.000000Z",
        "updated_at": "2024-11-17T19:38:58.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c1-52ca-4a75-9cf2-bd7f1145812d",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c1-5913-4409-a058-c557bee42f19",
        "idcard": "3400200302729",
        "code": "561590",
        "name": "นายกิตติภณ บุบผา",
        "position": "พนักงานรักษาความปลอดภัย",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:58.000000Z",
        "updated_at": "2024-11-17T19:38:58.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c1-5913-4409-a058-c557bee42f19",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c1-5f8f-4bb8-84ad-8e713661cdb2",
        "idcard": "3670100783103",
        "code": "561599",
        "name": "นายนิคม จักรเสน",
        "position": "พนักงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:58.000000Z",
        "updated_at": "2024-11-17T19:38:58.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c1-5f8f-4bb8-84ad-8e713661cdb2",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1c1-65d1-49ad-9bb3-737495f48d9d",
        "idcard": "3670300950739",
        "code": "561601",
        "name": "นางสาวสมคิด ปิ่นป้อง",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:38:58.000000Z",
        "updated_at": "2024-11-17T19:38:58.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1c1-65d1-49ad-9bb3-737495f48d9d",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cb-0729-4d10-8b16-95da827e18c6",
        "idcard": "3670101293355",
        "code": "561602",
        "name": "นางมนทกานต์ มีนนท์",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:04.000000Z",
        "updated_at": "2024-11-17T19:39:04.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cb-0729-4d10-8b16-95da827e18c6",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cb-12c0-4e91-9fbf-84d0615b6194",
        "idcard": "3670100116026",
        "code": "562604",
        "name": "นางสาวพรรณี อ่อนวัน",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:04.000000Z",
        "updated_at": "2024-11-17T19:39:04.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cb-12c0-4e91-9fbf-84d0615b6194",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cb-1714-462a-ae77-4926a4197574",
        "idcard": "1679900253593",
        "code": "562611",
        "name": "นางสาวณัฐสุดา พานทองคำ",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:04.000000Z",
        "updated_at": "2024-11-17T19:39:04.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10103",
          "name": "กองพัฒนานักศึกษา"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cb-1714-462a-ae77-4926a4197574",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cb-1c25-4c72-bdf3-e3dfa38ca427",
        "idcard": "1679900024217",
        "code": "562614",
        "name": "นายสุพล ทองขาว",
        "position": "พนักงานสถานที่",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:04.000000Z",
        "updated_at": "2024-11-17T19:39:04.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cb-1c25-4c72-bdf3-e3dfa38ca427",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cb-2205-4938-83a5-8695e563f4b2",
        "idcard": "3670101274571",
        "code": "562616",
        "name": "นางวรรณงาม ตุ้มไธสง",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:04.000000Z",
        "updated_at": "2024-11-17T19:39:04.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cb-2205-4938-83a5-8695e563f4b2",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cb-2873-4086-a29e-bde5af77be01",
        "idcard": "EP42589180000",
        "code": "563629",
        "name": "อาจารย์Yonayad Yadecha Gurmu",
        "position": "อาจารย์ประจำพิเศษ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "1",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:04.000000Z",
        "updated_at": "2024-11-17T19:39:04.000000Z",
        "deleted_at": null,
        "section": {
          "id": "1",
          "name": "มหาวิทยาลัยราชภัฎเพชรบูรณ์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cb-2873-4086-a29e-bde5af77be01",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cb-2e73-4dae-b11e-133e89889efa",
        "idcard": "3670100662039",
        "code": "563630",
        "name": "นายชูชาติ เหิงคำแก้ว",
        "position": "พนักงานขับรถยนต์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:04.000000Z",
        "updated_at": "2024-11-17T19:39:04.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cb-2e73-4dae-b11e-133e89889efa",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cb-34d4-4cb4-9aaf-c006155909a7",
        "idcard": "3679900027042",
        "code": "563632",
        "name": "นางสาวมยุรี พรหมเมือง",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:04.000000Z",
        "updated_at": "2024-11-17T19:39:04.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cb-34d4-4cb4-9aaf-c006155909a7",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cb-3ade-4391-9fde-5b31ef9841db",
        "idcard": "3671000226947",
        "code": "563634",
        "name": "นางสาวปนัดดา เอี่ยมสอาด",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:04.000000Z",
        "updated_at": "2024-11-17T19:39:04.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cb-3ade-4391-9fde-5b31ef9841db",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cb-413b-4941-8a75-0c980e15faf0",
        "idcard": "3101100236396",
        "code": "564635",
        "name": "นายนพพร คำมี",
        "position": "พนักงานขับรถยนต์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:04.000000Z",
        "updated_at": "2024-11-17T19:39:04.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cb-413b-4941-8a75-0c980e15faf0",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cb-4774-441b-bf29-3894e85a858c",
        "idcard": "1679900195615",
        "code": "564637",
        "name": "นายนิสิต เอี่ยมศรี",
        "position": "พนักงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:04.000000Z",
        "updated_at": "2024-11-17T19:39:04.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cb-4774-441b-bf29-3894e85a858c",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cb-4e1e-460a-8bd5-9a5eac945b0d",
        "idcard": "3670101297172",
        "code": "564638",
        "name": "นางสาววันเพ็ญ จันทร์เสน",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:04.000000Z",
        "updated_at": "2024-11-17T19:39:04.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cb-4e1e-460a-8bd5-9a5eac945b0d",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cb-54ba-4e14-90e7-367f05ca1a69",
        "idcard": "1679900112337",
        "code": "564641",
        "name": "นายนิติพัฒน์ กัลยาประสิทธิ์",
        "position": "พนักงานสถานที่",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:04.000000Z",
        "updated_at": "2024-11-17T19:39:04.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cb-54ba-4e14-90e7-367f05ca1a69",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cb-5b2c-472b-a138-36b6d792a378",
        "idcard": "1679900273837",
        "code": "564649",
        "name": "นางสาววลีพร อ่อนสี",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:04.000000Z",
        "updated_at": "2024-11-17T19:39:04.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10103",
          "name": "กองพัฒนานักศึกษา"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cb-5b2c-472b-a138-36b6d792a378",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cb-61db-4cae-acd5-9e611bdcf787",
        "idcard": "3670100953688",
        "code": "564650",
        "name": "นางอุดมพร รักภู่",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:04.000000Z",
        "updated_at": "2024-11-17T19:39:04.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cb-61db-4cae-acd5-9e611bdcf787",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cb-685b-4531-8840-1406cb31cbbb",
        "idcard": "3670101531353",
        "code": "564651",
        "name": "นางจุมลี ปัญญาเทพ",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:04.000000Z",
        "updated_at": "2024-11-17T19:39:04.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cb-685b-4531-8840-1406cb31cbbb",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cb-6e96-479f-9d2d-c0691f17034c",
        "idcard": "3051541445TWN",
        "code": "564652",
        "name": "อาจารย์Jung Chun Kuo",
        "position": "อาจารย์ประจำพิเศษ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "1",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:04.000000Z",
        "updated_at": "2024-11-17T19:39:04.000000Z",
        "deleted_at": null,
        "section": {
          "id": "1",
          "name": "มหาวิทยาลัยราชภัฎเพชรบูรณ์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cb-6e96-479f-9d2d-c0691f17034c",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cb-7523-4d5d-9821-dac1d13a5535",
        "idcard": "3100904199987",
        "code": "564656",
        "name": "ผู้ช่วยศาสตราจารย์อมรรัตน์ ฉิมพลีนภานนท์",
        "position": "รองคณบดี/รองผู้อำนวยการ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "110",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:04.000000Z",
        "updated_at": "2024-11-17T19:39:04.000000Z",
        "deleted_at": null,
        "section": {
          "id": "110",
          "name": "สำนักส่งเสริมวิชาการและงานทะเบียน"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cb-7523-4d5d-9821-dac1d13a5535",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cb-7b88-4a34-9e05-a93e454916be",
        "idcard": "3660400590009",
        "code": "564658",
        "name": "นายสินธุ์ชัย เลิศณรงค์",
        "position": "พนักงานขับรถยนต์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:04.000000Z",
        "updated_at": "2024-11-17T19:39:04.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cb-7b88-4a34-9e05-a93e454916be",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cb-8857-4a27-ad3a-6a2c780afe20",
        "idcard": "1679900273951",
        "code": "564662",
        "name": "นายวรเมธ หอยสังข์",
        "position": "ช่างซ่อมบำรุง",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:04.000000Z",
        "updated_at": "2024-11-17T19:39:04.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cb-8857-4a27-ad3a-6a2c780afe20",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cb-8ea8-418f-bd18-51bc36291cb7",
        "idcard": "3670100667332",
        "code": "565663",
        "name": "นายประเสริฐ พันธ์เพชร",
        "position": "พนักงานรักษาความปลอดภัย",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:04.000000Z",
        "updated_at": "2024-11-17T19:39:04.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cb-8ea8-418f-bd18-51bc36291cb7",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cb-950e-40fa-821f-20000bac6b06",
        "idcard": "4458538750000",
        "code": "565665",
        "name": "อาจารย์Ricky Lemons",
        "position": "อาจารย์ประจำพิเศษ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "1",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:04.000000Z",
        "updated_at": "2024-11-17T19:39:04.000000Z",
        "deleted_at": null,
        "section": {
          "id": "1",
          "name": "มหาวิทยาลัยราชภัฎเพชรบูรณ์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cb-950e-40fa-821f-20000bac6b06",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cb-9b41-4a4d-98c4-1f8555567361",
        "idcard": "5670100004771",
        "code": "565671",
        "name": "นายอำนาจ นวลอ่อน",
        "position": "พนักงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:04.000000Z",
        "updated_at": "2024-11-17T19:39:04.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cb-9b41-4a4d-98c4-1f8555567361",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cb-a12e-4097-99ec-f52eb4a18afb",
        "idcard": "3670100097048",
        "code": "565673",
        "name": "นางเดือน สุขเมือง",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:04.000000Z",
        "updated_at": "2024-11-17T19:39:04.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cb-a12e-4097-99ec-f52eb4a18afb",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cb-a79d-4308-90b6-1071466a426a",
        "idcard": "1679900135817",
        "code": "565674",
        "name": "นางสาวอุ่นเรือน ศีวิไล",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "108",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:04.000000Z",
        "updated_at": "2024-11-17T19:39:04.000000Z",
        "deleted_at": null,
        "section": {
          "id": "108",
          "name": "สำนักวิทยบริการและเทคโนโลยีสารสนเทศ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cb-a79d-4308-90b6-1071466a426a",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cb-ad99-4c59-abea-e7f4cccd110f",
        "idcard": "3670300761669",
        "code": "565675",
        "name": "นางคำหล้า ศรีแสงจันทร์",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:04.000000Z",
        "updated_at": "2024-11-17T19:39:04.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cb-ad99-4c59-abea-e7f4cccd110f",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cb-b403-4938-a691-e463e67290f0",
        "idcard": "1420600043562",
        "code": "565676",
        "name": "อาจารย์พิชญาพร เนตรแสงศรี",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cb-b403-4938-a691-e463e67290f0",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cb-ba28-4fb2-9215-73e25a2a879f",
        "idcard": "5650200005265",
        "code": "565680",
        "name": "นางสาวธนพร เพียคำ",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cb-ba28-4fb2-9215-73e25a2a879f",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cb-c0b5-468b-b546-25528310625b",
        "idcard": "EJI8879600000",
        "code": "565681",
        "name": "อาจารย์Li Zhaodong",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cb-c0b5-468b-b546-25528310625b",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cb-c754-4c86-94e0-9d87148adcca",
        "idcard": "1679900234572",
        "code": "565683",
        "name": "นางสาวสุภัทฉรี พรมมี",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10102",
          "name": "กองนโยบายและแผน"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cb-c754-4c86-94e0-9d87148adcca",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cb-cde4-4704-af0f-c9c210100106",
        "idcard": "3650800578677",
        "code": "565685",
        "name": "นางกมลวรรณ อ่อนโอน",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cb-cde4-4704-af0f-c9c210100106",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cb-d4d5-4289-9194-06b8e02607ec",
        "idcard": "3670101422333",
        "code": "566688",
        "name": "นายไกรสร หมื่นท่อง",
        "position": "พนักงานขับรถยนต์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cb-d4d5-4289-9194-06b8e02607ec",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cb-db9d-4633-bf20-60fcb4a4b53c",
        "idcard": "1679900202573",
        "code": "566689",
        "name": "นายวิทวัฒน์ เพชระบูรณิน",
        "position": "พนักงานขับรถยนต์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cb-db9d-4633-bf20-60fcb4a4b53c",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cb-e20f-41f1-87f5-536969d198d0",
        "idcard": "1679900129787",
        "code": "566690",
        "name": "นางสาววิชชุดา อ่องยิ่ง",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "108",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "108",
          "name": "สำนักวิทยบริการและเทคโนโลยีสารสนเทศ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cb-e20f-41f1-87f5-536969d198d0",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cb-e8c6-4527-890b-83d99efac191",
        "idcard": "1670400076791",
        "code": "566691",
        "name": "นางสาวปรพรรณ พวงพุฒิ",
        "position": "เจ้าหน้าที่ประสานงาน",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10102",
          "name": "กองนโยบายและแผน"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cb-e8c6-4527-890b-83d99efac191",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cb-ef62-47e9-b700-d4ace8c08402",
        "idcard": "5141100003258",
        "code": "566693",
        "name": "อาจารย์สมศักดิ์ ภู่พรายงาม",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cb-ef62-47e9-b700-d4ace8c08402",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cb-f5b6-49d1-9ce7-4603d2850d88",
        "idcard": "1670400193364",
        "code": "566694",
        "name": "นางสาวเมธาวี ผัดสม",
        "position": "เจ้าหน้าที่ปฏิบัติงาน",
        "contact": "566694",
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": "7829748500",
        "telegram_link_code": "kk8VVf",
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-12-20T08:50:29.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cb-f5b6-49d1-9ce7-4603d2850d88",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cb-fc14-4afa-85f3-92bb8f8ed53d",
        "idcard": "1679900331578",
        "code": "566695",
        "name": "นายศุภณัฐ กล่ำจีน",
        "position": "นักวิชาการคอมพิวเตอร์",
        "contact": "0968818477",
        "email": null,
        "email_verified_at": null,
        "section_id": "108",
        "keycloak_id": null,
        "telegram_chat_id": "7530363398",
        "telegram_link_code": "D5fSUB",
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2025-02-19T05:29:25.000000Z",
        "deleted_at": null,
        "section": {
          "id": "108",
          "name": "สำนักวิทยบริการและเทคโนโลยีสารสนเทศ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cb-fc14-4afa-85f3-92bb8f8ed53d",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cc-023c-47c5-9879-278af4045b0d",
        "idcard": "1670500206972",
        "code": "566696",
        "name": "นายประกายแก้ว กู่สันเทียะ",
        "position": "พนักงานปฏิบัติการ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": "7996392667",
        "telegram_link_code": "Gq2Hig",
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2025-02-03T05:59:31.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cc-023c-47c5-9879-278af4045b0d",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cc-08d5-44b9-9ec5-906c44af6cf3",
        "idcard": "1350300003485",
        "code": "566697",
        "name": "นางสาวสุปราณี บุญศรี",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cc-08d5-44b9-9ec5-906c44af6cf3",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cc-0f4b-4291-b2db-0135ab3f4b07",
        "idcard": "3100503313592",
        "code": "566698",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.กฤษดา ผ่องพิทยา",
        "position": "คณบดี",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "114",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "Fnsf6k",
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2025-03-11T05:16:59.000000Z",
        "deleted_at": null,
        "section": {
          "id": "114",
          "name": "บัณฑิตวิทยาลัย"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cc-0f4b-4291-b2db-0135ab3f4b07",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cc-15c7-4722-987b-baa144564e30",
        "idcard": "3102400036547",
        "code": "566699",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.ณัฐตะวัน ลิ้มประสงค์",
        "position": "อาจารย์ประจำพิเศษ",
        "contact": "09228344389",
        "email": null,
        "email_verified_at": null,
        "section_id": "114",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "UbLhNA",
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-12-13T06:51:27.000000Z",
        "deleted_at": null,
        "section": {
          "id": "114",
          "name": "บัณฑิตวิทยาลัย"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cc-15c7-4722-987b-baa144564e30",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cc-1c4e-41af-974f-9a2d228cbc38",
        "idcard": "3659900065785",
        "code": "566700",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.พิศุทธิ์ บัวเปรม",
        "position": "อาจารย์ประจำพิเศษ",
        "contact": "0813716611",
        "email": null,
        "email_verified_at": null,
        "section_id": "114",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "cBJhhw",
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2025-03-10T08:59:48.000000Z",
        "deleted_at": null,
        "section": {
          "id": "114",
          "name": "บัณฑิตวิทยาลัย"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cc-1c4e-41af-974f-9a2d228cbc38",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cc-22c3-43b5-8512-20391106d834",
        "idcard": "3940800031608",
        "code": "566701",
        "name": "ผู้ช่วยศาสตราจารย์ประสิทธิ์ ไชยศรี",
        "position": "อาจารย์ประจำพิเศษ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "114",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "114",
          "name": "บัณฑิตวิทยาลัย"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cc-22c3-43b5-8512-20391106d834",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cc-2912-49f7-8177-958e986d965c",
        "idcard": "3459900179618",
        "code": "566702",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.จุฬาพรรณภรณ์ ธนะแพทย์",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "114",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "114",
          "name": "บัณฑิตวิทยาลัย"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cc-2912-49f7-8177-958e986d965c",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cc-2f97-405c-bf96-f8a3b4b197a3",
        "idcard": "3361000944672",
        "code": "567705",
        "name": "อาจารย์ ดร.สุพจน์ ประไพเพชร",
        "position": "อาจารย์ประจำพิเศษ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "114",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "114",
          "name": "บัณฑิตวิทยาลัย"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cc-2f97-405c-bf96-f8a3b4b197a3",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cc-361c-4ae4-8b3c-80d2af779370",
        "idcard": "3679900221477",
        "code": "567706",
        "name": "อาจารย์ ดร.สุดสวาสดิ์ ประไพเพชร",
        "position": "อาจารย์ประจำพิเศษ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "114",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "114",
          "name": "บัณฑิตวิทยาลัย"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cc-361c-4ae4-8b3c-80d2af779370",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cc-3ca6-4777-994a-1102d0632448",
        "idcard": "5310490004332",
        "code": "567707",
        "name": "อาจารย์ ดร.รัตน์ฐาภัทร ธนโชติสุขสบาย",
        "position": "อาจารย์ประจำพิเศษ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "114",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "114",
          "name": "บัณฑิตวิทยาลัย"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cc-3ca6-4777-994a-1102d0632448",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cc-434d-4450-be37-d12f85d9d368",
        "idcard": "3670700193536",
        "code": "567708",
        "name": "อาจารย์ ดร.สุชิน ชาญสูงเนิน",
        "position": "อาจารย์ประจำพิเศษ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "114",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "114",
          "name": "บัณฑิตวิทยาลัย"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cc-434d-4450-be37-d12f85d9d368",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cc-49a7-4806-9ba9-f62c3ad4cbcf",
        "idcard": "3200900315060",
        "code": "567709",
        "name": "อาจารย์ ดร.อลงกต คชสาร",
        "position": "อาจารย์ประจำพิเศษ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "114",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "114",
          "name": "บัณฑิตวิทยาลัย"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cc-49a7-4806-9ba9-f62c3ad4cbcf",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cc-5043-4a3d-b2de-c5f488b68804",
        "idcard": "3630100511812",
        "code": "567710",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.เกรียงไกร ทองจิตติ",
        "position": "อาจารย์ประจำพิเศษ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "114",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "114",
          "name": "บัณฑิตวิทยาลัย"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cc-5043-4a3d-b2de-c5f488b68804",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cc-56b5-4506-adf3-e803259ecba3",
        "idcard": "3150200043025",
        "code": "567711",
        "name": "รองศาสตราจารย์ ดร.ธานี สุขเกษม",
        "position": "อาจารย์ประจำพิเศษ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "114",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "114",
          "name": "บัณฑิตวิทยาลัย"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cc-56b5-4506-adf3-e803259ecba3",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cc-5d34-4ca9-930e-b57a2f1f7d76",
        "idcard": "3670101196171",
        "code": "567712",
        "name": "นางสาวดวงใจ คำทิพย์",
        "position": "นักวิชาการคอมพิวเตอร์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "108",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "slxhfw",
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-12-13T06:28:48.000000Z",
        "deleted_at": null,
        "section": {
          "id": "108",
          "name": "สำนักวิทยบริการและเทคโนโลยีสารสนเทศ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cc-5d34-4ca9-930e-b57a2f1f7d76",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cc-640f-43d8-afa2-aca6e9370b7d",
        "idcard": "1679900384345",
        "code": "567713",
        "name": "นางสาวจิราภรณ์ พูนมี",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "108",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "108",
          "name": "สำนักวิทยบริการและเทคโนโลยีสารสนเทศ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cc-640f-43d8-afa2-aca6e9370b7d",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cc-6aa2-4f45-a2ad-5932caa76703",
        "idcard": "1670200183128",
        "code": "567716",
        "name": "นางสาวเสาวภา ดาปาน",
        "position": "เจ้าหน้าที่คลินิกเทคโนโลยี",
        "contact": "0633365463",
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "SSLKxB",
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2025-02-06T06:29:02.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cc-6aa2-4f45-a2ad-5932caa76703",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cc-70d8-4207-8ab5-5c243b2e9980",
        "idcard": "3670100094782",
        "code": "567717",
        "name": "นายวิทูล ทองเพชร",
        "position": "พนักงานสถานที่",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cc-70d8-4207-8ab5-5c243b2e9980",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cc-776a-4c3f-a9ec-47a4d1b8194b",
        "idcard": "3160101793778",
        "code": "567718",
        "name": "อาจารย์ ดร.ประดิษฐ์ ธิติศรัณย์",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cc-776a-4c3f-a9ec-47a4d1b8194b",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cc-7dc6-4e8b-9ee9-c646d425a325",
        "idcard": "3670300927729",
        "code": "567719",
        "name": "อาจารย์ ดร.ดวงใจ ปินตามูล",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cc-7dc6-4e8b-9ee9-c646d425a325",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cc-83ed-4c72-a805-f1cc01c2cb00",
        "idcard": "1679900486164",
        "code": "567720",
        "name": "นายวัชรพล ชมพู",
        "position": "เจ้าหน้าที่จัดอบรมและทดสอบทางภาษา",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10102",
          "name": "กองนโยบายและแผน"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cc-83ed-4c72-a805-f1cc01c2cb00",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cc-8a68-48c9-bea3-ead7b222ca8a",
        "idcard": "1679800271131",
        "code": "567721",
        "name": "นายจิรภัทร หาระชอน",
        "position": "พนักงานปฏิบัติการ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cc-8a68-48c9-bea3-ead7b222ca8a",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cc-90d4-49de-b7d0-f3f2a7694722",
        "idcard": "3180500282882",
        "code": "567722",
        "name": "อาจารย์ ดร.ประทวน คล้ายศรี",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "115",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "115",
          "name": "โครงการจัดตั้งวิทยาลัยนานาชาติ มหาวิทยาลัยราชภัฏเพชรบูรณ์โครงการจัดตั้งวิทยาลัยนานาชาติ มหาวิทยาลัยราชภัฏเพชรบูรณ์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cc-90d4-49de-b7d0-f3f2a7694722",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cc-9738-41e5-923c-77ed7fb84994",
        "idcard": "3110100327765",
        "code": "567723",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.ช่อเพชร เบ้าเงิน",
        "position": "อาจารย์ประจำพิเศษ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "115",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "115",
          "name": "โครงการจัดตั้งวิทยาลัยนานาชาติ มหาวิทยาลัยราชภัฏเพชรบูรณ์โครงการจัดตั้งวิทยาลัยนานาชาติ มหาวิทยาลัยราชภัฏเพชรบูรณ์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cc-9738-41e5-923c-77ed7fb84994",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cc-9e0e-4ea9-98ca-e922f5971edd",
        "idcard": "3100602742831",
        "code": "567724",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.อภิสรรค์ ภาชนะวรรณ",
        "position": "อาจารย์ประจำพิเศษ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "115",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "115",
          "name": "โครงการจัดตั้งวิทยาลัยนานาชาติ มหาวิทยาลัยราชภัฏเพชรบูรณ์โครงการจัดตั้งวิทยาลัยนานาชาติ มหาวิทยาลัยราชภัฏเพชรบูรณ์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cc-9e0e-4ea9-98ca-e922f5971edd",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cc-a49c-4cfa-a875-602797c747c7",
        "idcard": "3320200149972",
        "code": "567725",
        "name": "อาจารย์ ดร.วัชรินกร เมฆลา",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "115",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "115",
          "name": "โครงการจัดตั้งวิทยาลัยนานาชาติ มหาวิทยาลัยราชภัฏเพชรบูรณ์โครงการจัดตั้งวิทยาลัยนานาชาติ มหาวิทยาลัยราชภัฏเพชรบูรณ์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cc-a49c-4cfa-a875-602797c747c7",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cc-ab23-4408-9732-98657174b3da",
        "idcard": "3610100251080",
        "code": "567727",
        "name": "อาจารย์ ดร.จิรวัฒน์ กิติพิเชฐสวรรค์",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "115",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "115",
          "name": "โครงการจัดตั้งวิทยาลัยนานาชาติ มหาวิทยาลัยราชภัฏเพชรบูรณ์โครงการจัดตั้งวิทยาลัยนานาชาติ มหาวิทยาลัยราชภัฏเพชรบูรณ์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cc-ab23-4408-9732-98657174b3da",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cc-b1d5-48a0-b983-6499d59bd4c1",
        "idcard": "3670600209619",
        "code": "567728",
        "name": "อาจารย์ ดร.จิตราภรณ์ ใยศิลป์",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "115",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "115",
          "name": "โครงการจัดตั้งวิทยาลัยนานาชาติ มหาวิทยาลัยราชภัฏเพชรบูรณ์โครงการจัดตั้งวิทยาลัยนานาชาติ มหาวิทยาลัยราชภัฏเพชรบูรณ์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cc-b1d5-48a0-b983-6499d59bd4c1",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cc-b857-4efb-8cdf-e47ab243e197",
        "idcard": "3200500225802",
        "code": "567729",
        "name": "อาจารย์ ดร.อัมพล ชูสนุก",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "115",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "115",
          "name": "โครงการจัดตั้งวิทยาลัยนานาชาติ มหาวิทยาลัยราชภัฏเพชรบูรณ์โครงการจัดตั้งวิทยาลัยนานาชาติ มหาวิทยาลัยราชภัฏเพชรบูรณ์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cc-b857-4efb-8cdf-e47ab243e197",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cc-becc-4e1c-98d3-47675dff176c",
        "idcard": "3100601951844",
        "code": "567730",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.พจน์ ยงสกุลโรจน์",
        "position": "อาจารย์ประจำพิเศษ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "115",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "115",
          "name": "โครงการจัดตั้งวิทยาลัยนานาชาติ มหาวิทยาลัยราชภัฏเพชรบูรณ์โครงการจัดตั้งวิทยาลัยนานาชาติ มหาวิทยาลัยราชภัฏเพชรบูรณ์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cc-becc-4e1c-98d3-47675dff176c",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cc-c59b-44ab-a9bb-98ce3c1176e0",
        "idcard": "EJ18939440000",
        "code": "567731",
        "name": "อาจารย์ ดร.Lisheng Zhang",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "115",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "115",
          "name": "โครงการจัดตั้งวิทยาลัยนานาชาติ มหาวิทยาลัยราชภัฏเพชรบูรณ์โครงการจัดตั้งวิทยาลัยนานาชาติ มหาวิทยาลัยราชภัฏเพชรบูรณ์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cc-c59b-44ab-a9bb-98ce3c1176e0",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cc-cbd3-48e9-9c4b-ddedf24d0775",
        "idcard": "E935056430000",
        "code": "567732",
        "name": "อาจารย์ ดร.Xiaoyin Zhang",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "115",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "115",
          "name": "โครงการจัดตั้งวิทยาลัยนานาชาติ มหาวิทยาลัยราชภัฏเพชรบูรณ์โครงการจัดตั้งวิทยาลัยนานาชาติ มหาวิทยาลัยราชภัฏเพชรบูรณ์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cc-cbd3-48e9-9c4b-ddedf24d0775",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cc-d24d-43c0-89d0-6d20ea03aa07",
        "idcard": "EB50966520000",
        "code": "567733",
        "name": "อาจารย์ ดร.Yiqi Chen",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "115",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "115",
          "name": "โครงการจัดตั้งวิทยาลัยนานาชาติ มหาวิทยาลัยราชภัฏเพชรบูรณ์โครงการจัดตั้งวิทยาลัยนานาชาติ มหาวิทยาลัยราชภัฏเพชรบูรณ์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cc-d24d-43c0-89d0-6d20ea03aa07",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cc-d8c3-4439-a3fc-4d23b37f6fe6",
        "idcard": "EK21866930000",
        "code": "567734",
        "name": "อาจารย์ ดร.Jun Jiang",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "115",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "115",
          "name": "โครงการจัดตั้งวิทยาลัยนานาชาติ มหาวิทยาลัยราชภัฏเพชรบูรณ์โครงการจัดตั้งวิทยาลัยนานาชาติ มหาวิทยาลัยราชภัฏเพชรบูรณ์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cc-d8c3-4439-a3fc-4d23b37f6fe6",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cc-def6-4942-b767-7875c6fd60ce",
        "idcard": "3147059000000",
        "code": "567735",
        "name": "อาจารย์ ดร.Li Liou-Yuan",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "115",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "115",
          "name": "โครงการจัดตั้งวิทยาลัยนานาชาติ มหาวิทยาลัยราชภัฏเพชรบูรณ์โครงการจัดตั้งวิทยาลัยนานาชาติ มหาวิทยาลัยราชภัฏเพชรบูรณ์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cc-def6-4942-b767-7875c6fd60ce",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cc-e58e-499a-8a6e-d762037ea152",
        "idcard": "3311100554582",
        "code": "567736",
        "name": "นายเสกสรร แสงบุตร",
        "position": "พนักงานปฏิบัติการไฟฟ้า",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cc-e58e-499a-8a6e-d762037ea152",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cc-ebbe-4db2-9f35-4352b981774b",
        "idcard": "3670101195523",
        "code": "567737",
        "name": "นางมายิน คำตื้อ",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "3SPuuU",
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-12-16T08:25:11.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cc-ebbe-4db2-9f35-4352b981774b",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cc-f238-453b-9bfb-e2481670cb93",
        "idcard": "4670100007306",
        "code": "567738",
        "name": "นายเศกสรรค์ คงเจริญ",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cc-f238-453b-9bfb-e2481670cb93",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cc-f88e-4534-8e79-022206f33d03",
        "idcard": "3670100099521",
        "code": "567739",
        "name": "นางสาวณัฐธิกา บุญตั้ง",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "112",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "112",
          "name": "คณะพยาบาลศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cc-f88e-4534-8e79-022206f33d03",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cc-fea4-4c8a-956e-438c2ffbf416",
        "idcard": "1679900109280",
        "code": "567740",
        "name": "นางสาวพิมพ์ใจ ดีมูล",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "112",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "112",
          "name": "คณะพยาบาลศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cc-fea4-4c8a-956e-438c2ffbf416",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cd-04f1-4833-be8b-8dfe58d5d320",
        "idcard": "3670101223560",
        "code": "567741",
        "name": "นางสาวดาราวรรณ เพียรเกิด",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "112",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "112",
          "name": "คณะพยาบาลศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cd-04f1-4833-be8b-8dfe58d5d320",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cd-0b68-4cd3-ac91-5015aea2b45b",
        "idcard": "3670101378318",
        "code": "567742",
        "name": "นางสาวศรีนวล พานทองคำ",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "112",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "112",
          "name": "คณะพยาบาลศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cd-0b68-4cd3-ac91-5015aea2b45b",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cd-1205-4a59-ae38-89af5e7b7cc5",
        "idcard": "EL80507720000",
        "code": "567743",
        "name": "อาจารย์Wang Xiao",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cd-1205-4a59-ae38-89af5e7b7cc5",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cd-187e-4c9f-a17d-3510a21fb330",
        "idcard": "3100501335157",
        "code": "567744",
        "name": "ผู้ช่วยศาสตราจารย์ชาญชัย สุขสกุล",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "115",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "115",
          "name": "โครงการจัดตั้งวิทยาลัยนานาชาติ มหาวิทยาลัยราชภัฏเพชรบูรณ์โครงการจัดตั้งวิทยาลัยนานาชาติ มหาวิทยาลัยราชภัฏเพชรบูรณ์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cd-187e-4c9f-a17d-3510a21fb330",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cd-1ee7-4cb2-82ec-00ce9d8101d2",
        "idcard": "3670301310326",
        "code": "567745",
        "name": "อาจารย์ ดร.ทวีศักดิ์ ขันยศ",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "115",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "115",
          "name": "โครงการจัดตั้งวิทยาลัยนานาชาติ มหาวิทยาลัยราชภัฏเพชรบูรณ์โครงการจัดตั้งวิทยาลัยนานาชาติ มหาวิทยาลัยราชภัฏเพชรบูรณ์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cd-1ee7-4cb2-82ec-00ce9d8101d2",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cd-2532-415e-a0cc-5bc4d2bce125",
        "idcard": "5320501126013",
        "code": "567746",
        "name": "นายประสาน ทรงศรี",
        "position": "นักวิชาการศึกษา",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "115",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "115",
          "name": "โครงการจัดตั้งวิทยาลัยนานาชาติ มหาวิทยาลัยราชภัฏเพชรบูรณ์โครงการจัดตั้งวิทยาลัยนานาชาติ มหาวิทยาลัยราชภัฏเพชรบูรณ์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cd-2532-415e-a0cc-5bc4d2bce125",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cd-2b8f-4c97-b8b6-4859061d6fa8",
        "idcard": "1209701951103",
        "code": "567747",
        "name": "นางสาวจิตปรานี แสงงาม",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "115",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "115",
          "name": "โครงการจัดตั้งวิทยาลัยนานาชาติ มหาวิทยาลัยราชภัฏเพชรบูรณ์โครงการจัดตั้งวิทยาลัยนานาชาติ มหาวิทยาลัยราชภัฏเพชรบูรณ์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cd-2b8f-4c97-b8b6-4859061d6fa8",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cd-320f-40c4-aca8-0ceba87f2c3d",
        "idcard": "1209700440156",
        "code": "567749",
        "name": "นางสาวณัฐธกานต์ ปาระทัน",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "115",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "115",
          "name": "โครงการจัดตั้งวิทยาลัยนานาชาติ มหาวิทยาลัยราชภัฏเพชรบูรณ์โครงการจัดตั้งวิทยาลัยนานาชาติ มหาวิทยาลัยราชภัฏเพชรบูรณ์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cd-320f-40c4-aca8-0ceba87f2c3d",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cd-3886-4a4d-80b3-b1276580614b",
        "idcard": "3349800268849",
        "code": "567750",
        "name": "นายสุจิต แสงงาม",
        "position": "ช่างซ่อมบำรุง",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "115",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:05.000000Z",
        "updated_at": "2024-11-17T19:39:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "115",
          "name": "โครงการจัดตั้งวิทยาลัยนานาชาติ มหาวิทยาลัยราชภัฏเพชรบูรณ์โครงการจัดตั้งวิทยาลัยนานาชาติ มหาวิทยาลัยราชภัฏเพชรบูรณ์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cd-3886-4a4d-80b3-b1276580614b",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cd-3ed6-4500-890d-ea6ebb466835",
        "idcard": "1670700211660",
        "code": "567751",
        "name": "นายศุภชัย บุญสายยัง",
        "position": "นักวิชาการคอมพิวเตอร์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "108",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:06.000000Z",
        "updated_at": "2024-11-17T19:39:06.000000Z",
        "deleted_at": null,
        "section": {
          "id": "108",
          "name": "สำนักวิทยบริการและเทคโนโลยีสารสนเทศ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cd-3ed6-4500-890d-ea6ebb466835",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cd-4567-4c3f-88c6-291a3244d07d",
        "idcard": "3670101442920",
        "code": "567752",
        "name": "นายนิยม น้อยสาคำ",
        "position": "พนักงานรักษาความปลอดภัย",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:06.000000Z",
        "updated_at": "2024-11-17T19:39:06.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cd-4567-4c3f-88c6-291a3244d07d",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cd-4bf2-4a9c-a3be-8401b6ecd232",
        "idcard": "3670101418255",
        "code": "567754",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.กฤษฎากรณ์ ยูงทอง",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:06.000000Z",
        "updated_at": "2024-11-17T19:39:06.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cd-4bf2-4a9c-a3be-8401b6ecd232",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cd-5285-4b15-a22c-0ab8922df909",
        "idcard": "3840600165601",
        "code": "567755",
        "name": "อาจารย์พรพิมล อ่อนศรี",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:06.000000Z",
        "updated_at": "2024-11-17T19:39:06.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cd-5285-4b15-a22c-0ab8922df909",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cd-5924-4ea9-8fb2-6bfb5eaa317c",
        "idcard": "1460700212528",
        "code": "567756",
        "name": "นางสาวรัตนาภรณ์ ภูกองไชย",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "108",
        "keycloak_id": null,
        "telegram_chat_id": "8134495196",
        "telegram_link_code": "OHz7Tl",
        "created_at": "2024-11-17T19:39:06.000000Z",
        "updated_at": "2024-12-18T05:44:42.000000Z",
        "deleted_at": null,
        "section": {
          "id": "108",
          "name": "สำนักวิทยบริการและเทคโนโลยีสารสนเทศ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cd-5924-4ea9-8fb2-6bfb5eaa317c",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cd-5fc6-4e05-956c-c87e2948e668",
        "idcard": "1679900333457",
        "code": "567757",
        "name": "นายเอนก หอยสังข์",
        "position": "พนักงานสถานที่",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:06.000000Z",
        "updated_at": "2024-11-17T19:39:06.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cd-5fc6-4e05-956c-c87e2948e668",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cd-6685-433d-8a7e-42e1c11cd0e4",
        "idcard": "1679800273738",
        "code": "567758",
        "name": "นายชาญชัย ศรีสายคำ",
        "position": "เจ้าหน้าที่โสตทัศนูปกรณ์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:06.000000Z",
        "updated_at": "2024-11-17T19:39:06.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10102",
          "name": "กองนโยบายและแผน"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cd-6685-433d-8a7e-42e1c11cd0e4",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cd-6db5-4fd5-a66a-f87e175cfdd1",
        "idcard": "3160300751391",
        "code": "567759",
        "name": "นายนิวัฒน์ หอมขจร",
        "position": "พนักงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:06.000000Z",
        "updated_at": "2024-11-17T19:39:06.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cd-6db5-4fd5-a66a-f87e175cfdd1",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cd-7462-476f-9041-007d45a82812",
        "idcard": "3670100093476",
        "code": "567760",
        "name": "นางสาวสมคิด แก้วใหญ่",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:06.000000Z",
        "updated_at": "2024-11-17T19:39:06.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cd-7462-476f-9041-007d45a82812",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cd-7a9e-4c2b-addc-49828ebdbc6c",
        "idcard": "3670400005084",
        "code": "567761",
        "name": "นางสาวบุญเรือง นันเขียว",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:06.000000Z",
        "updated_at": "2024-11-17T19:39:06.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cd-7a9e-4c2b-addc-49828ebdbc6c",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cd-8148-4ee2-86af-3f4cdc04b544",
        "idcard": "1679900118688",
        "code": "567762",
        "name": "นางสายรุ้ง สุกเมือง",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "109",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:06.000000Z",
        "updated_at": "2024-11-17T19:39:06.000000Z",
        "deleted_at": null,
        "section": {
          "id": "109",
          "name": "สำนักศิลปะและวัฒนธรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cd-8148-4ee2-86af-3f4cdc04b544",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1cd-87a0-449f-9bb4-9a3e807812c3",
        "idcard": "1670190007039",
        "code": "567763",
        "name": "นางสาวนาถยา ศรีวัตร์",
        "position": "พนักงานอาคาร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:06.000000Z",
        "updated_at": "2024-11-17T19:39:06.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1cd-87a0-449f-9bb4-9a3e807812c3",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d5-d788-443d-8c11-f0c3bb82e075",
        "idcard": "MI752001",
        "code": "567764",
        "name": "อาจารย์Myint Zu Khaing",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "1",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:11.000000Z",
        "updated_at": "2024-11-17T19:39:11.000000Z",
        "deleted_at": null,
        "section": {
          "id": "1",
          "name": "มหาวิทยาลัยราชภัฎเพชรบูรณ์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d5-d788-443d-8c11-f0c3bb82e075",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9db495d8-ab7c-4c31-a2c2-b6728d156043",
        "idcard": "0000301471701",
        "code": "567765",
        "name": "อาจารย์ ดร.Chih-Hung Chen",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "115",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-12-12T07:42:17.000000Z",
        "updated_at": "2024-12-12T07:42:17.000000Z",
        "deleted_at": null,
        "section": {
          "id": "115",
          "name": "โครงการจัดตั้งวิทยาลัยนานาชาติ มหาวิทยาลัยราชภัฏเพชรบูรณ์โครงการจัดตั้งวิทยาลัยนานาชาติ มหาวิทยาลัยราชภัฏเพชรบูรณ์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9db495d8-ab7c-4c31-a2c2-b6728d156043",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9db49741-74c1-466d-b97e-c8257261f74a",
        "idcard": "0000EK4226225",
        "code": "567766",
        "name": "อาจารย์ ดร.Yuxia Kong",
        "position": "พนักงานปฎิบัติการคอมพิวเตอร์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "115",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-12-12T07:46:13.000000Z",
        "updated_at": "2024-12-12T07:46:13.000000Z",
        "deleted_at": null,
        "section": {
          "id": "115",
          "name": "โครงการจัดตั้งวิทยาลัยนานาชาติ มหาวิทยาลัยราชภัฏเพชรบูรณ์โครงการจัดตั้งวิทยาลัยนานาชาติ มหาวิทยาลัยราชภัฏเพชรบูรณ์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9db49741-74c1-466d-b97e-c8257261f74a",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9e10ba32-9f54-45ae-9328-f7510444a27e",
        "idcard": "3679900210351",
        "code": "568767",
        "name": "นายบุญมา มูลศรี",
        "position": "พนักงานขับรถยนต์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2025-01-27T03:00:05.000000Z",
        "updated_at": "2025-02-19T02:53:27.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10105",
          "name": "กองอาคารสถานที่"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9e10ba32-9f54-45ae-9328-f7510444a27e",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d5-e389-4e21-a9b1-7b93ae5fa09f",
        "idcard": "1620400012831",
        "code": "650001",
        "name": "นางสาวสุจิตรา จุ้ยวอน",
        "position": "หัวหน้างาน",
        "contact": "0931389318",
        "email": null,
        "email_verified_at": null,
        "section_id": "10102",
        "keycloak_id": null,
        "telegram_chat_id": "8133159872",
        "telegram_link_code": "QvLmS1",
        "created_at": "2024-11-17T19:39:11.000000Z",
        "updated_at": "2025-01-09T03:20:07.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10102",
          "name": "กองนโยบายและแผน"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d5-e389-4e21-a9b1-7b93ae5fa09f",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d5-e944-4714-9983-cf9b21582d67",
        "idcard": "3670300657853",
        "code": "652002",
        "name": "ผู้ช่วยศาสตราจารย์สนธยา วันชัย",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "6H73Aa",
        "created_at": "2024-11-17T19:39:11.000000Z",
        "updated_at": "2024-12-13T06:28:49.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d5-e944-4714-9983-cf9b21582d67",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d5-ee86-4592-9900-f303a47902db",
        "idcard": "3679900034898",
        "code": "652004",
        "name": "อาจารย์จิดาภา คำตื้อ",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "RVQrMa",
        "created_at": "2024-11-17T19:39:11.000000Z",
        "updated_at": "2025-03-05T06:39:58.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d5-ee86-4592-9900-f303a47902db",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d5-f41c-4996-a673-fe13d13ac5d2",
        "idcard": "3670301019923",
        "code": "652005",
        "name": "อาจารย์ณัฐชยา หุมนา",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:11.000000Z",
        "updated_at": "2024-11-17T19:39:11.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d5-f41c-4996-a673-fe13d13ac5d2",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d5-f98b-4327-be28-ed28d06caaa6",
        "idcard": "3310700676386",
        "code": "652007",
        "name": "ผู้ช่วยศาสตราจารย์วิลาสินี ดีปัญญา",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": "0842491665",
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "TkP1fo",
        "created_at": "2024-11-17T19:39:11.000000Z",
        "updated_at": "2025-01-27T03:52:19.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d5-f98b-4327-be28-ed28d06caaa6",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d5-ffbf-4c5f-b920-e2586891116f",
        "idcard": "3670101127081",
        "code": "652008",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.อัจฉรา กลิ่นจันทร์",
        "position": "รองอธิการบดีฝ่ายวางแผน และประกันคุณภาพการศึกษา",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "qU2Lcg",
        "created_at": "2024-11-17T19:39:11.000000Z",
        "updated_at": "2025-01-27T03:00:45.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0c4ad8-1ea9-456f-83cb-740d441433a0",
            "name": "admin",
            "description": "ผู้ดูแลระบบ",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d5-ffbf-4c5f-b920-e2586891116f",
              "role_id": "9d0c4ad8-1ea9-456f-83cb-740d441433a0"
            }
          },
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d5-ffbf-4c5f-b920-e2586891116f",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d6bcc4a-51a6-4f58-bfdd-aee476ff19f8",
        "idcard": "3670100095720",
        "code": "652011",
        "name": "นางวรรณภัสร์ ปราบพาลา",
        "position": "นักวิชาการคอมพิวเตอร์ชำนาญการ",
        "contact": "0927936235",
        "email": null,
        "email_verified_at": null,
        "section_id": "108",
        "keycloak_id": null,
        "telegram_chat_id": "7830405409",
        "telegram_link_code": "otdn78",
        "created_at": "2024-11-05T20:19:04.000000Z",
        "updated_at": "2025-02-21T07:39:03.000000Z",
        "deleted_at": null,
        "section": {
          "id": "108",
          "name": "สำนักวิทยบริการและเทคโนโลยีสารสนเทศ"
        },
        "roles": [
          {
            "uuid": "9db21068-b307-4fda-b96a-947b348103ef",
            "name": "superadmin",
            "description": "ผู้ดูแลระบบสูงสุด",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d6bcc4a-51a6-4f58-bfdd-aee476ff19f8",
              "role_id": "9db21068-b307-4fda-b96a-947b348103ef"
            }
          },
          {
            "uuid": "9de1769b-14df-43c3-818f-4c7056472c6e",
            "name": "admin_org",
            "description": "ผู้ดูแลหน่วยงาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d6bcc4a-51a6-4f58-bfdd-aee476ff19f8",
              "role_id": "9de1769b-14df-43c3-818f-4c7056472c6e"
            }
          }
        ]
      },
      {
        "id": "9d83e1d6-0634-4b02-b478-c52e7653888a",
        "idcard": "5670100069458",
        "code": "652012",
        "name": "นายทองสุก คำตะพล",
        "position": "นักวิชาการคอมพิวเตอร์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "108",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "pmkF84",
        "created_at": "2024-11-17T19:39:11.000000Z",
        "updated_at": "2024-12-13T06:29:24.000000Z",
        "deleted_at": null,
        "section": {
          "id": "108",
          "name": "สำนักวิทยบริการและเทคโนโลยีสารสนเทศ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d6-0634-4b02-b478-c52e7653888a",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d6-0d04-426e-9081-486d32ccfe16",
        "idcard": "1679900031761",
        "code": "652014",
        "name": "นายวิเศษ เกตุดี",
        "position": "นักวิชาการคอมพิวเตอร์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "108",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:11.000000Z",
        "updated_at": "2024-11-17T19:39:11.000000Z",
        "deleted_at": null,
        "section": {
          "id": "108",
          "name": "สำนักวิทยบริการและเทคโนโลยีสารสนเทศ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d6-0d04-426e-9081-486d32ccfe16",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d6-13ad-4793-a934-fb394ff7ad70",
        "idcard": "3450400207452",
        "code": "652016",
        "name": "นายขวัญชัย บุญทองเถิง",
        "position": "นักวิชาการโสตทัศนศึกษา",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "108",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:11.000000Z",
        "updated_at": "2024-11-17T19:39:11.000000Z",
        "deleted_at": null,
        "section": {
          "id": "108",
          "name": "สำนักวิทยบริการและเทคโนโลยีสารสนเทศ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d6-13ad-4793-a934-fb394ff7ad70",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d6-1a58-4358-8bb2-03548046958b",
        "idcard": "3660800385461",
        "code": "652019",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.อาทิตยา ขาวพราย",
        "position": "อาจารย์",
        "contact": "0869344366",
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": "7846610157",
        "telegram_link_code": "oEZzIJ",
        "created_at": "2024-11-17T19:39:11.000000Z",
        "updated_at": "2024-12-16T08:39:42.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d6-1a58-4358-8bb2-03548046958b",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d6-20fb-4af4-803a-9ce8a688d06f",
        "idcard": "3670400206713",
        "code": "652022",
        "name": "ผู้ช่วยศาสตราจารย์ทิวา แก้วเสริม",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": "0875276707",
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": "7228847224",
        "telegram_link_code": "HImJjY",
        "created_at": "2024-11-17T19:39:11.000000Z",
        "updated_at": "2025-01-19T09:47:33.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d6-20fb-4af4-803a-9ce8a688d06f",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d6-2783-4510-a538-ab611a6208cb",
        "idcard": "3670101080718",
        "code": "652023",
        "name": "ผู้ช่วยศาสตราจารย์ขุนแผน ตุ้มทองคำ",
        "position": "รองคณบดี/รองผู้อำนวยการ",
        "contact": "0993826888",
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": "7386045933",
        "telegram_link_code": "gxGUJd",
        "created_at": "2024-11-17T19:39:11.000000Z",
        "updated_at": "2024-12-20T03:49:24.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d6-2783-4510-a538-ab611a6208cb",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d6-2e06-4ee0-8818-a706fcbecc0c",
        "idcard": "3679900103903",
        "code": "652024",
        "name": "อาจารย์นภาพร ตุ้มทองคำ",
        "position": "รองคณบดี/รองผู้อำนวยการ",
        "contact": "0922684146",
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": "7736162080",
        "telegram_link_code": "w01Ld0",
        "created_at": "2024-11-17T19:39:11.000000Z",
        "updated_at": "2025-01-22T07:12:00.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d6-2e06-4ee0-8818-a706fcbecc0c",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d6-347a-4a0e-b4d9-62bae8578c11",
        "idcard": "3670800028138",
        "code": "652025",
        "name": "ผู้ช่วยศาสตราจารย์ปริยากร บัวทอง",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": "0899596164",
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": "7585795895",
        "telegram_link_code": "TN7LkP",
        "created_at": "2024-11-17T19:39:11.000000Z",
        "updated_at": "2025-01-22T06:55:31.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d6-347a-4a0e-b4d9-62bae8578c11",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d6-3b0a-40d0-8512-d8f1360bba96",
        "idcard": "3679800061478",
        "code": "652027",
        "name": "อาจารย์ ดร.สุวิชา พุทธารัตน์",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "cQBjI3",
        "created_at": "2024-11-17T19:39:11.000000Z",
        "updated_at": "2025-01-31T05:42:30.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d6-3b0a-40d0-8512-d8f1360bba96",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d6-41ab-4b75-8042-53ef41a94e33",
        "idcard": "3600900087047",
        "code": "652028",
        "name": "รองศาสตราจารย์ ดร.ธรรม์ณชาติ วันแต่ง",
        "position": "ผู้อำนวยการกองหรือเทียบเท่า",
        "contact": "0956436336",
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "glwA3u",
        "created_at": "2024-11-17T19:39:11.000000Z",
        "updated_at": "2024-12-20T08:04:20.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d6-41ab-4b75-8042-53ef41a94e33",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d6-4876-4928-87cb-3a0c0fd1e93c",
        "idcard": "3670300533984",
        "code": "652030",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.วุฒิพงศ์ บัวช้อย",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": "652030",
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "H8Vp2f",
        "created_at": "2024-11-17T19:39:11.000000Z",
        "updated_at": "2025-01-09T05:18:25.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d6-4876-4928-87cb-3a0c0fd1e93c",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d6-4f12-407f-a70d-cc1fbd3c2cdd",
        "idcard": "5670800053511",
        "code": "652031",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.สุวัฒน์ อินทรประไพ",
        "position": "รองคณบดี/รองผู้อำนวยการ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:11.000000Z",
        "updated_at": "2024-11-17T19:39:11.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d6-4f12-407f-a70d-cc1fbd3c2cdd",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d6-568a-4c85-a526-8d008385c306",
        "idcard": "3100601124948",
        "code": "652033",
        "name": "อาจารย์กนกวรรณ นวาวัตน์",
        "position": "ประธานหลักสูตรสาขาวิชาภาษาอังกฤษ",
        "contact": "0816119675",
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "HxXPU1",
        "created_at": "2024-11-17T19:39:11.000000Z",
        "updated_at": "2025-02-11T13:10:43.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d6-568a-4c85-a526-8d008385c306",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d6-5d22-445b-aa2b-380cfc1b76c8",
        "idcard": "3679900047515",
        "code": "652035",
        "name": "อาจารย์ ดร.ปิยะนุช พรหมประเสริฐ",
        "position": "รองคณบดี/รองผู้อำนวยการ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:11.000000Z",
        "updated_at": "2024-11-17T19:39:11.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d6-5d22-445b-aa2b-380cfc1b76c8",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d6-63c4-4902-9342-d99c189d1ac0",
        "idcard": "3679800034209",
        "code": "652037",
        "name": "อาจารย์ปุณฑริกา สุคนธสิงห์",
        "position": "อาจารย์",
        "contact": "0817864466",
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": "7612264470",
        "telegram_link_code": "5jegny",
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2024-12-13T07:46:34.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d6-63c4-4902-9342-d99c189d1ac0",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d6-6a3a-4b5c-a067-27e5194ec936",
        "idcard": "3670100876322",
        "code": "652038",
        "name": "อาจารย์ปราณีต ใจหนัก",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2024-11-17T19:39:12.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d6-6a3a-4b5c-a067-27e5194ec936",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d6-70d6-4924-b7fd-cd55ae2df49d",
        "idcard": "3679900135511",
        "code": "652039",
        "name": "อาจารย์ศิริพงษ์ เหมมั่น",
        "position": "อาจารย์",
        "contact": "0896444404",
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": "7849047801",
        "telegram_link_code": "x3BOaj",
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2025-01-13T12:07:33.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d6-70d6-4924-b7fd-cd55ae2df49d",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d6-773b-4ec8-bbc5-14d9888b984a",
        "idcard": "3679800023771",
        "code": "652040",
        "name": "ผู้ช่วยศาสตราจารย์นภาลัย บุญทิม",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2024-11-17T19:39:12.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d6-773b-4ec8-bbc5-14d9888b984a",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d6-7dcf-46a7-b1e5-1ffbb754972a",
        "idcard": "3650100426581",
        "code": "652041",
        "name": "ผู้ช่วยศาสตราจารย์อดุลย์ศิริ สัตย์เจริญ",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2024-11-17T19:39:12.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d6-7dcf-46a7-b1e5-1ffbb754972a",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d6-845c-4acd-9092-a4e158d74f03",
        "idcard": "3670100419266",
        "code": "652042",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.นิพนธ์ เพชระบูรณิน",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": "0910291129",
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "Olhl8Q",
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2025-01-30T03:11:09.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d6-845c-4acd-9092-a4e158d74f03",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d6-8acb-479e-952d-dabd728b2318",
        "idcard": "3679900030272",
        "code": "652043",
        "name": "อาจารย์รักชนก สมศักดิ์",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2024-11-17T19:39:12.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d6-8acb-479e-952d-dabd728b2318",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d6-9143-48d3-b945-1414126696fe",
        "idcard": "3670400213299",
        "code": "652044",
        "name": "ผู้ช่วยศาสตราจารย์สุรางค์รัตน์ พันแสง",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": "0882930838",
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "SKRW7x",
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2025-01-28T05:16:20.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d6-9143-48d3-b945-1414126696fe",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d6-9827-487e-826b-e62d1c01237d",
        "idcard": "3679900165844",
        "code": "652045",
        "name": "ผู้ช่วยศาสตราจารย์ขวัญจิตต์ อนุกูลวัฒนา",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2024-11-17T19:39:12.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d6-9827-487e-826b-e62d1c01237d",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d6-9ebf-4d9b-82de-c90d612b02ac",
        "idcard": "3449900173814",
        "code": "652046",
        "name": "ผู้ช่วยศาสตราจารย์ตรีชฎา อุทัยดา",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2024-11-17T19:39:12.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d6-9ebf-4d9b-82de-c90d612b02ac",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d6-a53e-47fc-ad54-92200030743f",
        "idcard": "5670300079317",
        "code": "652047",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.นฤมล จันทร์มา",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": "0825391926",
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "2SCAl0",
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2025-01-08T07:01:11.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d6-a53e-47fc-ad54-92200030743f",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d6-abc7-4046-a6ed-c1b25e2b6077",
        "idcard": "3660700045189",
        "code": "652049",
        "name": "อาจารย์อนุพงษ์ สุขประเสริฐ",
        "position": "รองคณบดี/รองผู้อำนวยการ",
        "contact": "0845955271",
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "IP94K3",
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2025-01-16T02:54:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d6-abc7-4046-a6ed-c1b25e2b6077",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d6-b24e-414c-aa6a-d817eb71e502",
        "idcard": "3660700016740",
        "code": "652051",
        "name": "อาจารย์ ดร.โดมธราดล อนันตสาน",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2024-11-17T19:39:12.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d6-b24e-414c-aa6a-d817eb71e502",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d6-b8e0-4909-8fa5-bed79c3db233",
        "idcard": "3670100795101",
        "code": "652053",
        "name": "นางสาวขนิษฐา ขันตี",
        "position": "หัวหน้างาน",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2024-11-17T19:39:12.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d6-b8e0-4909-8fa5-bed79c3db233",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d6-bf8e-4d5f-8a32-08250d31898f",
        "idcard": "3670101426321",
        "code": "652055",
        "name": "นางจารุวรรณ จิรังนิมิตสกุล",
        "position": "นักวิชาการเงินและบัญชีชำนาญการ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2024-11-17T19:39:12.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d6-bf8e-4d5f-8a32-08250d31898f",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d6-c636-43e1-89f2-730f3f55edab",
        "idcard": "5670100020327",
        "code": "652056",
        "name": "นางสุทธิดา พาเวียง",
        "position": "นักวิชาการเงินและบัญชีชำนาญการ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2024-11-17T19:39:12.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d6-c636-43e1-89f2-730f3f55edab",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d6-cce9-4493-85b3-43bc70f64067",
        "idcard": "3670100211355",
        "code": "652058",
        "name": "นายศิริชัย ตาลสุก",
        "position": "บุคลากรชำนาญการ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "fg95bp",
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2025-02-28T08:31:30.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d6-cce9-4493-85b3-43bc70f64067",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d6-d3b5-43f4-8e0b-fb8a0dfe46e2",
        "idcard": "3670301424739",
        "code": "652059",
        "name": "นายศักธิชัย จันทร์ศรี",
        "position": "หัวหน้างาน",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2025-02-19T02:53:50.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10105",
          "name": "กองอาคารสถานที่"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d6-d3b5-43f4-8e0b-fb8a0dfe46e2",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d6-da5a-4a3e-a017-96b88f63429c",
        "idcard": "3670101139160",
        "code": "652062",
        "name": "นางสาวไพรินทร์ เดชะ",
        "position": "ผู้อำนวยการกองหรือเทียบเท่า",
        "contact": "0896380623",
        "email": null,
        "email_verified_at": null,
        "section_id": "10102",
        "keycloak_id": null,
        "telegram_chat_id": "7720475955",
        "telegram_link_code": "v09QFa",
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2025-01-09T03:14:07.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10102",
          "name": "กองนโยบายและแผน"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d6-da5a-4a3e-a017-96b88f63429c",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          },
          {
            "uuid": "9db21068-b307-4fda-b96a-947b348103ef",
            "name": "superadmin",
            "description": "ผู้ดูแลระบบสูงสุด",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d6-da5a-4a3e-a017-96b88f63429c",
              "role_id": "9db21068-b307-4fda-b96a-947b348103ef"
            }
          }
        ]
      },
      {
        "id": "9d83e1d6-e105-4d0e-8b8c-638dc45d3a5d",
        "idcard": "1679900101238",
        "code": "652063",
        "name": "นางสาวระวิพันธ์ แตงตรง",
        "position": "หัวหน้างานบริหารและธุรการ",
        "contact": "6513",
        "email": null,
        "email_verified_at": null,
        "section_id": "10103",
        "keycloak_id": null,
        "telegram_chat_id": "7911191787",
        "telegram_link_code": "GZxYbw",
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2025-02-10T03:03:30.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10103",
          "name": "กองพัฒนานักศึกษา"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d6-e105-4d0e-8b8c-638dc45d3a5d",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d6-e7af-423c-a336-4d3af17bdabd",
        "idcard": "3670101473051",
        "code": "652064",
        "name": "นางปนิตา รังวรรณา",
        "position": "หัวหน้างาน",
        "contact": "0875243389",
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "xcc7f4",
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2025-01-21T07:37:27.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d6-e7af-423c-a336-4d3af17bdabd",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d6-ee60-42fa-898e-42e0f14aedad",
        "idcard": "3670100480127",
        "code": "652065",
        "name": "นางสาวกฤษณา นวลดี",
        "position": "เจ้าหน้าที่บริหารงานทั่วไปชำนาญการ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "PhRo71",
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2024-12-13T06:33:46.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d6-ee60-42fa-898e-42e0f14aedad",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d6-f507-4b54-824a-aadccb910570",
        "idcard": "3670100262197",
        "code": "652066",
        "name": "นางณัฐณิชา อินจำปา",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": "0948306481",
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "D9hypd",
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2025-02-18T08:45:02.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d6-f507-4b54-824a-aadccb910570",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d6-fbb0-459b-bc67-c24aabba9da9",
        "idcard": "3779900066900",
        "code": "652068",
        "name": "นางสาวกนิษฐ์ กรนานันท์",
        "position": "หัวหน้างาน",
        "contact": "0863617187",
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "znMWuh",
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2024-12-26T07:43:48.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d6-fbb0-459b-bc67-c24aabba9da9",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d7-025e-45bf-a874-503e236aca26",
        "idcard": "3670101299213",
        "code": "652070",
        "name": "นางสาววาสนา จันทร์ดี",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": "0992358983",
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "Hw3U96",
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2024-12-13T06:24:31.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d7-025e-45bf-a874-503e236aca26",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d7-092b-4555-9745-bb314ba80e45",
        "idcard": "3670300364881",
        "code": "652071",
        "name": "นางอรวรรณ ดีพา",
        "position": "เจ้าหน้าที่บริหารงานทั่วไปชำนาญการ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "weOWj9",
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2024-12-13T06:17:15.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d7-092b-4555-9745-bb314ba80e45",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d7-0fd6-4964-ae74-3765f5c5319d",
        "idcard": "1670400001210",
        "code": "652074",
        "name": "นางสาวศิรินทิพย์ ผลประเสริฐ",
        "position": "หัวหน้างาน",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "107",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "36EtHZ",
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2025-03-04T08:08:06.000000Z",
        "deleted_at": null,
        "section": {
          "id": "107",
          "name": "สถาบันวิจัยและพัฒนา"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d7-0fd6-4964-ae74-3765f5c5319d",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          },
          {
            "uuid": "9de1769b-14df-43c3-818f-4c7056472c6e",
            "name": "admin_org",
            "description": "ผู้ดูแลหน่วยงาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d7-0fd6-4964-ae74-3765f5c5319d",
              "role_id": "9de1769b-14df-43c3-818f-4c7056472c6e"
            }
          }
        ]
      },
      {
        "id": "9d83e1d7-16a1-4239-89bd-6115bfd359e6",
        "idcard": "2670100002171",
        "code": "652076",
        "name": "นางมัทนา จันทร์ศรี",
        "position": "หัวหน้างาน",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "108",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "ecUK8c",
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2025-01-03T06:56:48.000000Z",
        "deleted_at": null,
        "section": {
          "id": "108",
          "name": "สำนักวิทยบริการและเทคโนโลยีสารสนเทศ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d7-16a1-4239-89bd-6115bfd359e6",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d7-1d89-49cd-8c7b-cb47a75b00c5",
        "idcard": "3670101355750",
        "code": "652077",
        "name": "นายจำรัส ด้วงดี",
        "position": "บรรณารักษ์ชำนาญการ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "108",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2024-11-17T19:39:12.000000Z",
        "deleted_at": null,
        "section": {
          "id": "108",
          "name": "สำนักวิทยบริการและเทคโนโลยีสารสนเทศ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d7-1d89-49cd-8c7b-cb47a75b00c5",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d7-243f-45c3-a2ba-8b78c9f4fb55",
        "idcard": "3670101131398",
        "code": "652078",
        "name": "นางนิภา พิลาเกิด",
        "position": "นักวิชาการวัฒนธรรม",
        "contact": "0896418563",
        "email": null,
        "email_verified_at": null,
        "section_id": "109",
        "keycloak_id": null,
        "telegram_chat_id": "7801885064",
        "telegram_link_code": "GInQ97",
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2024-12-16T07:24:43.000000Z",
        "deleted_at": null,
        "section": {
          "id": "109",
          "name": "สำนักศิลปะและวัฒนธรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d7-243f-45c3-a2ba-8b78c9f4fb55",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          },
          {
            "uuid": "9de1769b-14df-43c3-818f-4c7056472c6e",
            "name": "admin_org",
            "description": "ผู้ดูแลหน่วยงาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d7-243f-45c3-a2ba-8b78c9f4fb55",
              "role_id": "9de1769b-14df-43c3-818f-4c7056472c6e"
            }
          }
        ]
      },
      {
        "id": "9d83e1d7-2b73-42bb-8d07-138f94e234cb",
        "idcard": "1670100023099",
        "code": "652079",
        "name": "นางสาววณิชยา บัวสิงคำ",
        "position": "หัวหน้างาน",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "110",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "CjVQZk",
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2024-12-13T06:29:06.000000Z",
        "deleted_at": null,
        "section": {
          "id": "110",
          "name": "สำนักส่งเสริมวิชาการและงานทะเบียน"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d7-2b73-42bb-8d07-138f94e234cb",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d7-3235-4964-859d-9bc2c11151a4",
        "idcard": "3670100471764",
        "code": "652080",
        "name": "นางจินตนา ศักดิ์เสถียรกุล",
        "position": "หัวหน้างาน",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "110",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2024-11-17T19:39:12.000000Z",
        "deleted_at": null,
        "section": {
          "id": "110",
          "name": "สำนักส่งเสริมวิชาการและงานทะเบียน"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d7-3235-4964-859d-9bc2c11151a4",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d7-38ed-4a15-b76a-22313f41e2bf",
        "idcard": "3670100793338",
        "code": "652081",
        "name": "นางสาววารินทร์ เพชระบูรณิน",
        "position": "เจ้าหน้าที่บริหารงานทั่วไปชำนาญการ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "110",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "et9sfY",
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2024-12-20T04:17:43.000000Z",
        "deleted_at": null,
        "section": {
          "id": "110",
          "name": "สำนักส่งเสริมวิชาการและงานทะเบียน"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d7-38ed-4a15-b76a-22313f41e2bf",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d7-3f8d-475e-9544-ae4ddc68dc46",
        "idcard": "3670100032493",
        "code": "652082",
        "name": "นางรัชนี ใจรักษ์",
        "position": "นักวิชาการศึกษาชำนาญการ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "110",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "b0AaHH",
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2024-12-17T04:26:21.000000Z",
        "deleted_at": null,
        "section": {
          "id": "110",
          "name": "สำนักส่งเสริมวิชาการและงานทะเบียน"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d7-3f8d-475e-9544-ae4ddc68dc46",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d7-4647-49d0-b38e-b36ec25beec9",
        "idcard": "3100200334631",
        "code": "652084",
        "name": "รองศาสตราจารย์ ดร.กานต์ อัมพานนท์",
        "position": "คณบดี",
        "contact": "0813757012",
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": "8167339934",
        "telegram_link_code": "SK4f4K",
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2025-03-13T04:20:35.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d7-4647-49d0-b38e-b36ec25beec9",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d7-4cb7-40ee-aeb4-e316c2dfcabf",
        "idcard": "1669900003163",
        "code": "652085",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.ศศิกานต์ ปานปราณีเจริญ",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2024-11-17T19:39:12.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d7-4cb7-40ee-aeb4-e316c2dfcabf",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d7-5354-4662-83c3-edcb1c732d3a",
        "idcard": "3420700010964",
        "code": "652086",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.นุชจรี สิงห์พันธ์",
        "position": "ผู้ช่วยศาสตราจารย์ ดร.",
        "contact": "0813494274",
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "f3XHOR",
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2025-01-09T06:19:44.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d7-5354-4662-83c3-edcb1c732d3a",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d7-59e4-475a-9207-32c98427d4d2",
        "idcard": "3639800048412",
        "code": "652088",
        "name": "นางสาวปาริชาติ ยศปาน",
        "position": "หัวหน้างาน",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "VXhRpH",
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2024-12-20T07:25:44.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10102",
          "name": "กองนโยบายและแผน"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d7-59e4-475a-9207-32c98427d4d2",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d7-6061-4019-b544-41f854f871df",
        "idcard": "3670100416895",
        "code": "653002",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.สุปราณี พิศมัย",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": "0959644791",
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": "7066879676",
        "telegram_link_code": "BucAUS",
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2025-01-15T04:33:23.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d7-6061-4019-b544-41f854f871df",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d7-66ed-4b29-9c76-d69a2cfd6b50",
        "idcard": "5670190077404",
        "code": "653004",
        "name": "นายขวัญชัย แก่นไทย",
        "position": "นักวิชาการคอมพิวเตอร์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "110",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "Vt7VK9",
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2025-02-10T09:20:51.000000Z",
        "deleted_at": null,
        "section": {
          "id": "110",
          "name": "สำนักส่งเสริมวิชาการและงานทะเบียน"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d7-66ed-4b29-9c76-d69a2cfd6b50",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d7-6d8e-4fa8-b347-da21504880d0",
        "idcard": "3670300653998",
        "code": "653010",
        "name": "อาจารย์ศรัญญา ตรีทศ",
        "position": "อาจารย์",
        "contact": "0896388588",
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "nOqkxo",
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2025-01-28T05:49:19.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d7-6d8e-4fa8-b347-da21504880d0",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d7-7417-45c2-87b0-727f42bd8b26",
        "idcard": "3670100095738",
        "code": "653011",
        "name": "นางสาวสุภารัตน์ หอยสังข์",
        "position": "นักวิชาการพัสดุ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2024-11-17T19:39:12.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d7-7417-45c2-87b0-727f42bd8b26",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d7-7aec-4d7a-a63f-1cbe378c6178",
        "idcard": "3601101275498",
        "code": "653012",
        "name": "นายอภิรักษ์ อุ่นดี",
        "position": "นักวิชาการคอมพิวเตอร์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "108",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "ZZygBS",
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2025-01-08T13:32:38.000000Z",
        "deleted_at": null,
        "section": {
          "id": "108",
          "name": "สำนักวิทยบริการและเทคโนโลยีสารสนเทศ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d7-7aec-4d7a-a63f-1cbe378c6178",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d7-817d-46ea-b685-96f0bfa5e286",
        "idcard": "1670400006416",
        "code": "653013",
        "name": "นางสุจิตรา ดีดาร์",
        "position": "เจ้าหน้าที่บริหารงานทั่วไปชำนาญการ",
        "contact": "0871511948",
        "email": null,
        "email_verified_at": null,
        "section_id": "110",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "Qpzdou",
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2025-01-08T08:19:08.000000Z",
        "deleted_at": null,
        "section": {
          "id": "110",
          "name": "สำนักส่งเสริมวิชาการและงานทะเบียน"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d7-817d-46ea-b685-96f0bfa5e286",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d7-8854-47f8-a6c6-749be6569d72",
        "idcard": "3670100556573",
        "code": "654014",
        "name": "อาจารย์ ดร.ภูมินทร์ เหลาอำนาจ",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2024-11-17T19:39:12.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d7-8854-47f8-a6c6-749be6569d72",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d7-8ef3-41f6-9948-2daaeca90282",
        "idcard": "3309901415146",
        "code": "654016",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.กมลวิช ลอยมา",
        "position": "รองอธิการบดีฝ่ายบริหารและกิจการสภามหาวิทยาลัย",
        "contact": "0953244787",
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "2nR22W",
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2025-01-13T10:07:56.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d7-8ef3-41f6-9948-2daaeca90282",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d7-95bd-4e01-827d-9996f2e3bbbb",
        "idcard": "3620600585203",
        "code": "654017",
        "name": "อาจารย์ณัฐกานต์ พึ่งกุศล",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2024-11-17T19:39:12.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d7-95bd-4e01-827d-9996f2e3bbbb",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d7-9c58-4fb6-8771-ad1fdd73a953",
        "idcard": "3679800137580",
        "code": "654018",
        "name": "อาจารย์ฉัตรชัย เสมาทอง",
        "position": "อาจารย์",
        "contact": "0897031653",
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "7JmQh1",
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2025-01-07T06:13:54.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d7-9c58-4fb6-8771-ad1fdd73a953",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d7-a2f0-420a-b24c-9fa8c585eba6",
        "idcard": "3160300105162",
        "code": "654019",
        "name": "อาจารย์สุกาญดา ทองคำ",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2024-11-17T19:39:12.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d7-a2f0-420a-b24c-9fa8c585eba6",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d7-a989-4809-b14a-c3c2b767e1c2",
        "idcard": "5679900001848",
        "code": "654022",
        "name": "อาจารย์ ดร.ฤทัยรัตน์ น้อยคนดี",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2024-11-17T19:39:12.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d7-a989-4809-b14a-c3c2b767e1c2",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d7-b018-46d3-8202-f677ebb20a48",
        "idcard": "1679900006308",
        "code": "654023",
        "name": "อาจารย์ณัฐณิชา อินทร์เพ็ญ",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2024-11-17T19:39:12.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d7-b018-46d3-8202-f677ebb20a48",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d7-b698-4cc6-9f3c-2670a814d208",
        "idcard": "3670100940896",
        "code": "654024",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.กมล อยู่สุข",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2024-11-17T19:39:12.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d7-b698-4cc6-9f3c-2670a814d208",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d7-bd46-43cc-80e3-b289790731b9",
        "idcard": "3102002582622",
        "code": "654025",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.ฐากูร อนุสรณ์พาณิชกุล",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "Om4IGL",
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2024-12-13T06:30:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d7-bd46-43cc-80e3-b289790731b9",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d7-c417-4a8b-89a3-2813dabfc62c",
        "idcard": "5670800020168",
        "code": "654026",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.ปรเมษฐ์ วงษ์พุทธิชัย",
        "position": "อาจารย์",
        "contact": "0868863647",
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "yPp1y7",
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2025-03-04T08:09:47.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d7-c417-4a8b-89a3-2813dabfc62c",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d7-caa5-42d4-aff7-7f99dd2b9177",
        "idcard": "3670300439333",
        "code": "654027",
        "name": "อาจารย์ศิวภรณ์ ใสโต",
        "position": "อาจารย์",
        "contact": "0966561156",
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": "7356434546",
        "telegram_link_code": "2nDSPq",
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2025-01-06T11:16:31.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d7-caa5-42d4-aff7-7f99dd2b9177",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d7-d13f-4e23-b2c8-0aef14081d4d",
        "idcard": "3670100167461",
        "code": "654028",
        "name": "อาจารย์จินลภัชญ์ ปรินธิรานันต์",
        "position": "อาจารย์",
        "contact": "0954514162",
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "eFXiQo",
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2025-01-22T08:03:49.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d7-d13f-4e23-b2c8-0aef14081d4d",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d7-d7d2-44e4-a7dc-9fc0c1fd61f5",
        "idcard": "3190500090070",
        "code": "654029",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.สุภชัย ตรีทศ",
        "position": "รองคณบดี/รองผู้อำนวยการ",
        "contact": "0947495595",
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": "7983229078",
        "telegram_link_code": "DoEJ0j",
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2025-01-20T05:00:38.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d7-d7d2-44e4-a7dc-9fc0c1fd61f5",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d7-de7a-44c7-af04-6b577272c4e4",
        "idcard": "3670100850811",
        "code": "654031",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.ดอกอ้อ ขวัญนิน",
        "position": "อาจารย์",
        "contact": "0962419149",
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "XjqhUU",
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2025-01-30T03:11:54.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d7-de7a-44c7-af04-6b577272c4e4",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d7-e571-485e-b586-dab59c4275c3",
        "idcard": "3640500065976",
        "code": "654032",
        "name": "ผู้ช่วยศาสตราจารย์วิภาวดี ผกามาศ",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "RQpgkZ",
        "created_at": "2024-11-17T19:39:12.000000Z",
        "updated_at": "2025-01-17T09:07:14.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d7-e571-485e-b586-dab59c4275c3",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d7-ebfe-4ea3-917d-b1d9a54e5237",
        "idcard": "3929800066671",
        "code": "654033",
        "name": "ผู้ช่วยศาสตราจารย์น้ำผึ้ง พูนวิวัฒน์",
        "position": "รองคณบดี/รองผู้อำนวยการ",
        "contact": "0882730079",
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": "6448731926",
        "telegram_link_code": "m6zesk",
        "created_at": "2024-11-17T19:39:13.000000Z",
        "updated_at": "2025-01-22T06:58:27.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d7-ebfe-4ea3-917d-b1d9a54e5237",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d7-f2fc-4682-9914-1748a0737bd0",
        "idcard": "3471500172341",
        "code": "654034",
        "name": "ผู้ช่วยศาสตราจารย์ประธาน เรียงลาด",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "uQO2DB",
        "created_at": "2024-11-17T19:39:13.000000Z",
        "updated_at": "2025-01-22T07:03:41.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d7-f2fc-4682-9914-1748a0737bd0",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d7-fa03-48a6-aea5-160e06181f4e",
        "idcard": "3660700337775",
        "code": "654035",
        "name": "ผู้ช่วยศาสตราจารย์เจษฎาพร ปาคำวัง",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": "0826695539",
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "6GJ7qR",
        "created_at": "2024-11-17T19:39:13.000000Z",
        "updated_at": "2024-12-27T06:47:14.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d7-fa03-48a6-aea5-160e06181f4e",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d8-00da-4676-8c80-938550a4b69b",
        "idcard": "1420500003178",
        "code": "654036",
        "name": "อาจารย์ยุภา คำตะพล",
        "position": "รองผู้อำนวยการ",
        "contact": "0896413231",
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": "8089778500",
        "telegram_link_code": "c3qXan",
        "created_at": "2024-11-17T19:39:13.000000Z",
        "updated_at": "2025-01-30T00:01:00.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d8-00da-4676-8c80-938550a4b69b",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d8-07b3-4e50-a7f4-2b6ba3c85561",
        "idcard": "3670100910695",
        "code": "654037",
        "name": "ผู้ช่วยศาสตราจารย์เครือวัลย์ อินทรสุข",
        "position": "ผู้ช่วยอธิการบดี",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "lqlVXZ",
        "created_at": "2024-11-17T19:39:13.000000Z",
        "updated_at": "2024-12-26T04:03:29.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d8-07b3-4e50-a7f4-2b6ba3c85561",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d8-0e55-409f-8bc5-3d25f3eb7f21",
        "idcard": "3670400533030",
        "code": "654038",
        "name": "อาจารย์อภิชาติ งามรุ่งโรจน์",
        "position": "รองคณบดี/รองผู้อำนวยการ",
        "contact": "0882823492",
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "IScmWx",
        "created_at": "2024-11-17T19:39:13.000000Z",
        "updated_at": "2025-01-15T06:14:49.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d8-0e55-409f-8bc5-3d25f3eb7f21",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d8-1512-4a86-bfc6-af939c061d9a",
        "idcard": "3660800547968",
        "code": "654040",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.อรุณ สนใจ",
        "position": "คณบดี",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "68ur5T",
        "created_at": "2024-11-17T19:39:13.000000Z",
        "updated_at": "2024-12-19T02:20:21.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d8-1512-4a86-bfc6-af939c061d9a",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d8-1bc7-468d-b74a-041a80160691",
        "idcard": "3670100943682",
        "code": "654044",
        "name": "อาจารย์ ดร.จตุพร จันทร์เพชร",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "vwpCtg",
        "created_at": "2024-11-17T19:39:13.000000Z",
        "updated_at": "2024-12-13T06:35:34.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d8-1bc7-468d-b74a-041a80160691",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d8-225c-46c4-be5f-1f13e8ab5e99",
        "idcard": "3670101025288",
        "code": "654045",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.ปิยะวัน เพชรหมี",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "iVPwwL",
        "created_at": "2024-11-17T19:39:13.000000Z",
        "updated_at": "2024-12-20T07:39:48.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d8-225c-46c4-be5f-1f13e8ab5e99",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d8-290f-4eee-a465-e290bc58ac0a",
        "idcard": "3679900004883",
        "code": "654046",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.สุทธิสินี ถิระธรรมสรณ์",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": "0918389921",
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": "7602477722",
        "telegram_link_code": "aEwDZ3",
        "created_at": "2024-11-17T19:39:13.000000Z",
        "updated_at": "2024-12-13T07:48:36.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d8-290f-4eee-a465-e290bc58ac0a",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d8-2feb-4f5b-86e7-6f1d9723ab47",
        "idcard": "3679900074431",
        "code": "654047",
        "name": "อาจารย์นันทกานต์ ศรีปลั่ง",
        "position": "อาจารย์",
        "contact": "0614265941",
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "KrgbQG",
        "created_at": "2024-11-17T19:39:13.000000Z",
        "updated_at": "2025-01-24T04:14:47.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d8-2feb-4f5b-86e7-6f1d9723ab47",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d8-36ab-4c33-9331-97acd8df59bf",
        "idcard": "1669700002465",
        "code": "654048",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.บวรลักษณ์ เงินมา",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": "0882809091",
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "mLTfNa",
        "created_at": "2024-11-17T19:39:13.000000Z",
        "updated_at": "2025-02-10T03:30:37.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d8-36ab-4c33-9331-97acd8df59bf",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d8-3d82-4e6a-8f3c-97392b19eecd",
        "idcard": "3679800154743",
        "code": "654049",
        "name": "อาจารย์ ดร.เอนกพงศ์ ธรรมาธิวัฒน์",
        "position": "ผู้ช่วยอธิการบดี",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "xOcoYz",
        "created_at": "2024-11-17T19:39:13.000000Z",
        "updated_at": "2025-02-19T07:22:09.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d8-3d82-4e6a-8f3c-97392b19eecd",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d8-4456-423d-bb79-f60435271fb0",
        "idcard": "3670300652398",
        "code": "654050",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.กฤษฏิ์พนธ์ พรรณรัตนชัย",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": "0633519459",
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": "7814725261",
        "telegram_link_code": "kz8hgf",
        "created_at": "2024-11-17T19:39:13.000000Z",
        "updated_at": "2025-01-22T07:05:37.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d8-4456-423d-bb79-f60435271fb0",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d8-4b03-404f-a9e8-96318a946b5f",
        "idcard": "3700500275520",
        "code": "654051",
        "name": "ผู้ช่วยศาสตราจารย์โกศล พิทักษ์สัตยาพรต",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:13.000000Z",
        "updated_at": "2024-11-17T19:39:13.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d8-4b03-404f-a9e8-96318a946b5f",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d8-51a4-4187-b234-8aacfb518d24",
        "idcard": "3670301310920",
        "code": "654052",
        "name": "ผู้ช่วยศาสตราจารย์เสริมศักดิ์ ทิพย์วงศ์",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "moBGM6",
        "created_at": "2024-11-17T19:39:13.000000Z",
        "updated_at": "2025-01-23T03:08:55.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d8-51a4-4187-b234-8aacfb518d24",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d8-584f-4860-8a07-517a7fe220eb",
        "idcard": "5670200019207",
        "code": "654053",
        "name": "ผู้ช่วยศาสตราจารย์ศักดิ์ศิริชัย ศรีสวัสดิ์",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": "0800288883",
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": "7510150906",
        "telegram_link_code": "biS5et",
        "created_at": "2024-11-17T19:39:13.000000Z",
        "updated_at": "2025-01-22T05:55:17.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d8-584f-4860-8a07-517a7fe220eb",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d8-5ef6-4e68-a785-62a690d34b5b",
        "idcard": "3330101443210",
        "code": "654054",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.ชูเกียรติ โพนแก้ว",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": "0956095516",
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "da2JCm",
        "created_at": "2024-11-17T19:39:13.000000Z",
        "updated_at": "2025-01-22T04:58:06.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d8-5ef6-4e68-a785-62a690d34b5b",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d8-6585-4c14-972e-62a5a5d38ff9",
        "idcard": "3679900039547",
        "code": "654055",
        "name": "อาจารย์พิณทิพย์ แก้วแกมทอง",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:13.000000Z",
        "updated_at": "2024-11-17T19:39:13.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d8-6585-4c14-972e-62a5a5d38ff9",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1d8-6c09-4d25-b679-143699a82060",
        "idcard": "3549900008600",
        "code": "654056",
        "name": "อาจารย์ขนิษฐา ศรีนวล",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "4ac68I",
        "created_at": "2024-11-17T19:39:13.000000Z",
        "updated_at": "2025-02-14T07:27:00.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1d8-6c09-4d25-b679-143699a82060",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e3-6150-4231-874f-cfe51851d006",
        "idcard": "1679900032732",
        "code": "654057",
        "name": "อาจารย์ธันยมัย รังสิกรรพุม",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:20.000000Z",
        "updated_at": "2024-11-17T19:39:20.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e3-6150-4231-874f-cfe51851d006",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e3-6c28-42fb-adda-aef07ee66b35",
        "idcard": "1679900002990",
        "code": "654058",
        "name": "อาจารย์ภาราดา ชัยนิคม",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:20.000000Z",
        "updated_at": "2024-11-17T19:39:20.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e3-6c28-42fb-adda-aef07ee66b35",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e3-70e0-4d56-b9b0-5b668f4bdc19",
        "idcard": "3470300011572",
        "code": "654060",
        "name": "นางสาวกรกนก ดาบพิมพ์ศรี",
        "position": "หัวหน้างาน",
        "contact": "0956255518",
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": "7863112617",
        "telegram_link_code": "LyYmkr",
        "created_at": "2024-11-17T19:39:20.000000Z",
        "updated_at": "2025-01-15T04:37:56.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e3-70e0-4d56-b9b0-5b668f4bdc19",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e3-75d1-426a-a7aa-869cdee5fdbf",
        "idcard": "3670500681049",
        "code": "654061",
        "name": "นางลัดดา ศักดิ์เศรณี",
        "position": "หัวหน้างาน",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": "8033496970",
        "telegram_link_code": "DHBCW6",
        "created_at": "2024-11-17T19:39:20.000000Z",
        "updated_at": "2024-12-19T03:37:24.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e3-75d1-426a-a7aa-869cdee5fdbf",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e3-7b00-4ce5-97df-82d86f108833",
        "idcard": "3670400110881",
        "code": "654063",
        "name": "นางสาวรัชนีพร ลีกีรติกุล",
        "position": "เจ้าหน้าที่บริหารงานทั่วไปชำนาญการ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "b918Wp",
        "created_at": "2024-11-17T19:39:20.000000Z",
        "updated_at": "2024-12-13T06:20:19.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e3-7b00-4ce5-97df-82d86f108833",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e3-80f1-4919-8369-bd1872a444d8",
        "idcard": "3100902319268",
        "code": "654064",
        "name": "นางวิลาวัลย์ เฉลิมพงษ์",
        "position": "หัวหน้างาน",
        "contact": "0831676443",
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "stpgfS",
        "created_at": "2024-11-17T19:39:20.000000Z",
        "updated_at": "2025-01-22T07:04:49.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e3-80f1-4919-8369-bd1872a444d8",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e3-8789-4fb1-b14a-59387e82b57f",
        "idcard": "3670300829115",
        "code": "654066",
        "name": "นางสาววรินธร ชาติสุภาพ",
        "position": "หัวหน้างาน",
        "contact": "0831635889",
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "Xt4orP",
        "created_at": "2024-11-17T19:39:20.000000Z",
        "updated_at": "2025-01-06T03:52:54.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e3-8789-4fb1-b14a-59387e82b57f",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e3-8e0e-4961-be30-214617a9b18c",
        "idcard": "3679900141341",
        "code": "654067",
        "name": "นางสาวสุกัญญา ทับทอง",
        "position": "หัวหน้างาน",
        "contact": "0962585927",
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "BmFtqT",
        "created_at": "2024-11-17T19:39:20.000000Z",
        "updated_at": "2025-01-27T02:40:24.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e3-8e0e-4961-be30-214617a9b18c",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e3-9475-49f9-af46-de2a92901934",
        "idcard": "3670100248291",
        "code": "654068",
        "name": "นางปิยนันท์ เพ็ญสูตร",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "107",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "IP82wJ",
        "created_at": "2024-11-17T19:39:20.000000Z",
        "updated_at": "2025-02-10T08:20:52.000000Z",
        "deleted_at": null,
        "section": {
          "id": "107",
          "name": "สถาบันวิจัยและพัฒนา"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e3-9475-49f9-af46-de2a92901934",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e3-9b16-44d3-955d-16953174ec72",
        "idcard": "5670200074283",
        "code": "654069",
        "name": "นางสาววัลยา ภูจุ้ย",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": "6005",
        "email": null,
        "email_verified_at": null,
        "section_id": "110",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "S7VkuP",
        "created_at": "2024-11-17T19:39:20.000000Z",
        "updated_at": "2025-01-07T04:22:51.000000Z",
        "deleted_at": null,
        "section": {
          "id": "110",
          "name": "สำนักส่งเสริมวิชาการและงานทะเบียน"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e3-9b16-44d3-955d-16953174ec72",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e3-a1ac-44a4-83ce-0bcf15a852a2",
        "idcard": "1670100021177",
        "code": "654070",
        "name": "นางอรทัย เพชระบูรณิน",
        "position": "หัวหน้างาน",
        "contact": "6003",
        "email": null,
        "email_verified_at": null,
        "section_id": "110",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "eBleFX",
        "created_at": "2024-11-17T19:39:20.000000Z",
        "updated_at": "2024-12-13T08:39:03.000000Z",
        "deleted_at": null,
        "section": {
          "id": "110",
          "name": "สำนักส่งเสริมวิชาการและงานทะเบียน"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e3-a1ac-44a4-83ce-0bcf15a852a2",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e3-a83e-4572-bffb-f546d72f1a4c",
        "idcard": "3670101376056",
        "code": "654071",
        "name": "นางสาวมิรา สุขเมือง",
        "position": "หัวหน้างาน",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "e4B7U0",
        "created_at": "2024-11-17T19:39:20.000000Z",
        "updated_at": "2025-01-10T04:44:58.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10103",
          "name": "กองพัฒนานักศึกษา"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e3-a83e-4572-bffb-f546d72f1a4c",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e3-aef5-4b3c-8822-e273fc7ea6cb",
        "idcard": "5670100024161",
        "code": "654072",
        "name": "นางสุวรรณี พุฒตรง",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:20.000000Z",
        "updated_at": "2024-11-17T19:39:20.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10102",
          "name": "กองนโยบายและแผน"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e3-aef5-4b3c-8822-e273fc7ea6cb",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e3-b589-45c7-9296-e1006a5e6ca3",
        "idcard": "3670400019956",
        "code": "654073",
        "name": "นางพัชราพรรณ ศิลกุล",
        "position": "หัวหน้างาน",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:20.000000Z",
        "updated_at": "2024-11-17T19:39:20.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e3-b589-45c7-9296-e1006a5e6ca3",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e3-bbc0-4b57-bcab-674b0ee46164",
        "idcard": "3679900114042",
        "code": "654074",
        "name": "นางสมปอง อาจศิริ",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:20.000000Z",
        "updated_at": "2024-11-17T19:39:20.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e3-bbc0-4b57-bcab-674b0ee46164",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e3-c23b-44bf-9bd4-09ea18bf36a0",
        "idcard": "3670100851354",
        "code": "654075",
        "name": "นางวรัญญา หมวกน่วม",
        "position": "นักวิชาการพัสดุ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:20.000000Z",
        "updated_at": "2024-11-17T19:39:20.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e3-c23b-44bf-9bd4-09ea18bf36a0",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e3-c88b-4750-975d-a58d16241b00",
        "idcard": "3670100179133",
        "code": "654076",
        "name": "นางสาวพิมพ์วดี สีที",
        "position": "นักวิชาการโสตทัศนศึกษา",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:20.000000Z",
        "updated_at": "2024-11-17T19:39:20.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e3-c88b-4750-975d-a58d16241b00",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e3-cf12-438e-93a7-c2da109b8232",
        "idcard": "3670101042239",
        "code": "654077",
        "name": "นายเกรียงยศ ไทยช้อย",
        "position": "นักวิชาการศึกษา",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:20.000000Z",
        "updated_at": "2024-11-17T19:39:20.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e3-cf12-438e-93a7-c2da109b8232",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e3-d582-4906-b798-d1ec7b0f38b3",
        "idcard": "3679900226347",
        "code": "654078",
        "name": "นางรัตนา ชมมัย",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "108",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "4AekWD",
        "created_at": "2024-11-17T19:39:20.000000Z",
        "updated_at": "2024-12-13T06:40:14.000000Z",
        "deleted_at": null,
        "section": {
          "id": "108",
          "name": "สำนักวิทยบริการและเทคโนโลยีสารสนเทศ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e3-d582-4906-b798-d1ec7b0f38b3",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e3-dbb0-460d-8561-f08236eb4fbb",
        "idcard": "5670500005023",
        "code": "654079",
        "name": "นางสาวศิวพร อ่อนชุ่ม",
        "position": "เจ้าหน้าที่บริหารงานทั่วไปชำนาญการ",
        "contact": "0896392354",
        "email": null,
        "email_verified_at": null,
        "section_id": "108",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "FKaJJ2",
        "created_at": "2024-11-17T19:39:20.000000Z",
        "updated_at": "2025-01-15T02:54:17.000000Z",
        "deleted_at": null,
        "section": {
          "id": "108",
          "name": "สำนักวิทยบริการและเทคโนโลยีสารสนเทศ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e3-dbb0-460d-8561-f08236eb4fbb",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e3-e20f-47bf-b3b7-aafb1bd84d79",
        "idcard": "3361200375396",
        "code": "654080",
        "name": "นายปริญญา ปราบพาลา",
        "position": "นักวิชาการโสตทัศนศึกษา",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "n0EQ4G",
        "created_at": "2024-11-17T19:39:20.000000Z",
        "updated_at": "2025-01-17T03:42:38.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e3-e20f-47bf-b3b7-aafb1bd84d79",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e3-e84e-4bcf-9458-e606c1ea78e5",
        "idcard": "3670300129679",
        "code": "654082",
        "name": "นายสรศักดิ์ พิลาเกิด",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": "0956343723",
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "vSZesZ",
        "created_at": "2024-11-17T19:39:20.000000Z",
        "updated_at": "2025-01-16T06:19:32.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e3-e84e-4bcf-9458-e606c1ea78e5",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e3-eed7-4b65-9939-438e625b4468",
        "idcard": "1420500011782",
        "code": "654083",
        "name": "นางวิชชุลดา องอาจ",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": "0810362868",
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": "8141207626",
        "telegram_link_code": "8DtE88",
        "created_at": "2024-11-17T19:39:20.000000Z",
        "updated_at": "2025-01-15T03:52:53.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e3-eed7-4b65-9939-438e625b4468",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e3-f554-427f-bfcb-3b0f466f77df",
        "idcard": "1440900050092",
        "code": "654085",
        "name": "นายจรุวัตร คำยอด",
        "position": "หัวหน้างาน",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "bsqj01",
        "created_at": "2024-11-17T19:39:20.000000Z",
        "updated_at": "2024-12-13T07:04:38.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e3-f554-427f-bfcb-3b0f466f77df",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e3-fbd2-4d3d-9d3e-f169364798a4",
        "idcard": "1679900045061",
        "code": "654087",
        "name": "นางพรรณณิชา คลังตุ้ย",
        "position": "เจ้าหน้าที่บริหารงานทั่วไปชำนาญการ",
        "contact": "0873095822",
        "email": null,
        "email_verified_at": null,
        "section_id": "10103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "CEpdbT",
        "created_at": "2024-11-17T19:39:20.000000Z",
        "updated_at": "2025-02-28T09:27:37.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10103",
          "name": "กองพัฒนานักศึกษา"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e3-fbd2-4d3d-9d3e-f169364798a4",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e4-0287-4db7-a10c-08dd07f6060e",
        "idcard": "3670600175439",
        "code": "654088",
        "name": "นางสาวกิตติกานต์ กิตติชญานันท์",
        "position": "นักตรวจสอบภายใน",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "111",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:20.000000Z",
        "updated_at": "2024-11-17T19:39:20.000000Z",
        "deleted_at": null,
        "section": {
          "id": "111",
          "name": "สังกัดอธิการบดี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e4-0287-4db7-a10c-08dd07f6060e",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e4-097e-44bf-af18-09579c8c6a9e",
        "idcard": "1679900131544",
        "code": "654089",
        "name": "นางพรรณิสา แดงสวัสดิ์",
        "position": "เจ้าหน้าที่บริหารงานทั่วไปชำนาญการ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:20.000000Z",
        "updated_at": "2024-11-17T19:39:20.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e4-097e-44bf-af18-09579c8c6a9e",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e4-1010-4f45-a945-186e854c8b47",
        "idcard": "3679900046004",
        "code": "654090",
        "name": "นางสาวนงเยาว์ บุณยรัตพันธุ์",
        "position": "หัวหน้างาน",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:20.000000Z",
        "updated_at": "2024-11-17T19:39:20.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10102",
          "name": "กองนโยบายและแผน"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e4-1010-4f45-a945-186e854c8b47",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e4-16a1-4aee-afa5-0d9784595a98",
        "idcard": "1670300131081",
        "code": "654094",
        "name": "นางสาวสุพรรษา คำวิเศษ",
        "position": "นักวิชาการศึกษา",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "e5ONeV",
        "created_at": "2024-11-17T19:39:20.000000Z",
        "updated_at": "2024-12-17T04:29:04.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e4-16a1-4aee-afa5-0d9784595a98",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e4-1d1c-4f30-b4c3-0b695f835f18",
        "idcard": "1670100014774",
        "code": "654095",
        "name": "นางสาวธันยรัศมิ์ แก้วดอนเมือง",
        "position": "นักตรวจสอบภายใน",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "111",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:20.000000Z",
        "updated_at": "2024-11-17T19:39:21.000000Z",
        "deleted_at": null,
        "section": {
          "id": "111",
          "name": "สังกัดอธิการบดี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e4-1d1c-4f30-b4c3-0b695f835f18",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e4-2388-42e0-ab4b-eceb98974685",
        "idcard": "1679900048213",
        "code": "654096",
        "name": "นางวันวิสาข์ บุญจันทร์",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "LlUxyQ",
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2025-01-08T08:58:51.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e4-2388-42e0-ab4b-eceb98974685",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e4-2a4e-46b8-890f-253cfabda303",
        "idcard": "3670101481224",
        "code": "654097",
        "name": "นางสาวสุกัญญา ธนาปรีชากุลสิริ",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "110",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2024-11-17T19:39:21.000000Z",
        "deleted_at": null,
        "section": {
          "id": "110",
          "name": "สำนักส่งเสริมวิชาการและงานทะเบียน"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e4-2a4e-46b8-890f-253cfabda303",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e4-3100-49ea-be35-ff4aac16814b",
        "idcard": "1670700008813",
        "code": "654098",
        "name": "นายอนุสิษฐ์ กันคำ",
        "position": "นักประชาสัมพันธ์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2024-11-17T19:39:21.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e4-3100-49ea-be35-ff4aac16814b",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e4-3754-4f89-951c-b06b6ec6ee09",
        "idcard": "1679900144913",
        "code": "654100",
        "name": "นางสาวมนชยา คลายโศก",
        "position": "นักวิชาการวัฒนธรรม",
        "contact": "0615989968",
        "email": null,
        "email_verified_at": null,
        "section_id": "109",
        "keycloak_id": null,
        "telegram_chat_id": "7118139502",
        "telegram_link_code": "3nYaUM",
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2024-12-13T07:30:37.000000Z",
        "deleted_at": null,
        "section": {
          "id": "109",
          "name": "สำนักศิลปะและวัฒนธรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e4-3754-4f89-951c-b06b6ec6ee09",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e4-3df7-4204-9b87-d3297c23e193",
        "idcard": "1101401037531",
        "code": "654101",
        "name": "อาจารย์รัฐธนินท์ รวีฉัตรพงศ์",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2024-11-17T19:39:21.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e4-3df7-4204-9b87-d3297c23e193",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e4-44a1-4fe8-9287-32a8905827d3",
        "idcard": "1100800073344",
        "code": "654103",
        "name": "นางสาวชุติมา พุฒอ่อน",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "107",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2024-11-17T19:39:21.000000Z",
        "deleted_at": null,
        "section": {
          "id": "107",
          "name": "สถาบันวิจัยและพัฒนา"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e4-44a1-4fe8-9287-32a8905827d3",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          },
          {
            "uuid": "9de1769b-14df-43c3-818f-4c7056472c6e",
            "name": "admin_org",
            "description": "ผู้ดูแลหน่วยงาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e4-44a1-4fe8-9287-32a8905827d3",
              "role_id": "9de1769b-14df-43c3-818f-4c7056472c6e"
            }
          }
        ]
      },
      {
        "id": "9d83e1e4-4b1e-4876-adcd-0a7291ad7c4c",
        "idcard": "3650600586293",
        "code": "654104",
        "name": "อาจารย์ ดร.วันวิสาข์ หมื่นจง",
        "position": "อาจารย์",
        "contact": "0875231559",
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": "8017475717",
        "telegram_link_code": "LhTKzO",
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2025-02-04T07:42:48.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e4-4b1e-4876-adcd-0a7291ad7c4c",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e4-51b8-4ef0-b23a-1315ea4ef1e5",
        "idcard": "3679900059131",
        "code": "655109",
        "name": "อาจารย์ใจสคราญ จารึกสมาน",
        "position": "อาจารย์",
        "contact": "0918398949",
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "0l7jNy",
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2025-03-13T07:59:46.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e4-51b8-4ef0-b23a-1315ea4ef1e5",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e4-5810-4595-9b1b-45507704a7e4",
        "idcard": "3301500193129",
        "code": "655112",
        "name": "นางสาวรวิษฎา โคกทอง",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": "0960519199",
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": "7736264626",
        "telegram_link_code": "RKF1hk",
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2025-03-13T06:31:23.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e4-5810-4595-9b1b-45507704a7e4",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e4-5eb0-46a1-bf19-7fc2127a63ab",
        "idcard": "3740100927571",
        "code": "655113",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.กนิฐา แสงกระจ่าง",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2024-11-17T19:39:21.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e4-5eb0-46a1-bf19-7fc2127a63ab",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e4-6575-4a50-be1b-d5071adc06af",
        "idcard": "3670301215790",
        "code": "655115",
        "name": "นางสาวเกษฟ้า กองสี",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": "0882821989",
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": "7715439846",
        "telegram_link_code": "GzYmyj",
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2025-03-07T09:43:38.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e4-6575-4a50-be1b-d5071adc06af",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e4-6c0d-49c1-9a98-0fbce73e3c23",
        "idcard": "1600100057635",
        "code": "655117",
        "name": "อาจารย์นาฏอนงค์ พวงสมบัติ",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": "7819095476",
        "telegram_link_code": "AAWJPU",
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2025-03-12T08:26:30.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e4-6c0d-49c1-9a98-0fbce73e3c23",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e4-72a7-401f-9e18-609932ebd25a",
        "idcard": "3670400233648",
        "code": "655118",
        "name": "ผู้ช่วยศาสตราจารย์สพลเชษฐ์ ประชุมชัย",
        "position": "ผู้ช่วยอธิการบดี",
        "contact": "0649472674",
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": "7984215672",
        "telegram_link_code": "53KoiY",
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2025-01-28T03:44:02.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e4-72a7-401f-9e18-609932ebd25a",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e4-7966-4733-8345-b36afd0bc114",
        "idcard": "3679900158562",
        "code": "655119",
        "name": "ผู้ช่วยศาสตราจารย์จีรพรรณ พรหมประเสริฐ",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2024-11-17T19:39:21.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e4-7966-4733-8345-b36afd0bc114",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e4-8027-4ff2-b8fd-f0a5f7660c36",
        "idcard": "3679900129376",
        "code": "655123",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.ธีรภัทร กิจจารักษ์",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": "0944239141",
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "NyjhDz",
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2025-03-03T23:38:06.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e4-8027-4ff2-b8fd-f0a5f7660c36",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e4-86c6-416f-b627-8159271df137",
        "idcard": "3361000852816",
        "code": "655124",
        "name": "อาจารย์กิติยวดี สีดา",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2024-11-17T19:39:21.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e4-86c6-416f-b627-8159271df137",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e4-8d77-4ee8-9c71-67fcc5698d27",
        "idcard": "1560300093148",
        "code": "655126",
        "name": "นางพิมพ์ชญา กรอุตตมา",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": "0882935008",
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "Vnhwo0",
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2025-03-07T08:22:01.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e4-8d77-4ee8-9c71-67fcc5698d27",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e4-9444-49fe-abbe-63c630ca28e1",
        "idcard": "1660500090478",
        "code": "655127",
        "name": "นางสาวจุไรรัตน์ ไม้เลี้ยง",
        "position": "นักวิชาการเงินและบัญชี",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2024-11-17T19:39:21.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e4-9444-49fe-abbe-63c630ca28e1",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e4-9aee-4266-a6c0-f1c4c76fda1e",
        "idcard": "3670100095185",
        "code": "655128",
        "name": "นางสาวยุพา แก้วบาง",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "tsh6ri",
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2025-01-08T08:58:40.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e4-9aee-4266-a6c0-f1c4c76fda1e",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e4-a1a4-4e41-9dd5-b44eee197cf5",
        "idcard": "5670100031299",
        "code": "655129",
        "name": "นายชาตรี บุญจันทร์",
        "position": "วิศวกร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2024-11-17T19:39:21.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10102",
          "name": "กองนโยบายและแผน"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e4-a1a4-4e41-9dd5-b44eee197cf5",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e4-a84e-449d-85d0-3e1045e58d73",
        "idcard": "1679900144735",
        "code": "655130",
        "name": "นายวิโรจน์ หุ่นทอง",
        "position": "นักวิชาการวัฒนธรรม",
        "contact": "0882823734",
        "email": null,
        "email_verified_at": null,
        "section_id": "109",
        "keycloak_id": null,
        "telegram_chat_id": "7859973472",
        "telegram_link_code": "haoyiJ",
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2024-12-13T07:31:15.000000Z",
        "deleted_at": null,
        "section": {
          "id": "109",
          "name": "สำนักศิลปะและวัฒนธรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e4-a84e-449d-85d0-3e1045e58d73",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e4-aeff-422f-94fd-893523164be9",
        "idcard": "3640900132344",
        "code": "655131",
        "name": "นางอุตสา สว่างแจ้ง",
        "position": "นักวิชาการศึกษา",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "110",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2024-11-17T19:39:21.000000Z",
        "deleted_at": null,
        "section": {
          "id": "110",
          "name": "สำนักส่งเสริมวิชาการและงานทะเบียน"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e4-aeff-422f-94fd-893523164be9",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e4-b5af-402b-a3bf-15c38e380e78",
        "idcard": "1670700107307",
        "code": "655132",
        "name": "นางสาวอารีรัตน์ ใจหนัก",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "2xCsyo",
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2024-12-13T06:37:32.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10102",
          "name": "กองนโยบายและแผน"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e4-b5af-402b-a3bf-15c38e380e78",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e4-bc74-451c-b34e-30f703501a86",
        "idcard": "1679900039923",
        "code": "655135",
        "name": "นางสาวบุศรินทร์ พลพันธ์",
        "position": "นักประชาสัมพันธ์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "Jt3R6l",
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2024-12-13T06:28:43.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e4-bc74-451c-b34e-30f703501a86",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e4-c2fe-4613-a8b8-2cb1f23cd606",
        "idcard": "3670101080211",
        "code": "655136",
        "name": "อาจารย์กานต์ แย้มพงษ์",
        "position": "อาจารย์",
        "contact": "0866757393",
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": "2134110739",
        "telegram_link_code": "NyDMzE",
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2025-01-27T07:39:07.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e4-c2fe-4613-a8b8-2cb1f23cd606",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e4-c99c-43a2-9837-85c3c0dd1a96",
        "idcard": "3530300187661",
        "code": "655138",
        "name": "นางพรรณทิพย์ รุ่งเรืองศรี",
        "position": "เจ้าหน้าที่บริหารงานทั่วไปชำนาญการ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "VDzcWo",
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2024-12-13T06:20:10.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e4-c99c-43a2-9837-85c3c0dd1a96",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e4-d049-42a4-9d1d-5eef12153f72",
        "idcard": "3670400314788",
        "code": "655139",
        "name": "ผู้ช่วยศาสตราจารย์พิชยพิมพ์ คำเพียร",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2024-11-17T19:39:21.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e4-d049-42a4-9d1d-5eef12153f72",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e4-d691-401b-b423-9a0c0e41df75",
        "idcard": "3619900136712",
        "code": "655140",
        "name": "ผู้ช่วยศาสตราจารย์สุวิมล พันธ์โต",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2024-11-17T19:39:21.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e4-d691-401b-b423-9a0c0e41df75",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e4-dd57-41e2-a799-75a07eb6a247",
        "idcard": "5670100079607",
        "code": "655141",
        "name": "อาจารย์แก้วตา ผิวพรรณ",
        "position": "รองอธิการบดี",
        "contact": "0969635645",
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": "7650048635",
        "telegram_link_code": "xuba2p",
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2025-01-14T09:54:09.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e4-dd57-41e2-a799-75a07eb6a247",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e4-e421-4b1b-902d-5a9feccc5b17",
        "idcard": "3679900034499",
        "code": "655142",
        "name": "อาจารย์วิไลพร วงษ์อินทร์",
        "position": "อาจารย์",
        "contact": "0882808737",
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "xDmApG",
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2024-12-13T06:30:56.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e4-e421-4b1b-902d-5a9feccc5b17",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e4-eb09-45e8-bcc3-22f5d067f668",
        "idcard": "1670400005321",
        "code": "655143",
        "name": "อาจารย์ปวิตรา โคบำรุง",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2024-11-17T19:39:21.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e4-eb09-45e8-bcc3-22f5d067f668",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e4-f1b4-4fc0-b96e-02bbca66de7c",
        "idcard": "3670100903699",
        "code": "655144",
        "name": "อาจารย์เอ็ม สายคำหน่อ",
        "position": "อาจารย์",
        "contact": "0882827774",
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "qSJr3a",
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2024-12-13T06:32:10.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e4-f1b4-4fc0-b96e-02bbca66de7c",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e4-f82b-43f8-9525-a7378455b7e8",
        "idcard": "3420400060711",
        "code": "655145",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.เอกชัย แสงโสดา",
        "position": "รองคณบดี/รองผู้อำนวยการ",
        "contact": "0821703037",
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "iPAW4D",
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2025-01-07T03:57:38.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e4-f82b-43f8-9525-a7378455b7e8",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e4-fe8e-4fd5-a3a4-d050a6925bb2",
        "idcard": "3530100936628",
        "code": "655147",
        "name": "ผู้ช่วยศาสตราจารย์กริชชัย ขาวจ้อย",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "mBuDZr",
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2024-12-13T06:29:21.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e4-fe8e-4fd5-a3a4-d050a6925bb2",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e5-0535-4cb0-9a5d-262305ed460f",
        "idcard": "1679900109735",
        "code": "655149",
        "name": "นางสาวแสงสุนีย์ เดชมา",
        "position": "เจ้าหน้าที่บริหารงานทั่วไปชำนาญการ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "110",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2024-11-17T19:39:21.000000Z",
        "deleted_at": null,
        "section": {
          "id": "110",
          "name": "สำนักส่งเสริมวิชาการและงานทะเบียน"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e5-0535-4cb0-9a5d-262305ed460f",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e5-0bd4-4dd6-b7b9-cc0be034ffee",
        "idcard": "1670300133891",
        "code": "655150",
        "name": "นายเพ็ญศักดิ์ ปานนิล",
        "position": "นักวิชาการคอมพิวเตอร์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "110",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "5UpXus",
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2024-12-19T03:51:10.000000Z",
        "deleted_at": null,
        "section": {
          "id": "110",
          "name": "สำนักส่งเสริมวิชาการและงานทะเบียน"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e5-0bd4-4dd6-b7b9-cc0be034ffee",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e5-123d-42fa-805e-2ce82ef84175",
        "idcard": "3402000116664",
        "code": "655151",
        "name": "นายเกื้อกูล พิมพ์ดี",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "107",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "PD4c6J",
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2025-01-29T05:53:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "107",
          "name": "สถาบันวิจัยและพัฒนา"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e5-123d-42fa-805e-2ce82ef84175",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e5-18e7-4aa0-9bd9-e767eff3efc1",
        "idcard": "5670100042291",
        "code": "655152",
        "name": "อาจารย์ ดร.พลากร ชาญณรงค์",
        "position": "อาจารย์",
        "contact": "0857282549",
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "M3jK2n",
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2024-12-24T08:54:38.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e5-18e7-4aa0-9bd9-e767eff3efc1",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e5-1f96-4a46-a80a-62538484c729",
        "idcard": "3670100296849",
        "code": "655153",
        "name": "ผู้ช่วยศาสตราจารย์น้ำฝน เบ้าทองคำ",
        "position": "ผู้ช่วยอธิการบดีฝ่ายพันธกิจสัมพันธ์",
        "contact": "0864002216",
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": "7812445713",
        "telegram_link_code": "MqroBZ",
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2025-01-17T10:13:37.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e5-1f96-4a46-a80a-62538484c729",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e5-2600-4015-afc7-0d8a3489ea91",
        "idcard": "1670800004259",
        "code": "655154",
        "name": "นายบรรจง สุรินทร์",
        "position": "หัวหน้างาน",
        "contact": "0932545645",
        "email": null,
        "email_verified_at": null,
        "section_id": "107",
        "keycloak_id": null,
        "telegram_chat_id": "7872096139",
        "telegram_link_code": "a2ECpc",
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2025-02-05T08:48:55.000000Z",
        "deleted_at": null,
        "section": {
          "id": "107",
          "name": "สถาบันวิจัยและพัฒนา"
        },
        "roles": [
          {
            "uuid": "9d0c4ad8-1ea9-456f-83cb-740d441433a0",
            "name": "admin",
            "description": "ผู้ดูแลระบบ",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e5-2600-4015-afc7-0d8a3489ea91",
              "role_id": "9d0c4ad8-1ea9-456f-83cb-740d441433a0"
            }
          },
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e5-2600-4015-afc7-0d8a3489ea91",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          },
          {
            "uuid": "9de1769b-14df-43c3-818f-4c7056472c6e",
            "name": "admin_org",
            "description": "ผู้ดูแลหน่วยงาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e5-2600-4015-afc7-0d8a3489ea91",
              "role_id": "9de1769b-14df-43c3-818f-4c7056472c6e"
            }
          }
        ]
      },
      {
        "id": "9d83e1e5-2cb5-4b46-99f2-d566a5ab305a",
        "idcard": "3670701101414",
        "code": "655155",
        "name": "นางรัดดา สำราญพันธุ์",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": "0922658935",
        "email": null,
        "email_verified_at": null,
        "section_id": "107",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "1HUZLB",
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2025-03-04T05:28:53.000000Z",
        "deleted_at": null,
        "section": {
          "id": "107",
          "name": "สถาบันวิจัยและพัฒนา"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e5-2cb5-4b46-99f2-d566a5ab305a",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          },
          {
            "uuid": "9de1769b-14df-43c3-818f-4c7056472c6e",
            "name": "admin_org",
            "description": "ผู้ดูแลหน่วยงาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e5-2cb5-4b46-99f2-d566a5ab305a",
              "role_id": "9de1769b-14df-43c3-818f-4c7056472c6e"
            }
          }
        ]
      },
      {
        "id": "9d83e1e5-334c-4a77-b553-97e08210e53e",
        "idcard": "1411400017241",
        "code": "655156",
        "name": "อาจารย์กุณฑลีรัฐ พิมพิลา",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2024-11-17T19:39:21.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e5-334c-4a77-b553-97e08210e53e",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e5-39f7-4b63-a259-a4189dba14fe",
        "idcard": "3670101610903",
        "code": "655158",
        "name": "ผู้ช่วยศาสตราจารย์ปาริชาติ ลาจันนนท์",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "ZUrdga",
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2025-01-15T04:50:39.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e5-39f7-4b63-a259-a4189dba14fe",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e5-4073-4319-b02d-a9dd8448d8b6",
        "idcard": "1670100111168",
        "code": "655160",
        "name": "นางโศศิษฐา แดงตา",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": "0923649351",
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "0yJiO8",
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2024-12-13T06:47:54.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e5-4073-4319-b02d-a9dd8448d8b6",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e5-4706-4e8d-b93b-f7983eefa2bc",
        "idcard": "1679900162521",
        "code": "655161",
        "name": "นางสาวอัญธิญาน์ ปิติไวยวัฒน์",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2024-11-17T19:39:21.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e5-4706-4e8d-b93b-f7983eefa2bc",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e5-4d76-4238-9d51-b2d114a4e757",
        "idcard": "3670100745058",
        "code": "655162",
        "name": "นายไพบูลย์ กันยา",
        "position": "นักวิชาการคอมพิวเตอร์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "108",
        "keycloak_id": null,
        "telegram_chat_id": "8129386320",
        "telegram_link_code": "wHUfU9",
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2024-12-09T07:28:35.000000Z",
        "deleted_at": null,
        "section": {
          "id": "108",
          "name": "สำนักวิทยบริการและเทคโนโลยีสารสนเทศ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e5-4d76-4238-9d51-b2d114a4e757",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e5-540d-4cf1-ab39-dc454fa8ec7b",
        "idcard": "1670900058709",
        "code": "655163",
        "name": "นายหรรษธร ขวัญหอม",
        "position": "นักวิชาการคอมพิวเตอร์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "108",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "GqSoEw",
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2024-12-11T04:26:15.000000Z",
        "deleted_at": null,
        "section": {
          "id": "108",
          "name": "สำนักวิทยบริการและเทคโนโลยีสารสนเทศ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e5-540d-4cf1-ab39-dc454fa8ec7b",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e5-5aae-4321-8fc8-c6455010eccc",
        "idcard": "3550900046601",
        "code": "655164",
        "name": "นายอุดมศักดิ์ ภู่พิมล",
        "position": "หัวหน้างาน",
        "contact": "0815321720",
        "email": null,
        "email_verified_at": null,
        "section_id": "108",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "UqBnmk",
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2025-02-14T08:13:45.000000Z",
        "deleted_at": null,
        "section": {
          "id": "108",
          "name": "สำนักวิทยบริการและเทคโนโลยีสารสนเทศ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e5-5aae-4321-8fc8-c6455010eccc",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e5-616d-43b0-921c-92807bcb4394",
        "idcard": "3670101271769",
        "code": "655165",
        "name": "นางณัฐยา สุโนพันธ์",
        "position": "หัวหน้างาน",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "108",
        "keycloak_id": null,
        "telegram_chat_id": "7707414575",
        "telegram_link_code": "c60yoB",
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2024-12-13T06:56:01.000000Z",
        "deleted_at": null,
        "section": {
          "id": "108",
          "name": "สำนักวิทยบริการและเทคโนโลยีสารสนเทศ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e5-616d-43b0-921c-92807bcb4394",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e5-6810-4fae-bcc0-791b8c9012b2",
        "idcard": "3670300646380",
        "code": "655168",
        "name": "ผู้ช่วยศาสตราจารย์สุภาพร วิสุงเร",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2024-11-17T19:39:21.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e5-6810-4fae-bcc0-791b8c9012b2",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e5-6ea3-4a8d-a10a-0cc50e5ba119",
        "idcard": "1159900021476",
        "code": "655169",
        "name": "นางชลธิชา ระลึก",
        "position": "เจ้าหน้าที่บริหารงานทั่วไปชำนาญการ",
        "contact": "8125",
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": "7665389762",
        "telegram_link_code": "Rj006w",
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2024-12-16T09:39:17.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e5-6ea3-4a8d-a10a-0cc50e5ba119",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e5-752f-4f4f-9fc5-5a1647db837f",
        "idcard": "3670100751040",
        "code": "655170",
        "name": "นางสาวสมเพียร ฟักทอง",
        "position": "นักวิทยาศาสตร์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "g4IkCg",
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2025-01-02T08:28:58.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e5-752f-4f4f-9fc5-5a1647db837f",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e5-7bdc-4c26-b746-f3c93100c2e2",
        "idcard": "2469900016079",
        "code": "655172",
        "name": "นายพิทักษ์ จันทร์จิระ",
        "position": "นักวิชาการช่างศิลป์",
        "contact": "0646636393",
        "email": null,
        "email_verified_at": null,
        "section_id": "109",
        "keycloak_id": null,
        "telegram_chat_id": "7571198684",
        "telegram_link_code": "cOF3m5",
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2024-12-20T03:54:36.000000Z",
        "deleted_at": null,
        "section": {
          "id": "109",
          "name": "สำนักศิลปะและวัฒนธรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e5-7bdc-4c26-b746-f3c93100c2e2",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e5-82b9-40ec-98d3-fa7e25c05965",
        "idcard": "3670100554872",
        "code": "655174",
        "name": "นางสาววรรณฤดี กัญญาประสิทธิ์",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "Nes4AT",
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2024-12-13T07:04:46.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e5-82b9-40ec-98d3-fa7e25c05965",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e5-8963-4406-8828-36bb2b64fdc2",
        "idcard": "1679900127598",
        "code": "655175",
        "name": "นางสาวนิชานันท์ คงเพ็ง",
        "position": "เจ้าหน้าที่บริหารงานทั่วไปชำนาญการ",
        "contact": "0844959564",
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": "8124873895",
        "telegram_link_code": "UTQDRJ",
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2025-01-07T01:50:45.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e5-8963-4406-8828-36bb2b64fdc2",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          },
          {
            "uuid": "9de1769b-14df-43c3-818f-4c7056472c6e",
            "name": "admin_org",
            "description": "ผู้ดูแลหน่วยงาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e5-8963-4406-8828-36bb2b64fdc2",
              "role_id": "9de1769b-14df-43c3-818f-4c7056472c6e"
            }
          }
        ]
      },
      {
        "id": "9d83e1e5-9013-41fc-863d-731412867fc5",
        "idcard": "3400400060460",
        "code": "655176",
        "name": "นางสาวภัทรวดี แถมศิริ",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "JSXiiT",
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2024-12-13T06:35:33.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e5-9013-41fc-863d-731412867fc5",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e5-96b4-40dc-aa9c-bfd48328626b",
        "idcard": "3670500572398",
        "code": "655177",
        "name": "นางกุหลาบ ชาติชะนะ",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป ชำนาญการ",
        "contact": "0877334090",
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "Dw40iS",
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2025-01-15T04:20:26.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e5-96b4-40dc-aa9c-bfd48328626b",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e5-9d1c-4ff3-9068-2a0e68fbd5cc",
        "idcard": "5440600024595",
        "code": "655179",
        "name": "ผู้ช่วยศาสตราจารย์สุวิมล เทียกทุม",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": "0897034659",
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": "7656275484",
        "telegram_link_code": "gCZe8Q",
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2025-01-22T07:06:24.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e5-9d1c-4ff3-9068-2a0e68fbd5cc",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e5-a3ac-4421-a59c-08cd638be472",
        "idcard": "3679900001591",
        "code": "655180",
        "name": "อาจารย์ยศวรรธน์ จันทนา",
        "position": "รองคณบดี/รองผู้อำนวยการ",
        "contact": "0895005769",
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": "8195760779",
        "telegram_link_code": "tp6vjJ",
        "created_at": "2024-11-17T19:39:21.000000Z",
        "updated_at": "2024-12-23T04:22:00.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e5-a3ac-4421-a59c-08cd638be472",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e5-aa8d-45b3-82e5-b7b40c6d1479",
        "idcard": "5671100040167",
        "code": "655181",
        "name": "อาจารย์สมคิด ฤทธิ์เนติกุล",
        "position": "อาจารย์",
        "contact": "0899596264",
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": "7516061104",
        "telegram_link_code": "Hbfn6a",
        "created_at": "2024-11-17T19:39:22.000000Z",
        "updated_at": "2025-01-22T07:13:15.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e5-aa8d-45b3-82e5-b7b40c6d1479",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e5-b121-4b93-bb86-a0723d76f375",
        "idcard": "3409901105146",
        "code": "655182",
        "name": "อาจารย์ ดร.นฤมล วันน้อย",
        "position": "อาจารย์",
        "contact": "0826461542",
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": "2119612473",
        "telegram_link_code": "pyLCUV",
        "created_at": "2024-11-17T19:39:22.000000Z",
        "updated_at": "2025-01-22T07:12:14.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e5-b121-4b93-bb86-a0723d76f375",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e5-b81c-4153-af29-974908b0b8b1",
        "idcard": "5670100015358",
        "code": "655184",
        "name": "ผู้ช่วยศาสตราจารย์ณัฐรินทร์ ศิริรัตนนันท์",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": "0956399090",
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "10vV5N",
        "created_at": "2024-11-17T19:39:22.000000Z",
        "updated_at": "2025-02-24T05:33:12.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e5-b81c-4153-af29-974908b0b8b1",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e5-beed-47c6-98d7-36e696d2692e",
        "idcard": "1420400042066",
        "code": "655185",
        "name": "อาจารย์ธนภัทร วรปัสสุ",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:22.000000Z",
        "updated_at": "2024-11-17T19:39:22.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e5-beed-47c6-98d7-36e696d2692e",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e5-c5b3-4883-a5ec-c8b6885927ab",
        "idcard": "3440800220294",
        "code": "655186",
        "name": "ผู้ช่วยศาสตราจารย์การันต์ ผึ่งบรรหาร",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:22.000000Z",
        "updated_at": "2024-11-17T19:39:22.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e5-c5b3-4883-a5ec-c8b6885927ab",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e5-cc0d-4d83-939e-56f61d8ff3a6",
        "idcard": "3860800031994",
        "code": "655187",
        "name": "อาจารย์จันทร์จิรา โต๊ะขวัญแก้ว",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:22.000000Z",
        "updated_at": "2024-11-17T19:39:22.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e5-cc0d-4d83-939e-56f61d8ff3a6",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e5-d2bb-4603-bcfb-7033ee26e5cf",
        "idcard": "1670300157153",
        "code": "655188",
        "name": "ว่าที่ร้อยตรีธีรภัทร์ ขอมน้อย",
        "position": "ผู้อำนวยการกองหรือเทียบเท่า",
        "contact": "0809929565",
        "email": null,
        "email_verified_at": null,
        "section_id": "10103",
        "keycloak_id": null,
        "telegram_chat_id": "7728589594",
        "telegram_link_code": "3DdVEm",
        "created_at": "2024-11-17T19:39:22.000000Z",
        "updated_at": "2025-01-10T08:06:58.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10103",
          "name": "กองพัฒนานักศึกษา"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e5-d2bb-4603-bcfb-7033ee26e5cf",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e5-d978-4dc2-820c-b58ee63bfe53",
        "idcard": "1670400114723",
        "code": "655190",
        "name": "นางสาวบุษยามาส นามพุทธา",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": "0946387824",
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": "7741584159",
        "telegram_link_code": "abyl8c",
        "created_at": "2024-11-17T19:39:22.000000Z",
        "updated_at": "2025-01-15T04:14:32.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e5-d978-4dc2-820c-b58ee63bfe53",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e5-dfb8-4bd1-a1fc-03424b1cc48b",
        "idcard": "1420300017680",
        "code": "655191",
        "name": "อาจารย์วิภาดา นาเลา",
        "position": "อาจารย์",
        "contact": "0939132234",
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "lUAqWG",
        "created_at": "2024-11-17T19:39:22.000000Z",
        "updated_at": "2025-01-27T08:00:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e5-dfb8-4bd1-a1fc-03424b1cc48b",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e5-e640-4b32-b23b-f6f9370ec3c9",
        "idcard": "1670400094251",
        "code": "655193",
        "name": "นางสาวชนากานต์ พิณเขียว",
        "position": "เจ้าหน้าที่บริหารงานทั่วไปชำนาญการ",
        "contact": "0966672654",
        "email": null,
        "email_verified_at": null,
        "section_id": "110",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "fWtMHe",
        "created_at": "2024-11-17T19:39:22.000000Z",
        "updated_at": "2025-01-08T07:43:26.000000Z",
        "deleted_at": null,
        "section": {
          "id": "110",
          "name": "สำนักส่งเสริมวิชาการและงานทะเบียน"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e5-e640-4b32-b23b-f6f9370ec3c9",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1e5-ec96-4289-8521-f0e95da452dc",
        "idcard": "3669900075071",
        "code": "656195",
        "name": "อาจารย์ชัชากร คัชมาตย์",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:22.000000Z",
        "updated_at": "2024-11-17T19:39:22.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1e5-ec96-4289-8521-f0e95da452dc",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ee-95a0-4bba-a228-5b1373b9135f",
        "idcard": "1679900163080",
        "code": "656196",
        "name": "นางสาวมณีนุช เกตุแฟง",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "107",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "yleabe",
        "created_at": "2024-11-17T19:39:27.000000Z",
        "updated_at": "2024-12-13T06:29:54.000000Z",
        "deleted_at": null,
        "section": {
          "id": "107",
          "name": "สถาบันวิจัยและพัฒนา"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ee-95a0-4bba-a228-5b1373b9135f",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ee-9fe4-4109-9bc6-de5ce4134dbc",
        "idcard": "3670400021781",
        "code": "656197",
        "name": "อาจารย์ ดร.กัญญารัตน์ เดือนหงาย",
        "position": "รองคณบดี/รองผู้อำนวยการ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:27.000000Z",
        "updated_at": "2024-11-17T19:39:27.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ee-9fe4-4109-9bc6-de5ce4134dbc",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ee-a4d0-4bc0-bb43-65764c0940bd",
        "idcard": "3670400033908",
        "code": "656198",
        "name": "ผู้ช่วยศาสตราจารย์พรทวี กองร้อย",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": "0825797769",
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": "7000702214",
        "telegram_link_code": "rINCIu",
        "created_at": "2024-11-17T19:39:27.000000Z",
        "updated_at": "2025-02-20T07:26:39.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ee-a4d0-4bc0-bb43-65764c0940bd",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ee-a9f3-4e25-b48a-e3cf12ccf275",
        "idcard": "5670700001447",
        "code": "656199",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.ธนาวรรณ สุขเกษม",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": "656199",
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "wuVKrl",
        "created_at": "2024-11-17T19:39:27.000000Z",
        "updated_at": "2025-02-28T09:34:31.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ee-a9f3-4e25-b48a-e3cf12ccf275",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ee-af5a-4618-b295-ce53a7826a04",
        "idcard": "3310102024890",
        "code": "656200",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.หยาดพิรุณ ศุภรากรสกุล",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:27.000000Z",
        "updated_at": "2024-11-17T19:39:27.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ee-af5a-4618-b295-ce53a7826a04",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ee-b575-460b-a165-7b2d9a934e1f",
        "idcard": "5659900004545",
        "code": "656201",
        "name": "อาจารย์ ดร.กฤติกา บูรณโชคไพศาล",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:27.000000Z",
        "updated_at": "2024-11-17T19:39:27.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ee-b575-460b-a165-7b2d9a934e1f",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ee-bc07-4fb4-bfc0-69f345be23a4",
        "idcard": "3420500427446",
        "code": "656202",
        "name": "นายสันธยา นันทพรหม",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:27.000000Z",
        "updated_at": "2024-11-17T19:39:27.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ee-bc07-4fb4-bfc0-69f345be23a4",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ee-c281-4f6c-b8e2-b877f9d84867",
        "idcard": "3670100389472",
        "code": "656203",
        "name": "นางสาวแสงจันทร์ สอนสว่าง",
        "position": "นักวิชาการศึกษา",
        "contact": "0846809862",
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "EV3Nj6",
        "created_at": "2024-11-17T19:39:27.000000Z",
        "updated_at": "2025-01-27T07:23:08.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ee-c281-4f6c-b8e2-b877f9d84867",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ee-c8b2-447d-9497-270cdaec8477",
        "idcard": "3490200157222",
        "code": "656205",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.จุฬา เจริญวงค์",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "nQLurl",
        "created_at": "2024-11-17T19:39:27.000000Z",
        "updated_at": "2025-01-28T07:24:06.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ee-c8b2-447d-9497-270cdaec8477",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ee-cf2e-4c6b-8b5d-e542243c70ab",
        "idcard": "3670200012010",
        "code": "656206",
        "name": "อาจารย์มนัสนันท์ ปิ่นพิทักษ์",
        "position": "อาจารย์",
        "contact": "0826592624",
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "y3sWRi",
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2024-12-26T11:33:23.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ee-cf2e-4c6b-8b5d-e542243c70ab",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ee-d5c3-4b17-bc95-23edda191f1a",
        "idcard": "3670100093786",
        "code": "656207",
        "name": "นางสาววิไล สุกแก้ว",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": "0824628257",
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": "8147037444",
        "telegram_link_code": "jhPq2G",
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2025-01-20T02:52:13.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ee-d5c3-4b17-bc95-23edda191f1a",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ee-dc6e-4edb-ad71-87fe3f335fee",
        "idcard": "1670400020273",
        "code": "656208",
        "name": "นางสาวกัญญา สายสิงห์เทศ",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "WMVrxE",
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2024-12-13T06:16:38.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ee-dc6e-4edb-ad71-87fe3f335fee",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ee-e320-4d0b-a1a9-56cd399606c6",
        "idcard": "1679900007851",
        "code": "656209",
        "name": "อาจารย์พิมพ์พร เกษดี",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "48pl9V",
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2025-03-12T06:38:55.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ee-e320-4d0b-a1a9-56cd399606c6",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ee-e981-4065-8a8c-21e821344f1a",
        "idcard": "3670100876331",
        "code": "656210",
        "name": "อาจารย์ชัญญภัทร นกมั่น",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2024-11-17T19:39:28.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ee-e981-4065-8a8c-21e821344f1a",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ee-f00c-4704-8eea-3bd6128c8edd",
        "idcard": "3670301304679",
        "code": "656211",
        "name": "อาจารย์วันฉัตร กันหา",
        "position": "อาจารย์",
        "contact": "0867534300",
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "KUUQSd",
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2025-02-21T07:26:02.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ee-f00c-4704-8eea-3bd6128c8edd",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ee-f689-48bb-b027-40566c8553c3",
        "idcard": "1659900043360",
        "code": "656212",
        "name": "อาจารย์ ดร.ชลลดา ม่วงธนัง",
        "position": "อาจารย์",
        "contact": "0897049777",
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": "7801755639",
        "telegram_link_code": "FydcwJ",
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2025-01-14T04:53:31.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ee-f689-48bb-b027-40566c8553c3",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ee-fce3-4455-b0e8-c03a7d4acdf0",
        "idcard": "1679900109123",
        "code": "656213",
        "name": "อาจารย์ภรวลัญช์ มาอยู่",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2024-11-17T19:39:28.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ee-fce3-4455-b0e8-c03a7d4acdf0",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ef-03a1-4dc1-8cfc-91094331d956",
        "idcard": "1679900121514",
        "code": "656216",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.นรัตว์ รัตนวัย",
        "position": "รองคณบดี/รองผู้อำนวยการ",
        "contact": "0867474122",
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": "7970857102",
        "telegram_link_code": "3QTH0V",
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2025-01-22T07:03:23.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ef-03a1-4dc1-8cfc-91094331d956",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ef-0a0f-44e7-945b-8ed7893622b2",
        "idcard": "3679800097588",
        "code": "656217",
        "name": "รองศาสตราจารย์ ดร.สุรเชษฐ เอี่ยมสำอาง",
        "position": "รองอธิการบดีฝ่ายวิจัย และการบริการวิชาการ",
        "contact": "0899612694",
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "j9o6kv",
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2025-01-14T15:28:35.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ef-0a0f-44e7-945b-8ed7893622b2",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ef-1071-4d88-9ca6-c74171740351",
        "idcard": "3670200583980",
        "code": "656218",
        "name": "รองศาสตราจารย์ ดร.กาญจน์ คุ้มทรัพย์",
        "position": "คณบดีคณะวิทยาศาสตร์และเทคโนโลยี",
        "contact": "0841132456",
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "1zqj5r",
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2024-12-30T04:22:36.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ef-1071-4d88-9ca6-c74171740351",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ef-1718-4926-88a0-87d921c02163",
        "idcard": "3620400302046",
        "code": "656219",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.อาทิตย์ หู้เต็ม",
        "position": "อาจารย์",
        "contact": "0869909536",
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "9pwCzu",
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2025-02-14T05:08:13.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ef-1718-4926-88a0-87d921c02163",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ef-1dc2-4ccf-9577-ad3d13bdd6af",
        "idcard": "1670500049362",
        "code": "656220",
        "name": "ผู้ช่วยศาสตราจารย์รุจิรา คุ้มทรัพย์",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": "0826995469",
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "YFAhOf",
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2025-01-15T05:14:46.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ef-1dc2-4ccf-9577-ad3d13bdd6af",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ef-246f-42a0-8e01-15f18fce9403",
        "idcard": "1679900047462",
        "code": "656221",
        "name": "นางลักษณ์คณา กิจจรัส",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": "7802660352",
        "telegram_link_code": "Xl0jQm",
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2025-02-25T03:34:03.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ef-246f-42a0-8e01-15f18fce9403",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          },
          {
            "uuid": "9de1769b-14df-43c3-818f-4c7056472c6e",
            "name": "admin_org",
            "description": "ผู้ดูแลหน่วยงาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ef-246f-42a0-8e01-15f18fce9403",
              "role_id": "9de1769b-14df-43c3-818f-4c7056472c6e"
            }
          }
        ]
      },
      {
        "id": "9d83e1ef-2b29-4bf5-914b-bb6c174517be",
        "idcard": "3670101322487",
        "code": "656223",
        "name": "อาจารย์สุภาพร ชูสาย",
        "position": "อาจารย์",
        "contact": "0934629561",
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "1IzCTB",
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2025-01-21T06:41:28.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ef-2b29-4bf5-914b-bb6c174517be",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ef-31d3-4f6d-9407-4fd31dd521ac",
        "idcard": "1670400022748",
        "code": "656225",
        "name": "นางสาวทิวา ไพรเขต",
        "position": "หัวหน้างาน",
        "contact": "6021",
        "email": null,
        "email_verified_at": null,
        "section_id": "110",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "KPmQYD",
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2024-12-20T04:01:13.000000Z",
        "deleted_at": null,
        "section": {
          "id": "110",
          "name": "สำนักส่งเสริมวิชาการและงานทะเบียน"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ef-31d3-4f6d-9407-4fd31dd521ac",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ef-385f-4acb-957b-53878b9efbcc",
        "idcard": "1679900134128",
        "code": "656226",
        "name": "นางกฤษวีณ์ภัค ทองสี",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "107",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "NQBBbI",
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2025-02-10T04:10:46.000000Z",
        "deleted_at": null,
        "section": {
          "id": "107",
          "name": "สถาบันวิจัยและพัฒนา"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ef-385f-4acb-957b-53878b9efbcc",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          },
          {
            "uuid": "9de1769b-14df-43c3-818f-4c7056472c6e",
            "name": "admin_org",
            "description": "ผู้ดูแลหน่วยงาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ef-385f-4acb-957b-53878b9efbcc",
              "role_id": "9de1769b-14df-43c3-818f-4c7056472c6e"
            }
          }
        ]
      },
      {
        "id": "9d83e1ef-3ef3-4723-a0ec-e89b11eb3725",
        "idcard": "3670101207629",
        "code": "656228",
        "name": "นางพิมพ์ชณก คำเหมือง",
        "position": "นักวิชาการเงินและบัญชีชำนาญการ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "BEAz80",
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2025-02-19T06:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ef-3ef3-4723-a0ec-e89b11eb3725",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ef-4587-42e6-ab94-d34f0f4b004a",
        "idcard": "1670100132777",
        "code": "656229",
        "name": "นางสาวสินนภา มามั่ง",
        "position": "นักวิชาการพัสดุ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2024-11-17T19:39:28.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ef-4587-42e6-ab94-d34f0f4b004a",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ef-4bb1-40c0-87c5-de4e13d01e52",
        "idcard": "3670101411820",
        "code": "656230",
        "name": "นางชลิตา บัวเปรม",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "N38t9k",
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2025-01-10T06:51:24.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ef-4bb1-40c0-87c5-de4e13d01e52",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ef-526e-44f8-a208-de4a003c2bf4",
        "idcard": "3670100788016",
        "code": "656231",
        "name": "นางสาวอำภาพร นาคเพชร",
        "position": "หัวหน้างาน",
        "contact": "0812052827",
        "email": null,
        "email_verified_at": null,
        "section_id": "10102",
        "keycloak_id": null,
        "telegram_chat_id": "7297551664",
        "telegram_link_code": "LQ9Lj4",
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2025-01-09T03:22:29.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10102",
          "name": "กองนโยบายและแผน"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ef-526e-44f8-a208-de4a003c2bf4",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ef-5918-44c7-a841-e91d9bd9dcc3",
        "idcard": "3670300506201",
        "code": "656232",
        "name": "นางสาวเนตรนพิศ ศรีบุปผา",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2024-11-17T19:39:28.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10102",
          "name": "กองนโยบายและแผน"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ef-5918-44c7-a841-e91d9bd9dcc3",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ef-5ff2-4144-9f4d-cf15a57a672e",
        "idcard": "1679900170663",
        "code": "656233",
        "name": "นางเนตรชนก แสงบุญ",
        "position": "นักวิชาการศึกษา",
        "contact": "656233",
        "email": null,
        "email_verified_at": null,
        "section_id": "10103",
        "keycloak_id": null,
        "telegram_chat_id": "7537151722",
        "telegram_link_code": "i1N5lu",
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2025-01-14T09:20:44.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10103",
          "name": "กองพัฒนานักศึกษา"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ef-5ff2-4144-9f4d-cf15a57a672e",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ef-66b4-440c-8324-93965a6a1af9",
        "idcard": "1100700294683",
        "code": "656235",
        "name": "อาจารย์ ดร.ณัฐวุฒิ โพธิ์ศรีแก้ว",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2024-11-17T19:39:28.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ef-66b4-440c-8324-93965a6a1af9",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ef-6d9e-4f65-89d6-54757d359f39",
        "idcard": "3670100571769",
        "code": "656236",
        "name": "นางสาวกนกศรี จันทรังสรรค์",
        "position": "นักวิชาการศึกษา",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2024-11-17T19:39:28.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ef-6d9e-4f65-89d6-54757d359f39",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ef-7478-453f-9631-3798ff1c2df0",
        "idcard": "3670101084624",
        "code": "656240",
        "name": "นางสาวภัควัลย์ ทองมั่นวิบูลศรี",
        "position": "นักวิชาการศึกษาชำนาญการ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "110",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2024-11-17T19:39:28.000000Z",
        "deleted_at": null,
        "section": {
          "id": "110",
          "name": "สำนักส่งเสริมวิชาการและงานทะเบียน"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ef-7478-453f-9631-3798ff1c2df0",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ef-7b7c-42ac-ac92-495c5da1c73e",
        "idcard": "3670100498361",
        "code": "656241",
        "name": "นางสาวภาสินี สายทอง",
        "position": "หัวหน้างาน",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "107",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2024-11-17T19:39:28.000000Z",
        "deleted_at": null,
        "section": {
          "id": "107",
          "name": "สถาบันวิจัยและพัฒนา"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ef-7b7c-42ac-ac92-495c5da1c73e",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ef-8211-419e-8cac-25e865bde26e",
        "idcard": "1670800093618",
        "code": "656243",
        "name": "นางสาวธิวาเฉลิม จันทิมา",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2024-11-17T19:39:28.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10103",
          "name": "กองพัฒนานักศึกษา"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ef-8211-419e-8cac-25e865bde26e",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ef-889a-4408-9f0d-70e5e9bb7f3c",
        "idcard": "3459900248181",
        "code": "656246",
        "name": "นายสหพรรณ อาวรณ์",
        "position": "สถาปนิก",
        "contact": "0909154382",
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "LTHRE0",
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2025-02-19T06:38:24.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ef-889a-4408-9f0d-70e5e9bb7f3c",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ef-8f2b-4ef2-9a3c-8566ea0e6b7d",
        "idcard": "1670100003659",
        "code": "656247",
        "name": "นางสาวสุรีรัตน์ บุตรดา",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2024-11-17T19:39:28.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ef-8f2b-4ef2-9a3c-8566ea0e6b7d",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ef-95d8-4048-a4a3-66ac77854420",
        "idcard": "3730200330215",
        "code": "656248",
        "name": "นางธัญญารัตน์ คงเมือง",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2024-11-17T19:39:28.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ef-95d8-4048-a4a3-66ac77854420",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ef-9c84-49e6-a350-3d6303f823a0",
        "idcard": "1679900013843",
        "code": "656249",
        "name": "นายณัฐพงษ์ อุตตโม",
        "position": "นักวิชาการพัสดุ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2024-11-17T19:39:28.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ef-9c84-49e6-a350-3d6303f823a0",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ef-a336-4ca8-9683-147707c031c6",
        "idcard": "3670100838561",
        "code": "656251",
        "name": "นายสมพร แทนจำปา",
        "position": "นักวิชาการคอมพิวเตอร์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2024-11-17T19:39:28.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ef-a336-4ca8-9683-147707c031c6",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ef-a9e9-4d14-a8b9-c987e787bf6e",
        "idcard": "3679900193198",
        "code": "656252",
        "name": "นายอุกกฤษฏ์ จารุรัตน์จามร",
        "position": "นักวิชาการศึกษา",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2024-11-17T19:39:28.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ef-a9e9-4d14-a8b9-c987e787bf6e",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ef-b070-48f6-a8ac-5ed30965314a",
        "idcard": "3809900157955",
        "code": "656253",
        "name": "อาจารย์วิศิษฎ์ บิลมาศ",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2024-11-17T19:39:28.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ef-b070-48f6-a8ac-5ed30965314a",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ef-b72c-4cc5-9174-6485a77bb881",
        "idcard": "3670100148980",
        "code": "656254",
        "name": "นางปิลันธนา ศรีรักษา",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "xe8gOE",
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2024-12-19T09:02:26.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ef-b72c-4cc5-9174-6485a77bb881",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ef-bdc3-45ba-b136-b2ff00fa6ad8",
        "idcard": "3409900547102",
        "code": "656262",
        "name": "อาจารย์นงลักษ์ ยุทธศิลปเสวี",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "Mdo5tb",
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2024-12-13T06:32:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ef-bdc3-45ba-b136-b2ff00fa6ad8",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ef-c43a-4594-96dc-d08e91b16f4f",
        "idcard": "1660100006950",
        "code": "656265",
        "name": "อาจารย์ ดร.สุภัทธนีย์ ขุนสิงห์สกุล",
        "position": "อาจารย์",
        "contact": "0826465519",
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "K0sFH8",
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2025-01-07T08:05:00.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ef-c43a-4594-96dc-d08e91b16f4f",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ef-cacc-4fec-9656-5d234a78ffe7",
        "idcard": "1670400002691",
        "code": "656266",
        "name": "ผู้ช่วยศาสตราจารย์สมพิศ สายบุญชื่น",
        "position": "ผู้ช่วยคณบดี",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "g7U76O",
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2025-01-09T07:08:04.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ef-cacc-4fec-9656-5d234a78ffe7",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ef-d169-480a-bc1b-f08cd3b515af",
        "idcard": "1679900120348",
        "code": "656267",
        "name": "อาจารย์ ดร.วิภารัศมิ์ โฆษิตานนท์",
        "position": "อาจารย์",
        "contact": "0839555535",
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "lbz5He",
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2025-02-06T00:59:09.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ef-d169-480a-bc1b-f08cd3b515af",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ef-d7db-4ec9-b133-6558ab7c108e",
        "idcard": "3470800308990",
        "code": "656268",
        "name": "อาจารย์ ดร.จิรโรจน์ บุญราช",
        "position": "อาจารย์",
        "contact": "0956258614",
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": "7756919397",
        "telegram_link_code": "qcM8ma",
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2025-01-20T05:16:12.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ef-d7db-4ec9-b133-6558ab7c108e",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ef-dea3-41c9-8d46-b9be4313abdc",
        "idcard": "1670400017833",
        "code": "656269",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.ตรียากานต์ พรมคำ",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": "0956295419",
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "Np4KII",
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2025-02-19T09:24:59.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ef-dea3-41c9-8d46-b9be4313abdc",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ef-e545-4666-921a-2e20f7fe632f",
        "idcard": "2679900001533",
        "code": "656270",
        "name": "อาจารย์กิจติยา รวีฉัตรพงศ์",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2024-11-17T19:39:28.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ef-e545-4666-921a-2e20f7fe632f",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ef-ebc3-4b51-9851-74f9569a9727",
        "idcard": "3670300908309",
        "code": "656271",
        "name": "นายวันชัยชนะ นันเขียวตระกูล",
        "position": "นักวิชาการโสตทัศนศึกษา",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2024-11-17T19:39:28.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ef-ebc3-4b51-9851-74f9569a9727",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ef-f263-4683-8b14-4002eb091d7a",
        "idcard": "1679900170540",
        "code": "656272",
        "name": "นางสาวจุฑามาส ชื่นใจ",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "Wcn9Ak",
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2025-01-17T07:24:18.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ef-f263-4683-8b14-4002eb091d7a",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ef-f908-4fab-80ba-6ab0d3cb925d",
        "idcard": "1841600034625",
        "code": "656273",
        "name": "นางสาวสุภาณี เมืองจีน",
        "position": "นักตรวจสอบภายใน",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "111",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2024-11-17T19:39:28.000000Z",
        "deleted_at": null,
        "section": {
          "id": "111",
          "name": "สังกัดอธิการบดี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ef-f908-4fab-80ba-6ab0d3cb925d",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1ef-ff64-4046-93c6-8fb37eff2a86",
        "idcard": "3679900167260",
        "code": "656275",
        "name": "อาจารย์ศานต์ พานิชสิติ",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "amfUZG",
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2025-01-08T07:57:29.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1ef-ff64-4046-93c6-8fb37eff2a86",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1f0-062b-48ee-aaee-b32e0f36be5d",
        "idcard": "3679900234391",
        "code": "656276",
        "name": "อาจารย์ ดร.พิมพ์พรรณ ทิพยแสง",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2024-11-17T19:39:28.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1f0-062b-48ee-aaee-b32e0f36be5d",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1f0-0cde-45a5-8283-3d6fd08db8c0",
        "idcard": "1679900035154",
        "code": "656277",
        "name": "ผู้ช่วยศาสตราจารย์พีรวัฒน์ สุขเกษม",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2024-11-17T19:39:28.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1f0-0cde-45a5-8283-3d6fd08db8c0",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1f0-13b5-4445-adf0-b7640597d984",
        "idcard": "3540600450325",
        "code": "656278",
        "name": "ผู้ช่วยศาสตราจารย์วรชัย ศรีสมุดคำ",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": "0814406109",
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": "7569438844",
        "telegram_link_code": "gVpC5e",
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2025-01-22T07:14:19.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1f0-13b5-4445-adf0-b7640597d984",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1f0-1a76-4273-b0a0-7669ea7aec75",
        "idcard": "1679800004605",
        "code": "656280",
        "name": "อาจารย์วาสนา วงศ์ษา",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2024-11-17T19:39:28.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1f0-1a76-4273-b0a0-7669ea7aec75",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1f0-2130-40c2-984d-252ffd3c50c0",
        "idcard": "1841600006541",
        "code": "656281",
        "name": "อาจารย์อ้อมทิพย์ เมืองจีน",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2024-11-17T19:39:28.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1f0-2130-40c2-984d-252ffd3c50c0",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1f0-27e6-45a5-9e6d-fcdd72deb1c5",
        "idcard": "1670100006429",
        "code": "656282",
        "name": "อาจารย์ชุติมา อ่ำทอง",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "vqrQcU",
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2024-12-13T06:30:08.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1f0-27e6-45a5-9e6d-fcdd72deb1c5",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1f0-2ebb-4bef-97cf-a7aa965baafe",
        "idcard": "1670400073636",
        "code": "656283",
        "name": "นางสาวพุทธิดา ขุนเทพ",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "Qq6Jz6",
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2024-12-13T06:24:26.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1f0-2ebb-4bef-97cf-a7aa965baafe",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1f0-35ca-4e03-942f-ba3448e4eb9e",
        "idcard": "1669900010496",
        "code": "656284",
        "name": "อาจารย์ศิวดล แจ่มจำรัส",
        "position": "รองคณบดี/รองผู้อำนวยการ",
        "contact": "0881423017",
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "RAL4y8",
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2025-02-21T04:06:37.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1f0-35ca-4e03-942f-ba3448e4eb9e",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1f0-3ca1-45ef-8301-fa4d577b924c",
        "idcard": "3679900134256",
        "code": "656285",
        "name": "นายณฐพล น้อยเอี่ยม",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2024-11-17T19:39:28.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1f0-3ca1-45ef-8301-fa4d577b924c",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1f0-4362-4a47-8bac-b6aa0e8f975a",
        "idcard": "1659900207516",
        "code": "656287",
        "name": "อาจารย์อลิสณา อนันตะอาด",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2024-11-17T19:39:28.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1f0-4362-4a47-8bac-b6aa0e8f975a",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d0a370d-8ed1-4452-a55a-1d1b4f1258dd",
        "idcard": "1679900210029",
        "code": "656288",
        "name": "นายชัยมงคล  แก้วสี",
        "position": "นักวิชาการคอมพิวเตอร์",
        "contact": "0823977414",
        "email": "chaimongkol@pcru.ac.th",
        "email_verified_at": null,
        "section_id": "108",
        "keycloak_id": null,
        "telegram_chat_id": "7265944539",
        "telegram_link_code": "SUUNGb",
        "created_at": "2024-09-18T08:06:28.000000Z",
        "updated_at": "2025-01-22T07:11:03.000000Z",
        "deleted_at": null,
        "section": {
          "id": "108",
          "name": "สำนักวิทยบริการและเทคโนโลยีสารสนเทศ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d0a370d-8ed1-4452-a55a-1d1b4f1258dd",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1f0-4a3b-431e-ba71-579d530a55d4",
        "idcard": "1670200127325",
        "code": "656289",
        "name": "นายสัพพัญญู ปิ่นพิทักษ์",
        "position": "หัวหน้างาน",
        "contact": "0865730530",
        "email": null,
        "email_verified_at": null,
        "section_id": "10102",
        "keycloak_id": null,
        "telegram_chat_id": "5285939303",
        "telegram_link_code": "6vRNYs",
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2024-12-19T02:33:02.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10102",
          "name": "กองนโยบายและแผน"
        },
        "roles": [
          {
            "uuid": "9db21068-b307-4fda-b96a-947b348103ef",
            "name": "superadmin",
            "description": "ผู้ดูแลระบบสูงสุด",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1f0-4a3b-431e-ba71-579d530a55d4",
              "role_id": "9db21068-b307-4fda-b96a-947b348103ef"
            }
          }
        ]
      },
      {
        "id": "9d83e1f0-5108-4186-9550-22ba923eaee1",
        "idcard": "1670400124664",
        "code": "656290",
        "name": "นางสาวศิรินภา จั๋นโปแว่น",
        "position": "นักวิเคราะห์นโยบายและแผน",
        "contact": "0849908448",
        "email": null,
        "email_verified_at": null,
        "section_id": "10102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "WxDUaK",
        "created_at": "2024-11-17T19:39:28.000000Z",
        "updated_at": "2025-01-30T07:32:34.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10102",
          "name": "กองนโยบายและแผน"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1f0-5108-4186-9550-22ba923eaee1",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          },
          {
            "uuid": "9db21068-b307-4fda-b96a-947b348103ef",
            "name": "superadmin",
            "description": "ผู้ดูแลระบบสูงสุด",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1f0-5108-4186-9550-22ba923eaee1",
              "role_id": "9db21068-b307-4fda-b96a-947b348103ef"
            }
          }
        ]
      },
      {
        "id": "9d83e1f0-5797-48c8-81c7-bb679f76886c",
        "idcard": "3510100924344",
        "code": "656292",
        "name": "ผู้ช่วยศาสตราจารย์พัชยา เลือดชัยพฤกษ์",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": "0842153465",
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": "7555580320",
        "telegram_link_code": "WVKOjj",
        "created_at": "2024-11-17T19:39:29.000000Z",
        "updated_at": "2025-02-28T05:17:24.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1f0-5797-48c8-81c7-bb679f76886c",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1f0-5e55-4e55-bc05-1e65c53402b4",
        "idcard": "3670100093638",
        "code": "656293",
        "name": "นางกุลทินี ปานแดง",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": "0966683065",
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": "8088209752",
        "telegram_link_code": "yGeMP9",
        "created_at": "2024-11-17T19:39:29.000000Z",
        "updated_at": "2025-01-22T07:03:35.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1f0-5e55-4e55-bc05-1e65c53402b4",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1f0-650e-479c-91fe-e43804f322f5",
        "idcard": "3670100109411",
        "code": "656294",
        "name": "นางสังเวียน จินดา",
        "position": "บรรณารักษ์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "108",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:29.000000Z",
        "updated_at": "2024-11-17T19:39:29.000000Z",
        "deleted_at": null,
        "section": {
          "id": "108",
          "name": "สำนักวิทยบริการและเทคโนโลยีสารสนเทศ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1f0-650e-479c-91fe-e43804f322f5",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1f0-6bc5-460c-8725-9a779467b15c",
        "idcard": "3860100737398",
        "code": "656296",
        "name": "ผู้ช่วยศาสตราจารย์เขมปริต ขุนราชเสนา",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": "0855321828",
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "ZSobyI",
        "created_at": "2024-11-17T19:39:29.000000Z",
        "updated_at": "2025-01-07T08:06:14.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1f0-6bc5-460c-8725-9a779467b15c",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1f0-7223-4c6b-9e84-acbaebb8edee",
        "idcard": "1619900007576",
        "code": "656297",
        "name": "ผู้ช่วยศาสตราจารย์นิสิต องอาจ",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "Gwdlur",
        "created_at": "2024-11-17T19:39:29.000000Z",
        "updated_at": "2025-01-10T03:01:21.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1f0-7223-4c6b-9e84-acbaebb8edee",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1f0-78ba-4194-b5bd-dc8ff77a04e8",
        "idcard": "3670100079210",
        "code": "656298",
        "name": "นางอมรรัตน์ กาละบุตร",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:29.000000Z",
        "updated_at": "2024-11-17T19:39:29.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1f0-78ba-4194-b5bd-dc8ff77a04e8",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1f0-7f3b-499d-bbd4-d68057d21c3a",
        "idcard": "5670790025758",
        "code": "656299",
        "name": "อาจารย์ ดร.สดุดี คำมี",
        "position": "รองผู้อำนวยการสำนักศิลปะและวัฒนธรรม",
        "contact": "0640326543",
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "ftyfFA",
        "created_at": "2024-11-17T19:39:29.000000Z",
        "updated_at": "2024-12-18T13:15:36.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1f0-7f3b-499d-bbd4-d68057d21c3a",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1f0-8601-4cb0-b7c9-f61bb2742f66",
        "idcard": "3670101362756",
        "code": "656300",
        "name": "อาจารย์เดชา ด้วงมาก",
        "position": "อาจารย์",
        "contact": "0956355272",
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "o3JF9l",
        "created_at": "2024-11-17T19:39:29.000000Z",
        "updated_at": "2025-03-06T09:52:31.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1f0-8601-4cb0-b7c9-f61bb2742f66",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1f0-8cb8-4a45-b863-d753671c8e16",
        "idcard": "3670100105733",
        "code": "656304",
        "name": "นางนันทพร บุญพัด",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "114",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "KKy6WV",
        "created_at": "2024-11-17T19:39:29.000000Z",
        "updated_at": "2025-02-17T02:31:10.000000Z",
        "deleted_at": null,
        "section": {
          "id": "114",
          "name": "บัณฑิตวิทยาลัย"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1f0-8cb8-4a45-b863-d753671c8e16",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1f0-9376-4923-8c79-01eaee5e4e98",
        "idcard": "3670300652401",
        "code": "656305",
        "name": "นางสาวรุศดา พรรณรัตนชัย",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:29.000000Z",
        "updated_at": "2024-11-17T19:39:29.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1f0-9376-4923-8c79-01eaee5e4e98",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1f0-99d2-4c2b-bdd6-1b3382f85eb0",
        "idcard": "5670590034290",
        "code": "656306",
        "name": "นางสาวพัชรี พูลวงษ์",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "XgU3yJ",
        "created_at": "2024-11-17T19:39:29.000000Z",
        "updated_at": "2025-01-13T03:52:55.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1f0-99d2-4c2b-bdd6-1b3382f85eb0",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1f0-a059-4452-b28e-edd6aef4068b",
        "idcard": "1629900134004",
        "code": "656307",
        "name": "นางสาววิรงลอง ทองขาว",
        "position": "หัวหน้างาน",
        "contact": "0956344462",
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": "7327854753",
        "telegram_link_code": "xNLYTO",
        "created_at": "2024-11-17T19:39:29.000000Z",
        "updated_at": "2024-12-16T08:38:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1f0-a059-4452-b28e-edd6aef4068b",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1f0-a6e6-4c26-a2a4-ec5ebc737212",
        "idcard": "1679900130947",
        "code": "656310",
        "name": "นางสาวปวีณา บัวบาง",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": "0835491241",
        "email": null,
        "email_verified_at": null,
        "section_id": "109",
        "keycloak_id": null,
        "telegram_chat_id": "7559700420",
        "telegram_link_code": "HH04G1",
        "created_at": "2024-11-17T19:39:29.000000Z",
        "updated_at": "2024-12-13T06:59:42.000000Z",
        "deleted_at": null,
        "section": {
          "id": "109",
          "name": "สำนักศิลปะและวัฒนธรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1f0-a6e6-4c26-a2a4-ec5ebc737212",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          },
          {
            "uuid": "9de1769b-14df-43c3-818f-4c7056472c6e",
            "name": "admin_org",
            "description": "ผู้ดูแลหน่วยงาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1f0-a6e6-4c26-a2a4-ec5ebc737212",
              "role_id": "9de1769b-14df-43c3-818f-4c7056472c6e"
            }
          }
        ]
      },
      {
        "id": "9d83e1f0-ada8-41fb-97f2-52efe369c14c",
        "idcard": "1320300021637",
        "code": "656311",
        "name": "อาจารย์วิธวรรธน์ สีชื่น",
        "position": "อาจารย์",
        "contact": "0832223457",
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": "7389272117",
        "telegram_link_code": "O36khK",
        "created_at": "2024-11-17T19:39:29.000000Z",
        "updated_at": "2025-02-24T03:14:34.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1f0-ada8-41fb-97f2-52efe369c14c",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1f0-b469-438c-9fe4-8625d3df43e1",
        "idcard": "1679900128853",
        "code": "657312",
        "name": "นางสาวฐะปะนีย์ บุญตั้ง",
        "position": "เจ้าหน้าที่บริหารงานทั่วไปชำนาญการ",
        "contact": "0947123256",
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "VgRm7N",
        "created_at": "2024-11-17T19:39:29.000000Z",
        "updated_at": "2024-12-19T07:18:59.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1f0-b469-438c-9fe4-8625d3df43e1",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1f0-bb23-4403-8afc-e1ddeb12f7fd",
        "idcard": "1409900137005",
        "code": "657314",
        "name": "นายศุภณัฐ วิสุงเร",
        "position": "นักวิชาการคอมพิวเตอร์",
        "contact": "0878567389",
        "email": null,
        "email_verified_at": null,
        "section_id": "10102",
        "keycloak_id": null,
        "telegram_chat_id": "-4717929236",
        "telegram_link_code": "gML83A",
        "created_at": "2024-11-17T19:39:29.000000Z",
        "updated_at": "2024-12-25T00:50:43.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10102",
          "name": "กองนโยบายและแผน"
        },
        "roles": [
          {
            "uuid": "9db21068-b307-4fda-b96a-947b348103ef",
            "name": "superadmin",
            "description": "ผู้ดูแลระบบสูงสุด",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1f0-bb23-4403-8afc-e1ddeb12f7fd",
              "role_id": "9db21068-b307-4fda-b96a-947b348103ef"
            }
          }
        ]
      },
      {
        "id": "9d83e1f0-c1e6-4cd7-9d6d-4f2ee61573bb",
        "idcard": "1670400101036",
        "code": "657317",
        "name": "นายอนนท์ กันผง",
        "position": "นักวิชาการช่างศิลป์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:29.000000Z",
        "updated_at": "2024-11-17T19:39:29.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1f0-c1e6-4cd7-9d6d-4f2ee61573bb",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1f0-c8ac-406b-a340-a78c6e7b4379",
        "idcard": "3360500427943",
        "code": "657318",
        "name": "ผู้ช่วยศาสตราจารย์ดวงจันทร์ สีหาราช",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:29.000000Z",
        "updated_at": "2024-11-17T19:39:29.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1f0-c8ac-406b-a340-a78c6e7b4379",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1f0-cf5d-44ec-8975-992d1978a831",
        "idcard": "1249900029328",
        "code": "657320",
        "name": "อาจารย์ ดร.ทิวาวรรณ ศิริเจริญ กันหา",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:29.000000Z",
        "updated_at": "2024-11-17T19:39:29.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1f0-cf5d-44ec-8975-992d1978a831",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1f0-d5dd-46a8-8766-c6d6134e06aa",
        "idcard": "3671000149446",
        "code": "657323",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.กมลฉัตร กล่อมอิ่ม",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:29.000000Z",
        "updated_at": "2024-11-17T19:39:29.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1f0-d5dd-46a8-8766-c6d6134e06aa",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1f0-dcb2-47f9-8e55-0af4cce522d7",
        "idcard": "3669900018159",
        "code": "657325",
        "name": "อาจารย์รุ่งลักษณา ดีแจ่ม",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:29.000000Z",
        "updated_at": "2024-11-17T19:39:29.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1f0-dcb2-47f9-8e55-0af4cce522d7",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1f0-e343-4604-b2f8-39d4593acbde",
        "idcard": "3160400042944",
        "code": "657326",
        "name": "ผู้ช่วยศาสตราจารย์ชนิรัตน์ ผึ่งบรรหาร",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": "0889496199",
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "aceWWJ",
        "created_at": "2024-11-17T19:39:29.000000Z",
        "updated_at": "2025-03-12T02:23:32.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1f0-e343-4604-b2f8-39d4593acbde",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1f0-e9b7-43c1-87ee-b6cd192d9165",
        "idcard": "1679900146258",
        "code": "657327",
        "name": "อาจารย์ ดร.ชนากานต์ วิญญกุล",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:29.000000Z",
        "updated_at": "2024-11-17T19:39:29.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1f0-e9b7-43c1-87ee-b6cd192d9165",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1f0-f073-4530-bc0c-cc7f42fe4baf",
        "idcard": "3191100183021",
        "code": "657328",
        "name": "ผู้ช่วยศาสตราจารย์อิสระ ตั้งสุวรรณ์",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "0UTnlc",
        "created_at": "2024-11-17T19:39:29.000000Z",
        "updated_at": "2024-12-27T04:39:39.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1f0-f073-4530-bc0c-cc7f42fe4baf",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1f0-f778-4c5a-bb38-6c7cd550ff8c",
        "idcard": "1659900321840",
        "code": "657329",
        "name": "อาจารย์พรทิศา ทองสนิทกาญจน์",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:29.000000Z",
        "updated_at": "2024-11-17T19:39:29.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1f0-f778-4c5a-bb38-6c7cd550ff8c",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1f0-fe07-44a4-a072-4ae9d39ecbc6",
        "idcard": "3501400250609",
        "code": "657330",
        "name": "อาจารย์ ดร.เจน จันทรสุภาเสน",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:29.000000Z",
        "updated_at": "2024-11-17T19:39:29.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1f0-fe07-44a4-a072-4ae9d39ecbc6",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1f1-04d6-4000-94c9-afefe178fe75",
        "idcard": "1679900109107",
        "code": "657333",
        "name": "ผู้ช่วยศาสตราจารย์ปรมะ แก้วพวง",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": "0953236926",
        "email": null,
        "email_verified_at": null,
        "section_id": "116",
        "keycloak_id": null,
        "telegram_chat_id": "7658880959",
        "telegram_link_code": "HFe37N",
        "created_at": "2024-11-17T19:39:29.000000Z",
        "updated_at": "2024-12-20T10:03:23.000000Z",
        "deleted_at": null,
        "section": {
          "id": "116",
          "name": "โรงเรียนสาธิตมหาวิทยาลัยราชภัฏเพชรบูรณ์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1f1-04d6-4000-94c9-afefe178fe75",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1f1-0bcc-4b01-a0bb-2565d1241804",
        "idcard": "5671100042046",
        "code": "657334",
        "name": "นางสาวหงส์ทอง ขุยสุข",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:29.000000Z",
        "updated_at": "2024-11-17T19:39:29.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1f1-0bcc-4b01-a0bb-2565d1241804",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1f1-1296-4adb-82f0-c57987e28950",
        "idcard": "1559900036909",
        "code": "657335",
        "name": "อาจารย์สุพิชชา โชติกำจร",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "JuAWB0",
        "created_at": "2024-11-17T19:39:29.000000Z",
        "updated_at": "2025-01-08T02:14:35.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1f1-1296-4adb-82f0-c57987e28950",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1f1-191d-4688-80d9-33c523785564",
        "idcard": "3619900136704",
        "code": "657336",
        "name": "อาจารย์วิญญู พันธ์โต",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:29.000000Z",
        "updated_at": "2024-11-17T19:39:29.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1f1-191d-4688-80d9-33c523785564",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1f1-201d-4424-a806-6fa777317ae4",
        "idcard": "1469900127034",
        "code": "657337",
        "name": "ผู้ช่วยศาสตราจารย์ธนาวรรณ พิณะเวศน์",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:29.000000Z",
        "updated_at": "2024-11-17T19:39:29.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1f1-201d-4424-a806-6fa777317ae4",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1f1-26d0-4a17-a49b-bd8f4ca874c7",
        "idcard": "1529900082226",
        "code": "657338",
        "name": "อาจารย์ฐิติกานต์ แก้ววิเศษ",
        "position": "อาจารย์",
        "contact": "0885475076",
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "kcge0G",
        "created_at": "2024-11-17T19:39:29.000000Z",
        "updated_at": "2025-02-17T09:27:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1f1-26d0-4a17-a49b-bd8f4ca874c7",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fa-19d2-476c-ac4e-c29664d23dcc",
        "idcard": "1669800033133",
        "code": "657340",
        "name": "อาจารย์ ดร.นิตยา นาคอินทร์",
        "position": "อาจารย์",
        "contact": "0642687333",
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "DoX3HO",
        "created_at": "2024-11-17T19:39:35.000000Z",
        "updated_at": "2025-01-22T07:13:40.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fa-19d2-476c-ac4e-c29664d23dcc",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fa-24ef-459d-b908-c16c05034b9a",
        "idcard": "3320700933702",
        "code": "657344",
        "name": "อาจารย์ชชุรัตน์ ศรีจันทวงศ์",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:35.000000Z",
        "updated_at": "2024-11-17T19:39:35.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fa-24ef-459d-b908-c16c05034b9a",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fa-2af7-40a2-9a84-38f1e9a76656",
        "idcard": "1679900154013",
        "code": "657345",
        "name": "นางสาวสุพิชญา พูนมี",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": "0802079209",
        "email": null,
        "email_verified_at": null,
        "section_id": "109",
        "keycloak_id": null,
        "telegram_chat_id": "7790848930",
        "telegram_link_code": "5b0biK",
        "created_at": "2024-11-17T19:39:35.000000Z",
        "updated_at": "2025-03-13T09:22:22.000000Z",
        "deleted_at": null,
        "section": {
          "id": "109",
          "name": "สำนักศิลปะและวัฒนธรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fa-2af7-40a2-9a84-38f1e9a76656",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          },
          {
            "uuid": "9de1769b-14df-43c3-818f-4c7056472c6e",
            "name": "admin_org",
            "description": "ผู้ดูแลหน่วยงาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fa-2af7-40a2-9a84-38f1e9a76656",
              "role_id": "9de1769b-14df-43c3-818f-4c7056472c6e"
            }
          }
        ]
      },
      {
        "id": "9d83e1fa-3105-48ac-8615-7ede933d2ecf",
        "idcard": "1539900197627",
        "code": "657346",
        "name": "อาจารย์ ดร.นทีธร นาคพรหม",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:35.000000Z",
        "updated_at": "2024-11-17T19:39:35.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fa-3105-48ac-8615-7ede933d2ecf",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fa-371e-49d6-95d3-87d74c03eb97",
        "idcard": "1801200117841",
        "code": "657347",
        "name": "อาจารย์ ดร.กฤตวิทย์ ลิ่มกุล",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:35.000000Z",
        "updated_at": "2024-11-17T19:39:35.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fa-371e-49d6-95d3-87d74c03eb97",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fa-3da0-4bff-93db-37de7fe771e8",
        "idcard": "1509900924367",
        "code": "658349",
        "name": "ผู้ช่วยศาสตราจารย์ศุภาวัลย์ นันตา",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:35.000000Z",
        "updated_at": "2024-11-17T19:39:35.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fa-3da0-4bff-93db-37de7fe771e8",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fa-4454-4a8b-a0a5-28f5ea23fc4f",
        "idcard": "3100800542286",
        "code": "658350",
        "name": "ผู้ช่วยศาสตราจารย์ศานิตย์ สุวรรณวงศ์",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": "0870115315",
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": "7980225635",
        "telegram_link_code": "c8Fd1e",
        "created_at": "2024-11-17T19:39:35.000000Z",
        "updated_at": "2025-02-13T07:04:11.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fa-4454-4a8b-a0a5-28f5ea23fc4f",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fa-4b35-4964-bd1b-1dbd6de1b71e",
        "idcard": "3400500061921",
        "code": "658352",
        "name": "อาจารย์วรางคณา ภู่ศิริภิญโญ",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:35.000000Z",
        "updated_at": "2024-11-17T19:39:35.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fa-4b35-4964-bd1b-1dbd6de1b71e",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fa-5219-4a8f-ab4f-dd2c73002c1b",
        "idcard": "1801100074393",
        "code": "658353",
        "name": "ผู้ช่วยศาสตราจารย์ฤทัยทิพย์ รัตนพันธ์",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": "0611656242",
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": "7810717137",
        "telegram_link_code": "zUYDXs",
        "created_at": "2024-11-17T19:39:35.000000Z",
        "updated_at": "2025-02-06T06:39:24.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fa-5219-4a8f-ab4f-dd2c73002c1b",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fa-5908-4cc9-b84a-e28f846092aa",
        "idcard": "1909900187636",
        "code": "658354",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.นันทวัน พัวพัน",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": "0611542262",
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": "7515111962",
        "telegram_link_code": "LE0x5K",
        "created_at": "2024-11-17T19:39:35.000000Z",
        "updated_at": "2025-02-04T09:04:20.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fa-5908-4cc9-b84a-e28f846092aa",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fa-6000-4d9a-a5bc-9bf82d20e3c1",
        "idcard": "1100800030882",
        "code": "658355",
        "name": "ผู้ช่วยศาสตราจารย์ทรงเกียรติ บัวลอย",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "ricq1L",
        "created_at": "2024-11-17T19:39:35.000000Z",
        "updated_at": "2025-03-01T05:28:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fa-6000-4d9a-a5bc-9bf82d20e3c1",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fa-66d5-43ec-b9ac-17e461864faf",
        "idcard": "1160400077172",
        "code": "658357",
        "name": "ผู้ช่วยศาสตราจารย์อโณทัย พลเยี่ยม เพชรแสง",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "mMvYAV",
        "created_at": "2024-11-17T19:39:35.000000Z",
        "updated_at": "2025-01-06T09:11:39.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fa-66d5-43ec-b9ac-17e461864faf",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fa-6dd6-4373-b2bd-127912f047db",
        "idcard": "3670300415183",
        "code": "658358",
        "name": "ผู้ช่วยศาสตราจารย์อภิวัฒน์ คำภีระ",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:35.000000Z",
        "updated_at": "2024-11-17T19:39:35.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fa-6dd6-4373-b2bd-127912f047db",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fa-74b5-45af-8356-53ec8afb95ed",
        "idcard": "1650500009191",
        "code": "658359",
        "name": "อาจารย์ณัฐพล ภู่ระหงษ์",
        "position": "อาจารย์",
        "contact": "0905743810",
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "GoIfVH",
        "created_at": "2024-11-17T19:39:35.000000Z",
        "updated_at": "2024-12-19T03:55:42.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fa-74b5-45af-8356-53ec8afb95ed",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fa-7bde-45e7-84b4-cdf153d52608",
        "idcard": "1670400115673",
        "code": "658360",
        "name": "อาจารย์สมฤทัย เย็นใจ",
        "position": "อาจารย์",
        "contact": "658360",
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "BaXnlt",
        "created_at": "2024-11-17T19:39:35.000000Z",
        "updated_at": "2025-01-25T08:36:02.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fa-7bde-45e7-84b4-cdf153d52608",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fa-8306-41fd-ac67-eb14c6cd8335",
        "idcard": "1670200139412",
        "code": "658362",
        "name": "อาจารย์กติญา บุญสวน",
        "position": "อาจารย์",
        "contact": "0918942459",
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "jTbOsW",
        "created_at": "2024-11-17T19:39:35.000000Z",
        "updated_at": "2025-01-22T07:15:27.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fa-8306-41fd-ac67-eb14c6cd8335",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fa-89f1-4530-8ccd-db968a2a670d",
        "idcard": "3670101627628",
        "code": "658363",
        "name": "อาจารย์รัชนีวรรณ ประยงค์กุล",
        "position": "อาจารย์",
        "contact": "0817921117",
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": "7508942185",
        "telegram_link_code": "WR5Qe8",
        "created_at": "2024-11-17T19:39:35.000000Z",
        "updated_at": "2025-02-05T07:40:42.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fa-89f1-4530-8ccd-db968a2a670d",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fa-90fd-496f-bf19-ab1fba3b6a1c",
        "idcard": "2579900022884",
        "code": "658365",
        "name": "อาจารย์วิมลวรรณ วงค์ศิริ",
        "position": "อาจารย์",
        "contact": "0815957771",
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": "7840631855",
        "telegram_link_code": "lnZ941",
        "created_at": "2024-11-17T19:39:35.000000Z",
        "updated_at": "2025-02-07T09:24:18.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fa-90fd-496f-bf19-ab1fba3b6a1c",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fa-97de-43fd-a627-40dfc7f0a5ab",
        "idcard": "3509901099269",
        "code": "658366",
        "name": "ผู้ช่วยศาสตราจารย์สาวิตรี วงศ์สุรเศรษฐ์",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:35.000000Z",
        "updated_at": "2024-11-17T19:39:35.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fa-97de-43fd-a627-40dfc7f0a5ab",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fa-9ed4-4069-a561-4f6281d20cfc",
        "idcard": "3160100860838",
        "code": "658367",
        "name": "อาจารย์ธีรภัทร ดีเอม",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:35.000000Z",
        "updated_at": "2024-11-17T19:39:35.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fa-9ed4-4069-a561-4f6281d20cfc",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fa-a5c8-46b0-b086-04a0753308b4",
        "idcard": "1101400703155",
        "code": "659370",
        "name": "ผู้ช่วยศาสตราจารย์ขวัญจิรา เจียนสกุล",
        "position": "รองคณบดีฝ่ายวิชาการและประกันคุณภาพ",
        "contact": "0851128723",
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": "7869141066",
        "telegram_link_code": "EFzXxd",
        "created_at": "2024-11-17T19:39:35.000000Z",
        "updated_at": "2025-02-04T08:11:14.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fa-a5c8-46b0-b086-04a0753308b4",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fa-acf9-4b22-a1fb-7fc403986004",
        "idcard": "1670700118104",
        "code": "659371",
        "name": "ผู้ช่วยศาสตราจารย์วิชญาพร อ่อนปุย",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:35.000000Z",
        "updated_at": "2024-11-17T19:39:35.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fa-acf9-4b22-a1fb-7fc403986004",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fa-b417-42d4-a2f0-d14b1d1c90a8",
        "idcard": "3600101086694",
        "code": "659372",
        "name": "ผู้ช่วยศาสตราจารย์พิสิษฐิกุล แก้วงาม",
        "position": "รองคณบดีฝ่ายวิจัยและนวัตกรรม",
        "contact": "0819141953",
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": "7053513974",
        "telegram_link_code": "gdBEPx",
        "created_at": "2024-11-17T19:39:35.000000Z",
        "updated_at": "2025-02-06T06:02:26.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fa-b417-42d4-a2f0-d14b1d1c90a8",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fa-bb36-4d43-ba07-b4f797eeff2f",
        "idcard": "1670400022772",
        "code": "659373",
        "name": "นางสาวมัลลิกา อุฤทธิ์",
        "position": "นักวิชาการวัฒนธรรม",
        "contact": "0994793965",
        "email": null,
        "email_verified_at": null,
        "section_id": "109",
        "keycloak_id": null,
        "telegram_chat_id": "7506376995",
        "telegram_link_code": "z3EFWA",
        "created_at": "2024-11-17T19:39:35.000000Z",
        "updated_at": "2024-12-13T07:27:53.000000Z",
        "deleted_at": null,
        "section": {
          "id": "109",
          "name": "สำนักศิลปะและวัฒนธรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fa-bb36-4d43-ba07-b4f797eeff2f",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fa-c212-445d-8eda-b61c6a6739d5",
        "idcard": "3670400349671",
        "code": "659374",
        "name": "นางคำไผ่ แก่นไทย",
        "position": "นักวิชาการศึกษา",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "110",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:35.000000Z",
        "updated_at": "2024-11-17T19:39:35.000000Z",
        "deleted_at": null,
        "section": {
          "id": "110",
          "name": "สำนักส่งเสริมวิชาการและงานทะเบียน"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fa-c212-445d-8eda-b61c6a6739d5",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fa-c8da-4eb1-84d8-ff69a88ab705",
        "idcard": "1510100192487",
        "code": "659375",
        "name": "นางสาวขนิษฐา ศรีสวัสดิ์",
        "position": "นักวิทยาศาสตร์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "dEcodZ",
        "created_at": "2024-11-17T19:39:35.000000Z",
        "updated_at": "2025-01-06T03:48:16.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fa-c8da-4eb1-84d8-ff69a88ab705",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fa-cfa4-406b-b432-9e9331787475",
        "idcard": "1670400137499",
        "code": "659376",
        "name": "นางจุฑามาศ อินทรรักษ์",
        "position": "นักวิชาการศึกษา",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "ibZG1C",
        "created_at": "2024-11-17T19:39:35.000000Z",
        "updated_at": "2025-01-14T02:58:17.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fa-cfa4-406b-b432-9e9331787475",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fa-d671-4060-b27c-f133e41ddf30",
        "idcard": "1679900214032",
        "code": "659377",
        "name": "นางสาวณัฐวดี แก้วบาง",
        "position": "นักวิชาการวัฒนธรรม",
        "contact": "0904517664",
        "email": null,
        "email_verified_at": null,
        "section_id": "109",
        "keycloak_id": null,
        "telegram_chat_id": "7940238541",
        "telegram_link_code": "QSBjwA",
        "created_at": "2024-11-17T19:39:35.000000Z",
        "updated_at": "2024-12-13T06:58:45.000000Z",
        "deleted_at": null,
        "section": {
          "id": "109",
          "name": "สำนักศิลปะและวัฒนธรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fa-d671-4060-b27c-f133e41ddf30",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fa-dd71-4b3a-bfee-08be434905dd",
        "idcard": "3670700509568",
        "code": "659378",
        "name": "ผู้ช่วยศาสตราจารย์เอราวัณ ชาญพหล",
        "position": "คณบดีคณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม",
        "contact": "0862267789",
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": "7836167749",
        "telegram_link_code": "VWWj1Q",
        "created_at": "2024-11-17T19:39:35.000000Z",
        "updated_at": "2025-01-22T07:09:01.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fa-dd71-4b3a-bfee-08be434905dd",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fa-e452-47c2-a5f6-4fffd6a78606",
        "idcard": "3330301105741",
        "code": "659379",
        "name": "ผู้ช่วยศาสตราจารย์กัญญ์กุลณัช พีรชาอัครชัย",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "UyeEAP",
        "created_at": "2024-11-17T19:39:35.000000Z",
        "updated_at": "2025-01-13T03:48:17.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fa-e452-47c2-a5f6-4fffd6a78606",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fa-eb55-407f-a258-d31c3e6f1e88",
        "idcard": "1160300043845",
        "code": "659381",
        "name": "นางศิริลักษณ์ วรปัสสุ",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": "0956325356",
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "F1oMzj",
        "created_at": "2024-11-17T19:39:35.000000Z",
        "updated_at": "2025-01-22T07:04:38.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fa-eb55-407f-a258-d31c3e6f1e88",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fa-f238-4d36-b543-b3cdbf75d6e8",
        "idcard": "1679900191814",
        "code": "659382",
        "name": "นางสาวภัสราภรณ์ บุญสิงห์",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": "0946234463",
        "email": null,
        "email_verified_at": null,
        "section_id": "107",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "4SwXX3",
        "created_at": "2024-11-17T19:39:35.000000Z",
        "updated_at": "2024-12-13T07:05:28.000000Z",
        "deleted_at": null,
        "section": {
          "id": "107",
          "name": "สถาบันวิจัยและพัฒนา"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fa-f238-4d36-b543-b3cdbf75d6e8",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fa-f927-4c42-a025-c5adbd4c0d67",
        "idcard": "1670400078671",
        "code": "659383",
        "name": "ผู้ช่วยศาสตราจารย์หทัยนุช จันทร์ชัยภูมิ",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": "0956305557",
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": "7281374606",
        "telegram_link_code": "ajPlfR",
        "created_at": "2024-11-17T19:39:35.000000Z",
        "updated_at": "2025-01-22T06:55:04.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fa-f927-4c42-a025-c5adbd4c0d67",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fb-001c-406a-8809-84c98acdad91",
        "idcard": "1419900137897",
        "code": "659384",
        "name": "อาจารย์ภาณุวัชร์ นิรานนท์",
        "position": "อาจารย์",
        "contact": "0626544559",
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": "7552199241",
        "telegram_link_code": "qMDXrk",
        "created_at": "2024-11-17T19:39:35.000000Z",
        "updated_at": "2025-01-26T05:17:43.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fb-001c-406a-8809-84c98acdad91",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fb-071d-482b-ad18-95ecdb7e4f53",
        "idcard": "1629900234076",
        "code": "659385",
        "name": "อาจารย์กำธร คงอรุณ",
        "position": "อาจารย์",
        "contact": "0979916928",
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "Q95Mpe",
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2025-01-27T08:16:32.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fb-071d-482b-ad18-95ecdb7e4f53",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fb-0df6-4093-8bcd-327e5d293746",
        "idcard": "1160200065162",
        "code": "659386",
        "name": "อาจารย์ ดร.สลักจิตร คณะฤทธิ์",
        "position": "อาจารย์",
        "contact": "0949149444",
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "An0NUR",
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2025-03-06T03:41:17.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fb-0df6-4093-8bcd-327e5d293746",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fb-14ab-4ece-970b-db3521ae4ebe",
        "idcard": "1679900034093",
        "code": "659387",
        "name": "อาจารย์ยศวดี นิรารมย์",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2024-11-17T19:39:36.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fb-14ab-4ece-970b-db3521ae4ebe",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fb-1b88-4aa7-b007-fc5c31d1a947",
        "idcard": "3420900363151",
        "code": "660388",
        "name": "อาจารย์ ดร.ฉลาด ยืนยาว",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2024-11-17T19:39:36.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fb-1b88-4aa7-b007-fc5c31d1a947",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fb-2295-4c01-8440-35649e5af176",
        "idcard": "3679900161415",
        "code": "660389",
        "name": "นายพงษ์ศิริ เกษดี",
        "position": "นักวิเคราะห์นโยบายและแผน",
        "contact": "0814988259",
        "email": null,
        "email_verified_at": null,
        "section_id": "10102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "5Pj71p",
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2024-12-18T09:01:08.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10102",
          "name": "กองนโยบายและแผน"
        },
        "roles": [
          {
            "uuid": "9d0c4ad8-1ea9-456f-83cb-740d441433a0",
            "name": "admin",
            "description": "ผู้ดูแลระบบ",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fb-2295-4c01-8440-35649e5af176",
              "role_id": "9d0c4ad8-1ea9-456f-83cb-740d441433a0"
            }
          },
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fb-2295-4c01-8440-35649e5af176",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          },
          {
            "uuid": "9db21068-b307-4fda-b96a-947b348103ef",
            "name": "superadmin",
            "description": "ผู้ดูแลระบบสูงสุด",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fb-2295-4c01-8440-35649e5af176",
              "role_id": "9db21068-b307-4fda-b96a-947b348103ef"
            }
          }
        ]
      },
      {
        "id": "9d83e1fb-2966-4cde-98bc-e649f516fe3d",
        "idcard": "3670300070771",
        "code": "660390",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.ไพฑูรย์ สอนทน",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2024-11-17T19:39:36.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fb-2966-4cde-98bc-e649f516fe3d",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fb-3050-40fa-bbbc-10c6fb2bf009",
        "idcard": "3530101046561",
        "code": "660391",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.เกรียงไกร ทิมศร",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2024-11-17T19:39:36.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fb-3050-40fa-bbbc-10c6fb2bf009",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fb-377d-411e-8156-b5fd41f9bed8",
        "idcard": "1679900013215",
        "code": "660392",
        "name": "อาจารย์ ดร.นันทรักษ์ รอดเกตุ",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2024-11-17T19:39:36.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fb-377d-411e-8156-b5fd41f9bed8",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fb-3eb1-4878-abab-865ee641eace",
        "idcard": "3400600243037",
        "code": "660393",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.ณัฏฐวัฒน์ แซงภูเขียว",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "P8SPZo",
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2025-02-13T07:24:46.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fb-3eb1-4878-abab-865ee641eace",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fb-4594-4fa4-9a18-8edcddf07f74",
        "idcard": "1103700017143",
        "code": "660394",
        "name": "อาจารย์พิชญา เชี่ยวภาษา",
        "position": "อาจารย์",
        "contact": "0649952298",
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": "7506086994",
        "telegram_link_code": "tLQZaB",
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2025-03-12T02:42:00.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fb-4594-4fa4-9a18-8edcddf07f74",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fb-4c83-4974-96fb-a2dc204cd2f4",
        "idcard": "3679900168592",
        "code": "660395",
        "name": "นางสาวกัลยภาพรรณ เกิดเดช",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "Wy9a7N",
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2025-03-05T07:29:21.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fb-4c83-4974-96fb-a2dc204cd2f4",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fb-5371-4f9f-9443-3206ddc8987e",
        "idcard": "1670100129130",
        "code": "660396",
        "name": "นางสุพรรณี ตั้งจิตเจริญกุล",
        "position": "ปฏิบัติหน้าที่ในตำแหน่งหัวหน้างานเลขานุการผู้บริหาร",
        "contact": "0845913888",
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "RIdZ4k",
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2025-01-13T09:27:49.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fb-5371-4f9f-9443-3206ddc8987e",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fb-5a5e-4ab5-b6b8-01c90c7b2cad",
        "idcard": "3679900081454",
        "code": "661397",
        "name": "นางสาวสุภัคญาดา ธนัชกรวรกิจ",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2024-11-17T19:39:36.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fb-5a5e-4ab5-b6b8-01c90c7b2cad",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fb-615b-4dad-988e-0a6ba3fa0118",
        "idcard": "3360500277241",
        "code": "661398",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.อำพล ชะโยมชัย",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": "0623100609",
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "3o1ik1",
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2025-01-23T01:51:28.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fb-615b-4dad-988e-0a6ba3fa0118",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fb-6848-4137-a96c-311c80089412",
        "idcard": "1679900207923",
        "code": "661400",
        "name": "อาจารย์หทัยชนก อ่างหิรัญ",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2024-11-17T19:39:36.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fb-6848-4137-a96c-311c80089412",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fb-6f41-4e8b-8a0e-0a6e5ead2986",
        "idcard": "1679900218712",
        "code": "661402",
        "name": "นางสาวจิรภา เหมือนพิมทอง",
        "position": "นักวิชาการวัฒนธรรม",
        "contact": "0825911122",
        "email": null,
        "email_verified_at": null,
        "section_id": "109",
        "keycloak_id": null,
        "telegram_chat_id": "7496890512",
        "telegram_link_code": "SACBAx",
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2024-12-13T07:55:14.000000Z",
        "deleted_at": null,
        "section": {
          "id": "109",
          "name": "สำนักศิลปะและวัฒนธรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fb-6f41-4e8b-8a0e-0a6e5ead2986",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fb-7651-4132-b3e5-5075a265fc1e",
        "idcard": "3670101428994",
        "code": "661403",
        "name": "นางสาวกัญญาภัค ดีดาร์",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": "0652539922",
        "email": null,
        "email_verified_at": null,
        "section_id": "109",
        "keycloak_id": null,
        "telegram_chat_id": "7706505782",
        "telegram_link_code": "3ndC3h",
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2025-03-13T04:31:27.000000Z",
        "deleted_at": null,
        "section": {
          "id": "109",
          "name": "สำนักศิลปะและวัฒนธรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fb-7651-4132-b3e5-5075a265fc1e",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          },
          {
            "uuid": "9de1769b-14df-43c3-818f-4c7056472c6e",
            "name": "admin_org",
            "description": "ผู้ดูแลหน่วยงาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fb-7651-4132-b3e5-5075a265fc1e",
              "role_id": "9de1769b-14df-43c3-818f-4c7056472c6e"
            }
          }
        ]
      },
      {
        "id": "9d83e1fb-7d7f-40fc-a9ae-424a82aef149",
        "idcard": "1679800111614",
        "code": "661404",
        "name": "อาจารย์ธนภัทร มะณีแสง",
        "position": "อาจารย์",
        "contact": "0956196962",
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "3NlPcQ",
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2025-01-22T07:11:09.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fb-7d7f-40fc-a9ae-424a82aef149",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fb-84bd-43b3-bf1b-1ca2cfbc70e9",
        "idcard": "1679900171627",
        "code": "661405",
        "name": "อาจารย์วรชัย ศรีเมือง",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": "8025519881",
        "telegram_link_code": "72JuoH",
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2025-01-22T07:12:10.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fb-84bd-43b3-bf1b-1ca2cfbc70e9",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fb-8bea-4d27-8ef5-1d0c78fc9ca0",
        "idcard": "3660500415659",
        "code": "661406",
        "name": "ผู้ช่วยศาสตราจารย์ณัถฑ์ เขียวงาม",
        "position": "รองคณบดี/รองผู้อำนวยการ",
        "contact": "0936939963",
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": "7329730983",
        "telegram_link_code": "0raywF",
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2025-03-06T08:19:13.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fb-8bea-4d27-8ef5-1d0c78fc9ca0",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fb-92d4-4545-8ff3-481d9f304478",
        "idcard": "1670400124745",
        "code": "661407",
        "name": "ผู้ช่วยศาสตราจารย์ศุภรัตน์ แก้วเสริม",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "nrVPWu",
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2024-12-13T07:25:33.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fb-92d4-4545-8ff3-481d9f304478",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fb-99e8-4b60-899f-a988b700be91",
        "idcard": "3520101289928",
        "code": "661408",
        "name": "อาจารย์ธนวรรธน์ ท้าวนอก",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2024-11-17T19:39:36.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fb-99e8-4b60-899f-a988b700be91",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fb-a0a0-40e4-b80c-dbeee1c8cf54",
        "idcard": "1410200065496",
        "code": "661410",
        "name": "รองศาสตราจารย์ ดร.สุมาลี พิมพันธุ์",
        "position": "รองศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": "7667609389",
        "telegram_link_code": "hO0kNS",
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2025-01-04T08:08:11.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fb-a0a0-40e4-b80c-dbeee1c8cf54",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fb-a79f-458c-9ab6-eda83b10f68d",
        "idcard": "1679900316935",
        "code": "662411",
        "name": "นางสาวจารุวรรณ กองสี",
        "position": "นักวิชาการศึกษา",
        "contact": "0873077055",
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "Ow0w7x",
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2025-03-03T09:30:14.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fb-a79f-458c-9ab6-eda83b10f68d",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fb-ae72-46d0-b81d-302859e67315",
        "idcard": "1650800119099",
        "code": "662412",
        "name": "นายไพศาล ยี่คิ้ว",
        "position": "วิศวกรโยธา",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2025-02-19T02:54:12.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10105",
          "name": "กองอาคารสถานที่"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fb-ae72-46d0-b81d-302859e67315",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fb-b539-48ff-933a-af826c44be16",
        "idcard": "1710800033541",
        "code": "662413",
        "name": "นางณัฐชา ก้อนทองคำ",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2024-11-17T19:39:36.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10103",
          "name": "กองพัฒนานักศึกษา"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fb-b539-48ff-933a-af826c44be16",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fb-bbfb-40b2-baf5-1985c983fb3b",
        "idcard": "1669800159854",
        "code": "662414",
        "name": "นางสาวณุตรา พงษ์ไทย",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": "0885225939",
        "email": null,
        "email_verified_at": null,
        "section_id": "10103",
        "keycloak_id": null,
        "telegram_chat_id": "8175249192",
        "telegram_link_code": "lWnLsy",
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2025-01-08T09:16:25.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10103",
          "name": "กองพัฒนานักศึกษา"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fb-bbfb-40b2-baf5-1985c983fb3b",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fb-c2b7-4d2f-9534-4f177d7ed76e",
        "idcard": "3540700185712",
        "code": "662415",
        "name": "นางยุพารัตน์ รังษีสกรณ์",
        "position": "ผู้อำนวยการกอง",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2024-11-17T19:39:36.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fb-c2b7-4d2f-9534-4f177d7ed76e",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fb-c986-40f7-9475-457d12c98c65",
        "idcard": "3679800156592",
        "code": "662417",
        "name": "อาจารย์อังคณา จันทร์แสงศรี",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "WFZlh5",
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2024-12-11T16:21:25.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fb-c986-40f7-9475-457d12c98c65",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fb-d049-4ac5-854a-3edb4ddebe73",
        "idcard": "1459900155356",
        "code": "662418",
        "name": "อาจารย์ศุมาลิณ ดีจันทร์",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2024-11-17T19:39:36.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fb-d049-4ac5-854a-3edb4ddebe73",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fb-d721-4a76-b08c-6e4d8dc55ca8",
        "idcard": "3620400768347",
        "code": "662419",
        "name": "ผู้ช่วยศาสตราจารย์ธงชัย เครือผือ",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2024-11-17T19:39:36.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fb-d721-4a76-b08c-6e4d8dc55ca8",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fb-ddf7-4eb3-923e-24c701ecbf9e",
        "idcard": "3360101331021",
        "code": "662420",
        "name": "นายยศรพี ทองเจริญ",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": "0658919351",
        "email": null,
        "email_verified_at": null,
        "section_id": "107",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "sCPN4h",
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2024-12-20T04:53:40.000000Z",
        "deleted_at": null,
        "section": {
          "id": "107",
          "name": "สถาบันวิจัยและพัฒนา"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fb-ddf7-4eb3-923e-24c701ecbf9e",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fb-e4d4-4c3c-95d9-71f9e84f10f5",
        "idcard": "1679900172461",
        "code": "662422",
        "name": "นายพิชิตชัย ศิริโสม",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "110",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2024-11-17T19:39:36.000000Z",
        "deleted_at": null,
        "section": {
          "id": "110",
          "name": "สำนักส่งเสริมวิชาการและงานทะเบียน"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fb-e4d4-4c3c-95d9-71f9e84f10f5",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fb-ebc8-4fff-8af3-4d29c7334c08",
        "idcard": "3301700524731",
        "code": "662423",
        "name": "อาจารย์สุชาติ เขียวนอก",
        "position": "อาจารย์",
        "contact": "0860244281",
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "y9plft",
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2025-01-22T06:55:23.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fb-ebc8-4fff-8af3-4d29c7334c08",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fb-f27e-47b8-a3e3-b9b424ef4e08",
        "idcard": "3679900149750",
        "code": "662424",
        "name": "นายชัชวาล ระตะเจริญ",
        "position": "หัวหน้างาน",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2024-11-17T19:39:36.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fb-f27e-47b8-a3e3-b9b424ef4e08",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fb-f9b4-491e-90fe-590f4a0271fe",
        "idcard": "1441000072457",
        "code": "662425",
        "name": "อาจารย์ผกามาศ ปะระทัง",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2024-11-17T19:39:36.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fb-f9b4-491e-90fe-590f4a0271fe",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fc-00a1-4555-bf76-ca8788ea7840",
        "idcard": "1219900478858",
        "code": "662426",
        "name": "อาจารย์นวรัตน์ มีชัย",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2024-11-17T19:39:36.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fc-00a1-4555-bf76-ca8788ea7840",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fc-078b-4d05-b38c-ad509dce5a40",
        "idcard": "1530200053861",
        "code": "662427",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.สุพรรษา น้อยนคร",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "eNMOw1",
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2025-01-23T09:30:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fc-078b-4d05-b38c-ad509dce5a40",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fc-0e86-4884-b18b-e3dd017fbca3",
        "idcard": "1670400096229",
        "code": "662428",
        "name": "อาจารย์ตรีศูล เกษร",
        "position": "อาจารย์",
        "contact": "0852674351",
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": "7914964714",
        "telegram_link_code": "7aMIOf",
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2025-01-02T03:44:47.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fc-0e86-4884-b18b-e3dd017fbca3",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fc-154a-43eb-9c29-0a5db91739af",
        "idcard": "1470500047922",
        "code": "662430",
        "name": "อาจารย์ศุภกร ทาพิมพ์",
        "position": "อาจารย์",
        "contact": "0959536847",
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "KATETc",
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2025-01-15T09:26:34.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fc-154a-43eb-9c29-0a5db91739af",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fc-1c22-41a7-a75d-32aa100b7271",
        "idcard": "1640600153471",
        "code": "662431",
        "name": "อาจารย์อภิชาติ สุวรรณชื่น",
        "position": "อาจารย์",
        "contact": "0947314456",
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "c5ehxK",
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2025-01-17T07:24:00.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fc-1c22-41a7-a75d-32aa100b7271",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fc-22d5-41db-a9be-937ad560334a",
        "idcard": "3400101600659",
        "code": "662432",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.ชัยสิทธิ์ วันน้อย",
        "position": "ผู้ช่วยศาสตราจารย์",
        "contact": "0918396689",
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": "8111080131",
        "telegram_link_code": "QkrsyJ",
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2025-01-22T08:08:31.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fc-22d5-41db-a9be-937ad560334a",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fc-2994-4af8-8695-0c0bc0d5a813",
        "idcard": "1679900007983",
        "code": "662433",
        "name": "อาจารย์รัตนากร แสนทำพล",
        "position": "อาจารย์",
        "contact": "0817838250",
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": "7857481069",
        "telegram_link_code": "yEUl68",
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2025-02-21T04:55:24.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fc-2994-4af8-8695-0c0bc0d5a813",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fc-3083-49b2-92f1-22aeaff1ede4",
        "idcard": "1679900320941",
        "code": "663436",
        "name": "นายธนาวุฒิ คงอุดมธนกร",
        "position": "สถาปนิก",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2024-11-17T19:39:36.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10102",
          "name": "กองนโยบายและแผน"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fc-3083-49b2-92f1-22aeaff1ede4",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fc-377f-46cc-b6ba-d448a9841983",
        "idcard": "1659900366118",
        "code": "663437",
        "name": "อาจารย์กฤษณา เกตุคำ",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": "7920197364",
        "telegram_link_code": "rcxp96",
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2025-01-22T08:05:28.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fc-377f-46cc-b6ba-d448a9841983",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fc-3e5f-4407-b955-05b2705268c1",
        "idcard": "1670300151287",
        "code": "663438",
        "name": "อาจารย์พิชญาภา ตรีวงษ์",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2024-11-17T19:39:36.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fc-3e5f-4407-b955-05b2705268c1",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fc-4585-45e4-9fea-d88307232df8",
        "idcard": "1679900043939",
        "code": "663439",
        "name": "อาจารย์สุธิรา เบญจานุกรม",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2024-11-17T19:39:36.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fc-4585-45e4-9fea-d88307232df8",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fc-4cd1-469a-8070-06c951767798",
        "idcard": "3670500335388",
        "code": "663440",
        "name": "นางสาวกุลิสรา ปองเพียร",
        "position": "บุคลากร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2024-11-17T19:39:36.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fc-4cd1-469a-8070-06c951767798",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fc-541c-4c09-9bda-620c8262a33d",
        "idcard": "3670700668798",
        "code": "663441",
        "name": "นายชัยวัฒน์ เบ้าสมบูรณ์",
        "position": "นิติกร",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2024-11-17T19:39:36.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fc-541c-4c09-9bda-620c8262a33d",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fc-5b44-454b-9185-7b75717a00c7",
        "idcard": "5670190077846",
        "code": "663442",
        "name": "นางสุกัญญา งับตะมะ",
        "position": "นักวิชาการเงินและบัญชี",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2024-11-17T19:39:36.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fc-5b44-454b-9185-7b75717a00c7",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fc-6240-4cf9-8710-3db612907812",
        "idcard": "3670200813152",
        "code": "663443",
        "name": "นางสาวกัญญ์ชุลี เยาวพินด์",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "qMwV8G",
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2025-02-17T09:26:12.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10102",
          "name": "กองนโยบายและแผน"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fc-6240-4cf9-8710-3db612907812",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fc-6962-48ab-b362-f6f59a07e4f8",
        "idcard": "1679900187825",
        "code": "663444",
        "name": "นายกิตติพันธ์ พลพันธ์",
        "position": "นักวิชาการศึกษา",
        "contact": "0918434535",
        "email": null,
        "email_verified_at": null,
        "section_id": "10103",
        "keycloak_id": null,
        "telegram_chat_id": "7967471189",
        "telegram_link_code": "amevL2",
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2025-01-09T08:44:00.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10103",
          "name": "กองพัฒนานักศึกษา"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fc-6962-48ab-b362-f6f59a07e4f8",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fc-704d-441e-9019-242a8f67817a",
        "idcard": "3670101012330",
        "code": "663445",
        "name": "นางสาวธนัชญา ทับสิงห์",
        "position": "นักวิชาการศึกษา",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "q9hWCy",
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2025-01-13T09:31:52.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fc-704d-441e-9019-242a8f67817a",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fc-7746-46ae-adef-0d7f162226ae",
        "idcard": "3670700048714",
        "code": "663446",
        "name": "นายอดิสรณ์ เนาว์แก้ว",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": "0953358553",
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": "8181407215",
        "telegram_link_code": "sxeipT",
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2024-12-13T07:01:34.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fc-7746-46ae-adef-0d7f162226ae",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fc-7e17-4375-b6d2-cfe9e84b4fef",
        "idcard": "1659900405661",
        "code": "663447",
        "name": "นางสาวสุนิต สร้อยทอง",
        "position": "เจ้าหน้าที่บริหารงานทั่วไปชำนาญการ",
        "contact": "0629914166",
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": "7262059905",
        "telegram_link_code": "3AAKP4",
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2024-12-27T04:25:46.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fc-7e17-4375-b6d2-cfe9e84b4fef",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fc-8505-4c2c-a8b8-4ff2c34c3c44",
        "idcard": "3670500676223",
        "code": "663448",
        "name": "นางสาวเบญจภัทร์ อุปรัง",
        "position": "นักวิชาการพัสดุ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:36.000000Z",
        "updated_at": "2024-11-17T19:39:36.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fc-8505-4c2c-a8b8-4ff2c34c3c44",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fc-8bf4-41ba-9bd1-b03914e2c621",
        "idcard": "1670500216251",
        "code": "664449",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.ณัฐพล ปักการะนัง",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:37.000000Z",
        "updated_at": "2024-11-17T19:39:37.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fc-8bf4-41ba-9bd1-b03914e2c621",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fc-92e0-42f9-8390-d07940c4ba91",
        "idcard": "3679900113623",
        "code": "664450",
        "name": "นายกิตติศักดิ์ อัตตะชีวะ",
        "position": "นักวิชาการโสตทัศนศึกษา",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:37.000000Z",
        "updated_at": "2024-11-17T19:39:37.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fc-92e0-42f9-8390-d07940c4ba91",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fc-99da-4595-8c04-d2e1df8be2f1",
        "idcard": "1709900690551",
        "code": "664451",
        "name": "อาจารย์ธเนศ เรืองเดช",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:37.000000Z",
        "updated_at": "2024-11-17T19:39:37.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fc-99da-4595-8c04-d2e1df8be2f1",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fc-a0da-420c-afb6-7faf1328b4ad",
        "idcard": "1450700199688",
        "code": "664452",
        "name": "อาจารย์นิรุต ขันทรี",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:37.000000Z",
        "updated_at": "2024-11-17T19:39:37.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fc-a0da-420c-afb6-7faf1328b4ad",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fc-a7c4-4e15-acae-507e97a6045a",
        "idcard": "1550900071153",
        "code": "664453",
        "name": "อาจารย์สุนารี ฝีปากเพราะ",
        "position": "อาจารย์",
        "contact": "0857241428",
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "u37UaL",
        "created_at": "2024-11-17T19:39:37.000000Z",
        "updated_at": "2025-01-23T02:50:32.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fc-a7c4-4e15-acae-507e97a6045a",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fc-aeb3-4ae8-9873-a0c9712d407b",
        "idcard": "1679900172585",
        "code": "664454",
        "name": "นางสาวจะสิทธิ์พร นามวงศ์",
        "position": "นักวิชาการศึกษา",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "110",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "4vcglo",
        "created_at": "2024-11-17T19:39:37.000000Z",
        "updated_at": "2025-01-24T04:25:03.000000Z",
        "deleted_at": null,
        "section": {
          "id": "110",
          "name": "สำนักส่งเสริมวิชาการและงานทะเบียน"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fc-aeb3-4ae8-9873-a0c9712d407b",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fc-b5d1-4b6f-9ebb-7f790bad00d9",
        "idcard": "1679900191831",
        "code": "664455",
        "name": "อาจารย์พงษ์วรินทร์ เต็งยี่",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:37.000000Z",
        "updated_at": "2024-11-17T19:39:37.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fc-b5d1-4b6f-9ebb-7f790bad00d9",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fc-bd1e-4f8a-8f70-b55fcfce7fcd",
        "idcard": "1679900102994",
        "code": "664456",
        "name": "อาจารย์ณัฐวุฒิ สุทธิประภา",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "r3ti1R",
        "created_at": "2024-11-17T19:39:37.000000Z",
        "updated_at": "2024-12-13T06:32:23.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fc-bd1e-4f8a-8f70-b55fcfce7fcd",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fc-c404-45c2-831c-2f31ba38aa0c",
        "idcard": "1670200115866",
        "code": "664457",
        "name": "อาจารย์สุวนิตย์ เทศนวน",
        "position": "อาจารย์",
        "contact": "0873109997",
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "c6s1RH",
        "created_at": "2024-11-17T19:39:37.000000Z",
        "updated_at": "2025-02-17T10:43:31.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fc-c404-45c2-831c-2f31ba38aa0c",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e1fc-cb10-4004-af8c-c58d01143980",
        "idcard": "3350800360453",
        "code": "664458",
        "name": "อาจารย์อภินันท์ ทะสุนทร",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "3D7GCU",
        "created_at": "2024-11-17T19:39:37.000000Z",
        "updated_at": "2025-03-15T06:11:57.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e1fc-cb10-4004-af8c-c58d01143980",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20d-d841-422a-8c1c-0b4826d39090",
        "idcard": "1679900009552",
        "code": "664459",
        "name": "อาจารย์อุไรวรรณ ศรีนารางค์",
        "position": "อาจารย์",
        "contact": "0619519193",
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "bMJvTv",
        "created_at": "2024-11-17T19:39:48.000000Z",
        "updated_at": "2025-02-18T03:13:39.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20d-d841-422a-8c1c-0b4826d39090",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20d-e282-4fbc-be2a-c1caf37c877e",
        "idcard": "1659900303337",
        "code": "664460",
        "name": "อาจารย์ ดร.วศินี รุ่งเรือง",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:48.000000Z",
        "updated_at": "2024-11-17T19:39:48.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20d-e282-4fbc-be2a-c1caf37c877e",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20d-e78a-43a6-abc8-4ea0b682bd83",
        "idcard": "3560300708645",
        "code": "665461",
        "name": "อาจารย์ ดร.กิตติวินท์ เดชชวนากร",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:48.000000Z",
        "updated_at": "2024-11-17T19:39:48.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20d-e78a-43a6-abc8-4ea0b682bd83",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20d-ecc9-43ba-8067-c713dd416a38",
        "idcard": "1409900222321",
        "code": "665462",
        "name": "อาจารย์ ดร.ณัฐพล โยธา",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:48.000000Z",
        "updated_at": "2024-11-17T19:39:48.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20d-ecc9-43ba-8067-c713dd416a38",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20d-f29e-46fb-b73f-397ee651a464",
        "idcard": "3250500199470",
        "code": "665463",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.ปรีชา ศรีเรืองฤทธิ์",
        "position": "อธิการบดี",
        "contact": "665463",
        "email": null,
        "email_verified_at": null,
        "section_id": "1",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "VUJT5U",
        "created_at": "2024-11-17T19:39:48.000000Z",
        "updated_at": "2025-01-08T04:08:54.000000Z",
        "deleted_at": null,
        "section": {
          "id": "1",
          "name": "มหาวิทยาลัยราชภัฎเพชรบูรณ์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20d-f29e-46fb-b73f-397ee651a464",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20d-f8f3-4bb4-af8b-2c9641c83797",
        "idcard": "3670100864685",
        "code": "665464",
        "name": "อาจารย์  ดร. ปาณิสรา คงปัญญา",
        "position": "คณบดี",
        "contact": "0952395364",
        "email": null,
        "email_verified_at": null,
        "section_id": "105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "jDB8up",
        "created_at": "2024-11-17T19:39:48.000000Z",
        "updated_at": "2025-01-03T04:48:53.000000Z",
        "deleted_at": null,
        "section": {
          "id": "105",
          "name": "คณะวิทยาการจัดการ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20d-f8f3-4bb4-af8b-2c9641c83797",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20d-ffd0-4f95-849f-7dbacc9ec39a",
        "idcard": "1361100010870",
        "code": "665465",
        "name": "อาจารย์เตือนใจ ผางคำ",
        "position": "อาจารย์",
        "contact": "0639789194",
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "vT4pY3",
        "created_at": "2024-11-17T19:39:48.000000Z",
        "updated_at": "2025-03-05T09:11:52.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20d-ffd0-4f95-849f-7dbacc9ec39a",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20e-0649-4917-813a-e31e4ef2309b",
        "idcard": "1679900177129",
        "code": "665467",
        "name": "นางสาวอุษา เดชสำรี",
        "position": "นักวิชาการเงินและบัญชี",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:48.000000Z",
        "updated_at": "2024-11-17T19:39:48.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20e-0649-4917-813a-e31e4ef2309b",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20e-0d01-4ba8-b2a8-59842323935c",
        "idcard": "3450700117424",
        "code": "665468",
        "name": "อาจารย์ ดร.บุญสิน นาดอนดู่",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "vNhhFu",
        "created_at": "2024-11-17T19:39:48.000000Z",
        "updated_at": "2025-03-17T05:47:37.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20e-0d01-4ba8-b2a8-59842323935c",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20e-1391-4e06-9511-5d262ae1c412",
        "idcard": "3260300186510",
        "code": "665469",
        "name": "อาจารย์อภิญญา บำรุงจิตต์",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:48.000000Z",
        "updated_at": "2024-11-17T19:39:48.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20e-1391-4e06-9511-5d262ae1c412",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20e-1a49-417b-8c4d-e4dd09ccee2a",
        "idcard": "3400101132558",
        "code": "665470",
        "name": "อาจารย์ศุภ์ธเนศ ยมสีดา",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:48.000000Z",
        "updated_at": "2024-11-17T19:39:48.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20e-1a49-417b-8c4d-e4dd09ccee2a",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20e-2105-4bb6-91b1-fa88cb4ef965",
        "idcard": "3930800274063",
        "code": "665471",
        "name": "อาจารย์ ดร.พุทธสุดา หนุดหละ",
        "position": "อาจารย์",
        "contact": "0897342353",
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "D39sAa",
        "created_at": "2024-11-17T19:39:48.000000Z",
        "updated_at": "2025-01-27T03:16:04.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20e-2105-4bb6-91b1-fa88cb4ef965",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20e-2808-45a0-a966-2140fa1f6922",
        "idcard": "3540400448041",
        "code": "665472",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.ชัยยา นรเดชานันท์",
        "position": "คณบดี",
        "contact": "0882734813",
        "email": null,
        "email_verified_at": null,
        "section_id": "112",
        "keycloak_id": null,
        "telegram_chat_id": "7906679618",
        "telegram_link_code": "tJFk7p",
        "created_at": "2024-11-17T19:39:48.000000Z",
        "updated_at": "2025-03-10T15:22:21.000000Z",
        "deleted_at": null,
        "section": {
          "id": "112",
          "name": "คณะพยาบาลศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20e-2808-45a0-a966-2140fa1f6922",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20e-2ecd-4c40-9799-cd92fad771c5",
        "idcard": "1679900152738",
        "code": "665473",
        "name": "นางสาวชาลินี มากมา",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": "665473",
        "email": null,
        "email_verified_at": null,
        "section_id": "112",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "RdTyX0",
        "created_at": "2024-11-17T19:39:48.000000Z",
        "updated_at": "2024-12-23T05:07:55.000000Z",
        "deleted_at": null,
        "section": {
          "id": "112",
          "name": "คณะพยาบาลศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20e-2ecd-4c40-9799-cd92fad771c5",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20e-35a9-4197-9d8f-295d8ae3eb1c",
        "idcard": "1670400021601",
        "code": "665474",
        "name": "นางสมฤดี ศรีเมือง",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": "0849891492",
        "email": null,
        "email_verified_at": null,
        "section_id": "112",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "inmQEX",
        "created_at": "2024-11-17T19:39:48.000000Z",
        "updated_at": "2024-12-23T06:02:07.000000Z",
        "deleted_at": null,
        "section": {
          "id": "112",
          "name": "คณะพยาบาลศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20e-35a9-4197-9d8f-295d8ae3eb1c",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20e-3c79-458e-bd71-24c40992f275",
        "idcard": "1679900179032",
        "code": "665475",
        "name": "นางสาววิยะดา จิตจำนงค์",
        "position": "นักวิชาการศึกษา",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "112",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "kCnLZI",
        "created_at": "2024-11-17T19:39:48.000000Z",
        "updated_at": "2025-01-06T08:11:08.000000Z",
        "deleted_at": null,
        "section": {
          "id": "112",
          "name": "คณะพยาบาลศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20e-3c79-458e-bd71-24c40992f275",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20e-432e-4276-830a-c891e4488844",
        "idcard": "1559900100186",
        "code": "666476",
        "name": "อาจารย์วัชระ เกี๋ยนต๊ะ",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "112",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "kNOLFb",
        "created_at": "2024-11-17T19:39:48.000000Z",
        "updated_at": "2024-12-27T04:50:52.000000Z",
        "deleted_at": null,
        "section": {
          "id": "112",
          "name": "คณะพยาบาลศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20e-432e-4276-830a-c891e4488844",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20e-49ab-4798-9289-8109d6947e1f",
        "idcard": "3359900102284",
        "code": "666477",
        "name": "อาจารย์ ดร.กนิษฐ ศรีปานแก้ว",
        "position": "อาจารย์",
        "contact": "0614052012",
        "email": null,
        "email_verified_at": null,
        "section_id": "112",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "18iHnP",
        "created_at": "2024-11-17T19:39:48.000000Z",
        "updated_at": "2025-01-21T08:43:23.000000Z",
        "deleted_at": null,
        "section": {
          "id": "112",
          "name": "คณะพยาบาลศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20e-49ab-4798-9289-8109d6947e1f",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20e-5065-45c5-907d-b2a600375e4f",
        "idcard": "3659900774000",
        "code": "666478",
        "name": "อาจารย์ลออ สิงหโชติสุขแพทย์",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "112",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "Cueadp",
        "created_at": "2024-11-17T19:39:48.000000Z",
        "updated_at": "2025-01-02T07:06:19.000000Z",
        "deleted_at": null,
        "section": {
          "id": "112",
          "name": "คณะพยาบาลศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20e-5065-45c5-907d-b2a600375e4f",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20e-5727-422e-a37c-d3e09311e3fa",
        "idcard": "1550300024308",
        "code": "666479",
        "name": "อาจารย์เครือวัลย์ คำฟู",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "112",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "CdSOwy",
        "created_at": "2024-11-17T19:39:48.000000Z",
        "updated_at": "2024-12-13T06:28:10.000000Z",
        "deleted_at": null,
        "section": {
          "id": "112",
          "name": "คณะพยาบาลศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20e-5727-422e-a37c-d3e09311e3fa",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20e-5d92-4a58-9223-d3467264fc3e",
        "idcard": "3409900351232",
        "code": "666481",
        "name": "ผู้ช่วยศาสตราจารย์ ดร.นิลาวรรณ ฉันทะปรีดา",
        "position": "รองคณบดี/รองผู้อำนวยการ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "112",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "ieF9gx",
        "created_at": "2024-11-17T19:39:48.000000Z",
        "updated_at": "2024-12-23T06:44:52.000000Z",
        "deleted_at": null,
        "section": {
          "id": "112",
          "name": "คณะพยาบาลศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20e-5d92-4a58-9223-d3467264fc3e",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20e-6453-4717-a0c8-a70a184873e9",
        "idcard": "3670301265673",
        "code": "666482",
        "name": "อาจารย์ธนวัฒน์ เฉลิมพงษ์",
        "position": "อาจารย์",
        "contact": "0881519978",
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": "7047031938",
        "telegram_link_code": "ZgSqDV",
        "created_at": "2024-11-17T19:39:48.000000Z",
        "updated_at": "2024-12-13T06:54:17.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20e-6453-4717-a0c8-a70a184873e9",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20e-6b02-44ac-87c4-e3389d095f89",
        "idcard": "3679800065040",
        "code": "666483",
        "name": "อาจารย์ภัทธาวุธ วงศ์ศักดิ์",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:48.000000Z",
        "updated_at": "2024-11-17T19:39:48.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20e-6b02-44ac-87c4-e3389d095f89",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20e-71b4-4c0f-a4e3-9c6acd6b5b52",
        "idcard": "2679900021828",
        "code": "666484",
        "name": "นางสาวธัญพิชชา ฉัตริยกุล",
        "position": "นักแนะแนวการศึกษาและอาชีพ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "fpIQmX",
        "created_at": "2024-11-17T19:39:48.000000Z",
        "updated_at": "2025-03-11T07:31:48.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10103",
          "name": "กองพัฒนานักศึกษา"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20e-71b4-4c0f-a4e3-9c6acd6b5b52",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20e-7876-49a8-8fe7-6f4b74f5b36d",
        "idcard": "1679900158752",
        "code": "666485",
        "name": "นางสาวปนัดดา วงศ์โสม",
        "position": "นักเอกสารสนเทศ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "108",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "2XrHsc",
        "created_at": "2024-11-17T19:39:48.000000Z",
        "updated_at": "2024-12-13T06:28:52.000000Z",
        "deleted_at": null,
        "section": {
          "id": "108",
          "name": "สำนักวิทยบริการและเทคโนโลยีสารสนเทศ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20e-7876-49a8-8fe7-6f4b74f5b36d",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20e-7f30-474e-9962-363876514693",
        "idcard": "1510100267894",
        "code": "666486",
        "name": "นายธนาพงศ์ ไชยบุตร",
        "position": "นักวิชาการคอมพิวเตอร์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "108",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:48.000000Z",
        "updated_at": "2024-11-17T19:39:48.000000Z",
        "deleted_at": null,
        "section": {
          "id": "108",
          "name": "สำนักวิทยบริการและเทคโนโลยีสารสนเทศ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20e-7f30-474e-9962-363876514693",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20e-85e5-4cf3-8533-eccd9587ca0c",
        "idcard": "1679900368536",
        "code": "666487",
        "name": "นายพฤฒิ เกตะวันดี",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "tyuZEi",
        "created_at": "2024-11-17T19:39:48.000000Z",
        "updated_at": "2024-12-19T06:26:43.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20e-85e5-4cf3-8533-eccd9587ca0c",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20e-8ce2-4841-b034-f362fd2e5289",
        "idcard": "1100500467789",
        "code": "666488",
        "name": "อาจารย์ ดร.สุริยล ยิ้มเนตร",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:48.000000Z",
        "updated_at": "2024-11-17T19:39:48.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20e-8ce2-4841-b034-f362fd2e5289",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20e-93ad-4881-98a5-7ce84e74310c",
        "idcard": "1679900321319",
        "code": "666489",
        "name": "ว่าที่ ร.ต.ชะนะพล จักรเสน",
        "position": "นักวิชาการคอมพิวเตอร์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "108",
        "keycloak_id": null,
        "telegram_chat_id": "7218571157",
        "telegram_link_code": "gvsaIB",
        "created_at": "2024-11-17T19:39:48.000000Z",
        "updated_at": "2024-12-06T01:45:05.000000Z",
        "deleted_at": null,
        "section": {
          "id": "108",
          "name": "สำนักวิทยบริการและเทคโนโลยีสารสนเทศ"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20e-93ad-4881-98a5-7ce84e74310c",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20e-9a6a-42f4-9d74-31f2b8fb0e0a",
        "idcard": "5670190017215",
        "code": "666490",
        "name": "นายเอกชัย แดงโคเศษ",
        "position": "นักวิชาการโสตทัศนศึกษา",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:48.000000Z",
        "updated_at": "2024-11-17T19:39:48.000000Z",
        "deleted_at": null,
        "section": {
          "id": "102",
          "name": "คณะครุศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20e-9a6a-42f4-9d74-31f2b8fb0e0a",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20e-a10a-4ffd-98d3-b9fc223c0310",
        "idcard": "1499900073767",
        "code": "666491",
        "name": "นางสาวอรพนิตา จรัสธนวรพัฒน์",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": "0852323424",
        "email": null,
        "email_verified_at": null,
        "section_id": "10102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "zaU2Dy",
        "created_at": "2024-11-17T19:39:48.000000Z",
        "updated_at": "2025-01-06T07:07:38.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10102",
          "name": "กองนโยบายและแผน"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20e-a10a-4ffd-98d3-b9fc223c0310",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20e-a7cc-489a-81ff-f4e2826ebad4",
        "idcard": "3670400208058",
        "code": "666492",
        "name": "อาจารย์พวงแก้ว แสนคำ",
        "position": "อาจารย์",
        "contact": "0830220449",
        "email": null,
        "email_verified_at": null,
        "section_id": "112",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "kJ036U",
        "created_at": "2024-11-17T19:39:48.000000Z",
        "updated_at": "2025-03-11T06:25:35.000000Z",
        "deleted_at": null,
        "section": {
          "id": "112",
          "name": "คณะพยาบาลศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20e-a7cc-489a-81ff-f4e2826ebad4",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20e-ae96-4970-9cd7-29f8e09dab66",
        "idcard": "3670400023104",
        "code": "666493",
        "name": "อาจารย์รัตติยา วงศ์ลาภพานิช",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "112",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:48.000000Z",
        "updated_at": "2024-11-17T19:39:48.000000Z",
        "deleted_at": null,
        "section": {
          "id": "112",
          "name": "คณะพยาบาลศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20e-ae96-4970-9cd7-29f8e09dab66",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20e-b53b-492e-b4a2-12279c7af0dd",
        "idcard": "3189900088097",
        "code": "666494",
        "name": "อาจารย์ ดร.สกาวรัตน์ ทวีนุต",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "112",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:48.000000Z",
        "updated_at": "2024-11-17T19:39:48.000000Z",
        "deleted_at": null,
        "section": {
          "id": "112",
          "name": "คณะพยาบาลศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20e-b53b-492e-b4a2-12279c7af0dd",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20e-bc01-40c7-8f08-1c36eb60edc2",
        "idcard": "1679900114704",
        "code": "666495",
        "name": "นางสาวปุญชรัสมิ์ บุญคง",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:48.000000Z",
        "updated_at": "2024-11-17T19:39:48.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20e-bc01-40c7-8f08-1c36eb60edc2",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20e-c2e8-4103-8e8f-b9a74164c96d",
        "idcard": "5360290008938",
        "code": "666497",
        "name": "นางดวงพร แดงสุวรรณ์",
        "position": "นักวิชาการเงินและบัญชี",
        "contact": "000000000",
        "email": null,
        "email_verified_at": null,
        "section_id": "112",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "K7ZgkU",
        "created_at": "2024-11-17T19:39:48.000000Z",
        "updated_at": "2024-12-23T06:00:38.000000Z",
        "deleted_at": null,
        "section": {
          "id": "112",
          "name": "คณะพยาบาลศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20e-c2e8-4103-8e8f-b9a74164c96d",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20e-c9ce-4fc4-95bc-968ef37ec53f",
        "idcard": "1100701960091",
        "code": "666498",
        "name": "นางสาวศุภสุตา ทองคำ",
        "position": "เจ้าหน้าที่ห้องปฏิบัติการพยาบาล",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "112",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:48.000000Z",
        "updated_at": "2024-11-17T19:39:48.000000Z",
        "deleted_at": null,
        "section": {
          "id": "112",
          "name": "คณะพยาบาลศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20e-c9ce-4fc4-95bc-968ef37ec53f",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20e-d0b6-4c2b-bc5a-615e0113d1e4",
        "idcard": "1679800164572",
        "code": "666499",
        "name": "นางสาววิภารัศมิ์ เหมบุรุษ",
        "position": "นักวิชาการโสตทัศนศึกษา",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "112",
        "keycloak_id": null,
        "telegram_chat_id": "7554312031",
        "telegram_link_code": "ZiKkfp",
        "created_at": "2024-11-17T19:39:48.000000Z",
        "updated_at": "2025-03-17T04:03:14.000000Z",
        "deleted_at": null,
        "section": {
          "id": "112",
          "name": "คณะพยาบาลศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20e-d0b6-4c2b-bc5a-615e0113d1e4",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20e-d7ce-4fab-bc05-74e270fb2dd6",
        "idcard": "1529900259827",
        "code": "666500",
        "name": "อาจารย์ขจรวิชญา ประภาเลิศ",
        "position": "อาจารย์",
        "contact": "0979936474",
        "email": null,
        "email_verified_at": null,
        "section_id": "112",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "MWZjDt",
        "created_at": "2024-11-17T19:39:49.000000Z",
        "updated_at": "2024-12-27T04:46:59.000000Z",
        "deleted_at": null,
        "section": {
          "id": "112",
          "name": "คณะพยาบาลศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20e-d7ce-4fab-bc05-74e270fb2dd6",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20e-debf-44eb-8c72-d1bb5dfa0670",
        "idcard": "3660800365851",
        "code": "666501",
        "name": "อาจารย์มงคล นราศรี",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:49.000000Z",
        "updated_at": "2024-11-17T19:39:49.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20e-debf-44eb-8c72-d1bb5dfa0670",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20e-e5d3-44c5-b770-4f5369c68553",
        "idcard": "3809900023061",
        "code": "666502",
        "name": "อาจารย์ธรรมศาสตร์ จันทรัตน์",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:49.000000Z",
        "updated_at": "2024-11-17T19:39:49.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20e-e5d3-44c5-b770-4f5369c68553",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20e-ed6b-45aa-a799-3cd7fbc278ed",
        "idcard": "1640600145550",
        "code": "666503",
        "name": "อาจารย์จิตราทิพย์ บุญพิทักษ์",
        "position": "อาจารย์",
        "contact": "0992629492",
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": "7558898788",
        "telegram_link_code": "Wn9Ast",
        "created_at": "2024-11-17T19:39:49.000000Z",
        "updated_at": "2025-01-22T07:14:35.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20e-ed6b-45aa-a799-3cd7fbc278ed",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20e-f3af-4e06-967c-b2c84b983743",
        "idcard": "3100904923928",
        "code": "667504",
        "name": "นางจีรนันท์ ชวาลสันตติ",
        "position": "นักวิเทศสัมพันธ์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10102",
        "keycloak_id": null,
        "telegram_chat_id": "6673204653",
        "telegram_link_code": "9EqdTe",
        "created_at": "2024-11-17T19:39:49.000000Z",
        "updated_at": "2024-12-24T06:40:34.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10102",
          "name": "กองนโยบายและแผน"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20e-f3af-4e06-967c-b2c84b983743",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20e-fad7-4f41-a5c1-e9293f15686d",
        "idcard": "1429900151717",
        "code": "667505",
        "name": "อาจารย์เพชรรัตน์ อ้วนโฮม",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:49.000000Z",
        "updated_at": "2024-11-17T19:39:49.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20e-fad7-4f41-a5c1-e9293f15686d",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20f-01e1-4d57-8a33-65ce80b36e6f",
        "idcard": "1810600041949",
        "code": "667506",
        "name": "อาจารย์สุทธิพงศ์ ยศสุวรรณ์",
        "position": "อาจารย์",
        "contact": "0848410057",
        "email": null,
        "email_verified_at": null,
        "section_id": "103",
        "keycloak_id": null,
        "telegram_chat_id": "6398247728",
        "telegram_link_code": "QsqfaT",
        "created_at": "2024-11-17T19:39:49.000000Z",
        "updated_at": "2025-01-22T07:11:50.000000Z",
        "deleted_at": null,
        "section": {
          "id": "103",
          "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20f-01e1-4d57-8a33-65ce80b36e6f",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20f-08ec-4fac-abd1-b8e9d7375505",
        "idcard": "3539900338243",
        "code": "667507",
        "name": "อาจารย์ ดร.กุลรัตน์ บริรักษ์วาณิชย์",
        "position": "อาจารย์",
        "contact": "0633919265",
        "email": null,
        "email_verified_at": null,
        "section_id": "112",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "bWdVci",
        "created_at": "2024-11-17T19:39:49.000000Z",
        "updated_at": "2025-03-11T06:35:32.000000Z",
        "deleted_at": null,
        "section": {
          "id": "112",
          "name": "คณะพยาบาลศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20f-08ec-4fac-abd1-b8e9d7375505",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20f-0fc9-479c-9a7c-bcf8ac048911",
        "idcard": "1909801004819",
        "code": "667508",
        "name": "อาจารย์ราชนที ศรีรอด",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "104",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:49.000000Z",
        "updated_at": "2024-11-17T19:39:49.000000Z",
        "deleted_at": null,
        "section": {
          "id": "104",
          "name": "คณะมนุษยศาสตร์และสังคมศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20f-0fc9-479c-9a7c-bcf8ac048911",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20f-168a-4aa8-be27-da98f3895754",
        "idcard": "1459900023557",
        "code": "667509",
        "name": "อาจารย์สุวัฒน์ ศิริแก่นทราย",
        "position": "อาจารย์",
        "contact": "0611166596",
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "zTVOi7",
        "created_at": "2024-11-17T19:39:49.000000Z",
        "updated_at": "2025-01-03T04:14:30.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20f-168a-4aa8-be27-da98f3895754",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20f-1d5d-45c6-8620-4b0df9be28c1",
        "idcard": "3530100665586",
        "code": "667510",
        "name": "อาจารย์ ดร.ประภาพร เมืองแก้ว",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "112",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "akIOPQ",
        "created_at": "2024-11-17T19:39:49.000000Z",
        "updated_at": "2025-02-26T04:34:33.000000Z",
        "deleted_at": null,
        "section": {
          "id": "112",
          "name": "คณะพยาบาลศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20f-1d5d-45c6-8620-4b0df9be28c1",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20f-241f-47ef-a975-d55ee1f2a73c",
        "idcard": "3539900338235",
        "code": "667511",
        "name": "อาจารย์ปติมา เชื้อตาลี",
        "position": "อาจารย์",
        "contact": "0966695615",
        "email": null,
        "email_verified_at": null,
        "section_id": "112",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "MYeEJ8",
        "created_at": "2024-11-17T19:39:49.000000Z",
        "updated_at": "2025-01-10T09:40:02.000000Z",
        "deleted_at": null,
        "section": {
          "id": "112",
          "name": "คณะพยาบาลศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20f-241f-47ef-a975-d55ee1f2a73c",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20f-2b06-41af-9dc3-da514daa9155",
        "idcard": "3180400067106",
        "code": "667512",
        "name": "อาจารย์มณท์ธภัชรด์ สุนทรกุลวงศ์",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "112",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "eoaOu6",
        "created_at": "2024-11-17T19:39:49.000000Z",
        "updated_at": "2025-01-16T09:08:10.000000Z",
        "deleted_at": null,
        "section": {
          "id": "112",
          "name": "คณะพยาบาลศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20f-2b06-41af-9dc3-da514daa9155",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20f-31c6-43e9-89b7-4013dd3ff66c",
        "idcard": "3670100792391",
        "code": "667513",
        "name": "อาจารย์ ดร.ชูชีพ โพชะจา",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "112",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:49.000000Z",
        "updated_at": "2024-11-17T19:39:49.000000Z",
        "deleted_at": null,
        "section": {
          "id": "112",
          "name": "คณะพยาบาลศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20f-31c6-43e9-89b7-4013dd3ff66c",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20f-3864-4065-bf1b-a39705e69f9f",
        "idcard": "3770600639213",
        "code": "667514",
        "name": "อาจารย์ศิรินา สันทัดงาน",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "112",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:49.000000Z",
        "updated_at": "2024-11-17T19:39:49.000000Z",
        "deleted_at": null,
        "section": {
          "id": "112",
          "name": "คณะพยาบาลศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20f-3864-4065-bf1b-a39705e69f9f",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20f-3f4b-4861-9c80-e815648f1368",
        "idcard": "1671000031007",
        "code": "667515",
        "name": "นางสาวจรัญญา โถนทา",
        "position": "นักแนะแนวการศึกษาและอาชีพ",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "110",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "ZLY1Et",
        "created_at": "2024-11-17T19:39:49.000000Z",
        "updated_at": "2025-01-10T06:34:41.000000Z",
        "deleted_at": null,
        "section": {
          "id": "110",
          "name": "สำนักส่งเสริมวิชาการและงานทะเบียน"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20f-3f4b-4861-9c80-e815648f1368",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20f-4652-4af8-9120-8c7de8ab11f3",
        "idcard": "3670200345183",
        "code": "667516",
        "name": "นางสาวชลธิชา ภูจุ้ย",
        "position": "นักประชาสัมพันธ์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "BeyEAp",
        "created_at": "2024-11-17T19:39:49.000000Z",
        "updated_at": "2024-12-13T09:06:43.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20f-4652-4af8-9120-8c7de8ab11f3",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20f-4d13-4b83-bda6-1e095a648468",
        "idcard": "1679900024144",
        "code": "667517",
        "name": "นางอาทิตยา ฉิมมา",
        "position": "นักวิชาการศึกษา",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:49.000000Z",
        "updated_at": "2024-11-17T19:39:49.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10102",
          "name": "กองนโยบายและแผน"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20f-4d13-4b83-bda6-1e095a648468",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20f-53f1-40bd-ad50-33a80394ae55",
        "idcard": "1679900163608",
        "code": "667518",
        "name": "นางสาวรัชดาภรณ์ ทาทอน",
        "position": "นักวิชาการเงินและบัญชี",
        "contact": "0858763122",
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "PXCXHp",
        "created_at": "2024-11-17T19:39:49.000000Z",
        "updated_at": "2024-12-13T06:47:36.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20f-53f1-40bd-ad50-33a80394ae55",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20f-5acf-491d-bfdc-c1ae251de7e2",
        "idcard": "3670100119785",
        "code": "667519",
        "name": "นางสาวณัฐสุดา หุ่นทอง",
        "position": "นักตรวจสอบภายใน",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "111",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:49.000000Z",
        "updated_at": "2024-11-17T19:39:49.000000Z",
        "deleted_at": null,
        "section": {
          "id": "111",
          "name": "สังกัดอธิการบดี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20f-5acf-491d-bfdc-c1ae251de7e2",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20f-61af-43b0-b4c6-7509d3671fea",
        "idcard": "3670101278968",
        "code": "667520",
        "name": "นายชัยวัช เจริญพร้อม",
        "position": "นักวิชาการโสตทัศนศึกษา",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:49.000000Z",
        "updated_at": "2025-02-19T02:54:32.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10105",
          "name": "กองอาคารสถานที่"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20f-61af-43b0-b4c6-7509d3671fea",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          },
          {
            "uuid": "9de1769b-14df-43c3-818f-4c7056472c6e",
            "name": "admin_org",
            "description": "ผู้ดูแลหน่วยงาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20f-61af-43b0-b4c6-7509d3671fea",
              "role_id": "9de1769b-14df-43c3-818f-4c7056472c6e"
            }
          }
        ]
      },
      {
        "id": "9d83e20f-68a5-4530-af62-96d83ccef746",
        "idcard": "3670100651932",
        "code": "667521",
        "name": "อาจารย์กัลย์นพร เกียรติบัณฑิต",
        "position": "อาจารย์",
        "contact": "0866919787",
        "email": null,
        "email_verified_at": null,
        "section_id": "112",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "vcmb6Y",
        "created_at": "2024-11-17T19:39:49.000000Z",
        "updated_at": "2025-02-21T09:01:11.000000Z",
        "deleted_at": null,
        "section": {
          "id": "112",
          "name": "คณะพยาบาลศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20f-68a5-4530-af62-96d83ccef746",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20f-6f98-48cd-8ad8-908885949621",
        "idcard": "3630400011815",
        "code": "667522",
        "name": "อาจารย์กัญญาณัฐ ใจกลาง",
        "position": "อาจารย์",
        "contact": "0946341619",
        "email": null,
        "email_verified_at": null,
        "section_id": "112",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "yXm2mn",
        "created_at": "2024-11-17T19:39:49.000000Z",
        "updated_at": "2024-12-25T02:42:44.000000Z",
        "deleted_at": null,
        "section": {
          "id": "112",
          "name": "คณะพยาบาลศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20f-6f98-48cd-8ad8-908885949621",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20f-768e-4284-9e41-9d793e85190b",
        "idcard": "1679990005501",
        "code": "667523",
        "name": "นางสาวนันทพร ทองจิตติ",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "2v1ZSN",
        "created_at": "2024-11-17T19:39:49.000000Z",
        "updated_at": "2025-02-19T02:54:53.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10105",
          "name": "กองอาคารสถานที่"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20f-768e-4284-9e41-9d793e85190b",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          },
          {
            "uuid": "9de1769b-14df-43c3-818f-4c7056472c6e",
            "name": "admin_org",
            "description": "ผู้ดูแลหน่วยงาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20f-768e-4284-9e41-9d793e85190b",
              "role_id": "9de1769b-14df-43c3-818f-4c7056472c6e"
            }
          }
        ]
      },
      {
        "id": "9d83e20f-7d9d-4b64-abfb-687d6cee576f",
        "idcard": "1670800110121",
        "code": "667524",
        "name": "นายสุรชัย เลียบใจดี",
        "position": "วิศวกรไฟฟ้า",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "10105",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2024-11-17T19:39:49.000000Z",
        "updated_at": "2025-02-19T02:55:20.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10105",
          "name": "กองอาคารสถานที่"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20f-7d9d-4b64-abfb-687d6cee576f",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9d83e20f-8476-4a80-a207-44b7168243df",
        "idcard": "3660800536036",
        "code": "667525",
        "name": "นางสาวกัลญา กระฐินทอง",
        "position": "บุคลากร",
        "contact": "7406",
        "email": null,
        "email_verified_at": null,
        "section_id": "10101",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "UEaeI7",
        "created_at": "2024-11-17T19:39:49.000000Z",
        "updated_at": "2024-12-13T08:17:50.000000Z",
        "deleted_at": null,
        "section": {
          "id": "10101",
          "name": "กองกลาง"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9d83e20f-8476-4a80-a207-44b7168243df",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9db49741-8018-4388-a935-97f3f0f46c38",
        "idcard": "1659900535301",
        "code": "667526",
        "name": "นางสาวสกุลรัตน์ แสงศรีจันทร์",
        "position": "เจ้าหน้าที่ห้องปฏิบัติการพยาบาล",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "112",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "xMdKzh",
        "created_at": "2024-12-12T07:46:13.000000Z",
        "updated_at": "2024-12-12T07:46:32.000000Z",
        "deleted_at": null,
        "section": {
          "id": "112",
          "name": "คณะพยาบาลศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9db49741-8018-4388-a935-97f3f0f46c38",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9dca8b7e-2787-46b3-a393-cd9bfd17c8b6",
        "idcard": "1671000036882",
        "code": "667527",
        "name": "นางสาวภาวิณี ศรีจริยะ",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "106",
        "keycloak_id": null,
        "telegram_chat_id": "8044926538",
        "telegram_link_code": "JJ3ARz",
        "created_at": "2024-12-23T05:41:32.000000Z",
        "updated_at": "2024-12-25T05:00:06.000000Z",
        "deleted_at": null,
        "section": {
          "id": "106",
          "name": "คณะวิทยาศาสตร์และเทคโนโลยี"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9dca8b7e-2787-46b3-a393-cd9bfd17c8b6",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9deb541a-8c2d-483d-a059-6ac9613c7c7e",
        "idcard": "3101500057219",
        "code": "668528",
        "name": "อาจารย์สิทธิ อติรัตนา",
        "position": "อาจารย์",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "1120108",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": null,
        "created_at": "2025-01-08T12:48:59.000000Z",
        "updated_at": "2025-01-08T12:48:59.000000Z",
        "deleted_at": null,
        "section": {
          "id": "1120108",
          "name": "สาขาวิชาการพยาบาลผู้ใหญ่"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9deb541a-8c2d-483d-a059-6ac9613c7c7e",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9e2ed596-f717-4ac2-a167-e7aa473e970f",
        "idcard": "1679900280582",
        "code": "668529",
        "name": "นางสาวฉัตรกมล ฮั่นตุ้นพงษ์",
        "position": "นักวิชาการศึกษา",
        "contact": null,
        "email": null,
        "email_verified_at": null,
        "section_id": "1120102",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "5c5ySb",
        "created_at": "2025-02-11T02:11:31.000000Z",
        "updated_at": "2025-02-24T08:01:59.000000Z",
        "deleted_at": null,
        "section": {
          "id": "1120102",
          "name": "งานบริการการศึกษา"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9e2ed596-f717-4ac2-a167-e7aa473e970f",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9e2ed596-fe51-4205-a1c6-d63be5032b4c",
        "idcard": "1679900400391",
        "code": "668530",
        "name": "นายกรินทร์ พรมบ่อ",
        "position": "เจ้าหน้าที่บริหารงานทั่วไป",
        "contact": "0636496979",
        "email": null,
        "email_verified_at": null,
        "section_id": "112",
        "keycloak_id": null,
        "telegram_chat_id": null,
        "telegram_link_code": "2rRjbs",
        "created_at": "2025-02-11T02:11:31.000000Z",
        "updated_at": "2025-02-19T04:50:34.000000Z",
        "deleted_at": null,
        "section": {
          "id": "112",
          "name": "คณะพยาบาลศาสตร์"
        },
        "roles": [
          {
            "uuid": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1",
            "name": "user",
            "description": "ผู้ใช้งาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9e2ed596-fe51-4205-a1c6-d63be5032b4c",
              "role_id": "9d0d10f0-3023-4ea1-9115-fca792f3a9a1"
            }
          }
        ]
      },
      {
        "id": "9db62d29-daf3-41df-99be-742119b769a3",
        "idcard": "9999999999999",
        "code": "admin",
        "name": "Super admin",
        "position": "Administrator",
        "contact": "0999999999",
        "email": null,
        "email_verified_at": null,
        "section_id": "1",
        "keycloak_id": null,
        "telegram_chat_id": "7265944539",
        "telegram_link_code": "gC8NF4",
        "created_at": "2024-12-13T02:41:13.000000Z",
        "updated_at": "2025-02-25T03:33:07.000000Z",
        "deleted_at": null,
        "section": {
          "id": "1",
          "name": "มหาวิทยาลัยราชภัฎเพชรบูรณ์"
        },
        "roles": [
          {
            "uuid": "9db21068-b307-4fda-b96a-947b348103ef",
            "name": "superadmin",
            "description": "ผู้ดูแลระบบสูงสุด",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9db62d29-daf3-41df-99be-742119b769a3",
              "role_id": "9db21068-b307-4fda-b96a-947b348103ef"
            }
          },
          {
            "uuid": "9de1769b-14df-43c3-818f-4c7056472c6e",
            "name": "admin_org",
            "description": "ผู้ดูแลหน่วยงาน",
            "pivot": {
              "model_type": "App\\Models\\User",
              "model_uuid": "9db62d29-daf3-41df-99be-742119b769a3",
              "role_id": "9de1769b-14df-43c3-818f-4c7056472c6e"
            }
          }
        ]
      }
    ];

    setUsers(users);
  }, []);

  return (
    <>
      {/*  <Navbar transparent className="pt-32"/> */}
      <main className="pt-16 profile-page">
        <section className="relative block h-500-px">

        </section>
        <section className="relative py-16 bg-blueGray-200">
          {users.filter((item) =>
            item.roles.filter((i) => i.name == "admin_org").length > 0
          ).map((user) => (
            <div>
              <div>{user.name} - {user.section.name}</div>
            </div>
          ))}
        </section>
      </main>

    </>
  );
}
