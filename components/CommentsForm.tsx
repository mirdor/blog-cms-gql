import React, { useRef, useState, useEffect } from "react";
import { Comment } from "../common/types";
import { submitComment } from "../services";

const CommentsForm = ({ slug }: { slug: string }) => {
  const [commentData, setCommentData] = useState<Comment>({
    comment: "",
    name: "",
    email: "",
  });
  const [error, setError] = useState(false);
  const [rememberData, setRememberData] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    setCommentData({
      comment: "",
      name: localStorage.getItem("name") || "",
      email: localStorage.getItem("email") || "",
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setError(false);
    setCommentData({ ...commentData, [e.target.name]: e.target.value });
  };

  const handleCommentSubmision = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    for (const value of Object.values(commentData)) {
      if (!value) {
        setError(true);
        return;
      }
    }

    if (rememberData) {
      window.localStorage.setItem("name", commentData.name);
      window.localStorage.setItem("email", commentData.email);
    } else {
      window.localStorage.removeItem("name");
      window.localStorage.removeItem("email");
    }

    const commentObj = {
      ...commentData,
      slug,
    };

    submitComment(commentObj).then((res) => {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    });
  };

  return (
    <form
      onSubmit={handleCommentSubmision}
      noValidate
      className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'
    >
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
        Deja un comentario
      </h3>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <textarea
          value={commentData.comment}
          onChange={handleChange}
          name='comment'
          id='comment'
          placeholder='Comentario'
          className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
        />
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
        <input
          value={commentData.name}
          onChange={handleChange}
          type='text'
          name='name'
          id='name'
          placeholder='Nombre'
          className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
        />
        <input
          value={commentData.email}
          onChange={handleChange}
          type='text'
          name='email'
          id='email'
          placeholder='Correo'
          className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
        />
      </div>

      <div className='grid grid-cols-1 gap-4 mb-4'>
        <div className=''>
          <input
            type='checkbox'
            id='storeData'
            onChange={() => {
              setRememberData(true);
            }}
            name='storeData'
            value={String(rememberData)}
          />
          <label
            htmlFor='storeData'
            className='text-gray-500 cursor-pointer ml-2'
          >
            Guardar mi correo y nombre para la siguiente vez que comente.
          </label>
        </div>
      </div>
      {error && (
        <p className='text-xs text-red-500'>Todos los campos son requeridos.</p>
      )}
      <div className='mt-8'>
        <button
          type='submit'
          className='transition duration-300 ease hover:bg-indigo-900 inline-block bg-indigo-600 text-lg rounded-full text-white px-8 py-3'
        >
          Comentar
        </button>
        {showSuccessMessage && (
          <span className='text-md float-right mt-3 text-green-500'>
            Comentado enviado para revisión
          </span>
        )}
      </div>
    </form>
  );
};

export default CommentsForm;
