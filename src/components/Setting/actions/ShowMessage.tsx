import { Input, Select } from "antd";
import { useEffect, useState } from "react";
import { useComponetsStore } from "../../../stores/components";

export interface ShowMessageConfig {
  type: "showMessage";
  config: {
    type: "success" | "error";
    text: string;
  };
}

export interface ShowMessageProps {
  value?: ShowMessageConfig["config"];
  defaultValue?: ShowMessageConfig["config"];
  onChange?: (config: ShowMessageConfig) => void;
}

export default function ShowMessage(props: ShowMessageProps) {
  const { value: val, defaultValue, onChange } = props;
  const [type, setType] = useState<"success" | "error">(
    defaultValue?.type || "success"
  );
  const [text, setText] = useState<string>(defaultValue?.text || "");
  const { curComponentId } = useComponetsStore();

  useEffect(() => {
    if (val) {
      setType(val.type);
      setText(val.text);
    }
  }, [val]);

  // 消息类型更新
  function messageTypeChange(value: "success" | "error") {
    if (!curComponentId) return;

    setType(value);

    onChange?.({
      type: "showMessage",
      config: {
        type: value,
        text,
      },
    });
  }
  // 文本改变更新
  function messageTextChange(value: string) {
    if (!curComponentId) return;

    setText(value);

    onChange?.({
      type: "showMessage",
      config: {
        type,
        text: value,
      },
    });
  }

  return (
    <div className="mt-[10px]">
      <div className="flex items-center gap-[10px]">
        <div>类型：</div>
        <div>
          <Select
            style={{ width: 500, height: 50 }}
            options={[
              { label: "成功", value: "success" },
              { label: "失败", value: "error" },
            ]}
            onChange={(value) => {
              messageTypeChange(value);
            }}
            value={type}
          />
        </div>
      </div>
      <div className="flex items-center gap-[10px] mt-[10px]">
        <div>文本：</div>
        <div>
          <Input
            style={{ width: 500, height: 50 }}
            onChange={(e) => {
              messageTextChange(e.target.value);
            }}
            value={text}
          />
        </div>
      </div>
    </div>
  );
}
