import { Modal, Segmented } from "antd";
import { useState } from "react";
import GoToLink, { GoToLinkConfig } from "./actions/GoToLink";
import ShowMessage, { ShowMessageConfig } from "./actions/ShowMessage";

interface ActionModalProps {
  visible: boolean;
  handleOk: (config?: GoToLinkConfig | ShowMessageConfig) => void;
  handleCancel: () => void;
}
export default function ActionModal(props: ActionModalProps) {
  const { visible, handleOk, handleCancel } = props;

  const [key, setKey] = useState<string>("访问链接");

  const [curConfig, setCurConfig] = useState<
    GoToLinkConfig | ShowMessageConfig
  >();

  return (
    <Modal
      title="事件动作配置"
      width="800px"
      open={visible}
      okText="确认"
      cancelText="取消"
      onOk={() => handleOk(curConfig)}
      onCancel={handleCancel}
    >
      <div className="h-[500px]">
        <Segmented
          block
          value={key}
          onChange={setKey}
          options={["访问链接", "消息提示", "自定义JS"]}
        />
        {key === "访问链接" && (
          <GoToLink
            onChange={(config) => {
              setCurConfig(config);
            }}
          />
        )}
        {key === "消息提示" && (
          <ShowMessage
            onChange={(config) => {
              setCurConfig(config);
            }}
          />
        )}
      </div>
    </Modal>
  );
}
