import React from "react";

const AchievementsSection = ({ achievements, studentName }) => {
  if (!achievements || achievements.length === 0) {
    return (
      <div className="bg-card border border-border rounded-2xl p-6 shadow">
        <h2 className="text-xl font-semibold text-foreground mb-4">Achievements</h2>
        <p className="text-muted-foreground">{studentName} has no achievements yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow">
      <h2 className="text-xl font-semibold text-foreground mb-4">Achievements</h2>
      <ul className="space-y-4">
        {achievements.map((achievement) => (
          <li
            key={achievement?._id || achievement?.id}
            className="p-4 border border-border rounded-lg bg-background"
          >
            <h3 className="font-semibold text-foreground">
              {achievement?.title || "Untitled"}
            </h3>
            {achievement?.description && (
              <p className="text-muted-foreground text-sm">
                {achievement.description}
              </p>
            )}
            {achievement?.date && (
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(achievement.date).toLocaleDateString()}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AchievementsSection;
