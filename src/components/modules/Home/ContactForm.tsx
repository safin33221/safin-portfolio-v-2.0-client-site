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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const form = e.currentTarget
        const name = (form.elements.namedItem("name") as HTMLInputElement).value
        const email = (form.elements.namedItem("email") as HTMLInputElement).value
        const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value

        const info = {
            from_name: name,
            to_name: "Safayet Hossan Safin",
            from_email: email,
            to_email: "safin33221@gmail.com",
            message,
        }

        emailjs
            .send(
                process.env.VITE_EmailJs_service_Id as string,
                process.env.VITE_EmailJs_templete_Id as string,
                info,
                process.env.VITE_EmailJs_public_key
            )
            .then((res) => {
                if (res.text === "OK") {
                    setLoading(false)
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Thank you ${name}. I’ll get back to you soon 🚀`,
                        showConfirmButton: false,
                        timer: 2000,
                    })
                    form.reset()
                }
            })
    }

    return (
        <section
            id="contact"
            className="w-full py-20 bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white"
        >
            <div className="max-w-7xl mx-auto px-4 md:px-10 grid md:grid-cols-2 gap-12 items-center">
                {/* Left Side - Info */}
                <div className="space-y-6">
                    <h2 className="text-4xl font-extrabold bg-gradient-to-r from-purple-300 via-purple-400 to-purple-600 bg-clip-text text-transparent">
                        Let’s Work Together
                    </h2>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        💡 Have a project in mind? Whether it’s web development, design, or
                        collaboration — I’d love to hear about it.
                    </p>

                    <div className="space-y-3">
                        <p className="flex items-center text-gray-300 hover:text-purple-400 text-xl cursor-pointer transition">
                            <MdEmail className="text-cyan-500-400 mr-2" /> safin33221@gmail.com
                        </p>
                        <p className="flex items-center text-gray-300 hover:text-purple-400 text-xl cursor-pointer transition">
                            <MdAddIcCall className="text-blue-400 mr-2" /> +8801837429636
                        </p>
                        <p className="flex items-center text-gray-300 hover:text-purple-400 text-xl cursor-pointer transition">
                            <FaLinkedinIn className="text-purple-400 mr-2" /> Safayet Hossan Safin
                        </p>
                        <p className="flex items-center text-gray-300 hover:text-purple-400 text-xl cursor-pointer transition">
                            <FaGithub className="text-pink-400 mr-2" /> safin33221
                        </p>
                        <p className="flex items-center text-gray-300 hover:text-purple-400 text-xl cursor-pointer transition">
                            <FaLocationDot className="text-emerald-400 mr-2" /> Chittagong,
                            Bangladesh
                        </p>
                    </div>
                </div>

                {/* Right Side - Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white/5 border border-gray-700 p-8 rounded-2xl shadow-xl backdrop-blur-lg space-y-5 hover:border-purple-500/50 transition"
                >
                    <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent">
                        📬 Send Me a Message
                    </h3>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-300">
                            Your Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            required
                            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-inner"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-300">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-inner"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-300">
                            Your Message
                        </label>
                        <textarea
                            name="message"
                            rows={4}
                            required
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
