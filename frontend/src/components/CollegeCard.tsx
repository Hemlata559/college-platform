import { Link } from "react-router-dom";

type Props = {
  id: number;
  name: string;
  location: string;
  fees: string;
  rating: number;
  isSaved?: boolean;
  isCompared?: boolean;
  onToggleSave?: () => void;
  onToggleCompare?: () => void;
};

const CollegeCard = ({
  id,
  name,
  location,
  fees,
  rating,
  isSaved,
  isCompared,
  onToggleSave,
  onToggleCompare,
}: Props) => {
  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "flex-start" }}>
        <div>
          <h2 className="section-title" style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>{name}</h2>
          <p style={{ margin: 0, color: "#64748b" }}>{location}</p>
        </div>
        <span className="badge">⭐ {rating}</span>
      </div>

      <div className="label-row" style={{ marginTop: "1rem" }}>
        <span className="badge">Fees: {fees}</span>
        {isSaved && <span className="badge">Saved</span>}
        {isCompared && <span className="badge">Compare</span>}
      </div>

      <div className="field-row" style={{ marginTop: "1rem" }}>
        <button className="button small-button" onClick={onToggleSave}>
          {isSaved ? "Remove Saved" : "Save College"}
        </button>
        <button className="outline-button small-button" onClick={onToggleCompare}>
          {isCompared ? "Remove Compare" : "Add to Compare"}
        </button>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <Link className="outline-button" to={`/college/${id}`}>
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CollegeCard;