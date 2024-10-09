declare module "react-syntax-highlighter" {
  import { ComponentType } from "react";

  export const Prism: ComponentType<any>;
  export const Light: ComponentType<any>;
}

declare module "react-syntax-highlighter/dist/cjs/styles/prism" {
  export const dracula: any;
}
