import React, { MouseEventHandler, ReactNode, useState } from "react";
import { useComponentConfigStore } from "../../stores/component-config";
import { useComponetsStore, Component } from "../../stores/components";
import HoverMask from "../HoverMask";

export default function EditArea() {
  const { components } = useComponetsStore();
  const { componentConfig } = useComponentConfigStore();

  function renderComponent(components: Component[]): ReactNode {
    return components.map((component: Component) => {
      const config = componentConfig?.[component.name];

      if (!config.component) return null;

      return React.createElement(
        config.component,
        {
          key: component.id,
          id: component.id,
          name: component.name,
          ...config.defaultProps,
          ...component.props,
        },
        renderComponent(component.children || [])
      );
    });
  }

  const [hoverComponentId, setHoverComponentId] = useState<number>();

  const handleMouseOver: MouseEventHandler = (e) => {
    const path = e.nativeEvent.composedPath();

    for (let i = 0; i < path.length; i++) {
      const ele = path[i] as HTMLElement;

      const componentId = ele.dataset.componentId;

      if (componentId) {
        setHoverComponentId(+componentId);
        return;
      }
    }
  };

  return (
    <div
      className="h-[100%] edit-area"
      onMouseOver={handleMouseOver}
      onMouseLeave={() => setHoverComponentId(undefined)}
    >
      {renderComponent(components)}
      {hoverComponentId && (
        <HoverMask
          portalWrapperClassName="potal-wrapper"
          containerClassName="edit-area"
          componentId={hoverComponentId}
        />
      )}
      <div className="potal-wrapper"></div>
    </div>
  );
}
