import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadFromStorage, saveToStorage } from "../utils/storage";

type Props = {
  currentUser: string | null;
};

const SavedPage = ({ currentUser }: Props) => {
  const [colleges, setColleges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const savedIds = loadFromStorage<string[]>("savedColleges", []);
  const compareIds = loadFromStorage<string[]>("compareColleges", []);

  useEffect(() => {
    fetch("http://localhost:5000/api/colleges")
      .then((res) => res.json())
      .then((data) => {
        setColleges(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const savedColleges = colleges.filter((college) =>
    savedIds.includes(college.id)
  );

  const compareColleges = colleges.filter((college) =>
    compareIds.includes(college.id)
  );

  const removeSaved = (id: string) => {
    const next = savedIds.filter((value) => value !== id);
    saveToStorage("savedColleges", next);
    window.location.reload();
  };

  const removeCompare = (id: string) => {
    const next = compareIds.filter((value) => value !== id);
    saveToStorage("compareColleges", next);
    window.location.reload();
  };

  if (loading) {
    return (
      <main className="page-shell">
        <h2>Loading...</h2>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <h1 className="section-title">Saved Items</h1>

      {currentUser ? (
        <>
          <div className="card">
            <h2
              className="section-title"
              style={{ fontSize: "1.1rem" }}
            >
              Saved Colleges
            </h2>

            {savedColleges.length === 0 ? (
              <div className="alert-box">
                No saved colleges yet.
              </div>
            ) : (
              savedColleges.map((college) => (
                <div
                  key={college.id}
                  className="card"
                  style={{ marginTop: "1rem" }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <h3>{college.name}</h3>
                      <p>{college.location}</p>
                    </div>

                    <button
                      className="outline-button small-button"
                      onClick={() => removeSaved(college.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div
            className="card"
            style={{ marginTop: "1.5rem" }}
          >
            <h2
              className="section-title"
              style={{ fontSize: "1.1rem" }}
            >
              Selected for Comparison
            </h2>

            {compareColleges.length === 0 ? (
              <div className="alert-box">
                No colleges selected for comparison.
              </div>
            ) : (
              compareColleges.map((college) => (
                <div
                  key={college.id}
                  className="card"
                  style={{ marginTop: "1rem" }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <h3>{college.name}</h3>
                      <p>{college.location}</p>
                    </div>

                    <button
                      className="outline-button small-button"
                      onClick={() =>
                        removeCompare(college.id)
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        <div className="alert-box">
          You need to be logged in to access saved items.
          {" "}
          <Link to="/login">Login / Signup</Link>
        </div>
      )}
    </main>
  );
};

export default SavedPage;