import React, { useState, useRef, useEffect} from 'react';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import EmailIcon from '@/components/icons/email-icon.svg';
import PointerIcon from '@/components/icons/pointer-icon.svg';
import { useForm } from 'react-hook-form';
import { successAlert } from '@/lib/alerts'
import router from 'next/router'

const Boletines = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [formData, setformData] = useState({
    name: '',
    email: '',
  });

  const inputFocus = useRef(null)


  const handleChange = (event) => {
    setformData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  const submit = (event) => {
    event.preventDefault();
  }

  const sendData = (data) => {

    const bodyMail = {
      name: data.name,
      email: data.email,
      url: `${process.env.URI_WEB}/paquetes-y-full-days`
    }

    fetch(`${process.env.URI_API}/api-cieneguilla-service/send-mail/subscription-confirmation`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyMail)
    })
    .then(() => successAlert('Usted se ha suscrito satisfactoriamente'))
    // .then(router.push('/'))
    .catch(error => console.log(error))
  }

  useEffect(() => {
    // inputFocus.current.focus()

  }, [])

  return (
    <>
      <section className="newsletter">
        <div className="container">
          <h1 className="newsletter__title">Suscripción</h1>
          <p className="newsletter__paragraph">
          ¡Suscríbete a nuestro boletín y entérate de las últimas promociones que tenemos para ti!
          </p>
          <form className="newsletter__form form" onSubmit={submit}>
            <div className="form__container">
              <div className="form__item">
                <Input
                  ref={inputFocus}
                  autoFocus
                  type="text"
                  name="name"
                  placeholder="Nombre completos"
                  icon={<PointerIcon fill="var(--fourth-color)" height={20} />}
                  height={{ xs: 40, md: 64 }}
                  colorPlace="var(--fourth-color)"
                  // onChange={handleChange}
                  {...register('name')}
                />
              </div>
              <div className="form__item">
                <Input
                  type="email"
                  autoFocus
                  name="email"
                  placeholder="Correo electrónico"
                  icon={<EmailIcon fill="var(--fourth-color)" height={15} />}
                  height={{ xs: 40, md: 64 }}
                  colorPlace="var(--fourth-color)"
                  // onChange={handleChange}
                  {...register('email')}
                />
              </div>
              <div className="form__item">
                <Button
                  label="Enviar"
                  type="submit"
                  height={{ xs: 40, md: 64 }}
                  onClick={handleSubmit(sendData)}
                />
              </div>
            </div>
          </form>
        </div>
      </section>

      <style jsx>{/*css*/`
        .newsletter {
          margin-top: 20px;
          margin-bottom: 140px;
        }

        .newsletter__title {
          color: var(--fourth-color);
          font-weight: 700;
          font-size: 18px;
          text-transform: uppercase;
        }

        .newsletter__paragraph {
          color: var(--fourth-color);
          font-size: 14px;
          font-weight: 400;
        }

        .newsletter__form {
          margin-top: 46px;
        }

        .form__container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        @media screen and (min-width: 576px) {
          .newsletter {
            margin-top: 100px;
            margin-bottom: 250px;
          }
        }

        @media screen and (min-width: 768px) {
          .newsletter__title {
            font-size: 24px;
          }

          .newsletter__paragraph {
            font-size: 18px;
          }

          .form__container {
            flex-direction: row;
            justify-content: center;
            gap: 1.5rem;
          }

          .form__item:nth-child(1),
          .form__item:nth-child(2) {
            width: 360px;
          }

          .form__item:nth-child(3) {
            width: 160px;
          }
        }
      `}</style>
    </>
  );
};

export default Boletines;
