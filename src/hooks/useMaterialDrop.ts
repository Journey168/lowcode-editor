import { useDrop } from "react-dnd";
import { useComponentConfigStore } from "../stores/component-config";
import { useComponetsStore } from "../stores/components";

export function useMaterialDrop(accept: string[], id: number) {
  const { addComponent } = useComponetsStore();
  const { componentConfig } = useComponentConfigStore();

  const [{ canDrop }, drop] = useDrop(() => ({
    accept,
    drop: (item: { type: string }, monitor) => {
      // 是否droped
      const didDrop = monitor.didDrop();
      if (didDrop) return;

      // 添加组件
      // const props = componentConfig[item.type].defaultProps;
      const config = componentConfig[item.type];
      addComponent(
        {
          id: new Date().getTime(),
          name: item.type,
          desc: config.desc,
          props: config.defaultProps,
        },
        id
      );
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  }));

  return {
    canDrop,
    drop,
  };
}
