import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload as AntdUpload } from "antd";
import { useState } from "react";

const Upload = () => {
  const [fileList, setFileList] = useState([]);
  const handleChange = (info) => {
    let newFileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    newFileList = newFileList.slice(-2);

    // 2. Read from response and show file link
    newFileList = newFileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });
    setFileList(newFileList);
  };
  const props = {
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange: handleChange,
    multiple: true,
  };
  return (
    <AntdUpload {...props} fileList={fileList}>
      <Button icon={<UploadOutlined />}>Upload</Button>
    </AntdUpload>
  );
};

export default Upload;
