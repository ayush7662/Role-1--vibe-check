'use client';
import {colors} from "../../../theme"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { motion } from "@/lib/motion";
import { useState, useEffect } from "react";
import { useSupabase } from "@/lib/supabase";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { Sparkles, Trash2, Award, Calendar } from "lucide-react";
import { format } from "date-fns";

interface Quiz {
  id: string;
  title: string;
  description: string;
  questionCount: number;
  submissionCount?: number;
  quiz_type?: "scored" | "vibe";
  created_at: string;
}

interface RecentAttempt {
  id: string;
  quiz_id: string;
  completed_at: string;
  score: number;
  max_score: number;
  quiz_title: string;
  quiz_description: string;
  quiz_type: "scored" | "vibe";
  vibe_analysis?: string;
}

export default function DashboardPage() {
  const [myQuizzes, setMyQuizzes] = useState<Quiz[]>([]);
  const [recentAttempts, setRecentAttempts] = useState<RecentAttempt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = useSupabase();
  const { user } = useUser();
  
  useEffect(() => {
    async function fetchQuizzes() {
      if (!user) return;
      
      try {
        setIsLoading(true);
        
        // Fetch user's created quizzes using our new API endpoint
        console.log('[Dashboard] Fetching user quizzes from API');
        const quizResponse = await fetch('/api/quiz/user-quizzes');
        
        if (!quizResponse.ok) {
          const errorData = await quizResponse.json();
          console.error('[Dashboard] Error fetching quizzes:', errorData);
          toast.error('Failed to load your quizzes');
          return;
        }
        
        const quizData = await quizResponse.json();
        console.log('[Dashboard] Quizzes loaded:', quizData.quizzes?.length || 0);
        
        if (quizData.success && Array.isArray(quizData.quizzes)) {
          setMyQuizzes(quizData.quizzes);
        } else {
          setMyQuizzes([]);
        }
        
        // Fetch user's recent quiz attempts - using the same logic as attempts page
        const { data: submissionsData, error: submissionsError } = await supabase
          .from('quiz_submissions')
          .select(`
            id,
            quiz_id,
            completed_at,
            score,
            max_score,
            user_id
          `)
          .eq('user_id', user.id)
          .order('completed_at', { ascending: false })
          .limit(5);
        
        if (submissionsError) {
          console.error("Error fetching submissions:", submissionsError);
          return;
        }
        
        if (!submissionsData || submissionsData.length === 0) {
          console.log("No quiz submissions found");
          setRecentAttempts([]);
          return;
        }
        
        // Fetch quiz details for all quiz_ids in one go
        const quizIds = submissionsData.map(sub => sub.quiz_id);
        const { data: attemptQuizData, error: quizLookupError } = await supabase
          .from('quizzes')
          .select('id, title, description, quiz_type')
          .in('id', quizIds);
        
        if (quizLookupError) {
          console.error("Error fetching quiz details:", quizLookupError);
        }
        
        // Create a map of quiz details for efficient lookup
        const quizMap = new Map();
        if (attemptQuizData) {
          attemptQuizData.forEach(quiz => {
            quizMap.set(quiz.id, quiz);
          });
            }
            
        // Fetch vibe results for vibe-type quizzes
        const submissionIds = submissionsData.map(sub => sub.id);
        const { data: vibeData, error: vibeError } = await supabase
          .from('vibe_results')
          .select('submission_id, vibe_analysis')
          .in('submission_id', submissionIds);
        
        if (vibeError) {
          console.log("Error fetching vibe results:", vibeError);
        }
        
        // Create a map of vibe results for efficient lookup
        const vibeMap = new Map();
        if (vibeData) {
          vibeData.forEach(vibe => {
            vibeMap.set(vibe.submission_id, vibe);
          });
        }
        
        // Combine all the data
        const combinedAttempts = submissionsData.map(submission => {
          const quiz = quizMap.get(submission.quiz_id) || { 
            title: "Unknown Quiz", 
            description: "", 
            quiz_type: "scored" 
          };
          
          const vibe = vibeMap.get(submission.id);
          
          return {
            id: submission.id,
            quiz_id: submission.quiz_id,
            completed_at: submission.completed_at,
            score: submission.score,
            max_score: submission.max_score,
            quiz_title: quiz.title,
            quiz_description: quiz.description,
            quiz_type: quiz.quiz_type || "scored",
            vibe_analysis: vibe?.vibe_analysis
            };
        });
          
        console.log("Recent attempts:", combinedAttempts);
        setRecentAttempts(combinedAttempts);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchQuizzes();
  }, [user, supabase]);

  const handleDeleteQuiz = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!confirm("Are you sure you want to delete this quiz? This cannot be undone.")) {
      return;
    }
    
    try {
      // Use our API endpoint to delete the quiz
      const response = await fetch("/api/quiz/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quizId: id }),
      });
      
      const data = await response.json();
        
      if (!response.ok) {
        console.error("[Dashboard] Error deleting quiz:", data);
        toast.error(data.error || "Failed to delete quiz");
        return;
      }
      
      toast.success("Quiz deleted successfully");
      setMyQuizzes(myQuizzes.filter(quiz => quiz.id !== id));
    } catch (error) {
      console.error("Error in handleDeleteQuiz:", error);
      toast.error("Failed to delete quiz");
    }
  };
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 bg-gradient-to-b from-[#0e0b1f] to-[#130f3f]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4dd0e1]"></div>
      </div>
    );
  }

