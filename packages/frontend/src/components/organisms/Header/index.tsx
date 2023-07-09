import Image from "next/image";
import Link from "next/link";

interface Props {
  readonly sidebarOpen: boolean;
  readonly handleSidebarOpen?: () => void;
}

export function Header({ sidebarOpen = true, handleSidebarOpen }: Props) {
  return (
    <nav className="bg-emerald-400 dark:bg-emerald-700 shadow-lg text-slate-100">
      <div className="px-8 mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-[64px]">
          <div className=" flex items-center">
            <Link
              className="flex-shrink-0 flex items-center gap-2 md:gap-4"
              href="/"
            >
              <Image src="/icon.png" alt="Workflow" width={30} height={30} />
              <span className="text-slate-50 font-semibold text-xl">
                Manage
              </span>
            </Link>
            <div className="hidden md:block">
              <div className="flex ml-10 space-x-4 items-center">
                <Link
                  className="hover:text-slate-50 hover:underline hover:font-semibold px-3 py-2 rounded-md text-sm font-medium"
                  href="https://github.com/gonzaemon111"
                  target="_blank"
                >
                  Github
                </Link>
                <Link
                  className="hover:text-slate-50 hover:underline hover:font-semibold px-3 py-2 rounded-md text-sm font-medium"
                  href="https://qiita.com"
                  target="_blank"
                >
                  Qiita
                </Link>
                <Link
                  className="hover:text-slate-50 hover:underline hover:font-semibold px-3 py-2 rounded-md text-sm font-medium"
                  href="https://zenn.dev"
                  target="_blank"
                >
                  Zenn
                </Link>
              </div>
            </div>
          </div>
          <div className="block">
            <div className="flex items-center ml-4 md:ml-6"></div>
          </div>
          <div className="flex -mr-2 md:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
              onClick={handleSidebarOpen}
            >
              <svg
                width="16"
                height="16"
                fill="currentColor"
                className="w-7 h-7"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            className="text-gray-100 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            href="/#"
          >
            Home
          </Link>
          <Link
            className="text-gray-800 dark:text-white block px-3 py-2 rounded-md text-base font-medium"
            href="/#"
          >
            Gallery
          </Link>
          <Link
            className="text-gray-100 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            href="/#"
          >
            Content
          </Link>
          <Link
            className="text-gray-100 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            href="/#"
          >
            Contact
          </Link>
        </div>
      </div> */}
    </nav>
  );
}
