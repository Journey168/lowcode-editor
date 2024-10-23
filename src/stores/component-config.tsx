import { create } from "zustand";
import Page from "../materials/Page";
import Container from "../materials/Container";
import Button from "../materials/Button";

export interface ComponentConfig {
  name: string;
  desc: string;
  defaultProps: Record<string, any>;
  component: any;
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
      component: Page,
    },
    Container: {
      name: "Container",
      desc: "容器",
      defaultProps: {},
      component: Container,
    },
    Button: {
      name: "Button",
      desc: "按钮",
      defaultProps: {
        type: "primary",
        text: "按钮",
      },
      component: Button,
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
