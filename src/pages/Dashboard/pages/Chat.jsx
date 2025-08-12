import docImage from "../../../assets/image-8.png";

export default function Chat() {
  const messages = [
    {
      id: 1,
      text: "Hello! I'm the MyCLNQ Chatbot. How can I help you today?",
      sender: "bot",
      time: "10:30 AM",
    },
    {
      id: 2,
      text: "Hi! I have a question about my account settings.",
      sender: "user",
      time: "10:31 AM",
    },
    {
      id: 3,
      text: "I'd be happy to help you with your account settings. What specifically would you like to know?",
      sender: "bot",
      time: "10:31 AM",
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3 ">
            <img src={docImage} className="w-14 h-16 rounded-full" />
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                MyCLNQ <span className="text-red-500">Health</span> Chatbot
              </h1>
              <p className="text-xs text-gray-600 tracking-wide uppercase">
                Comprehensive Family HealthCare
              </p>
            </div>
          </div>
          <button className="text-sm bg-red-500 rounded-lg px-4 py-2 text-white cursor-pointer border-0 outline-0 hover:bg-red-600 duration-150">
            Login
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === "user"
                  ? "bg-red-500 text-white rounded-br-none"
                  : "bg-white text-gray-800 shadow-sm border border-gray-200 rounded-bl-none"
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p
                className={`text-xs mt-1 ${
                  message.sender === "user" ? "text-blue-100" : "text-gray-500"
                }`}
              >
                {message.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <form className="flex space-x-4">
          <input
            type="text"
            placeholder="Ask me anything about your health"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 focus:outline-none cursor-pointer transition-colors"
          >
            Send
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-2 text-center">
          MyCLNQ Chatbot can make mistakes. Consider checking important
          information.
        </p>
      </div>
    </div>
  );
}
