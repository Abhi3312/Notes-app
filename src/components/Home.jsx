
import { Copy, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updatePastes } from "../redux/pasteSlice";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  const createPaste = () => {
    const paste = {
      title: title,
      content: value,
      _id:
        pasteId ||
        Date.now().toString(36) + Math.random().toString(36).substring(2),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updatePastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  };

  const resetPaste = () => {
    setTitle("");
    setValue("");
    setSearchParams({});
  };

  useEffect(() => {
    if (pasteId) {
      const paste = pastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, pastes]);

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-5 items-start">
        {/* Title and Buttons */}
        <div className="w-full flex flex-row gap-x-4 justify-between items-center">
          <input
            type="text"
            placeholder="Enter a catchy title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`${
              pasteId ? "w-[80%]" : "w-[85%]"
            } border border-gray-300 rounded-lg p-4 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition`}
          />
          <div className="flex gap-x-4">
            <button
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg px-6 py-3 shadow-lg hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition"
              onClick={createPaste}
            >
              {pasteId ? "Update Paste" : "Create Paste"}
            </button>
            {pasteId && (
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg px-5 py-2 shadow-md transition flex items-center"
                onClick={resetPaste}
              >
                <PlusCircle className="mr-2" size={20} />
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full flex flex-col items-start bg-white border border-gray-300 rounded-lg shadow-xl">
          {/* Header */}
          <div className="w-full flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-100 to-blue-50 rounded-t-lg">
            <div className="flex items-center gap-x-2">
              <div className="w-[12px] h-[12px] bg-red-500 rounded-full"></div>
              <div className="w-[12px] h-[12px] bg-yellow-400 rounded-full"></div>
              <div className="w-[12px] h-[12px] bg-green-500 rounded-full"></div>
            </div>
            <button
              className="flex items-center gap-x-2 text-gray-500 hover:text-gray-700 transition"
              onClick={() => {
                navigator.clipboard.writeText(value);
                toast.success("Copied to Clipboard!", { position: "top-right" });
              }}
            >
              <Copy size={20} />
              <span className="hidden sm:block">Copy</span>
            </button>
          </div>

          {/* Text Area */}
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Write your content here..."
            className="w-full p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-b-lg transition ease-in-out duration-300"
            rows={20}
            style={{
              caretColor: "#000",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
