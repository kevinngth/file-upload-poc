import { Button } from "antd";
import { useEffect, useState } from "react";
import { healthCheck } from "../api";

const colorMap = {
  green: "#b7eb8f",
  yellow: "#fffb8f",
  red: "#ffa39e",
};

const valueMap = {
  a: "✓",
  b: "",
  c: "X",
};

const TestApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(colorMap.red);
  const [value, setValue] = useState(valueMap.b);

  const checkHealth = () => {
    setValue(valueMap.b);
    setBackgroundColor(colorMap.yellow);
    setIsLoading(true);
    healthCheck()
      .then(() => {
        setTimeout(() => {
          setValue(valueMap.a);
          setBackgroundColor(colorMap.green);
        }, 2000);
      })
      .catch(() => {
        setValue(valueMap.c);
        setBackgroundColor(colorMap.red);
      });
    setIsLoading(false);
  };

  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <Button style={{ backgroundColor }} type="primary" shape="circle" loading={isLoading} onClick={checkHealth}>
      {value}
    </Button>
  );
};

export default TestApi;
