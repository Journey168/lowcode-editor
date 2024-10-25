import { Segmented } from "antd";
import { useState } from "react";
import Material from "../Material";
import Outline from "../Outline";
import Source from "../Source";

export default function MaterialWrapper() {
  const [key, setKey] = useState<string>("物料");
  return (
    <div>
      <Segmented
        value={key}
        options={["物料", "大纲", "源码"]}
        block
        onChange={setKey}
      />
      <div className="pt-[20px] h-[calc(100vh-60px-30px-20px)]">
        {key === "物料" && <Material />}
        {key === "大纲" && <Outline />}
        {key === "源码" && <Source />}
      </div>
    </div>
  );
}