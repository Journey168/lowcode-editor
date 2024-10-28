import { Button, Collapse, CollapseProps, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import type { ComponentEvent } from "../../stores/component-config";
import { useComponentConfigStore } from "../../stores/component-config";
import { useComponetsStore } from "../../stores/components";
import ActionModal from "../Setting/ActionModal";
import { GoToLinkConfig } from "../Setting/actions/GoToLink";
import { ShowMessageConfig } from "../Setting/actions/ShowMessage";

export default function ComponentEvent() {
  const { curComponent, updateComponentProps } = useComponetsStore();
  const { componentConfig } = useComponentConfigStore();

  const [actionModalOpen, setActionModalOpen] = useState<boolean>(false);
  const [curEvent, setCurEvent] = useState<ComponentEvent>();

  if (!curComponent) return null;

  function deleteAction(event: ComponentEvent, index: number) {
    if (!curComponent) return;

    const actions = curComponent.props[event.name]?.actions;

    actions.splice(index, 1);

    updateComponentProps(curComponent.id, {
      [event.name]: {
        actions,
      },
    });
  }

  // 渲染配置的事件类型
  const items: CollapseProps["items"] = (
    componentConfig[curComponent?.name].events || []
  ).map((event) => {
    return {
      key: event.name,
      label: (
        <div className="flex justify-between leading-[30px]">
          {event.label}
          <Button
            type="primary"
            onClick={(e) => {
              e.stopPropagation();

              setActionModalOpen(true);
              setCurEvent(event);
            }}
          >
            添加动作
          </Button>
        </div>
      ),
      children: (
        <div>
          {(curComponent.props[event.name]?.actions || []).map(
            (item: GoToLinkConfig | ShowMessageConfig, index: number) => {
              return (
                <div key={item.type + index}>
                  {item.type === "goToLink" ? (
                    <div className="border border-[#aaa] m-[10px] p-[10px] relative">
                      <div className="text-[blue]">跳转链接</div>
                      <div>{item.url}</div>
                      <Popconfirm
                        title="确认删除？"
                        okText={"确认"}
                        cancelText={"取消"}
                        onConfirm={() => deleteAction(event, index)}
                      >
                        <div className="absolute top-[10px] right-[10px] cursor-pointer">
                          <DeleteOutlined />
                        </div>
                      </Popconfirm>
                    </div>
                  ) : null}
                  {item.type === "showMessage" ? (
                    <div className="border border-[#aaa] m-[10px] p-[10px] relative">
                      <div className="text-[blue]">消息弹框</div>
                      <div>{item.config.type}</div>
                      <div>{item.config.text}</div>
                      <Popconfirm
                        title="确认删除？"
                        okText={"确认"}
                        cancelText={"取消"}
                        onConfirm={() => deleteAction(event, index)}
                      >
                        <div className="absolute top-[10px] right-[10px] cursor-pointer">
                          <DeleteOutlined />
                        </div>
                      </Popconfirm>
                    </div>
                  ) : null}
                </div>
              );
            }
          )}
        </div>
      ),
    };
  });

  function handleModalOk(config?: GoToLinkConfig | ShowMessageConfig) {
    if (!config || !curEvent || !curComponent) return;

    updateComponentProps(curComponent.id, {
      [curEvent.name]: {
        actions: [
          ...(curComponent.props[curEvent.name]?.actions || []),
          config,
        ],
      },
    });

    setActionModalOpen(false);
  }

  return (
    <div className="px-[10px]">
      <Collapse
        className="mb-[10px]"
        items={items}
        defaultActiveKey={componentConfig[curComponent.name].events?.map(
          (event) => event.name
        )}
      />
      <ActionModal
        visible={actionModalOpen}
        handleOk={handleModalOk}
        handleCancel={() => {
          setActionModalOpen(false);
        }}
      />
    </div>
  );
}
