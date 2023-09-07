import { createContext, useState } from "react";
import Home from "./components/Home";
import Login from "./components/login";

export type User = {
  _id: string;
  name: string;
};

type UserContextData = {
  user: User | null;
  login: (name: string) => Promise<void>;
  logout: () => void;
};

export const UserContext = createContext<UserContextData>(
  {} as UserContextData
);

function App() {
  const [user, setUser] = useState<User | null>(null);

  async function login(name: string) {
    const apiUrl = import.meta.env.VITE_API_URL;
    const data = await fetch(`${apiUrl}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    }).then((res) => res.json());

    setUser(data);
  }

  function logout() {
    setUser(null);
  }

  return (
    <div className="App">
      <h1>WebSocket</h1>
      <UserContext.Provider value={{ user, login, logout }}>
        {user ? <Home /> : <Login />}
      </UserContext.Provider>
    </div>
  );
}

export default App;
