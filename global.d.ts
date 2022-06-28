declare module "*.png";
declare module "*.glb";

declare module "*.svg" {
    const content: any;
    export default content;
}
interface Window {
    ethereum: any;
}
