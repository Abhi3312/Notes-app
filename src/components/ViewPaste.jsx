
import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams();

  const pastes = useSelector((state) => state.paste.pastes);

  const paste = pastes.filter((paste) => paste._id === id)[0];

  return (
    <div className="w-full min-h-screen py-10 bg-gray-50 flex justify-center items-center">
      <div className="w-full max-w-[800px] bg-white shadow-lg rounded-lg p-8">
        <div className="flex flex-col gap-y-5">
          {/* Title Section */}
          <input
            type="text"
            value={paste.title}
            disabled
            className="w-full text-lg font-bold text-gray-800 border border-gray-300 rounded-md p-3 bg-gray-100 focus:outline-none"
            placeholder="Paste Title"
          />

          {/* Content Section */}
          <div className="relative rounded-lg border border-gray-300 bg-gray-100">
            {/* Toolbar */}
            <div className="w-full flex justify-between items-center px-4 py-2 border-b border-gray-200 bg-gray-50 rounded-t-lg">
              <div className="flex gap-x-2 items-center">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <button
                className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors"
                onClick={() => {
                  navigator.clipboard.writeText(paste.content);
                  toast.success("Copied to Clipboard");
                }}
              >
                <Copy size={20} />
                <span className="hidden sm:block text-sm font-medium">
                  Copy
                </span>
              </button>
            </div>

            {/* Content Display */}
            <textarea
              value={paste.content}
              disabled
              className="w-full p-4 text-gray-700 bg-gray-100 focus:outline-none focus:ring-0 resize-none rounded-b-lg"
              rows={15}
              placeholder="Paste content here..."
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPaste
