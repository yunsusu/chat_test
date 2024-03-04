import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "react-chat-elements/dist/main.css";
import {
  Avatar,
  Button,
  ChatItem,
  ChatList,
  Dropdown,
  Input,
  LocationMessage,
  MeetingItem,
  MeetingLink,
  // MeetingMessage,
  MessageBox,
  MessageList,
  Navbar,
  Popup,
  // Sidebar,
  SpotifyMessage,
  SystemMessage,
} from "react-chat-elements";
import { ChatEngine } from "react-chat-engine";

const socket = io("http://localhost:3000");

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const inputValue = "";

  const messageListReferance = React.createRef();
  const inputReferance = React.createRef();
  useEffect(() => {
    const receiveMessage = (msg) => {
      setChat((prevChat) => [...prevChat, msg]);
    };

    socket.on("chat message", receiveMessage);

    return () => {
      socket.off("chat message", receiveMessage);
    };
  }, []);

  // const sendMessage = (e) => {
  //   e.preventDefault();
  //   if (message !== "") {
  //     socket.emit("chat message", message);
  //     setMessage("");
  //   }
  // };
  console.log(chat);
  return (
    // <div>
    //   <ul>
    //     {chat.map((msg, index) => (
    //       <li key={index}>{msg}</li>
    //     ))}
    //   </ul>
    //   <form onSubmit={sendMessage}>
    //     <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
    //     <button type="submit">보내기</button>
    //   </form>
    // </div>
    <>
      <ChatItem
        avatar={"https://facebook.github.io/react/img/logo.svg"}
        alt={"Reactjs"}
        title={"Facebook"}
        subtitle={"What are you doing?"}
        date={new Date()}
        unread={0}
      />
      <MessageBox
        position={"left"}
        type={"photo"}
        text={"react.svg"}
        data={{
          uri: "https://facebook.github.io/react/img/logo.svg",
          status: {
            click: false,
            loading: 0,
          },
        }}
      />
      <MessageBox
        reply={{
          photoURL: "https://facebook.github.io/react/img/logo.svg",
          title: "elit magna",
          titleColor: "#8717ae",
          message: "Aliqua amet incididunt id nostrud",
        }}
        onReplyMessageClick={() => console.log("reply clicked!")}
        position={"left"}
        type={"text"}
        text={"Tempor duis do voluptate enim duis velit veniam aute ullamco dolore duis irure."}
      />
      <MeetingLink meetingID="1" title="Lorem ipsum dolor sit amet." />
      <SystemMessage text={"End of conversation"} />
      <MessageList
        referance={messageListReferance}
        className="message-list"
        lockable={true}
        toBottomHeight={"100%"}
        dataSource={[
          {
            position: "right",
            type: "text",
            text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
            date: new Date(),
          },
          {
            position: "right",
            type: "text",
            text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
            date: new Date(),
          },
          {
            position: "left",
            type: "text",
            text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
            date: new Date() - 10000,
          },
        ]}
      />
      <ChatList
        className="chat-list"
        dataSource={[
          {
            avatar: "https://facebook.github.io/react/img/logo.svg",
            alt: "Reactjs",
            title: "Facebook",
            subtitle: "What are you doing?",
            date: new Date(),
            unread: 0,
          },
          {
            avatar: "https://facebook.github.io/react/img/logo.svg",
            alt: "Reactjs",
            title: "Facebook",
            subtitle: "What are you doing?",
            date: new Date(),
            unread: 0,
          },
          {
            avatar: "https://facebook.github.io/react/img/logo.svg",
            alt: "Reactjs",
            title: "Facebook",
            subtitle: "What are you doing?",
            date: new Date(),
            unread: 0,
          },
        ]}
      />
      <Input
        referance={inputReferance}
        placeholder="Type here..."
        multiline={true}
        value={inputValue}
        rightButtons={<Button color="white" backgroundColor="black" text="Send" />}
      />
      {/* inputClear = () => {}
      <Input clear={(clear) => (inputClear = clear)} placeholder="Type here..." />
      inputClear() */}
      <Button text={"click me!"} />
      <Popup
        show={true}
        header="Lorem ipsum dolor sit amet."
        headerButtons={[
          {
            type: "transparent",
            color: "black",
            text: "close",
            onClick: () => {
              this.setState({ show: false });
            },
          },
        ]}
        text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem animi veniam voluptas eius!"
        footerButtons={[
          {
            color: "white",
            backgroundColor: "#ff5e3e",
            text: "Vazgeç",
          },
          {
            color: "white",
            backgroundColor: "lightgreen",
            text: "Tamam",
          },
        ]}
      />
      <Navbar left={<div>'LEFT' area</div>} center={<div>'CENTER' area</div>} right={<div>'RIGHT' area</div>} />
      <Dropdown
        buttonProps={{
          text: "Dropdown",
        }}
        items={[
          {
            icon: {
              component: <div>sdafa</div>,
              float: "left",
              color: "red",
              size: 22,
            },
            text: "lorem",
          },
          {
            icon: {
              component: <div>sdafa</div>,
              float: "left",
              color: "purple",
              size: 22,
            },
            text: "ipsum",
          },
          {
            text: "dolor",
          },
        ]}
      />
      <Avatar src={"https://facebook.github.io/react/img/logo.svg"} alt={"logo"} size="large" type="circle flexible" />
      <LocationMessage
        data={{
          latitude: "37.773972",
          longitude: "-122.431297",
          // staticURL: '<optional>',
          // mapURL: '<optional>'
        }}
      />
      <SpotifyMessage theme="white" view="coverart" uri={"spotify:user:spotify:playlist:3rgsDhGHZxZ9sB9DQWQfuf"} />
      <MeetingItem
        subject={"New Release!!!"}
        avatars={[
          {
            src: "https://facebook.github.io/react/img/logo.svg",
          },
        ]}
        onMeetingClick={console.log}
        onShareClick={console.log}
        onCloseClick={console.log}
      />
      <ChatEngine publicKey={"956555b7-04bc-4649-b0fe-7cee32239290"} userName={"aa"} userSecret={"aa"} />

      {/* <Sidebar top={<div>'TOP' area</div>} center={<div>'CENTER' area</div>} bottom={<div>'BOTTOM' area</div>} /> */}
      {/* <MeetingMessage
    subject={'New Release'}
    title={'in ullamco'}
    date={new Date()}
    collapseTitle={'Commodo aliquip'}
    participants={[
        {
            id: '1',
            title: 'Facebook',
        },
        
    ]}
    dataSource={[
        {
            id: '1',
            avatar: 'https://facebook.github.io/react/img/logo.svg',
            message: 'Lorem ipsum dolor sit amet.',
            title: 'Elit magna',
            avatarFlexible: true,
            date: new Date(),
            event: {[
                title: 'Toplant sona erdi!',
                avatars={[
                    src: 'https://facebook.github.io/react/img/logo.svg'
                ]},
            ]}
            record: {[
                avatar: 'https://facebook.github.io/react/img/logo.svg',
                title: 'Arama',
                savedBy: 'Kaydeden: Elit magna',
                time: new Date(),
            ]}
        },
    ]} /> */}
    </>
  );
};

export default Chat;
