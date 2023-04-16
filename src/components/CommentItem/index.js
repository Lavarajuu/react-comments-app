// Write your code here
import './index.css'

const CommentItem = props => {
  const {commentDetails, clickedDelete, toggleLikeIcon} = props

  const {
    id,
    nameInput,
    commentInput,
    isLiked,
    time,
    initialClassName,
  } = commentDetails

  const onClickeDelete = () => {
    clickedDelete(id)
  }

  const isClickToLike = () => {
    toggleLikeIcon(id)
  }

  const toggleLikeImage = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const toggleLikeText = isLiked ? 'like liked-button' : 'unLike liked-button'

  return (
    <li className="comment-item">
      <div className="name-time">
        <h1 className={initialClassName}>{nameInput[0]}</h1>
        <h1 className="name">{nameInput}</h1>
        <p className="time">{time}</p>
      </div>
      <p className="comment">{commentInput}</p>
      <div className="like-delete-container">
        <div className="like-container">
          <img className="liked-image" alt="like" src={toggleLikeImage} />
          <button
            className={toggleLikeText}
            type="button"
            onClick={isClickToLike}
          >
            Like
          </button>
        </div>
        <button
          type="button"
          className="delete-button"
          onClick={onClickeDelete}
          data-testid="delete"
        >
          <img
            alt="delete"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
          />
        </button>
      </div>
      <hr className="line" />
    </li>
  )
}
export default CommentItem
