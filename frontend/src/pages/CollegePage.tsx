import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getColleges } from "../services/college";
import { loadFromStorage, saveToStorage } from "../utils/storage";

const CollegePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [college, setCollege] = useState<any>(null);

  const savedIds = loadFromStorage<number[]>("savedColleges", []);
  const compareIds = loadFromStorage<number[]>("compareColleges", []);

  useEffect(() => {
    getColleges().then((data) => {
      const found = data.find((c: any) => c.id === id);
      setCollege(found);
    });
  }, [id]);

  if (!college) {
    return (
      <main className="page-shell">
        <div className="alert-box">Loading...</div>
      </main>
    );
  }

  const toggleSave = () => {
    const next = savedIds.includes(college.id)
      ? savedIds.filter((v) => v !== college.id)
      : [...savedIds, college.id];

    saveToStorage("savedColleges", next);
  };

  const toggleCompare = () => {
    const next = compareIds.includes(college.id)
      ? compareIds.filter((v) => v !== college.id)
      : [...compareIds, college.id].slice(0, 3);

    saveToStorage("compareColleges", next);
  };

  return (
    <main className="page-shell">
      <button className="outline-button" onClick={() => navigate(-1)}>
        Back
      </button>

      <div className="section-grid" style={{ marginTop: "1.5rem" }}>
        <div className="details-card">
          <h1 className="section-title">{college.name}</h1>
          <p className="badge">{college.location}</p>

          <div className="label-row" style={{ marginTop: "1rem" }}>
            <span className="badge">Rating: {college.rating}</span>
            <span className="badge">Fees: {college.fees?.total}</span>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <button onClick={toggleSave}>Save</button>
            <button onClick={toggleCompare}>Compare</button>
          </div>

          <p style={{ marginTop: "1.5rem" }}>{college.overview}</p>
        </div>
      </div>
    </main>
  );
};

export default CollegePage;