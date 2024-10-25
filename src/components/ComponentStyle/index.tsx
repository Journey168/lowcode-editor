import { Form, Input, InputNumber, Select } from "antd";
import { debounce } from "lodash-es";
import { CSSProperties, useEffect, useState } from "react";
import styleToObject from "style-to-object";
import {
  ComponentSetter,
  useComponentConfigStore,
} from "../../stores/component-config";
import { useComponetsStore } from "../../stores/components";
import CssEditor from "../Setting/CssEditor";

export default function ComponentStyle() {
  const { curComponent, curComponentId, updateComponentStyles } =
    useComponetsStore();
  const { componentConfig } = useComponentConfigStore();
  const [form] = Form.useForm();
  // 样式编辑区域样式
  const [css, setCss] = useState(".comp{\n\n}");

  useEffect(() => {
    // 切换选中组件时重置样式表单
    form.resetFields();
    // 初始化组件样式表单
    const data = form.getFieldsValue();
    form.setFieldsValue({ ...data, ...curComponent?.styles });
    // 初始化组件样式编辑器
    setCss(toCSSStr(curComponent?.styles!));
  }, [curComponent]);

  function toCSSStr(css: Record<string, any>) {
    let str = `.comp {\n`;
    for (let key in css) {
      let value = css[key];
      if (!value) {
        continue;
      }
      if (
        ["width", "height"].includes(key) &&
        !value.toString().endsWith("px")
      ) {
        value += "px";
      }

      str += `\t${key}: ${value};\n`;
    }
    str += `}`;
    return str;
  }

  const renderFormElement = (setting: ComponentSetter) => {
    const { type, options } = setting;
    if (type === "select") {
      return <Select options={options} />;
    } else if (type === "input") {
      return <Input />;
    } else if (type === "inputNumber") {
      return <InputNumber />;
    }
  };

  const valuesChange = (changeValues: CSSProperties) => {
    if (curComponentId) {
      updateComponentStyles(curComponentId, changeValues);
    }
  };

  // 未选中返回null
  if (!curComponentId || !curComponent) return null;

  const handleEditorChange = debounce((value) => {
    setCss(value);

    let css: Record<string, any> = {};
    try {
      const cssStr = value
        .replace(/\/\*.*\*\//, "") // 去掉注释 /** */
        .replace(/(\.?[^{]+{)/, "") // 去掉 .comp {
        .replace("}", ""); // 去掉 }

      styleToObject(cssStr, (name, value) => {
        css[
          name.replace(/-\w/, (item) => item.toUpperCase().replace("-", ""))
        ] = value;
      });

      updateComponentStyles(
        curComponentId,
        { ...form.getFieldsValue(), ...css },
        true
      );
    } catch (e) {}
  }, 500);

  return (
    <Form
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 14 }}
      onValuesChange={valuesChange}
    >
      <Form.Item label="组件id">
        <Input value={curComponent?.id} disabled />
      </Form.Item>
      <Form.Item label="组件名称">
        <Input value={curComponent?.name} disabled />
      </Form.Item>
      <Form.Item label="组件描述">
        <Input value={curComponent?.desc} disabled />
      </Form.Item>
      {componentConfig[curComponent.name]?.stylesSetter?.map((item) => (
        <Form.Item key={item.name} name={item.name} label={item.label}>
          {renderFormElement(item)}
        </Form.Item>
      ))}
      <div className="h-[200px] border-[1px] border-[#ccc]">
        <CssEditor value={css} onChange={handleEditorChange} />
      </div>
    </Form>
  );
}
