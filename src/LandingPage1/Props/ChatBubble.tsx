import { FC } from "react";
import pix from "../../assets/fb.png";

interface iChat {
    text?: string;
    text2?: string;
    text3?: string;
}

const ChatBubble:FC<iChat> = ({text2,text3,text}) => {
  return (
    <div>
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt="Tailwind CSS chat bubble component" src={pix} />
          </div>
        </div>
        <div className="chat-bubble">
          {text}
        </div>
      </div>
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt="Tailwind CSS chat bubble component" src={pix} />
          </div>
        </div>
        <div className="chat-bubble">
          {text2}
        </div>
      </div>
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt="Tailwind CSS chat bubble component" src={pix} />
          </div>
        </div>
        <div className="chat-bubble">{text3}</div>
      </div>
    </div>
  );
};

export default ChatBubble;
