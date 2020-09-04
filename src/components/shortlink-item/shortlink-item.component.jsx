import React from "react";
import "./shortlink-item.style.sass";
import { DeleteTwoTone } from "@ant-design/icons";
import { Popconfirm, Spin } from "antd";

class ShortLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  render() {
    const { key, shortLink, originalLink, deleteLink, isSpinning } = this.props;
    return (
      <Spin spinning={isSpinning}>
        <div className="shortlink">
          <div className="shorterlink">
            <link rel="stylesheet" href="" />
            {shortLink}
          </div>
          <div className="originallink">
            <div className="linkx">{originalLink}</div>
          </div>
          <div className="delete-button">
            <Popconfirm
              title="Are you sure？"
              okText="Yes"
              cancelText="No"
              onConfirm={() => deleteLink(shortLink)}
            >
              <DeleteTwoTone twoToneColor="#eb2f96" />
            </Popconfirm>
          </div>
        </div>
      </Spin>
    );
  }
}

export default ShortLink;
