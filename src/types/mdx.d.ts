/// <reference types="next" />
/// <reference types="next/image-types/global" />

declare module "*.mdx" {
  let MDXComponent: (props: Record<string, unknown>) => JSX.Element;
  export default MDXComponent;
}
