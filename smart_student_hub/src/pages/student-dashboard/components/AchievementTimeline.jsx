import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const initialForm = {
  title: "",
  type: "competition",
  description: "",
  date: "",
  issuingAuthority: "",
  proofUrl: "",
  tags: ""
};

const AchievementTimeline = ({ achievements = [], onAddAchievement, loading }) => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Status color mapping (only model enums)
  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "text-success bg-success/10";
      case "pending":
        return "text-warning bg-warning/10";
      case "rejected":
        return "text-error bg-error/10";
      default:
        return "text-muted-foreground bg-muted/10";
    }
  };

  // Map types to icons
  const getTypeIcon = (type) => {
    switch (type) {
      case "conference":
        return "Users";
      case "workshop":
        return "Lightbulb";
      case "certification":
        return "Award";
      case "club":
        return "Users2";
      case "volunteering":
        return "Heart";
      case "internship":
        return "Briefcase";
      case "competition":
        return "Trophy";
      case "leadership":
        return "Star";
      default:
        return "Circle";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // POST form data to backend
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!form.title || !form.type || !form.date || !form.issuingAuthority) {
      setFormError("Please fill all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem("token") || Cookies.get("token");

      // Convert tags to array
      const payload = {
        ...form,
        tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : []
      };

      const res = await axios.post(`${API_BASE}/achievements`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (onAddAchievement) {
        await onAddAchievement(res.data);
      }

      setShowForm(false);
      setForm(initialForm);
    } catch (err) {
      setFormError(err.response?.data?.message || "Failed to add achievement.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">
          Recent Achievements
        </h2>
        <Button
          variant="outline"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          onClick={() => setShowForm(!showForm)}
        >
          Add Achievement
        </Button>
      </div>

      {/* Inline Add Achievement Form */}
      {showForm && (
        <form
          onSubmit={handleFormSubmit}
          className="mb-6 p-4 bg-muted rounded-xl space-y-3"
        >
          {formError && (
            <div className="text-red-500 text-sm">{formError}</div>
          )}

          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              name="title"
              placeholder="Title*"
              value={form.title}
              onChange={handleFormChange}
              className="border p-2 rounded flex-1"
              required
            />
            <select
              name="type"
              value={form.type}
              onChange={handleFormChange}
              className="border p-2 rounded flex-1"
              required
            >
              <option value="conference">Conference</option>
              <option value="workshop">Workshop</option>
              <option value="certification">Certification</option>
              <option value="club">Club</option>
              <option value="volunteering">Volunteering</option>
              <option value="internship">Internship</option>
              <option value="competition">Competition</option>
              <option value="leadership">Leadership</option>
            </select>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleFormChange}
              className="border p-2 rounded flex-1"
              required
            />
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              name="issuingAuthority"
              placeholder="Issuing Authority*"
              value={form.issuingAuthority}
              onChange={handleFormChange}
              className="border p-2 rounded flex-1"
              required
            />
            <input
              type="url"
              name="proofUrl"
              placeholder="Proof URL (optional)"
              value={form.proofUrl}
              onChange={handleFormChange}
              className="border p-2 rounded flex-1"
            />
          </div>

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleFormChange}
            className="border p-2 rounded w-full"
            rows={2}
          />

          <input
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            value={form.tags}
            onChange={handleFormChange}
            className="border p-2 rounded w-full"
          />

          <div className="flex gap-2">
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      {/* Timeline */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center text-muted-foreground py-8">
            Loading achievements...
          </div>
        ) : achievements && achievements.length > 0 ? (
          achievements.map((achievement, index) => (
            <div
              key={achievement?._id || index}
              className="relative"
            >
              {index < achievements.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-16 bg-border"></div>
              )}

              <div className="flex gap-4">
                {/* Timeline dot */}
                <div className="flex-shrink-0 w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                  <Icon
                    name={getTypeIcon(achievement?.type)}
                    size={20}
                    className="text-accent"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground mb-1">
                        {achievement?.title}
                      </h3>
                      {achievement?.description && (
                        <p className="text-sm text-muted-foreground mb-2">
                          {achievement?.description}
                        </p>
                      )}
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-xs text-muted-foreground">
                          {formatDate(achievement?.date)}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(
                            achievement?.status
                          )}`}
                        >
                          {achievement?.status}
                        </span>
                        {achievement?.issuingAuthority && (
                          <span className="text-xs text-muted-foreground">
                            {achievement.issuingAuthority}
                          </span>
                        )}
                        {achievement?.proofUrl && (
                          <div className="flex items-center gap-1">
                            <Icon
                              name="Paperclip"
                              size={12}
                              className="text-muted-foreground"
                            />
                            <a
                              href={achievement.proofUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-muted-foreground underline"
                            >
                              proof
                            </a>
                          </div>
                        )}
                        {achievement?.tags?.length > 0 && (
                          <span className="text-xs text-primary">
                            #{achievement.tags.join(" #")}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted-foreground py-8">
            No achievements found.
          </div>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <Button
          variant="ghost"
          fullWidth
          iconName="ArrowRight"
          iconPosition="right"
          onClick={() => navigate("/achievement-tracker")}
        >
          View All Achievements
        </Button>
      </div>
    </div>
  );
};

export default AchievementTimeline;
