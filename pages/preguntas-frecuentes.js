import React from 'react';
import Accordion from '@/components/common/Accordion';
import WhatsappIcon from '@/components/icons/whatsapp-icon.svg';

const questions = [
  {
    label: '¿Qué tours tienen?',
    answer: 'Todos nuestros tours los puedes visualizar en nuestra web y redes sociales como Instagram y Facebook.',
  },
  {
    label: '¿Dónde encuentro la información del tour?',
    answer: 'Dentro de cada tour podrás visualizar su itinerario, precio y más.',
  },
  {
    label: '¿Cuál es el precio del tour?',
    answer: 'Dentro de la información del tour podrás ver los precios por persona y realizar una simulación de cotización.',
  },
  {
    label: '¿Qué fechas tienen disponibles?',
    answer: 'Tenemos tour que salen todos los días y tours de fin de semana.',
  },
  {
    label: '¿Qué días salen?',
    answer: 'El único tour que sale todos los días es Paracas-Ica. Recuerda que puedes ver dentro de cada tour la disponibilidad de fechas.',
  },
  {
    label: '¿Cuántos días tiene el tour?',
    answer: 'Tenemos full days y tours de dos y tres días.',
  },
  {
    label: '¿Dónde es el lugar de abordo?',
    answer: 'Nuestros puntos de abordo son en <strong>Plaza Norte</strong> y <strong> La Rambla de San Borja</strong>. La dirección exacta la podrás encontrar en la información  del tour elegido.',
  },
  {
    label: '¿Puedo cambiar la fecha de mi tour?',
    answer: 'Hasta 96 horas antes de tu viaje si puedes cambiar la fecha bajo una penalidad mínima que deberás consultar previamente.',
  },
  {
    label: '¿Puedo solicitar la devolución de mi dinero?',
    answer: 'No hacemos devoluciones, puedes revisar nuestros términos y condiciones.',
  },
  {
    label: '¿Cuándo suben las fotos de mi tour y dónde las puedo ver?',
    answer: 'Las fotos de los tours las subimos hasta 4 días después del viaje, todos los Martes y Miércoles en nuestra página de Facebook.<p><b><u>Recuerda</u></b><br>Las fotos se suben en 4 días hábiles a partir de la fecha de viaje.</p><p><b><u>Importante</u></b><br>Si no ves las fotos de tu tour publicadas, puedes solicitar a tu guía el link de fotos mencionando la fecha y tour al que fuiste.</p>',
  },
  {
    label: '¿Puedo transferir mi pasaje?',
    answer: 'Si puedes transferir tu pasaje sin costo alguno, sólo debes comunicarnos para actualizar los datos.',
  },
  {
    label: '¿Se puede llevar mascotas?',
    answer: 'Por el momento no se pueden llevar mascotitas a los tours.',
  },
  {
    label: '¿Los niños puedes viajar? ¿Los niños pagan?',
    answer: 'Todos los niños pueden viajar, menores de 4 años no pagan pero van cargados por sus padres. Consultar siempre, por ejemplo en Paracas menores de 1 año no pueden subir a los yates por seguridad.',
  },
  {
    label: '¿Incluye almuerzo?',
    answer: 'No incluímos almuerzo, pero si un desayuno tipo box lunch en todos los tours.',
  },
  {
    label: 'Si mi familiar sufre de problemas cardiacos ¿Puede viajar?',
    answer: 'Consultar con su médico previamente si puede viajar según el destino elegido.',
  },
  {
    label: '¿Puedo llevar a mi familiar con discapacidad?',
    answer: 'Si, debes avisarnos previamente para tomarlo en cuenta ya que no todas nuestras movilidades son buses grandes y en caso se necesite llevar silla de ruedas u otro se necesitará espacio.',
  },
  {
    label: '¿Cuánto tiempo espera el bus antes de salir?',
    answer: 'Tienes máximo 10 minutos de tolerancia, después de este tiempo el bus sale y no hace paradas en el camino.',
  },
]

const PreguntasFrecuentes = () => {
  return (
    <>
      <div className="faq">
        <div className="container">
          <div className="faq__section">
            <h1 className="faq__title">Preguntas Frecuentes</h1>
            <Accordion data={questions} />
          </div>
          <div className="faq__section">
            <h2 className="faq__title">¿Necesitas más ayuda?</h2>
            <p className="faq__paragraph">Escríbenos a nuestro número de WhatsApp</p>
            <a href="https://wa.me/51966190480" target="_blank">
              <div className="faq__phone">
                <WhatsappIcon fill="var(--main-color)" height={32} />
                <p className="faq__paragraph">(+51) 966 190 480</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .faq {
          margin-top: 20px;
          margin-bottom: 140px;
        }

        .faq__section:first-child {
          margin-bottom: 58px;
        }

        .faq__title {
          color: var(--fourth-color);
          font-weight: 700;
          font-size: 18px;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
        }

        .faq__paragraph {
          color: var(--fourth-color);
          font-size: 14px;
          font-weight: 400;
        }

        .faq__phone {
          display: flex;
          align-items: center;
        }

        .faq__phone .faq__paragraph {
          margin: 0 0 0 1rem;
        }

        @media screen and (min-width: 576px) {
          .faq {
            margin-top: 100px;
            margin-bottom: 250px;
          }
        }

        @media screen and (min-width: 768px) {
          .faq__title {
            font-size: 24px;
          }

          .faq__paragraph {
            font-size: 18px;
          }
        }
      `}</style>
    </>
  );
};

export default PreguntasFrecuentes;