return (
    <div
      className="space-y-8 min-h-screen px-4 sm:px-8 py-8"
      style={{
        background: `linear-gradient(to bottom, ${colors.backgroundStart}, ${colors.backgroundEnd})`,
      }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h1
          className="text-2xl sm:text-3xl font-bold"
          style={{ color: colors.textPrimary }}
        >
          Dashboard
        </h1>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <Link href="/dashboard/create" className="flex-1 sm:flex-auto">
            <Button
              className="w-full sm:w-auto"
              style={{
                background: `linear-gradient(to right, ${colors.buttonPrimaryFrom}, ${colors.buttonPrimaryTo})`,
                color: colors.textPrimary,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = `linear-gradient(to right, ${colors.buttonPrimaryHoverFrom}, ${colors.buttonPrimaryHoverTo})`)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = `linear-gradient(to right, ${colors.buttonPrimaryFrom}, ${colors.buttonPrimaryTo})`)
              }
            >
              Create Quiz
            </Button>
          </Link>
          <Link href="/dashboard/join" className="flex-1 sm:flex-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              style={{
                borderColor: colors.gradientTo,
                color: colors.textSecondary,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${colors.gradientTo}33`; // 20% opacity
                e.currentTarget.style.color = colors.textPrimary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = colors.textSecondary;
              }}
            >
              Join Quiz
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="myQuizzes" className="w-full">
        <TabsList
          className="w-full border-b"
          style={{ borderColor: colors.gradientTo }}
        >
          <TabsTrigger
            value="myQuizzes"
            className="flex-1"
            style={{ color: colors.textSecondary }}
            data-state-active={{
              color: colors.textPrimary,
              borderBottom: `2px solid ${colors.gradientTo}`,
            }}
          >
            My Created Quizzes
          </TabsTrigger>
          <TabsTrigger
            value="recent"
            className="flex-1"
            style={{ color: colors.textSecondary }}
            data-state-active={{
              color: colors.textPrimary,
              borderBottom: `2px solid ${colors.gradientTo}`,
            }}
          >
            Recent Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="myQuizzes" className="pt-4">
          {myQuizzes.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {myQuizzes.map((quiz) => (
                <motion.div key={quiz.id} variants={item}>
                  <Link href={`/quiz/${quiz.id}`} className="block h-full">
                    <Card
                      className="h-full hover:border transition-all cursor-pointer overflow-hidden"
                      style={{
                        backgroundColor: colors.backgroundEnd,
                        borderColor:
                          quiz.quiz_type === "vibe"
                            ? `${colors.gradientVia}66`
                            : `${colors.buttonPrimaryTo}66`,
                      }}
                    >
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <CardTitle
                              className="flex items-center gap-2"
                              style={{ color: colors.textPrimary }}
                            >
                              {quiz.quiz_type === "vibe" && (
                                <Sparkles
                                  className="h-4 w-4 flex-shrink-0"
                                  style={{ color: colors.gradientVia }}
                                />
                              )}
                              <span className="line-clamp-1 break-words">{quiz.title}</span>
                            </CardTitle>
                            <CardDescription
                              className="line-clamp-2 break-words"
                              style={{ color: colors.textSecondary }}
                            >
                              {quiz.description}
                            </CardDescription>
                          </div>
                          <button
                            onClick={(e) => handleDeleteQuiz(quiz.id, e)}
                            className="p-1 transition-colors"
                            title="Delete quiz"
                            style={{ color: colors.textSecondary }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.color = colors.cardBorderError)
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.color = colors.textSecondary)
                            }
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </CardHeader>
                      <CardFooter
                        className="flex flex-col xs:flex-row justify-between gap-2 border-t pt-4"
                        style={{ borderColor: `${colors.gradientTo}33` }}
                      >
                        <div
                          className="flex gap-3 text-sm flex-wrap"
                          style={{ color: colors.textSecondary }}
                        >
                          <span>{quiz.questionCount} questions</span>
                          <span className="hidden xs:inline">•</span>
                          <span>{quiz.submissionCount ?? "–"} attempts</span>
                        </div>
                        <Button
                          variant="ghost"
                          className="w-full xs:w-auto"
                          style={{
                            color: colors.buttonPrimaryTo,
                            backgroundColor: colors.backgroundEnd,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = colors.buttonPrimaryHoverTo;
                            e.currentTarget.style.backgroundColor = colors.backgroundStart;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = colors.buttonPrimaryTo;
                            e.currentTarget.style.backgroundColor = colors.backgroundEnd;
                          }}
                        >
                          View Details
                        </Button>
                      </CardFooter>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <Card
              style={{
                backgroundColor: colors.backgroundEnd,
                borderColor: `${colors.gradientTo}66`,
              }}
            >
              <CardHeader>
                <CardTitle
                  style={{
                    color: colors.textPrimary,
                    textAlign: "center",
                    fontSize: "1.25rem",
                  }}
                >
                  No quizzes yet
                </CardTitle>
                <CardDescription
                  style={{ color: colors.textSecondary, textAlign: "center" }}
                >
                  Create your first quiz to get started!
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-center pb-6">
                <Link href="/dashboard/create">
                  <Button
                    style={{
                      background: `linear-gradient(to right, ${colors.buttonPrimaryFrom}, ${colors.buttonPrimaryTo})`,
                      color: colors.textPrimary,
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = `linear-gradient(to right, ${colors.buttonPrimaryHoverFrom}, ${colors.buttonPrimaryHoverTo})`)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = `linear-gradient(to right, ${colors.buttonPrimaryFrom}, ${colors.buttonPrimaryTo})`)
                    }
                  >
                    Create Quiz
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="recent" className="pt-4">
          <h2 style={{ color: colors.textPrimary }} className="text-lg font-medium mb-4">
            Recent Attempts
          </h2>
          {recentAttempts.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {recentAttempts.map((attempt) => (
                <motion.div key={attempt.id} variants={item}>
                  <Link href={`/dashboard/attempts`}>
                    <Card
                      className="h-full hover:border transition-all cursor-pointer"
                      style={{
                        backgroundColor: colors.backgroundEnd,
                        borderColor:
                          attempt.quiz_type === "vibe"
                            ? `${colors.gradientVia}66`
                            : `${colors.buttonPrimaryTo}66`,
                      }}
                    >
                      <CardHeader className="pb-3">
                        <CardTitle
                          className="flex items-center gap-2"
                          style={{ color: colors.textPrimary }}
                        >
                          {attempt.quiz_type === "vibe" && (
                            <Sparkles
                              className="h-4 w-4"
                              style={{ color: colors.gradientVia }}
                            />
                          )}
                          <span className="line-clamp-1">{attempt.quiz_title}</span>
                        </CardTitle>
                        <CardDescription
                          className="line-clamp-2"
                          style={{ color: colors.textSecondary }}
                        >
                          {attempt.quiz_description}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter
                        className="flex justify-between items-center border-t pt-3"
                        style={{ borderColor: `${colors.gradientTo}33` }}
                      >
                        <div
                          className="flex items-center gap-1 text-sm"
                          style={{ color: colors.textSecondary }}
                        >
                          <Calendar className="h-3 w-3" />
                          <span>{format(new Date(attempt.completed_at), "MMM d, yyyy")}</span>
                        </div>
                        {attempt.quiz_type === "scored" ? (
                          <div className="flex items-center gap-2">
                            <Award className="h-4 w-4" style={{ color: colors.cardBorderWarning }} />
                            <span
                              className="text-sm font-medium"
                              style={{ color: colors.buttonPrimaryHoverTo }}
                            >
                              {attempt.score}/{attempt.max_score}
                            </span>
                          </div>
                        ) : (
                          <div
                            style={{
                              backgroundColor: `${colors.gradientVia}4D`, // 30% opacity
                              borderRadius: "0.25rem",
                              padding: "0.125rem 0.5rem",
                              fontSize: "0.75rem",
                              color: colors.gradientVia,
                            }}
                          >
                            Vibe Check
                          </div>
                        )}
                      </CardFooter>
                    </Card>
                  </Link>
                </motion.div>
              ))}

              <motion.div variants={item}>
                <Link href="/dashboard/attempts">
                  <Card
                    className="h-full flex flex-col items-center justify-center p-6 border-dashed hover:border transition-all cursor-pointer"
                    style={{
                      backgroundColor: colors.backgroundEnd,
                      borderColor: `${colors.buttonPrimaryTo}4D`,
                    }}
                  >
                    <p style={{ color: colors.buttonPrimaryTo, fontWeight: "500" }}>
                      View All Attempts
                    </p>
                    <p style={{ color: colors.textSecondary, fontSize: "0.75rem", marginTop: "0.25rem" }}>
                      See your complete history
                    </p>
                  </Card>
                </Link>
              </motion.div>
            </motion.div>
          ) : (
            <Card
              style={{
                backgroundColor: colors.backgroundEnd,
                borderColor: `${colors.gradientTo}66`,
              }}
            >
              <CardHeader>
                <CardTitle
                  style={{
                    color: colors.textPrimary,
                    textAlign: "center",
                    fontSize: "1.25rem",
                  }}
                >
                  No recent activity
                </CardTitle>
                <CardDescription
                  style={{ color: colors.textSecondary, textAlign: "center" }}
                >
                  Start taking quizzes to see your progress here.
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
} 