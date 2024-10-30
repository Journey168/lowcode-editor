import { Input } from "antd";
import { useEffect, useState } from "react";
import { useComponetsStore } from "../../../stores/components";

export interface GoToLinkConfig {
  type: "goToLink";
  url: string;
}

export interface GoToLinkProps {
  value?: string;
  defaultValue?: string;
  onChange?: (config: GoToLinkConfig) => void;
}

export default function GoToLink(props: GoToLinkProps) {
  const { value: val, defaultValue, onChange } = props;
  const { curComponentId } = useComponetsStore();
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(val);
  }, [val]);

  // 设置对应事件的跳转路径
  function urlChange(value: string) {
    if (!curComponentId) return;
    setValue(value);
    onChange?.({ type: "goToLink", url: value });
  }
  return (
    <div className="mt-[10px]">
      <div className="flex items-center gap-[10px] ">
        <div>链接：</div>
        <div>
          <Input.TextArea
            style={{ width: "500px" }}
            rows={4}
            value={value || ""}
            onChange={(e) => urlChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
