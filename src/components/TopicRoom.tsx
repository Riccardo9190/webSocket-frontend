import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Topic } from "./Home";
import io from "socket.io-client";
import { User, UserContext } from "../App";
import MessageBox from "./MessageBox";

type TopicRoomProps = {
  topic: Topic;
  setOpenTopuc: Dispatch<SetStateAction<Topic | null>>;
};

export type Message = {
  _id: string;
  content: string;
  author?: User;
  createdAt: string;
};

const socket = io(import.meta.env.VITE_API_URL);

export default function TopicRoom({ topic, setOpenTopic }: TopicRoomProps) {
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    loadMessages();
  }, []);

  useEffect(() => {
    socket.emit("join_room", { name: user?.name, topicId: topic._id });

    socket.on("new_message", (newMessage: Message) => {
      setMessages((mostRecentState) => [...mostRecentState, newMessage]);
    });

    return () => {
      socket.emit("leave_room", { name: user?.name, topicId: topic._id });
      socket.off("new_message");
    };
  }, [socket]);

  async function loadMessages() {
    const data = await fetch(
      `${import.meta.env.VITE_API_URL}/topics/${topic._id}`
    ).then((res) => res.json());
    setMessages(data.messages);
  }

  async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    const formData = new FormData(ev.currentTarget);
    const content = formData.get("message")!.toString();
    ev.currentTarget.reset();

    socket.emit("send_message", {
      content,
      author: user,
      topicId: topic._id,
    });
  }

  return (
    <main className="room">
      <header>
        <h2>{topic.title}</h2>
        <button onClick={() => setOpenTopic(null)}>Voltar</button>
      </header>

      <section className="messages">
        {messages.map((message) => (
          <MessageBox message={message} />
        ))}
      </section>

      <form className="send-message-form inline-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="message"
          id="message"
          placeholder="Digite sua mensagem..."
        />
        <button>Enviar</button>
      </form>
    </main>
  );
}
