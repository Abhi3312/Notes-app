
import { Calendar, Copy, Eye, PencilLine, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react"; // Import useState
import { removeFromPastes } from "../redux/pasteSlice";
import { FormatDate } from "../utlis/formatDate";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term

  const handleDelete = (id) => {
    dispatch(removeFromPastes(id));
   // toast.success("Paste deleted successfully");
  };

  // Filter pastes based on search term (by title or content)
  const filteredPastes = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-6">
        {/* Search */}
        <div className="w-full flex gap-3 px-4 py-3 bg-gray-100 rounded-md border border-gray-300 mt-6 shadow-sm focus-within:shadow-md">
          <input
            type="search"
            placeholder="Search pastes..."
            className="focus:outline-none w-full bg-transparent text-gray-700 text-lg"
            value={searchTerm} // Bind the input to searchTerm state
            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
          />
        </div>

        {/* All Pastes */}
        <div className="flex flex-col border border-gray-200 bg-white shadow-lg rounded-md overflow-hidden">
          <h2 className="px-6 py-4 text-2xl font-bold text-gray-800 border-b border-gray-200 bg-gradient-to-r from-blue-100 to-blue-50 ">
            All Pastes
          </h2>
          <div className="w-full px-6 py-4 flex flex-col gap-y-6">
            {filteredPastes.length > 0 ? (
              filteredPastes.map((paste) => (
                <div
                  key={paste?._id}
                  className="border border-gray-300 bg-gray-50 w-full flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  {/* Heading and Description */}
                  <div className="w-full sm:w-[50%] flex flex-col space-y-3">
                    <p className="text-xl font-semibold text-gray-900">
                      {paste?.title}
                    </p>
                    <p className="text-sm font-normal text-gray-600 line-clamp-3 max-w-[90%]">
                      {paste?.content}
                    </p>
                  </div>

                  {/* Icons */}
                  <div className="flex flex-col sm:items-end gap-y-4 mt-4 sm:mt-0">
                    <div className="flex gap-3 flex-wrap sm:flex-nowrap">
                      <button className="p-2 rounded-md bg-blue-50 border border-blue-400 text-blue-500 hover:bg-blue-500 hover:text-white transition-all">
                        <a href={`/?pasteId=${paste?._id}`}>
                          <PencilLine size={20} />
                        </a>
                      </button>
                      <button
                        className="p-2 rounded-md bg-red-50 border border-red-400 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                        onClick={() => handleDelete(paste?._id)}
                      >
                        <Trash2 size={20} />
                      </button>
                      <button className="p-2 rounded-md bg-orange-50 border border-orange-400 text-orange-500 hover:bg-orange-500 hover:text-white transition-all">
                        <a href={`/pastes/${paste?._id}`} target="_blank">
                          <Eye size={20} />
                        </a>
                      </button>
                      <button
                        className="p-2 rounded-md bg-green-50 border border-green-400 text-green-500 hover:bg-green-500 hover:text-white transition-all"
                        onClick={() => {
                          navigator.clipboard.writeText(paste?.content);
                          toast.success("Copied to Clipboard");
                        }}
                      >
                        <Copy size={20} />
                      </button>
                    </div>

                    <div className="flex items-center gap-x-2 text-gray-500">
                      <Calendar size={20} />
                      {FormatDate(paste?.createdAt)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-lg text-center w-full text-red-500">
                No Pastes Found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paste;
