import React from "react";
import { useAuthStore } from "../store/useAuthStore";

function ChatPage() {
  const { logout } = useAuthStore();

  return (
    <div className="z-10">
      <h1 className="text-3xl font-bold text-white p-3">Welcome to Chatify!</h1>
      <button onClick={logout} className="auth-btn" type="submit" >
        "Logout"
      </button>
    </div>
  );
}

export default ChatPage;
