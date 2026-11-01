import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import LittleHeader from "../../../components/layout/LittleHeader";
import {
  useGallary,
  useSchoolCookie,
  useSchoolData,
} from "../../hook/useSchoolAuth";
import { deleteGallary } from "../../api/schoolAPIs";
import toast, { Toaster } from "react-hot-toast";
import { UnLazyImage } from "@unlazy/react";
import { mutate } from "swr";
import { MdDelete } from "react-icons/md";
import { RiGalleryLine } from "react-icons/ri";
import { Camera, Upload, X, Image as ImageIcon } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { useState, useEffect } from "react";
import { SchoolMemoryUpload } from "@/components/modals/SchoolMemoryUpload";
import moment from "moment";

document.title = "School's Gallery";

const GallerySettings = () => {
  const { data } = useSchoolData();
  const { dataID } = useSchoolCookie();
  const { gallary } = useGallary(data?._id);
  const [isFeeModalOpen, setFeeModalOpen] = useState<boolean>(false);

  const handleDelete = async (gallaryID: string) => {
    try {
      await deleteGallary(dataID, gallaryID).then((res) => {
        console.log(res);
        if (res.status === 200) {
          mutate(`api/view-gallary/${data?._id}`);
          toast.success("Image deleted successfully");
        }
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete image");
    }
  };

  // const isFormFilled = title !== "" && avatar !== "";

  return (
    <div>
      <Toaster position="top-center" reverseOrder={true} />
      <div className="w-full bg-white py-[20px] ">
        <LittleHeader name={document.title} />
        {data?._id && (
          <div className="flex justify-between items-end text-gray-600">
            <div className="mb-2 text-blue-950">
              Share your school moments, save the Memories!
            </div>

            <SchoolMemoryUpload />
          </div>
        )}

        <div className="p-2 min-h-[400px] mb-10 w-full border flex justify-start items-center transition-all duration-300">
          <div className="w-full">
            {gallary?.data?.length > 0 ? (
              <div className="w-full gap-4 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                {gallary?.data?.map((props: any) => (
                  <div key={props.id}>
                    <UnLazyImage
                      thumbhash="1QcSHQRnh493V4dIh4eXh1h4kJUI"
                      src={props?.avatar}
                      autoSizes
                      className="w-full h-[300px] rounded-md flex object-cover "
                    />
                    <div className="flex justify-between items-start mt-2">
                      <div>
                        <p className="text-gray-500 font-semibold capitalize text-[18px] pt-2 ">
                          {props.title}
                        </p>
                        <p className="text-gray-400/46 text-[12px] pt-1 font-medium">
                          {/* {new Date(props.createdAt).toLocaleString()}{" "} */}
                          {moment(props.createdAt).format(
                            "DD MMM YYYY, h:mm A"
                          )}
                        </p>
                      </div>
                      <div
                        className="text-[19px] cursor-pointer mt-2 hover:text-red-500 transition-all duration-300"
                        onClick={() => handleDelete(props._id)}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-blue-950 flex flex-col w-full items-center justify-center">
                <RiGalleryLine size={40} />
                <div className="mt-2">
                  No Memory has been uploaded on your Gallery!1
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GallerySettings;
