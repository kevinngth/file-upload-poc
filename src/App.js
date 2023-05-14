import { Col, Row } from "antd";
import { Layout, TestApi, Upload } from "./components";
import "./App.css";

const App = () => {
  return (
    <Layout>
      <Row justify="space-between">
        <Col>
          <Upload />
        </Col>
        <Col>
          <TestApi />
        </Col>
      </Row>
    </Layout>
  );
};

export default App;
