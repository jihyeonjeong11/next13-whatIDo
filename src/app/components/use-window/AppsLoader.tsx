import { useProcesses } from "@/app/contexts/process";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { memo } from "react";
import RenderComponent from "./RenderComponent";

// const RenderComponent = dynamic(
//     () => import("./RenderComponent")
// )

const AppsLoader: FC = () => {
  const { processes = {} } = useProcesses();


  return (
    <AnimatePresence initial={false} presenceAffectsLayout={false}>
      {Object.entries(processes).map(([id, {Component}]) => //closing, hasWindow
      
        id &&
        Component &&
        (
          <RenderComponent key={id} Component={Component} id={id} />
        )
      )}

    </AnimatePresence>
  )
}

export default AppsLoader