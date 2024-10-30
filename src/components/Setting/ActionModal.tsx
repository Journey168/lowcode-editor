import { Modal, Segmented } from "antd";
import { useEffect, useState } from "react";
import CustomJS, { CustomJSConfig } from "./actions/CustomJS";
import GoToLink, { GoToLinkConfig } from "./actions/GoToLink";
import ShowMessage, { ShowMessageConfig } from "./actions/ShowMessage";

export type ActionConfig = GoToLinkConfig | ShowMessageConfig | CustomJSConfig;

interface ActionModalProps {
  visible: boolean;
  action?: ActionConfig;
  handleOk: (config?: ActionConfig) => void;
  handleCancel: () => void;
}
export default function ActionModal(props: ActionModalProps) {
  const { visible, action, handleOk, handleCancel } = props;

  const [key, setKey] = useState<string>("goToLink");

  const [curConfig, setCurConfig] = useState<ActionConfig>();

  useEffect(() => {
    if (action?.type) {
      setKey(action.type);
    }
  }, [action]);

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
          // options={["访问链接", "消息提示", "自定义JS"]}
          options={[
            { label: "访问链接", value: "goToLink" },
            { label: "消息提示", value: "showMessage" },
            { label: "自定义JS", value: "customJS" },
          ]}
        />
        {key === "goToLink" && (
          <GoToLink
            value={action?.type === "goToLink" ? action.url : ""}
            onChange={(config) => {
              setCurConfig(config);
            }}
          />
        )}
        {key === "showMessage" && (
          <ShowMessage
            value={action?.type === "showMessage" ? action.config : undefined}
            onChange={(config) => {
              setCurConfig(config);
            }}
          />
        )}
        {key === "customJS" && (
          <CustomJS
            value={action?.type === "customJS" ? action.code : ""}
            onChange={(config) => {
              setCurConfig(config);
            }}
          />
        )}
      </div>
    </Modal>
  );
}
