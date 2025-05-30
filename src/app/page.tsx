"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "@/lib/motion";
import { Shield, Share2, CheckCircle2, Bot, Brain, Wand2 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-[#0e0b1f] to-[#130f3f] text-[#e0e6ff]">
      {/* Header */}
      <header className="container mx-auto py-4 md:py-6 px-4 flex justify-between items-center">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#ff41ff] via-[#8b00ff] to-[#651fff]"
        >
          Vibe Check
        </motion.h1>
        <div className="flex gap-3">
          <Link href="/sign-in">
            <Button
              variant="ghost"
              className="text-[#b1b9ff] hover:text-[#e0e6ff] hover:bg-[#37006b]/30"
            >
              Log In
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="bg-gradient-to-r from-[#8b00ff] to-[#4dd0e1] hover:from-[#651fff] hover:to-[#00c8f8] shadow-[0_0_8px_#651fff,0_0_15px_#00c8f8] text-lg px-6 py-3 rounded-xl">
              Try It Free
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 container mx-auto flex flex-col items-center px-4 py-8 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block px-4 py-1 mb-6 rounded-full bg-[#3a0073]/50 border border-[#8b00ff]/50"
          >
            <span className="text-[#bb8aff] text-sm font-semibold">
              Smarter, Faster Quizzes
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Build Viral Quizzes
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#ff41ff] via-[#8b00ff] to-[#4dd0e1] mt-2">
              with a Touch of AI Magic
            </span>
          </h1>
          <p className="text-[#b1b9ff] sm:text-xl mb-8 max-w-3xl mx-auto">
            Whether you're making personality tests or trivia, our AI helps you
            launch fun, engaging quizzes in moments—ready to share instantly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-[#8b00ff] to-[#4dd0e1] hover:from-[#651fff] hover:to-[#00c8f8] text-lg px-6 py-6 rounded-xl shadow-lg shadow-[#651fff]/60">
                Start Creating Now
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* AI Highlight Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full max-w-4xl mb-16"
        >
          <div className="bg-gradient-to-br from-[#4a007f]/40 to-[#0086a7]/40 border border-[#8b00ff]/40 rounded-xl p-6 md:p-8 backdrop-blur-md">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-shrink-0 bg-gradient-to-br from-[#8b00ff]/40 to-[#00c8f8]/40 rounded-full p-5">
                <Bot className="w-12 h-12 text-[#bb8aff]" />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#ff41ff] via-[#8b00ff] to-[#4dd0e1]">
                  Meet Your AI Quiz Buddy
                </h2>
                <p className="text-[#b1b9ff] md:text-lg">
                  Our smart quiz engine helps you generate playful or
                  professional quizzes instantly. Just give a topic, and let the
                  AI do the rest.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {[
            {
              icon: <Wand2 className="h-6 w-6 text-[#ffdc70]" />,
              title: "Instant Quiz Builder",
              description:
                "Turn ideas into interactive quizzes using AI, saving time and boosting creativity.",
            },
            {
              icon: <Brain className="h-6 w-6 text-[#c386ff]" />,
              title: "Deep Insight Engine",
              description:
                "Gain fun personality profiles based on users' quiz responses with clever analysis.",
            },
            {
              icon: <Shield className="h-6 w-6 text-[#70cfff]" />,
              title: "Protected Accounts",
              description:
                "Backed by Clerk for strong user privacy, data safety, and secure logins.",
            },
            {
              icon: <Share2 className="h-6 w-6 text-[#61ffa9]" />,
              title: "Seamless Sharing",
              description:
                "Send quizzes via links or socials effortlessly—no app download needed.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-[#2a1a4a]/70 backdrop-blur-md rounded-xl p-6 border border-[#651fff]/70 hover:border-[#4dd0e1] transition-all"
            >
              <div className="bg-[#4f00ff]/30 rounded-lg p-3 w-fit mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-[#e0e6ff] mb-2">
                {feature.title}
              </h3>
              <p className="text-[#b1b9ff]">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Secure Platform Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="w-full max-w-4xl bg-gradient-to-br from-[#3a0073]/40 to-[#0095c1]/40 border border-[#651fff]/40 rounded-2xl p-6 md:p-8 backdrop-blur-md"
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-8">
            Built on a <span className="text-[#ff41ff]">Trustworthy Stack</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Clerk Authentication",
                desc: "Modern auth with multi-device protection",
                icon: <CheckCircle2 className="h-5 w-5 text-[#8b00ff] mt-1" />,
              },
              {
                title: "Encrypted User Data",
                desc: "Information is protected at every level",
                icon: <CheckCircle2 className="h-5 w-5 text-[#8b00ff] mt-1" />,
              },
              {
                title: "Supabase Storage",
                desc: "Secure and scalable quiz backend",
                icon: <CheckCircle2 className="h-5 w-5 text-[#8b00ff] mt-1" />,
              },
              {
                title: "Privacy First",
                desc: "You decide what’s public and what’s private",
                icon: <CheckCircle2 className="h-5 w-5 text-[#8b00ff] mt-1" />,
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start space-x-4">
                {item.icon}
                <div>
                  <h3 className="font-semibold text-[#e0e6ff]">{item.title}</h3>
                  <p className="text-[#b1b9ff] text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto py-10 px-4 text-[#7779a6] border-t border-[#3a0073]">
        <div className="flex flex-col md:grid md:grid-cols-3 gap-10 text-center md:text-left">
          {/* Brand + Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-[#b1b9ff] mb-2">
              Vibe Check
            </h3>
            <p className="text-sm max-w-xs mb-4">
              Build and share AI-generated quizzes effortlessly. Discover
              insights, challenge friends, and enjoy a smarter way to vibe.
            </p>
            <h4 className="text-sm font-semibold text-[#b1b9ff] mb-2">
              Contact Info
            </h4>
            <ul className="text-sm space-y-1">
              <li>
                Email:{" "}
                <a
                  href="mailto:kamalayush65@gmail.com"
                  className="hover:text-[#e0e6ff] transition"
                >
                  kamalayush65@gmail.com
                </a>
              </li>
              <li>
                Phone:{" "}
                <a
                  href="tel:+918709610659"
                  className="hover:text-[#e0e6ff] transition"
                >
                  +91 8709610659
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-[#b1b9ff] mb-2">
              Quick Links
            </h4>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="/sign-in" className="hover:text-[#e0e6ff] transition">
                  Sign In
                </a>
              </li>
              <li>
                <a href="/sign-up" className="hover:text-[#e0e6ff] transition">
                  Get Started
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-[#e0e6ff] transition">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-[#e0e6ff] transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Credits */}
          <div>
            <h4 className="text-sm font-semibold text-[#b1b9ff] mb-2">
              Follow Us
            </h4>
            <div className="flex justify-center md:justify-start gap-4 text-[#8b00ff] mb-4">
              <a
                href="#"
                aria-label="Twitter"
                className="hover:text-[#e0e6ff] transition"
              >
                🐦
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-[#e0e6ff] transition"
              >
                📸
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="hover:text-[#e0e6ff] transition"
              >
                💼
              </a>
            </div>
            <p className="text-xs text-[#55568d] mt-4">
              &copy; {new Date().getFullYear()} Vibe Check. Designed with love
              and code. All rights reserved.
              <br />
              Built using Next.js, Tailwind CSS, Clerk, and Supabase.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
