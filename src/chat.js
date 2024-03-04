import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const Chat = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // 서버 주소는 환경에 맞게 조정
    const newSocket = io(`https://sprightly-sprite-1f8722.netlify.app/`);
    setSocket(newSocket);

    // 메시지 수신 이벤트 핸들러
    const messageHandler = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    newSocket.on("chat message", messageHandler);

    // 컴포넌트 언마운트 시 리소스 정리
    return () => {
      newSocket.off("chat message", messageHandler);
      newSocket.close();
    };
  }, []);

  //   const sendMessage = (e) => {
  //     e.preventDefault();
  //     if (socket && input.trim()) {
  //       socket.emit("chat message", input);
  //       // 메시지 배열에 새 메시지를 추가
  //       setMessages((prevMessages) => [...prevMessages, input]);
  //       setInput("");
  //     }
  //   };
  const sendMessage = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      try {
        // Netlify Function을 호출
        const response = await fetch("/.netlify/functions/ch", {
          method: "POST",
          body: JSON.stringify({ message: input }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const result = await response.json();
          setMessages((prevMessages) => [...prevMessages, result.message]); // 서버 응답을 messages 배열에 추가
          // 결과를 사용하여 UI를 업데이트
          console.log(result);
        } else {
          console.error("Function call failed");
        }
      } catch (error) {
        console.error("Error calling function:", error);
      }

      setInput("");
    }
  };

  console.log(messages);

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input value={input} onChange={(e) => setInput(e.target.value)} autoComplete="off" />
        <button type="submit">보내기</button>
      </form>
    </div>
  );
};

export default Chat;
