import { useMemo } from "react";
import { useComponentConfigStore } from "../../stores/component-config";
import Item from "./item";

export default function Material() {
  const { componentConfig } = useComponentConfigStore();

  const components = useMemo(() => {
    return Object.values(componentConfig).filter(
      (item) => item.name !== "Page"
    );
  }, [componentConfig]);

  return (
    <div>
      {components.map((item, index) => {
        return (
          <Item name={item.name} desc={item.desc} key={item.name + index} />
        );
      })}
    </div>
  );
}
