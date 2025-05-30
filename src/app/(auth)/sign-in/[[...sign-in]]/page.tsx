'use client';

import { SignIn } from "@clerk/nextjs";
import { motion } from "@/lib/motion";

export default function SignInPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-[#0e0b1f] to-[#130f3f]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md px-4"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#ff41ff] via-[#8b00ff] to-[#4dd0e1] mb-2">
            Vibe Check
          </h1>
          <p className="text-[#b1b9ff]">Sign in to create and join quizzes</p>
        </div>

        <SignIn
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-[#1a133e] shadow-lg border border-[#8b00ff]/30 backdrop-blur-md rounded-xl",
              headerTitle: "text-[#e0e6ff]",
              headerSubtitle: "text-[#b1b9ff]",
              formButtonPrimary:
                "bg-gradient-to-r from-[#8b00ff] to-[#4dd0e1] hover:from-[#651fff] hover:to-[#00c8f8] text-white font-semibold rounded-lg",
              socialButtonsBlockButton:
                "bg-[#2a1a4a] border border-[#4dd0e1]/40 hover:bg-[#37006b]/30 text-[#e0e6ff]",
              socialButtonsBlockButtonText: "text-[#e0e6ff]",
              formFieldInput:
                "bg-[#2a1a4a] border border-[#651fff]/50 text-[#e0e6ff] placeholder:text-[#7779a6]",
              formFieldLabel: "text-[#bb8aff]",
              footer: "text-[#7779a6]",
              footerActionLink: "text-[#8b00ff] hover:text-[#e0e6ff]",
            },
          }}
        />
      </motion.div>
    </div>
  );
}
