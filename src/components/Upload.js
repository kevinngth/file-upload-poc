import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload as AntdUpload } from "antd";
import { useState } from "react";
import { uploadFiles } from "../api";

const Upload = () => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files", file.originFileObj, file.name);
    });
    setUploading(true);

    uploadFiles(formData)
      .then((res) => res.json())
      .then(() => {
        setFileList([]);
        message.success("upload successfully.");
      })
      .catch(() => {
        message.error("upload failed.");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const props = {
    onChange: (info) => {
      const newFileList = [...info.fileList];
      setFileList(newFileList);
    },
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
    multiple: true,
  };
  return (
    <>
      <AntdUpload {...props}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </AntdUpload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{
          marginTop: 16,
        }}
      >
        {uploading ? "Uploading" : "Start Upload"}
      </Button>
    </>
  );
};

export default Upload;
