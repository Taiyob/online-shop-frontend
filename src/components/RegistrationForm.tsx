"use client";

import React, { useState } from "react";
import SocialLogin from "./SocialLogin";
import { Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { Select, SelectItem } from "@nextui-org/react";

const genderOptions = [
  { key: "MALE", label: "MALE" },
  { key: "FEMALE", label: "FEMALE" },
  { key: "OTHER", label: "OTHER" },
];

const RegistrationForm = () => {
  const [fullName, setFullName] = useState("");
  const [user_name, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("file", image as Blob);
      formData.append(
        "data",
        JSON.stringify({
          user_name: user_name,
          password,
          profile: {
            fullName,
            email,
            phone,
            gender: selectedGender,
          },
          address: {},
        })
      );

      const result = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/user/create-user`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (result.status === 200) {
        toast.success("Registration Successful! 🎉");
        setFullName("");
        setuserName("");
        setEmail("");
        setPassword("");
        setPhone("");
        setImage(null);
        setImagePreview(null);
        router.push("/");
      } else {
        const data = await result.json();
        if (data?.error?.code === "P2002") {
          toast.error("Username already taken! Please try another one.");
        } else {
          toast.error("Something went wrong! Please try again.");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Network error! Please check your internet connection.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

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

        {/* Register Container */}
        <div className="relative w-[500px] min-h-[400px] bg-white/10 backdrop-blur-md rounded-[10px] border border-white/50 border-r-white/20 border-b-white/20 shadow-[0_25px_45px_rgba(0,0,0,0.1)] flex justify-center items-center">
          <div className="p-10 w-full">
            <h2 className="relative text-white text-2xl font-semibold tracking-wide mb-10">
              Registration Form
              <span className="absolute left-0 -bottom-2 w-20 h-1 bg-white"></span>
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mt-5">
                <input
                  type="text"
                  placeholder="full name"
                  name="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-5 py-2 bg-white/20 text-white placeholder-white text-base rounded-full border border-white/50 border-r-white/20 border-b-white/20 outline-none shadow-[0_5px_15px_rgba(0,0,0,0.05)]"
                  required
                />
              </div>

              <div className="mt-5">
                <input
                  type="text"
                  placeholder="username"
                  name="user_name"
                  value={user_name}
                  onChange={(e) => setuserName(e.target.value)}
                  className="w-full px-5 py-2 bg-white/20 text-white placeholder-white text-base rounded-full border border-white/50 border-r-white/20 border-b-white/20 outline-none shadow-[0_5px_15px_rgba(0,0,0,0.05)]"
                  required
                />
              </div>

              <div className="mt-5">
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-2 bg-white/20 text-white placeholder-white text-base rounded-full border border-white/50 border-r-white/20 border-b-white/20 outline-none shadow-[0_5px_15px_rgba(0,0,0,0.05)]"
                  required
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
                  required
                />
              </div>

              <div className="mt-5">
                <input
                  type="text"
                  placeholder="Phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-5 py-2 bg-white/20 text-white placeholder-white text-base rounded-full border border-white/50 border-r-white/20 border-b-white/20 outline-none shadow-[0_5px_15px_rgba(0,0,0,0.05)]"
                  required
                />
              </div>

              <div className="mt-5">
                <Select
                  variant="bordered"
                  radius="full"
                  size="md"
                  placeholder="Select Gender"
                  name="gender"
                  selectedKeys={selectedGender ? [selectedGender] : []}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys as Set<string>)[0]; // 🔥 eta cast korte hobe
                    setSelectedGender(selected);
                  }}
                  classNames={{
                    base: "w-full",
                    trigger: `
      w-full
      px-5 py-2
      bg-white/20 backdrop-blur-md
      text-white text-base
      rounded-full
      border border-white/50 border-r-white/20 border-b-white/20
      outline-none
      shadow-[0_5px_15px_rgba(0,0,0,0.05)]
      flex items-center justify-between
    `,
                    value: "text-white",
                    popoverContent: `
      bg-white/20 backdrop-blur-md
      rounded-xl border border-white/30
      shadow-lg mt-2
    `,
                    listbox: "p-0 text-white",
                  }}
                  required
                >
                  {genderOptions.map(({ key, label }) => (
                    <SelectItem
                      key={key}
                      value={key}
                      className="px-5 py-2 hover:bg-white/30 text-white"
                    >
                      {label}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="photo"
                  className="w-20 h-20 mx-auto flex items-center justify-center bg-white/20 border border-white/50 rounded-full cursor-pointer"
                >
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      width={80} // 20 * 4 = 80px
                      height={80}
                      className="object-cover rounded-full"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mb-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 7h2l2-3h10l2 3h2a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V9a2 2 0 012-2z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 11a3 3 0 100 6 3 3 0 000-6z"
                        />
                      </svg>
                      <span className="text-xs">Upload</span>
                    </div>
                  )}
                </label>

                <input
                  id="photo"
                  name="photo"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>

              <div className="mt-5">
                <button
                  type="submit"
                  className="flex items-center justify-center w-full gap-2 px-4 py-2 mt-5 backdrop-blur-md text-gray-700 bg-white border border-white/50 border-r-white/20 border-b-white/20 rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.05)] hover:bg-white/70 transition cursor-pointer font-semibold text-base"
                >
                  Register
                </button>
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
  );
};

export default RegistrationForm;
