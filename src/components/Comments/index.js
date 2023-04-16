import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {formatDistanceToNow} from 'date-fns'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here
class Comments extends Component {
  state = {
    nameInput: '',
    commentInput: '',
    commentsList: [],
    initialClassName: '',
  }

  onClickAddCommentButton = event => {
    event.preventDefault()

    const {nameInput, commentInput} = this.state
    const time = formatDistanceToNow(new Date())

    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: uuidv4(),
      nameInput,
      commentInput,
      time,
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  inputName = event => {
    this.setState({nameInput: event.target.value})
  }

  inputComment = event => {
    this.setState({commentInput: event.target.value})
  }

  clickedDelete = id => {
    const {commentsList} = this.state
    const filteredCommentsList = commentsList.filter(
      eachComment => eachComment.id !== id,
    )

    this.setState({commentsList: filteredCommentsList})
  }

  toggleLikeIcon = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (eachComment.id === id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  renderCommentsList = () => {
    const {commentsList} = this.state

    return commentsList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        toggleLikeIcon={this.toggleLikeIcon}
        clickedDelete={this.clickedDelete}
      />
    ))
  }

  render() {
    const {nameInput, commentInput, commentsList} = this.state

    return (
      <div className="app-container">
        <div className="comments-container">
          <h1 className="app-heading">Comments</h1>
          <div className="comments-inputs">
            <form className="form" onSubmit={this.onClickAddCommentButton}>
              <p className="form-description">
                Say something about 4.0 Technologies
              </p>
              <input
                type="input"
                className="name-input"
                placeholder="Your Name"
                onChange={this.inputName}
                value={nameInput}
              />
              <textarea
                rows="8"
                className="comment-input"
                placeholder="Your Comment"
                onChange={this.inputComment}
                value={commentInput}
              />
              <button
                type="button"
                className="add-button"
                onClick={this.onClickAddCommentButton}
              >
                Add Comment
              </button>
            </form>
            <img
              className="image"
              alt="comments"
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png "
            />
          </div>
          <hr className="line" />

          <p className="heading">
            <span className="comments-count">{commentsList.length}</span>{' '}
            Comments
          </p>
          <ul className="comments-list">{this.renderCommentsList()}</ul>
        </div>
      </div>
    )
  }
}
export default Comments
