import React from "react";

import IconSVG from "@/widgets/IconSVG";
import { IAuthUserProfile, IPost } from "@/models";
import { baseURL } from "@/config/axios";
import { dateParserCreated } from "@/utils/dateParser";

type PropsType = {
  currentUser: IAuthUserProfile | null;
  post: IPost | null;
  users: IAuthUserProfile[] | null;
};

const CardTweet: React.FC<PropsType> = ({ currentUser, post, users }) => {
  const [isLiked, setIsLked] = React.useState(false);

  const handlLiked = async () => {
    await setIsLked(!isLiked);
  };

  return (
    <div className="CardTweet">
      <div className="box-img">
        {post?.authorDetail.public_id === currentUser?.user.public_id
          ?  <img src={`${baseURL}${currentUser?.profilePicture}`} alt="" />
          : users?.map(
              (u) => u.user.public_id === post?.authorDetail.public_id && <img src={`${baseURL}${u.profilePicture}`} alt="" />
            )}
        
      </div>
      <div className="post-main">
        <div className="post-header">
          <p>
            <strong>{
            post?.authorDetail.public_id === currentUser?.user.public_id ? (
              `${currentUser?.user.first_name} ${currentUser?.user.last_name}`
            ) : (
              `${post?.authorDetail.first_name} ${post?.authorDetail.last_name}`
            )
            }</strong>
            {post?.authorDetail.public_id === currentUser?.user.public_id ? (
              <span>@{currentUser?.pseudo}</span>
            ) : (
              users?.map((u) => u.user.public_id === post?.authorDetail.public_id && <span>@{u.pseudo}</span>)
            )}
            <span>·</span>
            <span>{post?.created && dateParserCreated(post.created)}</span>
          </p>
          <IconSVG key="dot" iconName="3-dot" fill="#919090" />
        </div>
        <div className="post-content">
          <div className="post-text">
            <p>{post?.body}</p>
          </div>
          <div className="post-img">
            <img src={post?.image} alt="" />
          </div>
          <div className="post-footer">
            <div className="reply post-icon">
              <IconSVG key="reply" iconName="reply" fill="#919090" />
              <span>{post?.comments.length}</span>
            </div>
            <div className="retweet post-icon">
              <IconSVG key="retweet" iconName="retweet" fill="#919090" />
              <span>18</span>
            </div>
            <div className="like-unLike post-icon" onClick={() => handlLiked()}>
              {isLiked ? (
                <IconSVG key="like" iconName="like" fill="#F91880" handleClick={() => handlLiked()} />
              ) : (
                <IconSVG key="unlike" iconName="unLike" fill="#919090" handleClick={() => handlLiked()} />
              )}
              <span className={isLiked ? "like" : ""} onClick={() => handlLiked()}>
                {post?.liked.length}
              </span>
            </div>
            <div className="share post-icon">
              <IconSVG key="share" iconName="share" fill="#919090" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTweet;