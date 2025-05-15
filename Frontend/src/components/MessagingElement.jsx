import React, { useEffect, useRef } from 'react';

const MessagingElement = ({
  setMessage,
  message,
  handleMessageSend,
  setMessageCollection, // Fixed typo
  messageCollection,
}) => {
  const messageBoxRef = useRef();

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  // Scroll to the bottom of the message box when new messages are added
  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  }, [messageCollection]);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full flex justify-center items-center border-b border-b-gray-300 py-4">
        <p className="font-bold text-3xl">Drivn Messaging</p>
      </div>
      <div
        className="w-full flex flex-col gap-2 overflow-y-auto flex-1 p-4 my-4 rounded-xl bg-white "
        ref={messageBoxRef}
      >
        {messageCollection.map((message, index) =>
          message.isMe ? (
            <div
              className="w-full flex justify-end items-center"
              key={message.id}
            >
              <p className="bg-gray-300 py-2 px-4 rounded-4xl max-w-[80%] w-fit">{message.msg}</p>
            </div>
          ) : (
            <div
              className="w-full flex justify-start items-center"
              key={message.id}
            >
              <p className="bg-white py-2 px-4 rounded-4xl border border-gray-200 max-w-[80%] w-fit">{message.msg}</p>
            </div>
          )
        )}
      </div>
      <div className="flex w-full gap-2">
        <input
          type="text"
          name="message"
          id="message"
          className="w-2/3 bg-gray-200 px-6 py-4 rounded-full placeholder:text-md"
          placeholder="Write message here"
          value={message}
          onChange={handleMessageChange}
        />
        <button
          className="w-1/3 bg-black text-white px-4 py-4 font-medium rounded-full flex justify-center items-center"
          onClick={() => {
            if (message.trim()) {
              handleMessageSend();
                const messageId = Date.now() + Math.random();
                setMessageCollection((prevMsg) => [
                ...prevMsg,
                { isMe: true, msg: message, id: messageId },
                ]);
              setMessage('');
            }
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessagingElement;