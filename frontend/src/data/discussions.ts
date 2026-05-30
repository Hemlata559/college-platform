import type { DiscussionTopic } from "../types/discussion";

export const defaultDiscussions: DiscussionTopic[] = [
  {
    id: 1,
    question: "What are the best colleges for computer science?",
    details: "I want a college with strong placements and research opportunities.",
    answers: [
      { id: 1, author: "Aditi", text: "IIT Delhi and NIT Trichy are both excellent for placements." },
      { id: 2, author: "Rohan", text: "DTU is also good if you want strong industry connections in Delhi." },
    ],
  },
  {
    id: 2,
    question: "How do placements at SRM compare to BMSCE?",
    details: "I want to know which college offers more stable placements in the Chennai/Bangalore area.",
    answers: [
      { id: 3, author: "Sneha", text: "SRM has more campus drive volume, but BMSCE offers better average packages in engineering." },
    ],
  },
];
