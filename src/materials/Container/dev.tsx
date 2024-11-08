import { useMaterialDrop } from "../../hooks/useMaterialDrop";
import { CommonComponentProps } from "../../interface";

function Container({ id, children, styles }: CommonComponentProps) {
  const accepts = ["Button", "Container", "Modal"];
  const { canDrop, drop } = useMaterialDrop(accepts, id);

  return (
    <div
      data-component-id={id}
      ref={drop}
      className={`min-h-[100px] p-[20px] ${
        canDrop ? "border-[2px] border-[blue]" : "border-[1px] border-[#000]"
      }`}
      style={styles}
    >
      {children}
    </div>
  );
}

export default Container;
