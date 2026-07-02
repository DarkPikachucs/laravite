import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ProfileSetup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    department: '',
    position: '',
    bio: '',
  });

  const token = searchParams.get('google_token');
  const userId = searchParams.get('user_id');
  const isInternal = searchParams.get('is_internal') === 'true';
  const isNewUser = searchParams.get('is_new_user') === 'true';

  useEffect(() => {
    // Store token from URL
    if (token) {
      localStorage.setItem('currentToken', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('isInternal', isInternal ? 'true' : 'false');
      localStorage.setItem('isNewUser', 'false'); // Clear new user flag after setup

      // Set authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Fetch user data from API
      fetchUserData(token);
    }
  }, [token, userId, isInternal]);

  const fetchUserData = async (authToken) => {
    try {
      const response = await axios.get('/user', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const user = response.data;
      setUserData(user);

      // Pre-fill form with user data from Google
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        department: user.department || '',
        position: user.position || '',
        bio: user.bio || '',
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/user/profile', {
        ...formData,
        _method: 'PUT',
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('บันทึกข้อมูลโปรไฟล์เรียบร้อยแล้ว!');

      // Update user info in localStorage
      if (response.data.data) {
        localStorage.setItem('user', JSON.stringify(response.data.data));
      }

      // Redirect based on user type
      setTimeout(() => {
        if (isInternal) {
          // Internal user: redirect to admin forms
          navigate('/admin/forms');
        } else {
          // External user: redirect to home
          navigate('/');
        }
      }, 1000);
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error(error.response?.data?.message || 'ไม่สามารถบันทึกข้อมูลได้');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="w-full max-w-2xl">
        {/* Header Card */}
        <div className="mb-8 text-center">
          {/* Avatar */}
          <div className="mb-4">
            {userData?.avatar ? (
              <img
                src={userData.avatar}
                alt={userData.name || 'User Avatar'}
                className="w-24 h-24 mx-auto border-4 border-white rounded-full shadow-lg"
              />
            ) : (
              <div className="inline-flex items-center justify-center w-24 h-24 mx-auto mb-4 rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-purple-600">
                <span className="text-4xl font-bold text-white">
                  {userData?.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
            )}
          </div>

          <h1 className="mb-2 text-3xl font-bold text-gray-800">
            ยินดีต้อนรับ! 🎉
          </h1>
          <p className="text-gray-600">
            กรุณากรอกข้อมูลโปรไฟล์ของคุณเพื่อเริ่มต้นใช้งาน
          </p>
          {isInternal && (
            <div className="inline-flex items-center gap-2 px-4 py-2 mt-3 text-sm font-medium text-green-700 bg-green-100 rounded-full">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              ผู้ใช้ภายใน (PCRU) - สามารถสร้างฟอร์มและให้สิทธิ์ผู้อื่นได้
            </div>
          )}
          {!isInternal && (
            <div className="inline-flex items-center gap-2 px-4 py-2 mt-3 text-sm font-medium text-yellow-700 bg-yellow-100 rounded-full">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              ผู้ใช้ภายนอก - สามารถสร้างฟอร์มและขอสิทธิ์ดูข้อมูลได้
            </div>
          )}
        </div>

        {/* Form Card */}
        <div className="p-8 bg-white shadow-xl rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                ชื่อ-นามสกุล <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="กรอกชื่อและนามสกุล"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                เบอร์โทรศัพท์ <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="08X-XXX-XXXX"
              />
            </div>

            {/* Department & Position (for all users) */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  หน่วยงาน/คณะ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="เช่น คณะวิทยาศาสตร์"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  ตำแหน่ง <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="เช่น นักวิชาการคอมพิวเตอร์"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                เกี่ยวกับคุณ
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="บอกเราเกี่ยวกับตัวคุณสั้นๆ (ไม่บังคับ)"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
                }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  กำลังบันทึก...
                </span>
              ) : (
                'เริ่มใช้งาน'
              )}
            </button>
          </form>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-sm text-center text-gray-600">
          <p>ข้อมูลของคุณจะถูกใช้เพื่อ:</p>
          <ul className="mt-2 space-y-1">
            <li>• ระบุตัวตนในการสร้างแบบฟอร์ม</li>
            <li>• แสดงในผลการตอบแบบสอบถาม</li>
            <li>• ติดต่อกลับกรณีมีปัญหา</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
