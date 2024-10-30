import { message } from "antd";
import React from "react";
import { useComponentConfigStore } from "../../stores/component-config";
import { useComponetsStore, Component } from "../../stores/components";
import { ActionConfig } from "../Setting/ActionModal";

export default function Preview() {
  const { components } = useComponetsStore();
  const { componentConfig } = useComponentConfigStore();

  // 事件类型添加处理
  function hangleEvent(component: Component) {
    const props: Record<string, any> = {};

    componentConfig[component.name].events?.forEach((event) => {
      const eventConfig = component.props[event.name];

      if (eventConfig) {
        props[event.name] = () => {
          eventConfig?.actions?.forEach((action: ActionConfig) => {
            if (action.type === "goToLink") {
              window.location.href = action.url;
            } else if (action.type === "showMessage") {
              if (action.config.type === "success") {
                message.success(action.config.text);
              } else if (action.config.type === "error") {
                message.error(action.config.text);
              }
            } else if (action.type === "customJS") {
              const func = new Function("context", action.code);
              func({
                name: component.name,
                props: component.props,
                showMessage(content: string) {
                  message.success(content);
                },
              });
            }
          });
        };
      }
    });
    return props;
  }

  function renderComponent(components: Component[]): React.ReactNode {
    return components.map((component: Component) => {
      const config = componentConfig[component.name];

      if (!config?.prod) return null;

      return React.createElement(
        config.prod,
        {
          key: component.id,
          id: component.id,
          name: component.name,
          style: component.styles,
          ...config.defaultProps,
          ...component.props,
          ...hangleEvent(component),
        },
        renderComponent(component.children || [])
      );
    });
  }

  return <div>{renderComponent(components)}</div>;
}
