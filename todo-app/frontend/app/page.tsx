"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { tokenStorage } from "@/services/authService";

export default function HomePage() {
  const router = useRouter();

  // Check if user is already logged in
  useEffect(() => {
    const token = tokenStorage.getToken();
    if (token) {
      // User is already logged in, redirect to todo page
      router.push("/todo");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-6">
      <main className="max-w-5xl w-full">
        {/* Hero Section */}
        <section className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Todoify
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-300 mb-4 max-w-2xl mx-auto">
            Organize your day, focus on what matters, and get more done.
          </p>
          <p className="text-lg text-gray-400 dark:text-gray-400 max-w-xl mx-auto">
            A powerful todo app that transforms daily plans into action, helping you stay organized, focused, and productive throughout the day.
          </p>
        </section>

        {/* Features Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 dark:border-slate-700/50 p-6 hover:shadow-2xl hover:scale-105 hover:border-blue-200 dark:hover:border-blue-500 transition-all duration-300 cursor-pointer">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-400 dark:text-blue-400 mb-4 group-hover:scale-110 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-all duration-300">
              <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-blue-400 dark:group-hover:text-blue-400 transition-colors duration-300">Fast & Minimal</h3>
            <p className="text-gray-400 dark:text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300 transition-colors duration-300">
              Add and manage tasks with a clean, distraction-free interface. Get things done faster.
            </p>
          </div>

          <div className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 dark:border-slate-700/50 p-6 hover:shadow-2xl hover:scale-105 hover:border-purple-200 dark:hover:border-purple-500 transition-all duration-300 cursor-pointer">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-400 dark:text-purple-400 mb-4 group-hover:scale-110 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/50 transition-all duration-300">
              <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-purple-400 dark:group-hover:text-purple-400 transition-colors duration-300">Secure & Private</h3>
            <p className="text-gray-400 dark:text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300 transition-colors duration-300">
              JWT-based authentication keeps your account and todos private. Your data stays yours.
            </p>
          </div>

          <div className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 dark:border-slate-700/50 p-6 hover:shadow-2xl hover:scale-105 hover:border-green-200 dark:hover:border-green-500 transition-all duration-300 cursor-pointer">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-green-50 dark:bg-green-900/30 text-green-400 dark:text-green-400 mb-4 group-hover:scale-110 group-hover:bg-green-100 dark:group-hover:bg-green-900/50 transition-all duration-300">
              <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-green-400 dark:group-hover:text-green-400 transition-colors duration-300">Snappy UX</h3>
            <p className="text-gray-400 dark:text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300 transition-colors duration-300">
              Instant updates, subtle animations, and keyboard-friendly controls for a delightful experience.
            </p>
          </div>
        </section>

        {/* CTA Buttons */}
        <section className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/signup"
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-400 to-purple-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2 min-w-[200px] justify-center"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Get Started</span>
          </Link>

          <Link
            href="/login"
            className="group relative px-8 py-4 bg-white dark:bg-slate-800 text-gray-900 dark:text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-gray-200 dark:border-slate-600 flex items-center gap-2 min-w-[200px] justify-center"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            <span>Sign In</span>
          </Link>
        </section>

        {/* API Embed */}
        <section className="mt-16 w-full animate-fade-in">
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 dark:border-slate-700/50 p-4 overflow-hidden">
            <h3 className="text-lg font-semibold mb-4 text-center text-gray-900 dark:text-white">Backend Status & Docs</h3>
            <div className="flex justify-center w-full overflow-auto">
              <iframe
                src={process.env.NEXT_PUBLIC_API_URL || "https://huzaifa035-backend.hf.space"}
                width="850"
                height="450"
                style={{ border: 0 }}
                className="max-w-full rounded-lg"
                title="Backend API"
              ></iframe>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <footer className="mt-16 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Secure authentication powered by JWT • Built with Next.js & Tailwind CSS
          </p>
        </footer>
      </main>
    </div>
  );
}