import { useState } from "react";
import type { FormEvent } from "react";
import { defaultDiscussions } from "../data/discussions";
import type { DiscussionTopic } from "../types/discussion";
import { loadFromStorage, saveToStorage } from "../utils/storage";

const DiscussionsPage = () => {
  const [question, setQuestion] = useState("");
  const [details, setDetails] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyTarget, setReplyTarget] = useState<number | null>(null);
  const [discussions, setDiscussions] = useState<DiscussionTopic[]>(() =>
    loadFromStorage<DiscussionTopic[]>("discussions", defaultDiscussions)
  );

  const addQuestion = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!question.trim()) {
      return;
    }

    const next = [
      {
        id: discussions.length + 1,
        question: question.trim(),
        details: details.trim(),
        answers: [],
      },
      ...discussions,
    ];

    saveToStorage("discussions", next);
    setDiscussions(next);
    setQuestion("");
    setDetails("");
  };

  const addReply = (topicId: number) => {
    if (!replyText.trim()) {
      return;
    }

    const next = discussions.map((topic) => {
      if (topic.id !== topicId) return topic;
      return {
        ...topic,
        answers: [
          ...topic.answers,
          { id: topic.answers.length + 1, author: "Guest", text: replyText.trim() },
        ],
      };
    });

    saveToStorage("discussions", next);
    setDiscussions(next);
    setReplyText("");
    setReplyTarget(null);
  };

  return (
    <main className="page-shell">
      <h1 className="section-title">Q&A Discussion</h1>
      <div className="card">
        <form onSubmit={addQuestion} className="field-row">
          <div className="field">
            <label htmlFor="question">Ask a question</label>
            <input
              id="question"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="What do you want to ask?"
            />
          </div>
          <div className="field">
            <label htmlFor="details">Details</label>
            <textarea
              id="details"
              value={details}
              onChange={(event) => setDetails(event.target.value)}
              placeholder="Add some context or preferences"
              rows={3}
            />
          </div>
          <div className="field" style={{ alignSelf: "end" }}>
            <button className="button" type="submit">
              Post question
            </button>
          </div>
        </form>
      </div>

      <div className="section-grid">
        {discussions.map((topic) => (
          <div key={topic.id} className="card">
            <h2 className="section-title" style={{ fontSize: "1.2rem" }}>{topic.question}</h2>
            <p style={{ margin: "0.75rem 0" }}>{topic.details}</p>
            <div className="label-row">
              <span className="badge">{topic.answers.length} answers</span>
            </div>

            {topic.answers.length > 0 && (
              <div style={{ marginTop: "1rem" }}>
                {topic.answers.map((answer) => (
                  <div key={answer.id} className="card" style={{ padding: "1rem", marginTop: "0.75rem" }}>
                    <p style={{ margin: 0, fontWeight: 700 }}>{answer.author}</p>
                    <p style={{ marginTop: "0.5rem" }}>{answer.text}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="field-row" style={{ marginTop: "1rem" }}>
              <button
                type="button"
                className="outline-button small-button"
                onClick={() => setReplyTarget(replyTarget === topic.id ? null : topic.id)}
              >
                {replyTarget === topic.id ? "Hide reply" : "Answer"}
              </button>
            </div>

            {replyTarget === topic.id && (
              <div style={{ marginTop: "1rem" }}>
                <textarea
                  value={replyText}
                  onChange={(event) => setReplyText(event.target.value)}
                  rows={3}
                  placeholder="Write your answer"
                  className="field"
                />
                <button className="button small-button" type="button" onClick={() => addReply(topic.id)}>
                  Submit reply
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
};

export default DiscussionsPage;
