import React from "react";
import { Statistic, Card, Row, Col } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

import "./NewsHeadline.css";
import axios from "axios";

class NewsHeadline extends React.Component {
  state = {
    news: [],
  };

  // getNews = async () => {
  //   const news = axios.get("http://localhost:7000/news/headlines");
  //   this.Promise.all(news)
  //     .then(response => {
  //       return response;
  //     })
  // }

  // Promise.all(news)
  //   .then(response => {

  //   })

  getNews = async () => {
    const {
      data: {
        1: { news },
      },
    } = await axios.get("http://localhost:7000/news/headlines");
    console.log(news);
    this.setState({ news });
  };

  componentDidMount() {
    this.getNews();
  }

  render() {
    const { news } = this.state;
    return (
      <div className="news_parent">
        <ol className="articles">
          {news.map((headline) => (
            <li className="articles__article" styles="--animation-order:1">
              <a className="articles__link" href={headline.detail_url}>
                <div className="articles__content articles__content--lhs">
                  <h2 className="articles__title">{headline.title}</h2>
                  {/* <img class="headline_img" src={headline.img_url} /> */}
                  <div className="articles__footer">
                    <div>
                      <Col span={12}>
                        <Card className="neutral_statistics">
                          <Statistic
                            title="이건 잘했지"
                            value={11.28}
                            precision={2}
                            valueStyle={{ color: "#3f8600" }}
                            prefix={<ArrowUpOutlined />}
                            suffix="%"
                          />
                        </Card>
                      </Col>
                      <p>{headline.info_news}</p>
                    </div>
                    <div>
                      <Col span={12}>
                        <Card className="neutral_statistics">
                          <Statistic
                            title="이건 좀.."
                            value={9.3}
                            precision={2}
                            valueStyle={{ color: "#cf1322" }}
                            prefix={<ArrowDownOutlined />}
                            suffix="%"
                          />
                        </Card>
                      </Col>
                      <time>1 Jan 2020</time>
                    </div>
                  </div>
                </div>
                <div
                  className="articles__content articles__content--rhs"
                  aria-hidden="true"
                >
                  <h2 className="articles__title">{headline.title}</h2>
                  {/* <img class="headline_img" src={headline.img_url} /> */}
                  <div className="articles__footer">
                    <div>
                      <Col span={12}>
                        <Card className="neutral_statistics">
                          <Statistic
                            title="이건 잘했지"
                            value={11.28}
                            precision={2}
                            valueStyle={{ color: "#3f8600" }}
                            prefix={<ArrowUpOutlined />}
                            suffix="%"
                          />
                        </Card>
                      </Col>
                      <p>{headline.info_news}</p>
                    </div>
                    <div>
                      <Col span={12}>
                        <Card className="neutral_statistics">
                          <Statistic
                            title="이건 좀.."
                            value={9.3}
                            precision={2}
                            valueStyle={{ color: "#cf1322" }}
                            prefix={<ArrowDownOutlined />}
                            suffix="%"
                          />
                        </Card>
                      </Col>
                      <time>1 Jan 2020</time>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default NewsHeadline;
