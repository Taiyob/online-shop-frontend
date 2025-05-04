"use client";

/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import SocialLogin from "./SocialLogin";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { doCredentialLogin } from "@/app/actions";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      console.log("Formdata:", Object.fromEntries(formData.entries()));

      const response = await doCredentialLogin(formData);
      console.log("Response:", response);

      if (response?.ok) {
        router.refresh();
        router.push("/home");
        toast.success("Logged in Successful! 🎉");
      } else {
        console.log("Login failed:", response);
        setErr("Invalid email or password");
        toast.error(`Error: ${response}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        `Network error! Please check your internet connection... ${error}`
      );
      throw new Error("Data not found");
    }
  }

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   try {
  //     const result = await fetch(
  //       `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/login-super-admin`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           email,
  //           password,
  //         }),
  //         credentials: "include",
  //       }
  //     );
  //     const user = await result.json();
  //     console.log(user);
  //     if (result.status === 200) {
  //       toast.success("Logged in Successful! 🎉");
  //       setEmail("");
  //       setPassword("");
  //       router.push("/");
  //     } else {
  //       const data = await result.json();
  //       if (data?.error?.code === "P2002") {
  //         toast.error("Username Or Password is incorrect.");
  //       } else {
  //         toast.error("Something went wrong! Please try again.");
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Network error! Please check your internet connection.");
  //   }
  // };

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center bg-gradient-to-b from-[#f1f4f9] to-[#81a3bc] font-[Poppins]">
      {/* Blurred Colors */}
      <div className="absolute top-[-350px] w-[600px] h-[600px] bg-[#ff6b35] blur-[150px]" />
      <div className="absolute bottom-[-150px] left-[100px] w-[500px] h-[500px] bg-[#a4a255] blur-[150px]" />
      <div className="absolute bottom-[50px] left-[100px] w-[300px] h-[300px] bg-[#0292b3] blur-[150px]" />

      {/* Animated Squares */}
      <div className="relative">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`absolute backdrop-blur-sm border border-white/50 border-r-white/20 border-b-white/20 bg-white/10 rounded-[10px] animate-floating`}
            style={{
              animationDelay: `${-1 * i}s`,
              top:
                i === 0
                  ? "-50px"
                  : i === 1
                  ? "150px"
                  : i === 2
                  ? "auto"
                  : i === 3
                  ? "auto"
                  : "-80px",
              right: i === 0 ? "-60px" : i === 2 ? "-60px" : "auto",
              bottom: i === 2 ? "50px" : i === 3 ? "-80px" : "auto",
              left:
                i === 1
                  ? "-100px"
                  : i === 3
                  ? "100px"
                  : i === 4
                  ? "140px"
                  : "auto",
              width:
                i === 0
                  ? "100px"
                  : i === 1
                  ? "120px"
                  : i === 2
                  ? "80px"
                  : i === 3
                  ? "50px"
                  : "60px",
              height:
                i === 0
                  ? "100px"
                  : i === 1
                  ? "120px"
                  : i === 2
                  ? "80px"
                  : i === 3
                  ? "50px"
                  : "60px",
              zIndex: [1, 2].includes(i) ? 2 : 1,
            }}
          />
        ))}

        {/* Login Container */}
        <div className="relative w-[400px] min-h-[400px] bg-white/10 backdrop-blur-md rounded-[10px] border border-white/50 border-r-white/20 border-b-white/20 shadow-[0_25px_45px_rgba(0,0,0,0.1)] flex justify-center items-center">
          <div className="p-10 w-full">
            <h2 className="relative text-white text-2xl font-semibold tracking-wide mb-10">
              Login Form
              <span className="absolute left-0 -bottom-2 w-20 h-1 bg-white"></span>
            </h2>
            <form onSubmit={onSubmit}>
              <div className="mt-5">
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-2 bg-white/20 text-white placeholder-white text-base rounded-full border border-white/50 border-r-white/20 border-b-white/20 outline-none shadow-[0_5px_15px_rgba(0,0,0,0.05)]"
                />
              </div>
              <div className="mt-5">
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-2 bg-white/20 text-white placeholder-white text-base rounded-full border border-white/50 border-r-white/20 border-b-white/20 outline-none shadow-[0_5px_15px_rgba(0,0,0,0.05)]"
                />
              </div>
              {err && <p className="text-red-500">{err}</p>}
              <div className="mt-5">
                <button
                  type="submit"
                  className="flex items-center justify-center w-full gap-2 px-4 py-2 mt-5 backdrop-blur-md text-gray-700 bg-white border border-white/50 border-r-white/20 border-b-white/20 rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.05)] hover:bg-white/70 transition cursor-pointer font-semibold text-base"
                >
                  Login
                </button>
              </div>
              <p className="text-white text-sm mt-2">
                Forget Password?{" "}
                <a href="#" className="underline">
                  Click Here
                </a>
              </p>
              <p className="text-white text-sm mt-2">
                Don't have an account?{" "}
                <Link href="/register" className="underline">
                  Sign up
                </Link>
              </p>
            </form>
            <SocialLogin />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes floating {
          0%,
          100% {
            transform: translateY(-40px);
          }
          50% {
            transform: translateY(40px);
          }
        }

        .animate-floating {
          animation: floating 10s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LoginForm;
