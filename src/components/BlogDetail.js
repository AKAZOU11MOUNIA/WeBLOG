/// BlogDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase.js';

const containerStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  borderRadius: '10px',
  boxShadow: '3px 4px 8px rgba(255, 255, 255, 0.8)',
  marginLeft:'30px',
  marginRight:'30px',
  marginTop:'-55px',
  padding:'50px',
};

const titleStyle = {
  fontSize: '35px',
  fontWeight: 'bold',
  color: '#80CBC4',
  margin:'-10px 3px'
};

const contentStyle = {
  marginTop: '25px',
  color: 'white', 
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
