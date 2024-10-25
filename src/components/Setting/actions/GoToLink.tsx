import { Input } from "antd";
import { ComponentEvent } from "../../../stores/component-config";
import { useComponetsStore } from "../../../stores/components";

export default function GoToLink(props: { event: ComponentEvent }) {
  const { event } = props;
  const { curComponent, curComponentId, updateComponentProps } =
    useComponetsStore();

  // 设置对应事件的跳转路径
  function urlChange(eventName: string, value: string) {
    if (!curComponentId) return;
    updateComponentProps(curComponentId, {
      [eventName]: { ...curComponent?.props?.[eventName], url: value },
    });
  }
  return (
    <div className="mt-[10px]">
      <div className="flex items-center gap-[10px] ">
        <div>链接：</div>
        <div>
          <Input
            value={curComponent?.props?.[event.name]?.url}
            onChange={(e) => urlChange(event.name, e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
