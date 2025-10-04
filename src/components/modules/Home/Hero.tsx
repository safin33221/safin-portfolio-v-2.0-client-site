"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import myImg from "../../../../public/asset/safin.png"
import SocialLink from "@/components/shared/SocialLink"

const Hero = () => {
  return (
    <section
      id="home"
      className="w-full  min-h-screen flex flex-col justify-center px-3 md:px-16 lg:px-24 py-16"
    >
      <div className="flex flex-col-reverse md:flex-row items-center gap-14 lg:gap-20">
        {/* Left Side Content */}
        <div className="flex flex-1 gap-6 items-start">
          {/* Line Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center mt-4"
          >
            <div className="w-5 h-5 rounded-full bg-[#915eff]" />
            <div className="w-1 h-80 sm:h-96 violet-gradient" />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            className="space-y-6 lg:space-y-8"
          >
            <h1 className="font-black text-white lg:text-6xl sm:text-4xl text-3xl leading-tight">
              Hi, I&apos;m <span className="text-[#915EFF]">Safin</span>
            </h1>
            <h2 className="font-black text-transparent bg-clip-text bg-gradient-to-r from-[#915EFF] to-purple-300 lg:text-5xl sm:text-4xl text-2xl">
              Full Stack Web Developer
            </h2>
            <p className="text-2xl text-gray-200">Your Vision, My Code_</p>
            <p className="md:w-4/5 text-gray-300 capitalize text-lg leading-relaxed">
              Crafting innovative digital experiences that bring your ideas to
              life, blending creativity and functionality to build solutions
              that inspire, engage, and deliver results.
            </p>

            <div className="hidden md:block pt-4">
              <SocialLink />
            </div>
          </motion.div>
        </div>

        {/* Right Side Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="flex-1 flex justify-center"
        >
          <Image
            src={myImg}
            width={420}
            height={420}
            priority
            alt="Safin"
            className="rounded-full border-4 border-[#915eff] shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </motion.div>
      </div>

      {/* Mobile CTA Button */}
      <div className="md:hidden flex justify-center ">
        <SocialLink />
      </div>
    </section>
  )
}

export default Hero
