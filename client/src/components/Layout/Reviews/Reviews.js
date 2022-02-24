import React from 'react'

const Reviews = (props) => {
    
    return (
        props.reviews.map(review => (
            <tr key={review._id}>
                <td>{review.user.username}</td>
                <td>{review.creationDate}</td>
                <td>{review.usersProductRating}</td>
                <td>{review.postTitle}</td>
                <td>{review.content_text}</td>
            </tr>
        ))
    )
}

export default Reviews;
