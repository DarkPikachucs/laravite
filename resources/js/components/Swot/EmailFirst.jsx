import React from 'react';

const EmailFirst = (cookieExists = false) => {

  return (
    <div>
      {cookieExists}
      {cookieExists ? <p>Cookie exists in React!</p> : <div class="flex flex-col justify-center min-h-screen py-6 bg-gray-800 sm:py-12">
        <div class="relative py-3 sm:max-w-xl sm:mx-auto">
          <div
            class="absolute inset-0 transform -skew-y-6 shadow-lg bg-gradient-to-r from-indigo-700 to-purple-500 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
          </div>
          <div class="relative px-4 py-10 text-white bg-indigo-400 shadow-lg sm:rounded-3xl sm:p-20">

            <div class="pb-6 text-center">
              <h1 class="text-3xl">Enter Email First!</h1>

              <p class="text-gray-300">
                ..
              </p>
            </div>


            <form action="{{ route('enter.email') }}" method="post" class="text-sm">


              <input
                class="w-full px-3 py-2 mb-4 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                type="email" placeholder="Email" name="email" />

              <div class="flex justify-end">
                <input
                  class="px-4 py-2 font-bold text-white bg-indigo-600 rounded shadow hover:bg-indigo-700 hover:cursor-pointer focus:outline-none focus:shadow-outline"
                  type="submit" value="Send ➤" />
              </div>

            </form>
          </div>
        </div>
      </div>}
    </div>
  );
}

export default EmailFirst;