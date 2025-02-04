import React, { useEffect, useState } from 'react';
import './PostAdPage.css';
import { ReactComponent as CameraIcon } from '../assets/camera.svg';
import { categories, regions } from '../types';
const CLOUDINARY_URL = process.env.REACT_APP_CLOUDINARY_URL;
const API_URL = process.env.REACT_APP_API_BASE_URL;


const PostAdPage: React.FC = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [token, setToken] = useState<string | null>(null);
  const [isSending, setIsSending] = useState<boolean>(false)

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      window.location.href = '/';
    } else {
      setToken(storedToken);
    }
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setSelectedImages((prevImages) => [...prevImages, ...filesArray]);
    }
  };


  const clearImages = () => {
    setSelectedImages([]);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;

    // Убираем ведущий ноль, если он присутствует и строка длиннее 1 символа
    if (value.startsWith("0") && value.length > 1) {
      value = value.substring(1);
    }

    // Если значение пустое, устанавливаем его в '0'
    if (value === "") {
      setPrice(0);
    } else {
      // Преобразуем строку в число
      const numericValue = Number(value);

      // Если введено корректное число (не NaN и не отрицательное), обновляем цену
      if (!isNaN(numericValue) && numericValue >= 0) {
        // setPrice(numericValue);
        if (numericValue <= 999999) {
          setPrice(numericValue);
        }
      }
    }
  };

  const handleSubmit = async () => {

    const title = document.querySelector('.text-input-post') as HTMLInputElement;
    const category = selectedCategory;
    const priceInput = price;
    const description = document.querySelector('.add-description') as HTMLTextAreaElement;
    const images = selectedImages.length;
    const region = selectedRegion;
    const phone = document.querySelector('.input-options[type="tel"]') as HTMLInputElement;
    const additionalPhone = document.querySelector('.input-options[type="tel"]:nth-of-type(2)') as HTMLInputElement; 
    const email = document.querySelector('.input-options[type="email"]') as HTMLInputElement
    const telegram = document.querySelector('.input-options[type="text"]') as HTMLInputElement;

    if (!title.value) {
      alert("Будь ласка, додайте назву оголошення");
      return;
    }
    if (!category) {
      alert("Будь ласка, виберіть категорію оголошення");
      return;
    }
    if (!priceInput) {
      alert("Будь ласка, вкажіть ціну оголошення");
      return;
    }

    if (!description.value) {
      alert("Будь ласка, додайте опис");
      return;
    }
    if (images === 0) {
      alert("Будь ласка, додайте фото тварини");
      return;
    }
    if (images > 5) {
      alert("Максимальна кількість фото — 5");
      return;
    }
    if (!region) {
      alert("Будь ласка, виберіть область");
      return;
    }
    if (!phone.value) {
      alert("Будь ласка, введіть ваш номер телефону");
      return;
    }

    setIsSending(true);

    const uploadedImages: string[] = [];

    for (const file of selectedImages) {
      const formData = new FormData();

      formData.append('file', file);


      formData.append('upload_preset', 'animal');

      try {
        const response = await fetch(`${CLOUDINARY_URL}`, {
          method: 'POST',
          body: formData
        });

        // const data = await response.json();

        const responseText = await response.text();

        let data;
        try {
          data = JSON.parse(responseText);
        } catch (error) {
          console.error('Error parsing JSON:', error);
          console.log('Response Text:', responseText);
        }


        if (response.ok) {
          uploadedImages.push(data.secure_url);
        } else {
          console.error('Error uploading image:', data);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }


    const requestBody = {
      category_id: category,
      name: title.value,
      price: priceInput,
      description: description.value,
      region: region,
      email: email.value,
      phone: phone.value,
      additional_phone: additionalPhone.value,
      telegram: telegram.value,
      images: uploadedImages
    };
    console.log(requestBody)
    try {
      const response = await fetch(`${API_URL}/admin/pets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
      });
      // const data = await response.json();

      if (response.ok) {
        window.location.href = '/success';
      }

    } catch (error) {
      console.error('Помилка при відправці запиту:', error);
      alert('Сталася помилка при відправці запиту');
    }

  };


  return (
    <div className="post-ad-container">
      <h2 className="post-ad-title">Додайте ваше оголошення!</h2>

      <div className="post-ad-form">
        {/* Левая часть формы */}
        <div className="form-left">
          <label className='add-namepost'>Додайте назву оголошення*</label>
          <input className='text-input-post' type="text" placeholder="Назва" required />

          <label>Додайте категорію оголошення*</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Оберіть категорію</option>
            {categories.map((category, index) => (
              <option key={index} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <div className='price-position'>
            <label>Вкажіть ціну оголошення*</label>
            <div className="price-input">
              <input
                className='text-input-price'
                type="text"
                placeholder="Ціна"
                min="0"
                required
                value={price === 0 ? "" : price}
                onChange={handlePriceChange}
              />
              <span className='grn'>грн</span>
            </div>
          </div>
        </div>

        <div className="form-right">
          <label className='foto-animaladd'>Додайте фото тварини*</label>
          <div className="photo-upload" onClick={() => document.getElementById('fileInput')?.click()}>
            {selectedImages.length > 0 ? (
              <div className="image-preview">
                {selectedImages.map((image, index) => (
                  <img key={index} src={URL.createObjectURL(image)} alt={`Фото ${index + 1}`} className="uploaded-image" />
                ))}
              </div>
            ) : (
              <>
                <CameraIcon className="camera-icon" />
                <p className='add-foto'>Додати фото</p>
              </>
            )}
          </div>
          <input type="file" id="fileInput" accept="image/*" multiple onChange={handleImageUpload} hidden />

          {selectedImages.length > 0 && (
            <button className="clear-images-button" onClick={clearImages}>
              Очистити всі фото
            </button>
          )}
        </div>
      </div>

      <div className='group-add'>
        <div className="post-description">
          <label className='add-description-title'>Додайте опис*</label>
          <textarea className='add-description' placeholder="Введіть текст" required></textarea>
        </div>

        <div className="contact-info">
          <div className="contact-fields">
            <label>Оберіть область*</label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              <option value="">Оберіть область</option>
              {regions.map((region, index) => (
                <option key={index} value={region}>
                  {region}
                </option>
              ))}
            </select>

            <label>Пошта*</label>
            <input
              className='input-options'
              type="email"
              placeholder="name@gmail.com"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              required
            />

            <label>Ваш номер телефону*</label>
            <input
              className='input-options'
              type="tel"
              placeholder="+380"
              pattern="[0-9+]*"
              maxLength={13}
              required
            />

            <label>Додатковий номер</label>
            <input className='input-options' type="tel" placeholder="+380" pattern="[0-9+]*" maxLength={13} />

            <label>Telegram</label>
            <input className='input-options' type="text" placeholder="@nickname" />
          </div>
        </div>
      </div>

      {/* Кнопки */}
      <div className="button-container">
        <button onClick={handleSubmit} className="submit-button" disabled={isSending} >РОЗМІСТИТИ</button>
      </div>
    </div>
  );
};

export default PostAdPage;