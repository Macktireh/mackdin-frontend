import React from "react";

import Picker, { IEmojiData } from "emoji-picker-react";

import IconSVG from "@/widgets/IconSVG";
import ButtonCoustom from "@/widgets/ButtonCustom";
import { bodyStateType, emojiStateType, IUserProfile, editBodyStateType, commentImageStateType, } from "@/models";
import { baseURL } from "@/config/axios";
import { Link } from "react-router-dom";
import { pathLinkProfile } from "@/utils/pathRoute";
import { useComment } from "@/context/CommentProvider";
import { commentImagePreviewStateType } from '../../models/postAndComment';

type propsTypes = {
  nameClass: string;
  postPublicId?: string;
  currentUser: IUserProfile | null;
  bodyState: bodyStateType;
  emojiState: emojiStateType;
  imageState: commentImageStateType;
  imagePreviewState: commentImagePreviewStateType;
  isEditState: { isEditing: boolean; setIsEditing: () => void };
  editBodyState: editBodyStateType;
  editImage: File | null;
  onEmojiClick: (e: React.MouseEvent<Element, MouseEvent>, emojiObject: IEmojiData) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  resetImage: () => void;
};

const AddNewComment: React.FC<propsTypes> = ({
  nameClass,
  postPublicId,
  currentUser,
  bodyState,
  emojiState,
  imageState,
  imagePreviewState,
  isEditState,
  editBodyState,
  editImage,
  onEmojiClick,
  handleSubmit,
  resetImage,
}) => {
  const { body, setBody } = bodyState;
  const { chosenEmoji, setChosenEmoji } = emojiState;
  const { commentImage, handleChangeImage } = imageState;
  const { editBody, setEditBody } = editBodyState;
  const imageInputRef = React.useRef<HTMLInputElement>(null);

  const textareaAutoSize = (el: HTMLElement) => {
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  React.useEffect(() => {
    const textarea = document.getElementById(nameClass);
    if (textarea) {
      textarea.addEventListener("input", () => textareaAutoSize(textarea));
      textarea.addEventListener("focus", () => textareaAutoSize(textarea));
    }
  });

  const resetInputFile = async () => {
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  return (
    <div className="AddNewPost">
      <div className="box-img">
        <Link to={pathLinkProfile(currentUser?.pseudo as string)}>
          <img
            src={
              currentUser?.profilePicture
                ? baseURL + currentUser.profilePicture
                : baseURL + "/mediafiles/default/profilePic.png"
            }
            alt=""
          />
        </Link>
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="textarea-image">
          <textarea
            id={nameClass}
            placeholder="Tweet your reply"
            value={isEditState.isEditing ? editBody : body}
            onChange={(e) => (isEditState.isEditing ? setEditBody(e.target.value) : setBody(e.target.value))}
          />
          {imagePreviewState.commentImagePreview && (
            <div className="img-preview-container">
              <img src={imagePreviewState.commentImagePreview} alt="imagePostPreview" />
              <div className="close" onClick={() => resetImage()}>
                <IconSVG iconName="close" />
              </div>
            </div>
          )}
        </div>
        <div className="form-btn">
          <div className="input-icon">
            <label htmlFor="file" className="form-lable">
              <input
                type="file"
                name="img"
                id="file"
                className="form-input-file"
                hidden
                onChange={(e) => handleChangeImage(e)}
                onClick={resetInputFile}
                ref={imageInputRef}
              />
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
          </div>
          <div className="box-btn">
            <ButtonCoustom
              text="Reply"
              isDisabled={
                isEditState.isEditing ? (editBody || editImage ? false : true) : body || commentImage ? false : true
              }
            />
          </div>
        </div>
        <div className="emojiPicker">
          {chosenEmoji && <Picker onEmojiClick={onEmojiClick} searchPlaceholder="Search Emoji" />}
        </div>
      </form>
    </div>
  );
};

type PropsLogicalType = { nameClass: string };

const AddNewCommentLogical: React.FC<PropsLogicalType> = ({ nameClass }) => {
  const propsContext = useComment();
  const currentUser = propsContext?.currentUser as IUserProfile;
  const bodyState = propsContext?.bodyState as bodyStateType;
  const emojiState = propsContext?.emojiState as emojiStateType;
  const imageState = propsContext?.commentImageState as commentImageStateType;
  const imagePreviewState = propsContext?.CommentimagePreviewState as commentImagePreviewStateType;
  const isEditState = propsContext?.isEditState as { isEditing: boolean; setIsEditing: () => void };
  const editBodyState = propsContext?.editBodyState as editBodyStateType;
  const editImage = propsContext?.commentEditImage as File | null;
  const onEmojiClick = propsContext?.onEmojiClick as (
    e: React.MouseEvent<Element, MouseEvent>,
    emojiObject: IEmojiData
  ) => void;
  const handleSubmit = propsContext?.handleSubmit as (e: React.FormEvent<HTMLFormElement>) => void;
  const resetImage = propsContext?.resetImage as () => void;

  return (
    <AddNewComment
      nameClass={nameClass}
      currentUser={currentUser}
      bodyState={bodyState}
      emojiState={emojiState}
      imageState={imageState}
      imagePreviewState={imagePreviewState}
      isEditState={isEditState}
      editBodyState={editBodyState}
      editImage={editImage}
      onEmojiClick={onEmojiClick}
      handleSubmit={handleSubmit}
      resetImage={resetImage}
    />
  );
};

export default AddNewCommentLogical;
