'use client';

import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function SignUpPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-[#0e0b1f] to-[#130f3f]">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#ff41ff] via-[#8b00ff] to-[#4dd0e1] mb-2">
            Vibe Check
          </h1>
          <p className="text-[#b1b9ff]">Create an account to continue</p>
        </div>

        <SignUp
          appearance={{
            baseTheme: dark,
            elements: {
              rootBox: "mx-auto",
              card: "bg-[#1a133e] shadow-lg border border-[#8b00ff]/30 backdrop-blur-md rounded-xl",
              formButtonPrimary:
                "bg-gradient-to-r from-[#8b00ff] to-[#4dd0e1] hover:from-[#651fff] hover:to-[#00c8f8] text-white font-semibold rounded-lg",
              formFieldInput:
                "bg-[#2a1a4a] border border-[#651fff]/50 text-[#e0e6ff] placeholder:text-[#7779a6]",
              formFieldLabel: "text-[#bb8aff]",
              headerTitle: "text-[#e0e6ff]",
              headerSubtitle: "text-[#b1b9ff]",
              socialButtonsBlockButton:
                "bg-[#2a1a4a] border border-[#4dd0e1]/40 hover:bg-[#37006b]/30 text-[#e0e6ff]",
              socialButtonsBlockButtonText: "text-[#e0e6ff]",
              dividerLine: "bg-[#4dd0e1]/40",
              dividerText: "text-[#b1b9ff]",
              footerActionLink: "text-[#8b00ff] hover:text-[#e0e6ff]",
            },
          }}
        />
      </div>
    </div>
  );
}
