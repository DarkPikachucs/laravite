import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const SwotGroup = () => {
  const [swotGroups, setSwotGroups] = useState([]);
  const email = Cookies.get('email_first');

  useEffect(() => {
    fetchSwotGroups();
  }, []);

  const fetchSwotGroups = async () => {
    try {
      const response = await fetch('/api/swot-groups', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setSwotGroups(data);
      } else {
        console.error('Failed to fetch swot groups');
      }
    } catch (error) {
      console.error('Error fetching swot groups:', error);
    }
  };
  return (
    <div class="flex flex-col p-5 lg:px-48 lg:py-11">
      <div class="bg-gray-100 p-5 mb-10">
        <Link to="/swot-groups/create">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create New Swot Group
          </button>
        </Link>
      </div>
      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  {swotGroups.map((swotGroup) => (
                    <tr key={swotGroup.id}>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">{swotGroup.name}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">{swotGroup.description}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwotGroup;