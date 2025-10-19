import Image from "next/image";
import logo from '../../public/asset/logo.png'
export default function Logo() {
  return (
    <Image
      src={logo}
      alt="safin"
      height={60}
      width={60}
      className="rounded-full p-[1px] border"
    />
  )
}
