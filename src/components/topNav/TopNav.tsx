import { useSession } from "next-auth/react";
import Link from "next/link";
import { ImPacman } from "react-icons/im";

export const TopNav = () => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between border-b-2 border-gray-100 py-2">
      <div className="flex items-center">
        <Link href="/" className="flex items-center text-2xl text-indigo-600">
          <ImPacman />
          &nbsp;T3witter
        </Link>
      </div>
      <div className="flex items-center">
        {!session ? (
          <Link href="/api/auth/signin">Sign in</Link>
        ) : (
          <Link href="/api/auth/signout">Logout</Link>
        )}
      </div>
    </div>
  );
};
