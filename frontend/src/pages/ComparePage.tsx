
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadFromStorage, saveToStorage } from "../utils/storage";
import { getColleges } from "../services/college";

const ComparePage = () => {
  const [allColleges, setAllColleges] = useState<any[]>([]);
  const [compareIds, setCompareIds] = useState<number[]>(
    loadFromStorage<number[]>("compareColleges", [])
  );

  useEffect(() => {
    getColleges().then(setAllColleges);
  }, []);

  const selected = allColleges.filter((college) =>
    compareIds.includes(college.id)
  );

  const removeFromCompare = (id: number) => {
    const next = compareIds.filter((value) => value !== id);
    saveToStorage("compareColleges", next);
    setCompareIds(next);
  };

  if (selected.length === 0) {
    return (
      <main className="page-shell">
        <h1 className="section-title">Compare Colleges</h1>
        <div className="alert-box">
          Select up to 3 colleges from the home page to compare them side by side.
        </div>
        <div style={{ marginTop: "1.5rem" }}>
          <Link className="button" to="/">
            Browse colleges
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <h1 className="section-title">Compare Colleges</h1>

      <div className="table-wrapper">
        <table className="compare-table">
          <thead>
            <tr>
              <th>Feature</th>
              {selected.map((college) => (
                <th key={college.id}>{college.name}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Location</td>
              {selected.map((c) => (
                <td key={c.id}>{c.location}</td>
              ))}
            </tr>

            <tr>
              <td>Fees</td>
              {selected.map((c) => (
                <td key={c.id}>{c.fees?.total ?? "N/A"}</td>
              ))}
            </tr>

            <tr>
              <td>Rating</td>
              {selected.map((c) => (
                <td key={c.id}>{c.rating}</td>
              ))}
            </tr>

            <tr>
              <td>Top course</td>
              {selected.map((c) => (
                <td key={c.id}>{c.courses?.[0]}</td>
              ))}
            </tr>

            <tr>
              <td>Top companies</td>
              {selected.map((c) => (
                <td key={c.id}>
                  {c.placements?.[0]?.topCompanies?.join(", ") ?? "N/A"}
                </td>
              ))}
            </tr>

            <tr>
              <td>Actions</td>
              {selected.map((c) => (
                <td key={c.id}>
                  <button
                    className="outline-button small-button"
                    onClick={() => removeFromCompare(c.id)}
                  >
                    Remove
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <p className="footer-note">
        You can compare up to 3 colleges at once.
      </p>
    </main>
  );
};

export default ComparePage;