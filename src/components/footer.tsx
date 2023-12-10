import { ContrastIcon } from "lucide-react";
import Link from "next/link";

const Footer: React.FC = () => {

  return (

    <footer className="flex h-fit w-full flex-col gap-y-10 bg-black px-5 py-10">
      {/* Footer Top */}
      <div className="w-full">
        {/* Logo Container */}
        <div className="flex w-full items-center justify-center gap-x-2">
          <ContrastIcon className="h-20 w-20 text-white" />
          <h1 className="text-3xl text-white">EXPOSURE</h1>
        </div>
      </div>

      <span className="block h-[1px] bg-[#222222]"></span>

      {/* Footer Bottom */}
      <div className="w-full px-2 md:px-4">

        <div className="flex flex-col">

          {/* Footer Legal */}
          <div className="flex w-full flex-col justify-between gap-y-10 px-1 text-xs text-[#737373] md:flex-row">

            <div className="flex flex-col gap-y-6 md:flex-row md:gap-x-10 md:gap-y-0">
              <Link href={"/"}>Terms of Use</Link>
              <Link href={"/"}>Privacy Policy</Link>
              <Link href={"/"}>Cookie Notice</Link>
              <Link href={"/"}>Cookie Settings</Link>
            </div>

            <p className="text-center">
              2023 &copy; Developed by{" "}
              <Link
                href={"https://github.com/imarcowenzel"}
                target="_blank"
                aria-label="Visit imarcowenzel's GitHub profile"
                className="text-xs text-blue-600 underline"
              >
                imarcowenzel
              </Link>{" "}
              with non-commercial porpuose.
            </p>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
