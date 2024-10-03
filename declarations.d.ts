declare module "*.png" {
  const value: any;
  export default value;
}

declare module "@env" {
  export const RAPID_API_KEY: string;
  export const CLERK_PUBLISHABLE_KEY: string;
}
