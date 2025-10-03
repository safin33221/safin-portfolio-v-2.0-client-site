import Image from "next/image";
import logo from '../../public/asset/logo.png'
export default function Logo() {
  return (
    <Image
      src={logo}
      alt="safin"
      height={50}
      width={50}
      className="rounded-full p-2"
    />
  )
}
