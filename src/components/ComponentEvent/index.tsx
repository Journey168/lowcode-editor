import { Button, Collapse, CollapseProps, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import type { ComponentEvent } from "../../stores/component-config";
import { useComponentConfigStore } from "../../stores/component-config";
import { getComponentById, useComponetsStore } from "../../stores/components";
import ActionModal, { ActionConfig } from "../Setting/ActionModal";

export default function ComponentEvent() {
  const { curComponent, updateComponentProps, components } =
    useComponetsStore();
  const { componentConfig } = useComponentConfigStore();

  const [actionModalOpen, setActionModalOpen] = useState<boolean>(false);
  const [curEvent, setCurEvent] = useState<ComponentEvent>();
  const [curAction, setCurAction] = useState<ActionConfig>();
  const [curActionIndex, setCurActionIndex] = useState<number>();

  if (!curComponent) return null;

  // 删除事件
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

  // 编辑事件
  function editAction(config: ActionConfig, index: number) {
    if (!curComponent) {
      return;
    }
    setCurAction(config);
    setCurActionIndex(index);
    setActionModalOpen(true);
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
            (item: ActionConfig, index: number) => {
              return (
                <div key={item.type + index}>
                  {/* 链接跳转 */}
                  {item.type === "goToLink" ? (
                    <div className="border border-[#aaa] m-[10px] p-[10px] relative">
                      <div className="text-[blue]">跳转链接</div>
                      <div>{item.url}</div>
                      <div
                        className="absolute top-[10px] right-[30px] cursor-pointer"
                        onClick={() => editAction(item, index)}
                      >
                        <EditOutlined />
                      </div>
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
                  {/* 消息提示 */}
                  {item.type === "showMessage" ? (
                    <div className="border border-[#aaa] m-[10px] p-[10px] relative">
                      <div className="text-[blue]">消息弹框</div>
                      <div>{item.config.type}</div>
                      <div>{item.config.text}</div>
                      <div
                        className="absolute top-[10px] right-[30px] cursor-pointer"
                        onClick={() => editAction(item, index)}
                      >
                        <EditOutlined />
                      </div>
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
                  {/* 自定义JS */}
                  {item.type === "customJS" ? (
                    <div className="border border-[#aaa] m-[10px] p-[10px] relative">
                      <div className="text-[blue]">自定义JS</div>
                      <div
                        className="absolute top-[10px] right-[30px] cursor-pointer"
                        onClick={() => editAction(item, index)}
                      >
                        <EditOutlined />
                      </div>
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
                  {/* 组件方法 */}
                  {item.type === "componentMethod" ? (
                    <div className="border border-[#aaa] m-[10px] p-[10px] relative">
                      <div className="text-[blue]">组件方法</div>
                      <div>
                        {
                          getComponentById(item.config.componentId, components)
                            ?.desc
                        }
                      </div>
                      <div>{item.config.componentId}</div>
                      <div>{item.config.method}</div>
                      <div
                        className="absolute top-[10px] right-[30px] cursor-pointer"
                        onClick={() => editAction(item, index)}
                      >
                        <EditOutlined />
                      </div>
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

  function handleModalOk(config?: ActionConfig) {
    if (!config || !curEvent || !curComponent) return;

    if (curAction) {
      updateComponentProps(curComponent.id, {
        [curEvent.name]: {
          actions: curComponent.props[curEvent.name]?.actions.map(
            (item: ActionConfig, index: number) => {
              return index === curActionIndex ? config : item;
            }
          ),
        },
      });
    } else {
      updateComponentProps(curComponent.id, {
        [curEvent.name]: {
          actions: [
            ...(curComponent.props[curEvent.name]?.actions || []),
            config,
          ],
        },
      });
    }

    setCurAction(undefined);
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
        action={curAction}
        handleOk={handleModalOk}
        handleCancel={() => {
          setActionModalOpen(false);
        }}
      />
    </div>
  );
}
