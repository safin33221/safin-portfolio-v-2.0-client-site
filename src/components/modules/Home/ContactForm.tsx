"use client"
import { MdAddIcCall, MdEmail } from "react-icons/md"
import { FaGithub, FaLinkedinIn } from "react-icons/fa"
import { FaLocationDot } from "react-icons/fa6"
import emailjs from "@emailjs/browser"
import Swal from "sweetalert2"
import { useState } from "react"
import { TbFidgetSpinner } from "react-icons/tb"

const Contact = () => {
  const [loading, setLoading] = useState(false)
  const [info, setInfo] = useState({ name: "", email: "", message: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const payload = {
      from_name: info.name,
      to_name: "Safayet Hossan Safin",
      from_email: info.email,
      to_email: "safin33221@gmail.com",
      message: info.message,
    }

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
        payload,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
      .then((res) => {
        setLoading(false)
        if (res.text === "OK") {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Thank you ${info.name}. I’ll get back to you soon 🚀`,
            showConfirmButton: false,
            timer: 2000,
          })
          setInfo({ name: "", email: "", message: "" })
        }
      })
  }

  return (
    <section
      id="contact"
      className="w-full py-20 bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-10 grid md:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div className="space-y-6">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-purple-300 via-purple-400 to-purple-600 bg-clip-text text-transparent">
            Let’s Work Together
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            💡 Have a project in mind? Whether it’s web development, design, or collaboration —
            I’d love to hear about it.
          </p>

          <div className="space-y-3">
            <p className="flex items-center text-gray-300 hover:text-purple-400 text-xl transition">
              <MdEmail className="text-cyan-400 mr-2" /> safin33221@gmail.com
            </p>
            <p className="flex items-center text-gray-300 hover:text-purple-400 text-xl transition">
              <MdAddIcCall className="text-blue-400 mr-2" /> +8801837429636
            </p>
            <p className="flex items-center text-gray-300 hover:text-purple-400 text-xl transition">
              <FaLinkedinIn className="text-purple-400 mr-2" /> Safayet Hossan Safin
            </p>
            <p className="flex items-center text-gray-300 hover:text-purple-400 text-xl transition">
              <FaGithub className="text-pink-400 mr-2" /> safin33221
            </p>
            <p className="flex items-center text-gray-300 hover:text-purple-400 text-xl transition">
              <FaLocationDot className="text-emerald-400 mr-2" /> Chittagong, Bangladesh
            </p>
          </div>
        </div>

        {/* Right */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/5 border border-gray-700 p-8 rounded-2xl shadow-xl backdrop-blur-lg space-y-5 hover:border-purple-500/50 transition"
        >
          <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent">
            📬 Send Me a Message
          </h3>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Your Name</label>
            <input
              type="text"
              name="name"
              value={info.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-inner"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Email Address</label>
            <input
              type="email"
              name="email"
              required
              value={info.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-inner"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Your Message</label>
            <textarea
              name="message"
              rows={4}
              required
              value={info.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-inner"
              placeholder="Write your message..."
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-bold bg-gradient-to-r from-purple-400 to-purple-600 hover:opacity-90 transition"
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin m-auto" />
            ) : (
              "Send Message 🚀"
            )}
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact
