import dynamic from "next/dynamic";
import { Processes } from "./types";

const directory: Processes = {
  test: {
    Component: dynamic(
      () => import("../../components/use-window/components/TestComponent")
    ),
    allowResizing: false,
    backgroundColor: "gray",
    defaultSize: {
      height: 480,
      width: 640,
    },
    // icon: "/System/Icons/boxedwine.webp",
    // libs: [
    //   "/Program Files/BoxedWine/browserfs.boxedwine.js",
    //   "/Program Files/BoxedWine/jszip.min.js",
    //   "/Program Files/BoxedWine/boxedwine-shell.js",
    //   "/Program Files/BoxedWine/boxedwine.js",
    // ],
    lockAspectRatio: true,
    singleton: true,
    title: "BoxedWine",
  },
};

export default directory;
