import { useState } from "react";
import { X, Upload, ImageIcon, Camera } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { useSchoolData } from "../../pages/hook/useSchoolAuth";
import { createGallaryRestrict } from "../../pages/api/schoolAPIs";
import { mutate } from "swr";
import toast from "react-hot-toast";

export const SchoolMemoryUpload = () => {
  const [title, setTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { data } = useSchoolData();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      handleImageUpload(file);
    }
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setUploadedImage(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      handleImageUpload(file);
    }
  };

  const handleUpload = async () => {
    if (!imageFile || !title || !data?._id) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("avatar", imageFile);
      formData.append("title", title);

      const res = await createGallaryRestrict(data._id, formData);

      if (res.status === 201) {
        mutate(`api/view-gallary/${data._id}`);
        toast.success("Memory Uploaded Successfully");
        setIsOpen(false);
        setTitle("");
        setUploadedImage(null);
        setImageFile(null);
      } else {
        toast.error(res?.response?.data?.message || "Upload failed");
      }
    } catch (error) {
      toast.error("Failed to upload memory");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="mb-3 px-8 py-3 border rounded-md overflow-hidden flex gap-2 items-center justify-center bg-blue-950 text-white text-[16px] cursor-pointer"
      >
        Upload Memory
      </button>

      {!isOpen ? null : (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden transform transition-all">
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200"
              >
                <X size={24} />
              </button>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3">
                  <Camera className="text-white" size={32} />
                </div>
                <h2 className="text-3xl font-bold text-white">
                  Upload School Memory
                </h2>
              </div>
              <p className="text-indigo-100 text-sm ml-1">
                Preserve your favorite moments forever
              </p>
            </div>

            <div className="p-8">
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Memory Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a memorable title for this moment..."
                  className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 text-gray-800 placeholder-gray-400"
                />
              </div>

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative border-3 border-dashed rounded-2xl transition-all duration-300 ${
                  isDragging
                    ? "border-indigo-500 bg-indigo-50 scale-[1.02]"
                    : "border-gray-300 bg-gray-50"
                } ${uploadedImage ? "p-4" : "p-12"}`}
              >
                {uploadedImage ? (
                  <div className="relative group">
                    <img
                      src={uploadedImage}
                      alt="Uploaded preview"
                      className="w-full h-64 object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl flex items-center justify-center">
                      <label className="cursor-pointer bg-white text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2">
                        <Upload size={20} />
                        Change Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileInput}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="mx-auto w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                      <ImageIcon className="text-white" size={36} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Drop your image here
                    </h3>
                    <p className="text-gray-500 mb-6 text-sm">
                      or click the button below to browse
                    </p>
                    <label className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3.5 rounded-xl font-semibold cursor-pointer hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
                      <Upload size={20} />
                      Choose Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileInput}
                        className="hidden"
                      />
                    </label>
                    <p className="text-xs text-gray-400 mt-4">
                      Supports: JPG, PNG, GIF (Max 10MB)
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-6 py-3.5 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  disabled={!title || !uploadedImage || loading}
                  className={`flex-1 px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 ${
                    title && uploadedImage && !loading
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl hover:scale-[1.02]"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <ClipLoader color="white" size={20} />
                      <span>Uploading...</span>
                    </div>
                  ) : (
                    "Upload Memory"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
