import { Select, Layout, Row, Col, Form, DatePicker } from "antd";
import React, { useState, useCallback, useEffect } from "react";
import "./App.css";
import dayjs from "dayjs";

const getAgeOpts = (currentAge: number) => {
  const opts = [];

  for (let index = 120; index >= currentAge; index--) {
    opts.push(
      <Select.Option value={index} key={index}>{`${index} 岁`}</Select.Option>
    );
  }

  return opts;
};

function App() {
  const [birthday, setBirthday] = useState<dayjs.Dayjs>();
  const [currentAge, setCurrentAge] = useState<number>();
  const [finalAge, setFianlAge] = useState<number>();
  const [time, setTime] = useState("");

  const getAgeOfThisYear = useCallback((birthday) => {
    if (birthday) {
      return dayjs().get("year") - birthday.get("year");
    }

    return 30;
  }, []);

  const getDaysOfYourLife = () => {
    if (finalAge && currentAge) {
      return (finalAge - currentAge) * 365;
    }
    return 0;
  };

  useEffect(() => {
    refreshTime();

    function refreshTime() {
      let timer = setTimeout(() => {
        setTime(dayjs().format("YYYY-MM-DD HH:mm:ss"));
        clearTimeout(timer);
        // @ts-ignore
        timer = null;
        refreshTime();
      }, 500);
    }
  }, []);

  const getFianleYear = () => {
    if (birthday && finalAge) {
      return birthday?.get("year") + finalAge;
    }

    return dayjs().format("YYYY");
  };

  return (
    <div className="App">
      <Layout.Header>
        <h1 style={{ color: "white" }}>人生计算器</h1>
      </Layout.Header>
      <Layout.Content style={{ padding: 20 }}>
        <Form
          onFieldsChange={([value]) => {
            if (value.name.toString() === "birthday") {
              setBirthday(value.value);
              setCurrentAge(getAgeOfThisYear(value.value));
            }

            if (value.name.toString() === "finalAge") {
              setFianlAge(value.value);
            }
          }}
          initialValues={{ birthday, currentAge }}
        >
          <Row justify="space-between" align="middle">
            <Col span={8}>
              <Form.Item label="出生年份" name="birthday">
                <DatePicker.YearPicker
                  style={{ width: "100%" }}
                  placeholder="请选择出生年份"
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                style={{ fontSize: 30 }}
                label="现在年龄"
                name="finalAge"
              >
                {currentAge}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="预计年龄" name="finalAge">
                <Select placeholder="请选择">
                  {getAgeOpts(getAgeOfThisYear(birthday))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div style={{ fontSize: 60, color: "blue", marginTop: 200 }}>
          您预计能活到
          <span style={{ fontWeight: 900, color: "red" }}>
            {` ${getFianleYear()} `}
          </span>
          年
        </div>
        <div style={{ fontSize: 40 }}>
          您的生命还剩下
          <span style={{ fontWeight: 900, color: "red" }}>
            {` ${getDaysOfYourLife()} `}
          </span>
          天
        </div>

        <div style={{ fontSize: 20, color: "green", marginTop: 20 }}>
          您打算怎么度过您的每一天？
        </div>
        <div style={{ fontSize: 40, marginTop: 100 }}>{time}</div>
      </Layout.Content>
    </div>
  );
}

export default App;
