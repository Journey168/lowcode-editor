import { Form, Input, Select } from "antd";
import { useEffect } from "react";
import {
  ComponentConfig,
  ComponentSetter,
  useComponentConfigStore,
} from "../../stores/component-config";
import { useComponetsStore } from "../../stores/components";

export default function ComponentAttr() {
  const { curComponent, curComponentId, updateComponentProps } =
    useComponetsStore();
  const { componentConfig } = useComponentConfigStore();
  const [form] = Form.useForm();

  useEffect(() => {
    const data = form.getFieldsValue();
    form.setFieldsValue({ ...data, ...curComponent?.props });
  }, [curComponent]);

  const renderFormElement = (setting: ComponentSetter) => {
    const { type, options } = setting;
    if (type === "select") {
      return <Select options={options} />;
    } else if (type === "input") {
      return <Input />;
    }
  };

  const valuesChange = (changeValues: ComponentConfig) => {
    if (curComponentId) {
      updateComponentProps(curComponentId, changeValues);
    }
  };

  if (!curComponentId || !curComponent) return null;

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
      {componentConfig[curComponent.name]?.setter?.map((item) => (
        <Form.Item key={item.name} name={item.name} label={item.label}>
          {renderFormElement(item)}
        </Form.Item>
      ))}
    </Form>
  );
}
