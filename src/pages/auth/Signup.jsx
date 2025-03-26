import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { errorHandler } from "../../utils/handlers";

const Signup = () => {
  useEffect(() => {
    if (localStorage.getItem("shopizioUser")) {
      navigate("/");
    }
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup, signInWithGoogle } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      errorHandler({}, "Passwords do not match.");
      return;
    }
    try {
      await signup(email, password);
      navigate("/");
      toast.success("Account created successfully!");
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleGoogleSignIn = async () => {
    if (!signInWithGoogle) {
      errorHandler({}, "Google Sign-In is not available.");
      return;
    }
    try {
      await signInWithGoogle();
      navigate("/");
      toast.success("Signed in with Google!");
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFDD0]">
      <div className="w-full max-w-md p-8 bg-[#F5F5F5] rounded-2xl shadow-xl">
        {/* Logo Space */}
        <div className="h-20 mb-8 flex items-center justify-center">
          <div className="w-36 h-12 rounded-lg flex items-center justify-center">
            <img src="/logo.webp" alt="logo" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-[#2F4F4F] mb-8">
          Create Account
        </h2>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 border-2 border-[#2F4F4F] rounded-lg focus:outline-none focus:border-[#FFA07A] transition-all"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 border-2 border-[#2F4F4F] rounded-lg focus:outline-none focus:border-[#FFA07A] transition-all"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-4 border-2 border-[#2F4F4F] rounded-lg focus:outline-none focus:border-[#FFA07A] transition-all"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-4 bg-[#2F4F4F] text-white font-semibold rounded-lg hover:bg-[#FFA07A] transition-all"
          >
            Sign Up
          </button>
        </form>

        {/* Google Sign-In */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full mt-4 p-4 bg-[#FFA07A] text-[#2F4F4F] font-semibold rounded-lg hover:bg-[#2F4F4F] hover:text-white transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.67 0-8.58-3.893-8.58-8.68s3.91-8.68 8.58-8.68c2.253 0 3.867.733 5.027 2.167l2.387-2.387C17.54 1.053 15.147 0 12.48 0 5.867 0 0 5.867 0 12.48s5.867 12.48 12.48 12.48c3.493 0 6.227-1.147 8.28-3.493 2.053-2.347 2.72-5.653 2.72-9.067 0-.867-.08-1.733-.24-2.587h-10.76z"
            />
          </svg>
          Continue with Google
        </button>

        {/* Login Link */}
        <p className="mt-6 text-center text-[#2F4F4F]">
          Already have an account?{" "}
          <a
            href="/auth/login"
            className="text-[#FFA07A] font-bold hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
