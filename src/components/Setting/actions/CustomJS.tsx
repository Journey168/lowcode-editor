import MonacoEditor, { OnMount } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { useComponetsStore } from "../../../stores/components";

export interface CustomJSConfig {
  type: "customJS";
  code: string;
}

export interface CustomJSProps {
  value?: string;
  defaultValue?: string;
  onChange?: (config: CustomJSConfig) => void;
}

export default function CustomJS(props: CustomJSProps) {
  const { defaultValue,value: val, onChange } = props;

  const { curComponentId } = useComponetsStore();
  const [value, setValue] = useState(defaultValue);

  useEffect(()=>{
    setValue(val)
  },[val])

  const handleEditorMount: OnMount = (editor, monaco) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
      editor.getAction("editor.action.formatDocument")?.run();
    });
  };

  function codeChange(value?: string) {
    if (!curComponentId) return;

    setValue(value);

    onChange?.({
      type: "customJS",
      code: value!,
    });
  }

  return (
    <div className="mt-[40px]">
      <div className="flex items-start gap-[20px]">
        <div>自定义 JS</div>
        <div>
          <MonacoEditor
            height={"400px"}
            width={"600px"}
            path="action.js"
            language="javascript"
            value={value}
            onMount={handleEditorMount}
            onChange={codeChange}
            options={{
              fontSize: 14,
              scrollBeyondLastLine: false,
              minimap: {
                enabled: false,
              },
              scrollbar: {
                verticalScrollbarSize: 6,
                horizontalScrollbarSize: 6,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
