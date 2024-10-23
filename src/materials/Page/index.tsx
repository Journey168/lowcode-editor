import { useMaterialDrop } from "../../hooks/useMaterialDrop";
import { CommonComponentProps } from "../../interface";

function Page({ id, children }: CommonComponentProps) {
  const accepts = ["Button", "Container"];
  const { canDrop, drop } = useMaterialDrop(accepts, id);

  return (
    <div
      data-component-id={id}
      ref={drop}
      className="p-[20px] h-[100%] box-border"
      style={{ border: canDrop ? "2px solid blue" : "none" }}
    >
      {children}
    </div>
  );
}

export default Page;
