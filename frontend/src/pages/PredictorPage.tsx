// import { useState } from "react";
// import type { FormEvent } from "react";

// const examOptions = ["JEE Advanced", "JEE Main", "NEET", "CUET"];

// const PredictorPage = () => {
//   const [exam, setExam] = useState(examOptions[0]);
//   const [rank, setRank] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [recommendations, setRecommendations] = useState<any[]>([]);

//   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     const numericRank = Number(rank);
//     if (!numericRank || numericRank <= 0) {
//       setRecommendations([]);
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await fetch(
//         `http://localhost:5000/api/colleges/recommend?exam=${exam}&rank=${numericRank}`
//       );

//       const data = await res.json();
//       setRecommendations(data);
//     } catch (err) {
//       console.error("Error fetching recommendations:", err);
//       setRecommendations([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="page-shell">
//       <h1 className="section-title">College Predictor</h1>

//       {/* FORM */}
//       <div className="card">
//         <form onSubmit={handleSubmit} className="field-row">
//           <div className="field">
//             <label>Exam</label>
//             <select value={exam} onChange={(e) => setExam(e.target.value)}>
//               {examOptions.map((opt) => (
//                 <option key={opt} value={opt}>
//                   {opt}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="field">
//             <label>Rank</label>
//             <input
//               type="number"
//               min={1}
//               value={rank}
//               onChange={(e) => setRank(e.target.value)}
//               placeholder="Enter rank"
//             />
//           </div>

//           <div className="field" style={{ alignSelf: "end" }}>
//             <button className="button" type="submit">
//               {loading ? "Loading..." : "Recommend"}
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* RESULTS */}
//       <div className="section-grid">
//         {!loading && recommendations.length === 0 && (
//           <div className="alert-box">
//             Enter exam and rank to get recommendations.
//           </div>
//         )}

//         {recommendations.map((college) => (
//           <div key={college.id} className="card">
//             <h2 className="section-title" style={{ fontSize: "1.25rem" }}>
//               {college.name}
//             </h2>

//             <p>{college.location}</p>
//             <p className="badge">Rating: {college.rating}</p>

//             {college.fees && (
//               <p className="badge">
//                 Fees: {college.fees.total ?? college.fees}
//               </p>
//             )}

//             {college.courses && (
//               <p style={{ marginTop: "0.5rem" }}>
//                 Courses: {college.courses.join(", ")}
//               </p>
//             )}
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// };

// export default PredictorPage;
import { useState } from "react";
import type { FormEvent } from "react";

const examOptions = ["JEE Advanced", "JEE Main", "NEET", "CUET"];

const PredictorPage = () => {
  const [exam, setExam] = useState(examOptions[0]);
  const [rank, setRank] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const numericRank = Number(rank);
    if (!numericRank || numericRank <= 0) {
      setRecommendations([]);
      return;
    }

    try {
      setLoading(true);
      setHasSearched(true);

      // Encoding parameters safely to manage space characters in exam strings
      const res = await fetch(
        `http://localhost:5000/api/colleges/recommend?exam=${encodeURIComponent(exam)}&rank=${numericRank}`
      );

      if (!res.ok) {
        throw new Error(`Server returned status code: ${res.status}`);
      }

      const data = await res.json();
      setRecommendations(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-shell">
      <h1 className="section-title">College Predictor</h1>

      {/* FORM INPUT HUB */}
      <div className="card">
        <form onSubmit={handleSubmit} className="grid-3 field-row" style={{ alignItems: "flex-end" }}>
          <div className="field">
            <label htmlFor="predictor-exam">Target Entrance Exam</label>
            <select 
              id="predictor-exam"
              value={exam} 
              onChange={(e) => setExam(e.target.value)}
            >
              {examOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="predictor-rank">Your Secured Rank / Score</label>
            <input
              id="predictor-rank"
              type="number"
              min={1}
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              placeholder="Enter numerical rank"
              required
            />
          </div>

          <div className="field">
            <button className="button" type="submit" style={{ width: "100%", height: "38px" }} disabled={loading}>
              {loading ? "Analyzing..." : "Predict Colleges"}
            </button>
          </div>
        </form>
      </div>

      {/* RESULTS SELECTION VIEW */}
      <div className="section-grid" style={{ marginTop: "2rem" }}>
        {/* State 1: Initial load state */}
        {!loading && !hasSearched && (
          <div className="alert-box" style={{ gridColumn: "1 / -1" }}>
            Enter your examination target alongside your secured rank to analyze matching cut-offs.
          </div>
        )}

        {/* State 2: Active search found nothing */}
        {!loading && hasSearched && recommendations.length === 0 && (
          <div className="alert-box" style={{ gridColumn: "1 / -1", borderColor: "rgba(239, 68, 68, 0.2)" }}>
            No absolute college matches detected for this rank threshold. Try varying your selection.
          </div>
        )}

        {/* State 3: Populated Results List */}
        {!loading && recommendations.map((college) => (
          <div key={college.id} className="card" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <h2 className="section-title" style={{ fontSize: "1.2rem", margin: 0 }}>
              {college.name}
            </h2>

            <p style={{ color: "#9ca3af", margin: 0, fontSize: "0.9rem" }}>
              📍 {college.location ?? "Location Unknown"}
            </p>
            
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.25rem" }}>
              <span className="badge">⭐ Rating: {college.rating ?? "N/A"}</span>
              <span className="badge">
                💰 Fees: {
                  typeof college.fees === "object" 
                    ? `₹${college.fees?.tuition ?? college.fees?.total ?? "N/A"}`
                    : (college.fees ? `₹${college.fees}` : "N/A")
                }
              </span>
            </div>

            {college.courses && (
              <p style={{ marginTop: "0.5rem", fontSize: "0.85rem", color: "#d1d5db" }}>
                <strong>Available Streams:</strong> {Array.isArray(college.courses) ? college.courses.join(", ") : college.courses}
              </p>
            )}
          </div>
        ))}
      </div>
    </main>
  );
};

export default PredictorPage;