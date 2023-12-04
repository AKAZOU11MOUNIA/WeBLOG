/// BlogDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase.js';

const containerStyle = {
  padding: '20px',
  backgroundColor: '#f5f5dc', // Beige
};

const titleStyle = {
  fontSize: '2em',
  fontWeight: 'bold',
  color: '#543c28', // Marron foncé
};

const contentStyle = {
  marginTop: '10px',
  color: '#000000', // Noir
};

const BlogDetail = () => {
  const { blogName } = useParams();
  console.log('blogName:', blogName);

  const [blog, setBlog] = React.useState(null);

  React.useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const blogsCollection = collection(db, 'file');
        const q = query(blogsCollection, where('name', '==', blogName));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            const blogData = doc.data();
            console.log('blog RECUPERE :', blogData);
            setBlog(blogData);
          });
        } else {
          console.log('Aucun document trouvé.');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du blog:', error);
      }
    };

    fetchBlogDetail();
  }, [blogName]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>{blog.name}</h2>
      <p style={contentStyle}>{blog.content}</p>
    </div>
  );
};

export default BlogDetail;
