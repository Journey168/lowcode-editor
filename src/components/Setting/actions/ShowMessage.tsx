import { Input, Select } from "antd";
import { ComponentEvent } from "../../../stores/component-config";
import { useComponetsStore } from "../../../stores/components";

export default function ShowMessage(props: { event: ComponentEvent }) {
  const { event } = props;
  const { curComponent, curComponentId, updateComponentProps } =
    useComponetsStore();

  // 消息类型更新
  function messageTypeChange(eventName: string, value: string) {
    if (!curComponentId) return;
    updateComponentProps(curComponentId, {
      [eventName]: {
        ...curComponent?.props?.[eventName],
        config: {
          ...curComponent?.props?.[eventName].config,
          type: value,
        },
      },
    });
  }
  // 文本改变更新
  function messageTextChange(eventName: string, value: string) {
    if (!curComponentId) return;
    updateComponentProps(curComponentId, {
      [eventName]: {
        ...curComponent?.props?.[eventName],
        config: {
          ...curComponent?.props?.[eventName]?.config,
          text: value,
        },
      },
    });
  }

  return (
    <div className="mt-[10px]">
      <div className="flex items-center gap-[10px]">
        <div>类型：</div>
        <div>
          <Select
            style={{ width: 160 }}
            options={[
              { label: "成功", value: "success" },
              { label: "失败", value: "error" },
            ]}
            onChange={(value) => {
              messageTypeChange(event.name, value);
            }}
            value={curComponent?.props?.[event.name]?.config?.type}
          />
        </div>
      </div>
      <div className="flex items-center gap-[10px] mt-[10px]">
        <div>文本：</div>
        <div>
          <Input
            onChange={(e) => {
              messageTextChange(event.name, e.target.value);
            }}
            value={curComponent?.props?.[event.name]?.config?.text}
          />
        </div>
      </div>
    </div>
    // <div className="mt-[10px]">
    //   <div className="flex items-center gap-[10px]">
    //     <div>类型</div>
    //     <div>
    //       <Select
    //         style={{ width: 160 }}
    //         options={[
    //           { label: "成功", value: "success" },
    //           { label: "失败", value: "error" },
    //         ]}
    //         value={curComponent?.props?.[event.name]?.config?.type}
    //         onChange={(value) => messageTypeChange(event.name, value)}
    //       />
    //     </div>
    //   </div>
    //   <div className="flex items-center gap-[10px] mt-[10px]">
    //     <div>文本：</div>
    //     <div>
    //       <Input
    //         onChange={(e) => {
    //           messageTextChange(event.name, e.target.value);
    //         }}
    //         value={curComponent?.props?.[event.name]?.config?.text}
    //       />
    //     </div>
    //   </div>
    // </div>
  );
}
