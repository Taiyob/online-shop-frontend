/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

//import { Button, Input } from "@nextui-org/react";
import React from "react";
import SocialLogin from "./SocialLogin";
import { Link } from "@nextui-org/react";
//import { useRouter } from "next/navigation";

const RegistrationForm = () => {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const router = useRouter();

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   try {
  //     const result: any = await fetch("/api/register", {
  //       method: "POST",
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //       body: JSON.stringify({ name, email, password }),
  //     });

  //     if (result.status === 201) {
  //       router.push("/");
  //     }
  //   } catch (error) {
  //     console.log(error);
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
              Registration Form
              <span className="absolute left-0 -bottom-2 w-20 h-1 bg-white"></span>
            </h2>
            <form>
              <div className="mt-5">
                <input
                  type="text"
                  placeholder="username"
                  className="w-full px-5 py-2 bg-white/20 text-white placeholder-white text-base rounded-full border border-white/50 border-r-white/20 border-b-white/20 outline-none shadow-[0_5px_15px_rgba(0,0,0,0.05)]"
                />
              </div>
              <div className="mt-5">
                <input
                  type="submit"
                  value="Register"
                  className="w-full max-w-[100px] px-5 py-2 bg-white text-gray-700 font-semibold rounded-full cursor-pointer"
                />
              </div>
              <p className="text-white text-sm mt-2">
                Already have an account?{" "}
                <Link href="/login" className="underline">
                  Sign in
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
    // <>
    //   <form
    //     onSubmit={handleSubmit}
    //     className="my-5 flex flex-col items-center border p-3 border-gray-200 rounded-md"
    //   >
    //     <div className="my-2">
    //       <label htmlFor="name">Name</label>
    //       <Input
    //         className="border mx-2 border-gray-500 rounded"
    //         type="name"
    //         name="name"
    //         id="name"
    //         value={name}
    //         onChange={(e) => setName(e.target.value)}
    //       />
    //     </div>
    //     <div className="my-2">
    //       <label htmlFor="email">Email Address</label>
    //       <Input
    //         className="border mx-2 border-gray-500 rounded"
    //         type="email"
    //         name="email"
    //         id="email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //       />
    //     </div>
    //     <div className="my-2">
    //       <label htmlFor="password">Password</label>
    //       <Input
    //         className="border mx-2 border-gray-500 rounded"
    //         type="password"
    //         name="password"
    //         id="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //     </div>
    //     {/* {err && <p className="text-red-500">{err}</p>} */}
    //     <Button
    //       type="submit"
    //       className="bg-orange-300 mt-4 rounded flex justify-center items-center w-36"
    //     >
    //       Register
    //     </Button>
    //   </form>
    //   <div className="flex justify-center items-center">
    //     <SocialLogin></SocialLogin>
    //   </div>
    // </>
  );
};

export default RegistrationForm;
