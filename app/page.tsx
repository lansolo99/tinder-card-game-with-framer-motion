"use client";
import Image from "next/image";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";

import { BgPattern, Button } from "@/components/ui";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen h-full mx-auto bg-gameSwipe-neutral">
      <BgPattern />
      <AnimatePresence mode="wait">
        <motion.div
          className={`relative z-10 flex p-5 min-h-screen h-full flex-col items-center justify-center bg-gameSwipe.neutral text-gray-700 text-center`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { duration: 1, ease: cubicBezier(0.16, 1, 0.3, 1) },
          }}
          exit={{
            opacity: 0,
            transition: { duration: 0.2, ease: cubicBezier(0.7, 0, 0.84, 0) },
          }}
        >
          <div
            id="illustration"
            className="w-full mx-auto max-w-[375px] aspect-[750/478] relative"
          >
            <Image
              priority
              className={`absolute object-cover`}
              src="/images/game-intro.png"
              fill
              sizes={`(max-width: 768px) 100vw, 250px`}
              alt="quiz box"
            />
          </div>
          <h1 className="text-5xl md:text-[60px] leading-none font-acuminMedium">
            Welcome!
          </h1>
          <p className="text-2xl text-gray-800/70">
            Swipe left or right to answer the questions.
          </p>
          <motion.div className="mt-8" whileTap={{ scale: 0.9 }}>
            <Button
              asChild
              className="bg-blue-500 text-[20px] font-acuminMedium uppercase px-8 pt-6 pb-5 text-white"
            >
              <Link href="/game">Start</Link>
            </Button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
