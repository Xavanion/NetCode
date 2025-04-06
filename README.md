# 🧠 Collaborative Code Editor

A real-time collaborative code editor built with **React**, using a **rope data structure** for efficient text updates and **WebSockets** for live synchronization between users. Features markdown-rendered code reviews, and a responsive layout.

---

## 🚀 Features

- ✍️ Real-time collaborative editing powered with `rope-sequence`
- 🔄 Efficient diffing via custom insert/delete operations
- 🌐 WebSocket-based sync for multi-user collaboration
- 👨‍💻 Switch between terminal output and AI-based code review
- 📝 Markdown rendering for code review output
- 🎨 Modern, responsive UI with modular component structure

---

## 📁 Project Structure
 - real-time-app: The front end of the code where the site communicates with the backend and displays the code to the user
 - backend: Where the websocket server lives and communicates with Gemini
 
