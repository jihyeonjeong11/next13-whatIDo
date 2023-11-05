"use client";

import { ErrorBoundary } from "@/app/components/common/ErrorBoundary";
import ComponentError from "@/app/components/use-window/ComponentError";
import dynamic from "next/dynamic";
import { memo } from "react";

const Window = dynamic(
  () => import("@/app/components/use-window/window/index")
);

export type ComponentProcessProps = {
  id: string;
};

type RenderComponentProps = {
  Component: React.ComponentType<ComponentProcessProps>;
  hasWindow?: boolean;
  id: string;
};

const RenderComponent: FC<RenderComponentProps> = ({
  Component,
  hasWindow = true,
  id,
}) => {
  console.log(id);
  const SafeComponent = (
    <ErrorBoundary FallbackRender={<>123123</>}>
      <Component id={id} />
    </ErrorBoundary>
  );

  return hasWindow ? <Window id={id}>{SafeComponent}</Window> : SafeComponent;
};

export default memo(RenderComponent);
