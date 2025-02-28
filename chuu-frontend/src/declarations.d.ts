declare module "*.module.css";
declare module "*.module.scss";
declare module "*.svg" {
  import React from "react";
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export { ReactComponent };
  export default ReactComponent;
}
