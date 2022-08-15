import * as React from "react";

import Picker, { IEmojiData } from "emoji-picker-react";

import { IAuthUserProfile } from "@/models";
import IconSVG from "@/components/icon/IconSVG";
import Button from "../Buttons/buttonSubmit";

type TcurrentUser = { currentUser: IAuthUserProfile | null };

const AddNewPost: React.FC<TcurrentUser> = ({ currentUser }) => {
  const [textareaValue, setTextareaValue] = React.useState("");
  const [chosenEmoji, setChosenEmoji] = React.useState(false);

  React.useEffect(() => {
    const textarea = document.querySelector("textarea");
    textarea?.addEventListener("input", (e) => {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    });
  });

  const onEmojiClick = (e: React.MouseEvent<Element, MouseEvent>, emojiObject: IEmojiData) => {
    setTextareaValue((value) => value + emojiObject.emoji);
    setChosenEmoji(false);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(textareaValue);
  };

  return (
    <div className="AddNewPost">
      <div className="box-img">
        {currentUser?.profilePicture ? (
          <img src={process.env.REACT_APP_API_URL + currentUser.profilePicture} alt="" />
        ) : (
          <IconSVG iconName="profile" />
        )}
      </div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="textarea">
          <textarea
            is="textarea-autogrow"
            placeholder="What's happening?"
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
          />
        </div>
        <div className="form-btn">
          <div className="input-icon">
            <label htmlFor="file" className="form-lable">
              <input type="file" name="img" id="file" className="form-input-file" hidden />
              <IconSVG iconName="add-post-img" fill="#1d9bf0" />
            </label>
            <IconSVG iconName="gif" fill="#1d9bf0" />
            <IconSVG iconName="pol" fill="#1d9bf0" />
            <IconSVG
              iconName="emoji"
              nameClass="emoji"
              fill="#1d9bf0"
              handleClick={() => setChosenEmoji(!chosenEmoji)}
            />
            <IconSVG iconName="schedule" fill="#1d9bf0" />
            {/* <IconSVG iconName="lieu" fill="#1d9bf0" /> */}
          </div>
          <div className="box-btn" onClick={(e) => {}}>
            <Button text="Tweet" />
          </div>
        </div>
        <div className="emojiPicker">
          {chosenEmoji && <Picker onEmojiClick={onEmojiClick} searchPlaceholder="Search Emoji" />}
        </div>
      </form>
    </div>
  );
};

export default AddNewPost;