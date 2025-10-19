export default function Footer() {
  return (
    <footer className="w-full py-4 bg-purple-300/10  text-center text-sm text-gray-300 border-t border-purple-200 ">
      © {new Date().getFullYear()} Safin. All rights reserved.
    </footer>
  );
}
