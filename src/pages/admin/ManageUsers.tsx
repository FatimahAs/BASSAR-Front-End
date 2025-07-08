import React from "react";
import AdminSidebar from "../../components/AdminSidebar";

type User = {
  name: string;
  email: string;
  dateJoined: string;
  itineraries: number;
  status: "User" | "Helper";
  avatar: string | null;
};

const users: User[] = [
  {
    name: "James Anderson",
    email: "olivia@jsmastery.pro",
    dateJoined: "Jan 6, 2022",
    itineraries: 12,
    status: "User",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Michael Johnson",
    email: "phoenix@jsmastery.pro",
    dateJoined: "Jan 6, 2022",
    itineraries: 21,
    status: "User",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "David Brown",
    email: "lana@jsmastery.pro",
    dateJoined: "Jan 6, 2022",
    itineraries: 15,
    status: "Helper",
    avatar: "https://randomuser.me/api/portraits/men/14.jpg",
  },
  {
    name: "Jason Wilson",
    email: "demi@jsmastery.pro",
    dateJoined: "Jan 5, 2022",
    itineraries: 3,
    status: "User",
    avatar: "https://randomuser.me/api/portraits/men/25.jpg",
  },
  {
    name: "Mark Davis",
    email: "candice@jsmastery.pro",
    dateJoined: "Jan 5, 2022",
    itineraries: 6,
    status: "Helper",
    avatar: null,
  },
  {
    name: "Kevin Taylor",
    email: "natali@jsmastery.pro",
    dateJoined: "Jan 5, 2022",
    itineraries: 31,
    status: "User",
    avatar: "https://randomuser.me/api/portraits/men/56.jpg",
  },
  {
    name: "Brian Miller",
    email: "drew@jsmastery.pro",
    dateJoined: "Jan 4, 2022",
    itineraries: 17,
    status: "User",
    avatar: "https://randomuser.me/api/portraits/men/61.jpg",
  },
  {
    name: "Orlando Diggs",
    email: "orlando@jsmastery.pro",
    dateJoined: "Jan 5, 2022",
    itineraries: 26,
    status: "Helper",
    avatar: "https://randomuser.me/api/portraits/men/71.jpg",
  },
];

const ManageUsers: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-2">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold">Manage Users</h1>
            <p className="text-gray-500 text-sm">
              Filter, sort, and access detailed user profiles
            </p>
          </div>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded font-medium w-full md:w-auto cursor-pointer">
            Add new user
          </button>
        </div>

        <div className="bg-white shadow rounded overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-[#7a77777e] bg-gray-50">
              <tr>
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium hidden sm:table-cell">
                  Email Address
                </th>
                <th className="p-4 font-medium hidden md:table-cell">
                  Date Joined
                </th>
                <th className="p-4 font-medium hidden lg:table-cell">
                  Itinerary Created
                </th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr
                  key={idx}
                  className="border-b border-[#c5c1c1a6] hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4 flex items-center gap-3">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                        {user.name.charAt(0)}
                      </div>
                    )}
                    <span>{user.name}</span>
                  </td>
                  <td className="p-4 hidden sm:table-cell">{user.email}</td>
                  <td className="p-4 hidden md:table-cell">
                    {user.dateJoined}
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    {user.itineraries.toString().padStart(2, "0")}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === "User"
                          ? "bg-green-100 text-green-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="text-gray-400 hover:text-gray-600">
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-2">
          <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
            ⬅️ Previous
          </button>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5, 6].map((page) => (
              <button
                key={page}
                className={`w-8 h-8 rounded ${
                  page === 1
                    ? "bg-yellow-400 text-black font-medium"
                    : "hover:bg-gray-200 text-gray-700"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
            Next ➡️
          </button>
        </div>
      </main>
    </div>
  );
};

export default ManageUsers;
