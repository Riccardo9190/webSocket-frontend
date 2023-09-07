import { Dispatch, SetStateAction } from "react";
import { Topic } from "./Home";

type TopicsListProps = {
  topics: Topic[];
  setTopics: Dispatch<SetStateAction<Topic[]>>;
  setOpenTopic: Dispatch<SetStateAction<Topic | null>>;
};

export default function TopicsList({
  topics,
  setTopics,
  setOpenTopic,
}: TopicsListProps) {
  async function deleteTopic(id: string) {
    await fetch(`${import.meta.env.VITE_API_URL}/topics/${id}`, {
      method: "DELETE",
    });

    const updateTopics = topics.filter((t) => t._id !== id);
    setTopics(updateTopics);
  }

  return (
    <main id="topics">
      {topics.length === 0 ? (
        <h3>Parece que não tem nada aqui...</h3>
      ) : (
        topics.map((topic) => (
          <div className="topic">
            <h2>{topic.title}</h2>
            <div>
              <button onClick={() => setOpenTopic(topic)}>
                Entrar na sala
              </button>
              <button onClick={() => deleteTopic(topic._id)}>Excluir</button>
            </div>
          </div>
        ))
      )}
    </main>
  );
}
