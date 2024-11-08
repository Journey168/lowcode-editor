import { create } from "zustand";
import PageDev from "../materials/Page/dev";
import PageProd from "../materials/Page/prod";
import ContainerDev from "../materials/Container/dev";
import ContainerProd from "../materials/Container/prod";
import ButtonDev from "../materials/Button/dev";
import ButtonProd from "../materials/Button/prod";
import ModalDev from "../materials/Modal/dev";
import ModdalProd from "../materials/Modal/prod";

export interface ComponentSetter {
  name: string; // 字段名
  label: string; // 字段名的文案
  type: string; // 表单类型
  [key: string]: any;
}
export interface ComponentEvent {
  name: string; // 字段名
  label: string; // 字段名的文案
}
export interface ComponentMethod {
  name: string; // 字段名
  label: string; // 字段名的文案
}

export interface ComponentConfig {
  name: string;
  desc: string;
  defaultProps: Record<string, any>;
  setter?: ComponentSetter[];
  stylesSetter?: ComponentSetter[];
  events?: ComponentEvent[];
  methods?: ComponentMethod[];
  // component: any;
  dev: any;
  prod: any;
}

interface State {
  componentConfig: { [key: string]: ComponentConfig };
}

interface Action {
  registerComponent: (name: string, componentConfig: ComponentConfig) => void;
}

export const useComponentConfigStore = create<State & Action>((set) => ({
  componentConfig: {
    Page: {
      name: "Page",
      desc: "页面",
      defaultProps: {},
      dev: PageDev,
      prod: PageProd,
    },
    Container: {
      name: "Container",
      desc: "容器",
      defaultProps: {},
      dev: ContainerDev,
      prod: ContainerProd,
    },
    Button: {
      name: "Button",
      desc: "按钮",
      defaultProps: {
        type: "primary",
        text: "按钮",
      },
      setter: [
        {
          name: "type",
          label: "按钮类型",
          type: "select",
          options: [
            { label: "主按钮", value: "primary" },
            { label: "次按钮", value: "default" },
          ],
        },
        {
          name: "text",
          label: "文本",
          type: "input",
        },
      ],
      stylesSetter: [
        {
          name: "width",
          label: "宽度",
          type: "inputNumber",
        },
        {
          name: "height",
          label: "高度",
          type: "inputNumber",
        },
      ],
      events: [
        {
          name: "onClick",
          label: "点击事件",
        },
        {
          name: "onDoubleClick",
          label: "双击事件",
        },
      ],
      dev: ButtonDev,
      prod: ButtonProd,
    },
    Modal: {
      name: "Modal",
      desc: "弹窗",
      defaultProps: {
        title: "弹窗",
      },
      setter: [
        {
          name: "title",
          label: "标题",
          type: "input",
        },
      ],
      stylesSetter: [],
      events: [
        { name: "onOk", label: "确认事件" },
        { name: "onCancel", label: "取消事件" },
      ],
      methods: [
        { name: "open", label: "打开弹窗" },
        { name: "close", label: "关闭弹窗" },
      ],
      dev: ModalDev,
      prod: ModdalProd,
    },
  },
  registerComponent: (name, componentConfig) =>
    set((state) => {
      return {
        ...state,
        componentConfig: {
          ...state.componentConfig,
          [name]: componentConfig,
        },
      };
    }),
}));
