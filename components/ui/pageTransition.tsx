"use client";

import { PropsWithChildren, useContext, useRef } from "react";
import { AnimatePresence, motion, cubicBezier } from "framer-motion";
import { usePathname } from "next/navigation";
//import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context";

// export function useLayoutRouterContext() {
//   return useContext(LayoutRouterContext);
// }

// function FrozenRouter(props: PropsWithChildren<{}>) {
//   const context = useLayoutRouterContext();
//   const frozen = useRef(context).current;

//   return (
//     <LayoutRouterContext.Provider value={frozen}>
//       {props.children}
//     </LayoutRouterContext.Provider>
//   );
// }

const PageTransition = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const min = 100000;
  const max = 999999;
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${pathname}${randomNumber}`}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: 0.5, ease: cubicBezier(0.65, 0, 0.35, 1) },
        }}
        exit={{
          opacity: 0,
          transition: {
            duration: 0,
            ease: "easeOut",
          },
        }}
        className="bg-cyan-600"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
