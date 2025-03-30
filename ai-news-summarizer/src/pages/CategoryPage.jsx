import { useParams } from 'react-router-dom';

function CategoryPage() {
  const { category } = useParams();

  return (
    <div>
      <h1>{category} News</h1>
      {/* Replace with actual news fetching based on `category` */}
      <p>Loading news articles for {category}...</p>
    </div>
  );
}

export default CategoryPage;
