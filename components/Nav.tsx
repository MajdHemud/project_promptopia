"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  navOpacityVariants,
  opacityVariants,
} from "@utils/framerMotion/variants";
import { useRouter } from "next/navigation";
import { useStore } from "@utils/store/store";

function Nav() {
  const { data: session, status } = useSession();
  const { userInfo, clearUserInfo } = useStore();
  const router = useRouter();

  const [toggleDropdown, setToggleDropdown] = useState(false);

  const passageSignOut = async () => {
    const signOutResponse = await fetch("/api/auth/passageAuth/signOut");
    const data = await signOutResponse.json();
    if (data.success) {
      clearUserInfo();
      router.refresh();
    }
  };

  return (
    <motion.nav
      variants={navOpacityVariants}
      initial="hidden"
      animate="show"
      className="flex-between w-full mb-16 pt-3"
    >
      <motion.div key="logo" variants={opacityVariants}>
        <Link href="/" className="flex gap-2 flex-center">
          <Image
            src="/assets/images/logo.svg"
            alt="Promptopia Logo"
            width={30}
            height={30}
            className="object-contain"
          />
          <p className="logo_text">Promptopia</p>
        </Link>
      </motion.div>
      {/* Desktop Navigation */}
      <motion.div
        key="desktopNavigation"
        variants={opacityVariants}
        className="sm:flex hidden"
      >
        {(session?.user && status === "authenticated") ||
        userInfo?.isAuthorized ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="purple_gradient_btn">
              Create Post
            </Link>

            <button
              type="button"
              className="outline_btn"
              onClick={() => {
                setToggleDropdown(false);
                if (session?.user) {
                  signOut();
                }
                if (userInfo?.isAuthorized) {
                  console.log(
                    "🚀 ~ file: Nav.tsx:165 ~ Nav ~ userInfo.isAuthorized:",
                    userInfo.isAuthorized
                  );
                  passageSignOut();
                }
              }}
            >
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={
                  session?.user?.image ||
                  userInfo?.image ||
                  "/assets/images/logo.svg"
                }
                alt="Profile"
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : null}
        {!session?.user &&
        status === "unauthenticated" &&
        !userInfo?.isAuthorized ? (
          <Link href="/auth/signIn">
            <button type="button" className="outline_btn">
              Sign In
            </button>
          </Link>
        ) : null}
      </motion.div>

      {/* Mobile Navigation */}
      <motion.div
        key="mobileNavigation"
        variants={opacityVariants}
        className="sm:hidden flex relative"
      >
        {session?.user || userInfo?.isAuthorized ? (
          <div className="flex">
            <Image
              src={session?.user?.image || "/assets/images/logo.svg"}
              alt="Profile"
              width={37}
              height={37}
              className="rounded-full cursor-pointer"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    if (session?.user) {
                      signOut();
                    }
                    if (userInfo?.isAuthorized) {
                      console.log(
                        "🚀 ~ file: Nav.tsx:165 ~ Nav ~ userInfo.isAuthorized:",
                        userInfo.isAuthorized
                      );
                      passageSignOut();
                    }
                  }}
                  className="mt-5 w-full outline_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-3 md:gap-5">
            <Link href="/auth/signIn">
              <button type="button" className="outline_btn">
                Sign In
              </button>
            </Link>
          </div>
        )}
      </motion.div>
    </motion.nav>
  );
}

export default Nav;
