import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';


const SwotLanding = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['email_first']);
  const [cookieExists, setCookieExists] = useState(false);
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    let your_email = cookies.email_first;
    console.log('Your email:', cookies.email_first);

    const currentToken = localStorage.getItem("currentToken");

    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      your_email = foundUser.email;
      setUser(foundUser);
      setCookie('email_first', foundUser.email, { path: '/', expires: new Date(Date.now() + 0.2 * 24 * 60 * 60 * 1000) });
    }

    if (your_email) {
      setCookieExists(true);
    } else {
      setCookieExists(false);
    }

  }, [cookies.email_first]);

  const [swots, setSwots] = useState([]);
  const fetchSwot = async () => {
    try {
      const response = await fetch('/api/swots?status=active'); // Adjust the endpoint as necessary
      const data = await response.json();
      setSwots(data);
    } catch (error) {
      console.error('Error fetching SWOT data:', error);
    }
  };

  useEffect(() => {
    fetchSwot();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload
    // Logic to handle email submission and set cookie
    setCookie('email_first', email, { path: '/', expires: new Date(Date.now() + 0.2 * 24 * 60 * 60 * 1000) });
    setCookieExists(true);
    console.log('Submitted Email:', email);
  }

  return (

    <section class="items-center justify-center  h-[100vh]">
      <div class="">
        {cookieExists ?
          <div class="container mx-auto px-4 py-8">

            <div class="flex flex-col items-center justify-center gap-6 mb-12">
              <div class="text-center space-y-4">
                <h1 class="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                  Welcome to
                  <span class="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    SWOT Application
                  </span>
                </h1>
                <div class="max-w-md mx-auto">
                  <p class="text-gray-600 text-lg font-medium">
                    You have already entered your email.
                  </p>
                </div>
              </div>
            </div>


            <div class="max-w-4xl mx-auto">

              <div class="bg-white/70 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/50 shadow-lg">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500 font-medium">Your email</p>
                    <p class="text-gray-800 font-semibold" id="userEmail">{cookies.email_first}</p>
                  </div>
                </div>
              </div>


              {swots.filter((swot) => swot.status === "active" && new Date() < new Date(swot.hide_after))
                .map((swot) => (
                  <div key="{swot.id}" class="space-y-6">
                    <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <div class="p-8">

                        <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                          <div class="flex-1">
                            <h3 class="text-2xl font-bold text-gray-800 mb-2 leading-tight">
                              {swot.title}
                              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                {swot.tagline}
                              </span>
                            </h3>
                            <p class="text-gray-500 text-sm bg-gray-50 inline-block px-3 py-1 rounded-full">
                              {swot.description}
                            </p>
                          </div>
                        </div>


                        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-gray-100">
                          <div class="flex items-center gap-2">
                            <span class="text-sm font-medium text-gray-600">Status:</span>
                            <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                              </svg>
                              {swot.status}
                            </span>
                          </div>

                          <Link to={"/swot/" + swot.id}
                            class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl group">
                            Enter
                            <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}



            </div>
          </div>
          :
          <div class="flex flex-col justify-center min-h-screen py-6 bg-gray-800 sm:py-12">
            <div class="relative py-3 sm:max-w-xl sm:mx-auto">
              <div
                class="absolute inset-0 transform -skew-y-6 shadow-lg bg-gradient-to-r from-indigo-700 to-purple-500 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
              </div>
              <div class="relative px-4 py-10 text-white bg-indigo-400 shadow-lg sm:rounded-3xl sm:p-20">

                <div class="pb-6 text-center">
                  <h1 class="text-3xl">Enter Email First!</h1>

                  <p class="text-gray-300">
                    email อะไรก็ได้ ใช้เพื่อการจดจำคำตอบและแก้ไข้ข้อมูลเดิมเท่านั้น ไม่นำไปใช้เพื่อการประมวลผลหรือแสดงผลใดๆ
                  </p>
                </div>


                <form onSubmit={handleSubmit} class="text-sm">


                  <input
                    class="w-full px-3 py-2 mb-4 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    type="email" placeholder="Email" name="email"
                    value={email} onChange={(e) => setEmail(e.target.value)} />

                  <div class="flex justify-end">
                    <input
                      class="px-4 py-2 font-bold text-white bg-indigo-600 rounded shadow hover:bg-indigo-700 hover:cursor-pointer focus:outline-none focus:shadow-outline"
                      type="submit" value="Send ➤" />
                  </div>

                </form>
              </div>
            </div>
          </div>
        }

      </div>
    </section>
  );
};

export default SwotLanding;
