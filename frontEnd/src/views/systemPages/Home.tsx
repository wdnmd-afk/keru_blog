import React from "react";
import { Card, Col, Row } from "antd";
import style from "@/styles/home.module.scss";
// import useStores from "@/hooks/useStores.ts";
const { Meta } = Card;
// 将 CounterProvider 包裹在 Home 组件的外部
const Home = () => {
  return (
    <div className={style.home_container}>
      <div className={style.home_main}>
        <h1 className={style.home_title}>React & Node Study</h1>
        <div className={style.home_card_box}>
          <Row gutter={16}>
            <Col span={6}>
              {" "}
              <Card
                hoverable
                style={{ flex: 1 }}
                cover={
                  <img
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              >
                <Meta
                  title="Europe Street beat"
                  description="www.instagram.com"
                />
              </Card>
            </Col>
            <Col span={6}>
              {" "}
              <Card
                hoverable
                style={{ flex: 1 }}
                cover={
                  <img
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              >
                <Meta
                  title="Europe Street beat"
                  description="www.instagram.com"
                />
              </Card>
            </Col>
            <Col span={6}>
              {" "}
              <Card
                hoverable
                style={{ flex: 1 }}
                cover={
                  <img
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              >
                <Meta
                  title="Europe Street beat"
                  description="www.instagram.com"
                />
              </Card>
            </Col>
            <Col span={6}>
              {" "}
              <Card
                hoverable
                style={{ flex: 1 }}
                cover={
                  <img
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              >
                <Meta
                  title="Europe Street beat"
                  description="www.instagram.com"
                />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

// 导出 App 组件
export default Home;
