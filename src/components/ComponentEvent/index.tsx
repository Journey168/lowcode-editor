import { Collapse, CollapseProps, Select } from "antd";
import { useComponentConfigStore } from "../../stores/component-config";
import { useComponetsStore } from "../../stores/components";
import GoToLink from "../Setting/actions/GoToLink";
import ShowMessage from "../Setting/actions/ShowMessage";

export default function ComponentEvent() {
  const { curComponent, curComponentId, updateComponentProps } =
    useComponetsStore();
  const { componentConfig } = useComponentConfigStore();

  if (!curComponent) return null;

  // 设置对应的事件
  function selectAction(eventName: string, value: string) {
    if (!curComponentId) return;
    updateComponentProps(curComponentId, { [eventName]: { type: value } });
  }

  // 渲染配置的事件类型
  const items: CollapseProps["items"] = (
    componentConfig[curComponent?.name].events || []
  ).map((item) => {
    return {
      key: item.name,
      label: item.label,
      children: (
        <div>
          <div className="flex items-center gap-[10px]">
            <div>动作：</div>
            <Select
              className="w-[160px]"
              options={[
                { label: "显示提示", value: "showMessage" },
                { label: "跳转链接", value: "goToLink" },
              ]}
              value={curComponent?.props?.[item.name]?.type}
              onChange={(value) => selectAction(item.name, value)}
            />
          </div>
          {curComponent?.props?.[item.name]?.type === "goToLink" && (
            <GoToLink event={item} />
          )}
          {curComponent?.props?.[item.name]?.type === "showMessage" && (
            <ShowMessage event={item} />
          )}
        </div>
      ),
    };
  });

  return (
    <div className="px-[10px]">
      <Collapse className="mb-[10px]" items={items} />
    </div>
  );
}
