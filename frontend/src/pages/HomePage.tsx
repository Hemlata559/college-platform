import { useEffect, useMemo, useState } from "react";
import CollegeCard from "../components/CollegeCard";
import { loadFromStorage, saveToStorage } from "../utils/storage";

const HomePage = () => {
  const [colleges, setColleges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [page, setPage] = useState(1);

  const [savedIds, setSavedIds] = useState<string[]>(
    loadFromStorage<string[]>("savedColleges", [])
  );

  const [compareIds, setCompareIds] = useState<string[]>(
    loadFromStorage<string[]>("compareColleges", [])
  );

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        //changed to work on deploy as well
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const response = await fetch(
           `${apiUrl}/api/colleges`
        );

        const data = await response.json();

        setColleges(data);
      } catch (error) {
        console.error("Failed to fetch colleges:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  const filteredColleges = useMemo(() => {
    return colleges.filter((college) => {
      const matchesQuery = query
        ? college.name
            ?.toLowerCase()
            .includes(query.toLowerCase())
        : true;

      const matchesLocation = locationFilter
        ? college.location
            ?.toLowerCase()
            .includes(locationFilter.toLowerCase())
        : true;

      const matchesRating = ratingFilter
        ? college.rating >= Number(ratingFilter)
        : true;

      return (
        matchesQuery &&
        matchesLocation &&
        matchesRating
      );
    });
  }, [colleges, query, locationFilter, ratingFilter]);

  const pageSize = 4;

  const visibleColleges = filteredColleges.slice(
    0,
    page * pageSize
  );


  const hasMore =
    visibleColleges.length < filteredColleges.length;

  console.log("compareIds:",compareIds);

  

  const toggleSaved = (id: string) => {
    const next = savedIds.includes(id)
      ? savedIds.filter((value) => value !== id)
      : [...savedIds, id];

    setSavedIds(next);
    saveToStorage("savedColleges", next);
  };

  const toggleCompare = (id: string) => {
    if (
      !compareIds.includes(id) &&
      compareIds.length >= 3
    ) {
      alert("You can compare up to 3 colleges only.");
      return;
    }

    const next = compareIds.includes(id)
      ? compareIds.filter((value) => value !== id)
      : [...compareIds, id];

    setCompareIds(next);
    saveToStorage("compareColleges", next);
  };

  if (loading) {
    return (
      <main className="page-shell">
        <h2>Loading colleges...</h2>
      </main>
    );
  }
  

  return (
    
    <main className="page-shell">
      <section className="hero-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'center' }}>
        <div>
          <h1>Find Your Perfect College</h1>
          <p>
            Compare colleges across the nation, explore official data ratings, 
            analyze real fee matrices, and let smart intelligence discover the 
            ideal institution for your future path.
          </p>
        </div>
        
        {/* Dynamic visual metric badges to populate the hero's right side panel */}
        <div className="grid-2" style={{ gap: '1rem' }}>
          <div className="card" style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.75rem', color: '#06b6d4', fontWeight: 800 }}>500+</h3>
            <span style={{ fontSize: '0.85rem', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase' }}>Verified Institutions</span>
          </div>
          <div className="card" style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.75rem', color: '#4f46e5', fontWeight: 800 }}>100%</h3>
            <span style={{ fontSize: '0.85rem', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase' }}>Rank Matrix Match</span>
          </div>
        </div>
      </section>
      <h1 className="section-title">
        College Listing
      </h1>

      <div className="card">
        <div className="grid-3 field-row">
          <div className="field">
            <label htmlFor="query">
              Search by college
            </label>

            <input
              id="query"
              value={query}
              onChange={(event) =>
                setQuery(event.target.value)
              }
              placeholder="Search college"
            />
          </div>

          <div className="field">
            <label htmlFor="location">
              Location
            </label>

            <input
              id="location"
              value={locationFilter}
              onChange={(event) =>
                setLocationFilter(event.target.value)
              }
              placeholder="City or state"
            />
          </div>

          <div className="field">
            <label htmlFor="rating">
              Minimum rating
            </label>

            <select
              id="rating"
              value={ratingFilter}
              onChange={(event) =>
                setRatingFilter(event.target.value)
              }
            >
              <option value="">Any</option>
              <option value="4">4.0+</option>
              <option value="4.3">4.3+</option>
              <option value="4.5">4.5+</option>
            </select>
          </div>
        </div>
      </div>

      <div
      
        className="section-grid"
        style={{ marginTop: "1.5rem" }}
      >
        {visibleColleges.length === 0 ? (
          <div className="alert-box">
            No colleges found.
          </div>
        ) : (
          visibleColleges.map((college) => (
            <CollegeCard
              key={college.id}
              id={college.id}
              name={college.name}
              location={college.location}
              fees={
                typeof college.fees === "object"
                  ? `₹${college.fees?.tuition ?? "N/A"}`
                  : college.fees
              }
              rating={college.rating}
              isSaved={savedIds.includes(college.id)}
              isCompared={compareIds.includes(college.id)}
              
              onToggleSave={() =>
                toggleSaved(college.id)
              }
              onToggleCompare={() =>
                toggleCompare(college.id)
              }
            />
          ))
        )}
      </div>
      
      

      {hasMore && (
        <div style={{ marginTop: "1.5rem" }}>
          <button
            className="button"
            onClick={() => setPage(page + 1)}
          >
            Load More Colleges
          </button>
        </div>
      )}
    </main>
  );
};

export default HomePage;
