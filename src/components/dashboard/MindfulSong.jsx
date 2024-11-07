import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { GoogleGenerativeAI } from "@google/generative-ai";
import remarkGfm from "remark-gfm";
import { HashLoader } from "react-spinners";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const MindfulSong = () => {
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();
  const [experience, setExperience] = useState(""); // State for experience description
  const [selectedIssues, setSelectedIssues] = useState([]); // State for 'What You Just Went Through' checkboxes
  const [selectedFeelings, setSelectedFeelings] = useState([]); // State for 'How You Want to Feel' checkboxes
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  // Predefined options for the checkboxes
  const issueOptions = [
    "School problem",
    "Parent issues",
    "Family concerns",
    "Work stress",
    "Love problem",
  ];

  const feelingOptions = ["Calm", "Happy", "Peaceful", "Uplifted"];

  const getSongRecommendation = async () => {
    if (selectedIssues.length === 0 && selectedFeelings.length === 0) {
      alert("Please select at least one issue or feeling!");
      return;
    }

    const selectedIssuesString = selectedIssues.join(", ");
    const selectedFeelingsString = selectedFeelings.join(", ");

    // Construct a custom prompt for song recommendations
    const staticQuestion = `
      Provide song recommendations based on the following preferences:
      - Issues: "${selectedIssuesString || "No issues selected."}"
      - Desired Feelings: "${selectedFeelingsString || "No feelings selected."}"
      - Additional Description: "${experience || "No additional description provided."}"

      Please provide a table with the recommended songs, each with a brief description of why it fits.
      
      **Example Table Format:**
      | Song Title | Artist | Description |
      |---|---|---|
      | Calm Melody | Artist Name | A soothing melody to help you relax and unwind. |
      | Happy Beats | Another Artist | An uplifting tune to bring joy and positivity. |
      
      Only provide the table, with a short introductory line before it.
    `;

    try {
      setLoading(true);
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash-latest",
      });
      const result = await model.generateContent([staticQuestion]);
      const text = await result.response.text();
      setAnswer(text);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data: ", error);
      alert("Error fetching data. Please try again later.");
    }
  };

  // Handle checkbox changes for issues and feelings categories
  const handleCheckboxChange = (option, type) => {
    if (type === "issue") {
      setSelectedIssues((prev) =>
        prev.includes(option) ? prev.filter((i) => i !== option) : [...prev, option]
      );
    } else if (type === "feeling") {
      setSelectedFeelings((prev) =>
        prev.includes(option) ? prev.filter((f) => f !== option) : [...prev, option]
      );
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-2xl font-bold mb-4">Mindful Song Recommendation</h3>
      <div className="mb-4">
        <label className="block mb-2">What You Just Went Through:</label>
        {issueOptions.map((issue) => (
          <div key={issue} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={issue}
              checked={selectedIssues.includes(issue)}
              onChange={() => handleCheckboxChange(issue, "issue")}
              className="mr-2"
            />
            <label htmlFor={issue}>{issue}</label>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <label className="block mb-2">How You Want to Feel:</label>
        {feelingOptions.map((feeling) => (
          <div key={feeling} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={feeling}
              checked={selectedFeelings.includes(feeling)}
              onChange={() => handleCheckboxChange(feeling, "feeling")}
              className="mr-2"
            />
            <label htmlFor={feeling}>{feeling}</label>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <label htmlFor="experience" className="block mb-2">
          Describe More (optional)
        </label>
        <textarea
          id="experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 w-full h-24"
        />
      </div>

      <button
        onClick={getSongRecommendation}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
      >
        Get Song Recommendation
      </button>

      <div className="mt-8">
        <h4 className="text-xl font-semibold mb-2">Song Recommendations:</h4>
        {loading && (
          <div className="flex items-center gap-4 mb-4">
            <HashLoader />
            <p className="font-bold text-xl">Generating recommendations...</p>
          </div>
        )}
        <div className="border border-gray-300 rounded-lg p-4">
          <table className="table-auto w-full text-left">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                table: ({ node, ...props }) => (
                  <table className="w-full" {...props} />
                ),
                th: ({ node, ...props }) => (
                  <th
                    className="px-4 py-2 text-sm font-medium bg-gray-200"
                    {...props}
                  />
                ),
                td: ({ node, ...props }) => (
                  <td className="px-4 py-2 text-sm border-t" {...props}
                  />
                ),
              }}
            >
              {answer}
            </ReactMarkdown>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MindfulSong;
