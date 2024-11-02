// ./src/features/news/NewsList
import React from 'react';
import { useSelector } from 'react-redux';

const NewsList = () => {
  const articles = useSelector((state) => {
    console.log("Текущее состояние:", state);
    return state.news.articles;
  });

  return (
    <div>
      <h2>Список новостей</h2>
      {articles.length > 0 ? (
        articles.map((article) => (
          <div key={article.id}>
            <h3>{article.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: article.shortDescription }} />
          </div>
        ))
      ) : (
        <p>Нет новостей</p>
      )}
    </div>
  );
};

export default NewsList;
