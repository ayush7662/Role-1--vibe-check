"use client";

import { colors } from "../../../../theme";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "@/lib/motion";
import { useRouter } from "next/navigation";
import AiGenerateForm from "./aiGenerateForm";

export default function CreateQuizPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    visibility: "private",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      console.log("Submitting manual quiz creation request:", formData);

      // Call the API to create the quiz manually
      const response = await fetch("/api/quiz/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("API response status:", response.status);
      console.log("API response data:", data);

      if (!response.ok) {
        console.error("Error response:", data);
        throw new Error(data.error || `API error: ${response.status}`);
      }

      // Redirect to add questions page (later) or back to dashboard
      router.push(`/quiz/${data.quizId}/edit`);
      router.refresh();
    } catch (err) {
      console.error("Manual quiz creation error:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong";
      setError(`Failed to create quiz: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1
          className="text-3xl font-bold"
          style={{ color: colors.textPrimary }}
        >
          Build Your Quiz
        </h1>
      </div>

      <Tabs defaultValue="manual" className="w-full">
        <TabsList>
          <TabsTrigger value="manual">Build Manually</TabsTrigger>
          <TabsTrigger value="ai">Let AI Generate</TabsTrigger>
        </TabsList>

        <TabsContent value="manual" className="pt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Quiz Setup</CardTitle>
                  <CardDescription>
                    Provide essential details to get started with your quiz
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {error && (
                    <div
                      className="p-3 rounded-md border"
                      style={{
                        backgroundColor: colors.cardBgError,
                        borderColor: colors.cardBorderError,
                      }}
                    >
                      <span style={{ color: colors.errorIconColor }}>
                        {error}
                      </span>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label
                      htmlFor="title"
                      style={{ color: colors.textPrimary }}
                    >
                      Quiz Name
                    </Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Give your quiz a name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="description"
                      style={{ color: colors.textPrimary }}
                    >
                      Summary (Optional)
                    </Label>
                    <Input
                      id="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Briefly describe the purpose or topic"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="visibility"
                      style={{ color: colors.textPrimary }}
                    >
                      Access Settings
                    </Label>
                    <select
                      id="visibility"
                      value={formData.visibility}
                      onChange={handleInputChange}
                      className="w-full rounded-md px-3 py-2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-opacity-50"
                      style={{
                        backgroundColor: colors.cardBg,
                        borderColor: colors.gradientVia,
                        color: colors.textPrimary,
                        borderWidth: "1px",
                      }}
                    >
                      <option value="private">
                        Restricted - Shareable via link only
                      </option>
                      <option value="public">
                        Open - Visible in community quizzes
                      </option>
                    </select>
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/dashboard")}
                    disabled={isLoading}
                  >
                    Go Back
                  </Button>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="text-[#e0e6ff]"
                    style={{ backgroundColor: colors.buttonPrimaryFrom }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        colors.buttonPrimaryHoverFrom)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        colors.buttonPrimaryFrom)
                    }
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4"
                          style={{ color: colors.textPrimary }}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Creating...
                      </>
                    ) : (
                      "Publish Quiz"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </motion.div>
        </TabsContent>

        <TabsContent value="ai" className="pt-4">
          <AiGenerateForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
