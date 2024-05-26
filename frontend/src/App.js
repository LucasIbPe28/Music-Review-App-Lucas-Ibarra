import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [musicReviews, setMusicReviews] = useState([]);
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/music')
      .then(res => setMusicReviews(res.data))
      .catch(err => console.error('Error fetching data:', err));
  }, []);

  const addOrUpdateReview = () => {
    const newReview = { title, review, imageUrl };
    if (editId) {
      axios.put(`http://localhost:5000/api/music/${editId}`, newReview)
        .then(res => {
          setMusicReviews(musicReviews.map(r => r._id === editId ? res.data : r));
          resetForm();
        })
        .catch(err => console.error('Error updating review:', err));
    } else {
      axios.post('http://localhost:5000/api/music', newReview)
        .then(res => {
          setMusicReviews([...musicReviews, res.data]);
          resetForm();
        })
        .catch(err => console.error('Error adding review:', err));
    }
  };

  const deleteReview = (id) => {
    axios.delete(`http://localhost:5000/api/music/${id}`)
      .then(() => setMusicReviews(musicReviews.filter(r => r._id !== id)))
      .catch(err => console.error('Error deleting review:', err));
  };

  const editReview = (review) => {
    setTitle(review.title);
    setReview(review.review);
    setImageUrl(review.imageUrl);
    setEditId(review._id);
  };

  const resetForm = () => {
    setTitle('');
    setReview('');
    setImageUrl('');
    setEditId(null);
  };

  return (
    <div>
      <h1>Music Reviews</h1>
      <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <input type="text" placeholder="Review" value={review} onChange={e => setReview(e.target.value)} />
      <input type="text" placeholder="Image URL" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
      <button onClick={addOrUpdateReview}>{editId ? 'Update Review' : 'Add Review'}</button>
      <ul>
        {musicReviews.map(review => (
          <li key={review._id}>
            <h2>{review.title}</h2>
            <p>{review.review}</p>
            {review.imageUrl && <img src={review.imageUrl} alt={review.title} />}
            <button onClick={() => editReview(review)}>Edit</button>
            <button onClick={() => deleteReview(review._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;