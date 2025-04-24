/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f1f4f9] to-[#81a3bc] text-white font-[Poppins] relative overflow-hidden">
      {/* Blurred Colors */}
      <div className="absolute top-[-350px] w-[600px] h-[600px] bg-[#ff6b35] blur-[150px]" />
      <div className="absolute bottom-[-150px] left-[100px] w-[500px] h-[500px] bg-[#a4a255] blur-[150px]" />
      <div className="absolute bottom-[50px] left-[100px] w-[300px] h-[300px] bg-[#0292b3] blur-[150px]" />

      {/* Hero Section */}
      <div className="flex flex-col justify-center items-center text-center px-6 pt-24 pb-12 relative z-10">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Welcome to QuickAccess
        </h1>
        <p className="text-lg sm:text-xl max-w-xl mb-6">
          Fast and secure login for your favorite services. Experience the
          modern way of authentication.
        </p>
        <Link
          href="#login"
          className="bg-white text-gray-800 px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition"
        >
          Get Started
        </Link>
      </div>

      {/* Features Section */}
      <div className="mt-20 px-6 text-center relative z-10">
        <h2 className="text-2xl font-semibold mb-6">Why Choose Us?</h2>
        <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/30 shadow-lg">
            <h3 className="text-xl font-medium mb-2">Secure</h3>
            <p>
              Top-level authentication system built with OAuth and JWT for
              ultimate protection.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/30 shadow-lg">
            <h3 className="text-xl font-medium mb-2">User Friendly</h3>
            <p>
              Clean, intuitive UI so users don’t get lost — just sign in and go.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/30 shadow-lg">
            <h3 className="text-xl font-medium mb-2">Multiple Options</h3>
            <p>
              Log in with your username, Google, or GitHub – it's up to you.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-white/80 py-10 mt-20 relative z-10">
        &copy; {new Date().getFullYear()} QuickAccess. All rights reserved.
      </footer>
    </div>
  );
}

// node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
// https://generate-secret.vercel.app/32
