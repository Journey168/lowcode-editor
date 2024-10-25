import { Button, Space } from "antd";
import { useComponetsStore } from "../../stores/components";

export default function Header() {
  const { mode, setMode, setCurComponentId } = useComponetsStore();
  return (
    <div className="w-[100%] h-[100%]">
      <div className="h-[50px] flex justify-between items-center px-[20px]">
        <div>低代码编辑器</div>
        <Space>
          {mode === "edit" && (
            <Button
              type="primary"
              onClick={() => {
                setMode("preview");
                setCurComponentId(null);
              }}
            >
              预览
            </Button>
          )}
          {mode === "preview" && (
            <Button
              type="primary"
              onClick={() => {
                setMode("edit");
              }}
            >
              退出预览
            </Button>
          )}
        </Space>
      </div>
    </div>
  );
}
