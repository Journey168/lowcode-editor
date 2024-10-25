import React from "react";
import { useComponentConfigStore } from "../../stores/component-config";
import { useComponetsStore, Component } from "../../stores/components";

export default function Preview() {
  const { components } = useComponetsStore();
  const { componentConfig } = useComponentConfigStore();

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
        },
        renderComponent(component.children || [])
      );
    });
  }

  return <div>{renderComponent(components)}</div>;
}
