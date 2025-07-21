"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

interface DailyQuest {
  id: string;
  question: string;
  score: number;
  hasAnswered: boolean;
  wasCorrect: boolean;
  date: string;
}

function SendAnswer() {
  const [dailyQuest, setDailyQuest] = useState<DailyQuest | null>(null);
  const [isDailyQuestDeployed, setIsDailyQuestDeployed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const toggleQuiz = () => setIsOpen(!isOpen);
  const closeModal = () => {
    setIsOpen(false);
    setMessage("");
  };

  const dailyQuestsBefore25July = [
    {
      id: "1",
      question:
        "ถ่ายรูปเข้าร่วมฟังในกิจกรรม Special Event วันที่ 22 ก.ค. เวลา 16:00 น. ",
    },
    {
      id: "2",
      question: "ถ่ายรูปเข้าร่วมกิจกรรม Variety Day วันที่ 24 ก.ค.  เวลา 16:00 น.",
    },
  ];

  // Check if the date is 25 July
  useEffect(() => {
    const today = new Date();
    const is25July = today.getDate() === 25 && today.getMonth() === 7;
    setIsDailyQuestDeployed(is25July);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    const formData = new FormData(e.target as HTMLFormElement);
    const answer = formData.get("answer") as string;

    try {
      const response = await fetch("/api/check_answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answer }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        // Update quest data with the response to ensure consistency
        if (data.quest) {
          setDailyQuest((prev) =>
            prev
              ? {
                  ...prev,
                  ...data.quest,
                  hasAnswered: true,
                  wasCorrect: data.correct,
                }
              : null
          );
        } else {
          // Fallback: refresh the quest data to update answered status
          fetchDailyQuest();
        }
      } else {
        setMessage(data.error || "Failed to check answer");
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      setMessage("Failed to submit answer");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchDailyQuest = async () => {
    try {
      if (!isDailyQuestDeployed) {
        setDailyQuest(null);
        return;
      }
      setLoading(true);
      const response = await fetch("/api/check_answer", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setDailyQuest(data);
      } else {
        console.error("Failed to fetch daily quest");
        setDailyQuest(null);
      }
    } catch (error) {
      console.error("Error fetching daily quest:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDailyQuest();
  }, []);

  if (loading) {
    return (
      <div className="w-full px-4 py-10 relative">
        <div className="flex items-center justify-center">
          <div className="text-pink-600 text-lg">
            Loading today&apos;s quest...
          </div>
        </div>
      </div>
    );
  }

  if (!isDailyQuestDeployed) {
    return (
      <div className="w-full px-4 py-10 relative">
        <div className="flex items-center justify-center">
          <button onClick={toggleQuiz} className={`button`}>
            Start Quiz 💫
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 
                  w-[90%] max-w-md bg-pink-50 border-2 border-[#ec4899] rounded-[2rem] p-8 shadow-2xl"
              >
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-5 text-pink-500 hover:text-pink-700 text-xl font-bold"
                >
                  ❌
                </button>

                <div className="text-center text-2xl font-bold text-pink-600 mb-4 mt-10">
                  🍭 {new Date().getDate() === 22 ? dailyQuestsBefore25July[0].question : new Date().getDate() === 24 ? dailyQuestsBefore25July[1].question : dailyQuestsBefore25July[0].question}
                </div>

                <div className="text-center space-y-4">
                  <a href="https://discord.gg/BkfQ8sHsxC" target="_blank" className="text-lg font-bold flex justify-center">
                    <button className="button ">
                    <svg className="w-12 h-12" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"></path></svg>
                      ส่งที่นี่!
                    </button>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  if (!dailyQuest) {
    return (
      <div className="w-full px-4 py-10 relative">
        <div className="flex items-center justify-center">
          <div className="text-pink-600 text-lg">No quest available today</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-10 relative">
      <div className="flex items-center justify-center">
        <button
          onClick={toggleQuiz}
          className={`button ${dailyQuest.hasAnswered ? "opacity-75" : ""}`}
        >
          {dailyQuest.hasAnswered
            ? dailyQuest.wasCorrect
              ? "🎉 Quest Completed!"
              : "😔 Quest Attempted"
            : "🎀 Start Quiz 🎀"}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 
                  w-[90%] max-w-md bg-pink-50 border-2 border-[#ec4899] rounded-[2rem] p-8 shadow-2xl"
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-5 text-pink-500 hover:text-pink-700 text-xl font-bold"
              >
                ❌
              </button>

              <div className="text-center text-2xl font-bold text-pink-600 mb-4 mt-10">
                🍭 {dailyQuest.question}
              </div>

              <div className="text-center text-sm text-pink-500 mb-4">
                Reward: {dailyQuest.score} points
              </div>

              {dailyQuest.hasAnswered ? (
                <div className="text-center space-y-4">
                  <div
                    className={`text-lg font-bold ${
                      dailyQuest.wasCorrect ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {dailyQuest.wasCorrect
                      ? "✅ Correct Answer!"
                      : "❌ Wrong Answer"}
                  </div>
                  <div className="text-pink-600">
                    {dailyQuest.wasCorrect
                      ? `You earned ${dailyQuest.score} points!`
                      : "Try again tomorrow for a new quest!"}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    name="answer"
                    type="text"
                    placeholder="Type your sweet answer..."
                    className="w-full px-4 py-3 border border-pink-400 rounded-xl bg-white text-pink-800 placeholder-pink-400 focus:outline-none focus:ring-4 focus:ring-pink-300"
                    disabled={isSubmitting}
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-pink-400 hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-5 py-3 rounded-full shadow transition"
                  >
                    {isSubmitting ? "⏳ Submitting..." : "✨ Send Answer"}
                  </button>
                </form>
              )}

              {message && (
                <div
                  className={`mt-4 text-center font-semibold ${
                    message.includes("Correct")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {message}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default SendAnswer;
