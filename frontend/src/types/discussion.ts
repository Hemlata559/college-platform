export type DiscussionAnswer = {
  id: number;
  author: string;
  text: string;
};

export type DiscussionTopic = {
  id: number;
  question: string;
  details: string;
  answers: DiscussionAnswer[];
};
