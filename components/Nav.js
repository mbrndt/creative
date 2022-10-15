import React from "react";
import Link from "next/link";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Nav() {
  const [user, loading] = useAuthState(auth);
  return (
    <nav className="flex justify-between items-center py-10 ">
      <Link href="/">
        <button className="text-xl font-medium">Creative Minds</button>
      </Link>
      <ul className="flex items-centeer gap-10">
        {!user && (
          <Link href="/auth/login">
            <a className="py-2 px-4 text-sm bg-teal-600 text-white rounded-lg font-medium ml-8">
              Join Now
            </a>
          </Link>
        )}
        {user && (
          <div className="flex items-center gap-6">
            <Link href="/post">
              <button className="font-medium bg-teal-800 text-white py-2 px-4 rounded-lg text-small">
                Post
              </button>
            </Link>
            <Link href="/dashboard">
              <img
                className="w-12 rounded-full cursor-pointer"
                src={user.photoURL}
                alt="user photo"
              />
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
