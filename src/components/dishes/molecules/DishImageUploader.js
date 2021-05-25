import React, { useState } from "react";
import FileUploader from "react-firebase-file-uploader";
import { useStorage } from "../../../contexts/StorageContext";

const DishImageUploader = () => {
  const [progressImg, setProgressImg] = useState(0);
  const [uploadingImg, setUploadingImg] = useState(false);

  const { setStorageDirectory, setImageUrl, dishImageUrl } = useStorage();

  const handleUploadStart = () => {
    setProgressImg(0);
    setUploadingImg(true);
  };

  const handleUploadError = (error) => {
    setUploadingImg(false);
    // console.log(error);
  };

  const handleUploadSuccess = async (productName) => {
    setProgressImg(100);
    setUploadingImg(false);
    await setImageUrl(productName);
  };

  const handleProgress = (progress) => {
    setProgressImg(progress);
  };

  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="imageRef"
      >
        Image
      </label>
      <FileUploader
        accept="image/*"
        id="imageRef"
        name="imageRef"
        randomizeFilename
        storageRef={setStorageDirectory()}
        onUploadStart={handleUploadStart}
        onUploadError={handleUploadError}
        onUploadSuccess={handleUploadSuccess}
        onProgress={handleProgress}
        required
      />
      {uploadingImg && (
        <div className="h-12 relative w-full border">
          <div
            className="bg-green-500 absolute left-0 top-0 text-white px-2 text-sm h-12 flex items-center"
            style={{ width: `${progressImg}%` }}
          >
            {progressImg} %
          </div>
        </div>
      )}
      {dishImageUrl && (
        <p className="bg-green-500 text-white p-3 text-center my-5">
          The image was uploaded successfully
        </p>
      )}
    </div>
  );
};

export default DishImageUploader;
