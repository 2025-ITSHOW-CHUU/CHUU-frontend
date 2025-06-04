import { createPortal } from "react-dom";

const ModalPortal = function (props: any) {
  const modalArea = document.getElementById("modal")!;
  return createPortal(props.children, modalArea);
};

export default ModalPortal;
