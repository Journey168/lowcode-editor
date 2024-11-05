import { Modal as AntdModal } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { CommonComponentProps } from "../../interface";

export interface ModalRef {
  open: () => void;
  close: () => void;
}

const Modal: React.ForwardRefRenderFunction<ModalRef, CommonComponentProps> = (
  { children, title, onCancel, onOk, styles },
  ref
) => {
  const [open, setOpen] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      open: () => {
        setOpen(true);
      },
      close: () => {},
    }),
    []
  );

  return (
    <AntdModal
      title={title}
      open={open}
      style={styles}
      onCancel={() => {
        onCancel && onCancel();
        setOpen(false);
      }}
      onOk={() => {
        onOk && onOk();
        setOpen(false);
      }}
      destroyOnClose
    >
      {children}
    </AntdModal>
  );
};

export default forwardRef(Modal);
