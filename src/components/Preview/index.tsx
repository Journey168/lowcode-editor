import { message } from "antd";
import React from "react";
import { useComponentConfigStore } from "../../stores/component-config";
import { useComponetsStore, Component } from "../../stores/components";

export default function Preview() {
  const { components } = useComponetsStore();
  const { componentConfig } = useComponentConfigStore();

  // 事件类型添加处理
  function hangleEvent(component: Component) {
    const props: Record<string, any> = {};

    componentConfig[component.name].events?.forEach((event) => {
      const eventConfig = component.props[event.name];

      if (eventConfig) {
        const { type } = eventConfig;
        props[event.name] = () => {
          if (type === "goToLink" && eventConfig.url) {
            window.location.href = eventConfig.url;
          } else if (type === "showMessage" && eventConfig.config) {
            if (eventConfig.config.type === "success") {
              message.success(eventConfig.config.text);
            } else if (eventConfig.config.type === "error") {
              message.error(eventConfig.config.text);
            }
          }
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
