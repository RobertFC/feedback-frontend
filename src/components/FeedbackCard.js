import { MdArrowUpward, MdComment } from 'react-icons/md';
import Tag from './Tag.js';
import { Link } from 'react-router-dom';
import { likeFeedback } from '../Services/feedbacks.js';
import { useState } from 'react';

function FeedbackCard({ feedback, showFullCard, updateLikes }) {
  const { title, likes, content, tag, comments, id } = feedback;
  const [likesLength, setLikesLength] = useState(likes.length);

  const likeHandler = async (e) => {
    e.preventDefault();
    const alreadyLiked = updateLikes(id);
    if (alreadyLiked) setLikesLength(likesLength - 1);
    else setLikesLength(likesLength + 1)
    await likeFeedback(id);
  };

  const cardBody = <>
    <div className="likes" onClick={likeHandler}>
      <i>{MdArrowUpward()}</i>
      {likesLength}
    </div>
    <div className="cardContent">
      <h4>{title}</h4>
      <p className={showFullCard ? '' : 'feedbackCardText'}>{content}</p>
      <Tag tagName={tag} classes={"tag"} />
    </div>

    <div className="comments">
      {MdComment()} {comments.length}
    </div>
  </>

  const link = <Link to={`/feedbackBlog/${id}`} className={"feedbackCard card"}>
    {cardBody}
  </Link>;

  const div = <div className={"feedbackCard card"}>
    {cardBody}
  </div>;

  return (
    <div>
      {
        showFullCard
          ? div
          : link
      }
    </div>
  );
}

export default FeedbackCard;
