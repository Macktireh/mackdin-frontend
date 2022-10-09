import React from "react";
import Tippy from "@tippyjs/react";
import { Link, useNavigate } from "react-router-dom";

import IconSVG from "@/widgets/IconSVG";
import LikePostButton from "@/components/homePrivate/LikePostButton";
import PopupPostOrCommentOptionCard from "@/components/homePrivate/PopupPostOptionCard1";
import TooltipCardUser from "@/components/homePrivate/TooltipCardUser";
import ButtonAddComment from "@/components/PostDetails/ButtonAddComment";
import { IUserProfile, IPost } from "@/models";
import { baseURL } from "@/config/axios";
import { dateParserCreated } from "@/utils/dateParser";
import { pathLinkPostDetail, pathLinkProfile } from "@/utils/pathRoute";

type propsTypes = {
  currentUser: IUserProfile | null;
  post: IPost | null;
  users: IUserProfile[] | null;
};

const CardTweet: React.FC<propsTypes> = ({ currentUser, post, users }) => {
  const [authorPost, setAuthorPost] = React.useState<IUserProfile | null>();
  const [tweet, setTweet] = React.useState<IPost | null>();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (currentUser && post && users) {
      if (post.authorDetail.public_id === currentUser.user.public_id) {
        setTimeout(() => setAuthorPost(currentUser), 100);
      } else {
        setTimeout(
          () => setAuthorPost(users.find((u) => u.user.public_id === post.authorDetail.public_id)),
          100
        );
      }
      setTimeout(() => setTweet(post), 100);
    }
  }, [currentUser, post, tweet, users]);

  return (
    <div className="CardTweet">
      <div
        className="click"
        onClick={() => tweet && authorPost && navigate(pathLinkPostDetail(authorPost.pseudo, tweet.publicId))}
      ></div>
      <div className="box-img">
        {!authorPost ? (
          <div className="skeleton-anim"></div>
        ) : (
          <Tippy
            content={<TooltipCardUser authorPost={authorPost} currentUser={currentUser} />}
            interactive={true}
            delay={0}
            hideOnClick={false}
            placement="top"
          >
            <div className="tooltip" tabIndex={0}>
              <Link to={pathLinkProfile(authorPost.pseudo)}>
                <img src={`${baseURL}${authorPost.profilePicture}`} alt="" />
              </Link>
            </div>
          </Tippy>
        )}
      </div>
      <div className="post-main">
        <div className="post-header">
          {!authorPost ? (
            <div className="skeleton-anim"></div>
          ) : (
            <p>
              <Link to={pathLinkProfile(authorPost.pseudo)}>
                <strong>{`${authorPost.user.first_name} ${authorPost.user.last_name}`}</strong>
              </Link>
              <Link to={pathLinkProfile(authorPost.pseudo)}>
                <span>@{authorPost.pseudo}</span>
              </Link>
              <span>·</span>
              <span>{tweet?.created && dateParserCreated(tweet.created)}</span>
            </p>
          )}
          <Tippy
            content={
              <PopupPostOrCommentOptionCard type="post" post={tweet as IPost} currentUser={currentUser} />
            }
            interactive={true}
            trigger="click"
            delay={0}
            placement="top-end"
          >
            <div className="option" tabIndex={0}>
              <IconSVG iconName="3-dot" fill="#919090" />
            </div>
          </Tippy>
        </div>
        <div className="post-content">
          {tweet ? (
            <>
              {tweet.body && (
                <div className="post-text">
                  <p>{tweet.body}</p>
                </div>
              )}
              {tweet.image && (
                <div className="post-img">
                  <img
                    src={tweet.image.includes(baseURL as string) ? tweet.image : baseURL + tweet.image}
                    alt=""
                  />
                </div>
              )}
            </>
          ) : (
            <>
              <div className="skeleton-anim body"></div>
              <div className="skeleton-anim body"></div>
              <div className="skeleton-anim body"></div>
              <div className="skeleton-anim image"></div>
            </>
          )}
          <div className="post-footer">
            <ButtonAddComment post={tweet as IPost} />
            {/* <div className="reply post-icon">
              <IconSVG iconName="reply" fill="#919090" />
              <span>{tweet?.numberComments}</span>
            </div> */}
            <div className="retweet post-icon">
              <IconSVG iconName="retweet" fill="#919090" />
              <span>18</span>
            </div>
            <LikePostButton type="post" currentUser={currentUser} post={tweet as IPost} isDisplayNumLike={true} />
            <div className="share post-icon">
              <IconSVG iconName="share" fill="#919090" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTweet;
