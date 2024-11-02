// ./src/features/news/NewsEditor
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addArticle } from './newsSlice';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

const NewsEditor = () => {
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const dispatch = useDispatch();
  const toast = React.useRef(null);

  const handleSave = () => {
    const newArticle = {
      id: Date.now(),
      title,
      shortDescription,
      fullDescription,
    };
    dispatch(addArticle(newArticle));
    toast.current.show({ severity: 'success', summary: 'Успех', detail: 'Новость добавлена' });
    clearForm();
  };

  const clearForm = () => {
    setTitle('');
    setShortDescription('');
    setFullDescription('');
  };

  return (
    <div>
      <Toast ref={toast} />
      <h2>Редактировать новость</h2>
      <InputText value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Тема" />
      <InputTextarea value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} placeholder="Краткое описание" />
      <InputTextarea value={fullDescription} onChange={(e) => setFullDescription(e.target.value)} placeholder="Полное описание" />
      <Button label="Сохранить" onClick={handleSave} />
    </div>
  );
};

export default NewsEditor;

