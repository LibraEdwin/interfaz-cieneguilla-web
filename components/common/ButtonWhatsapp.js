import Image from 'next/image'

const ButtonWhatsapp = () => {
  return (
    <>
      <a href="https://api.whatsapp.com/send?phone=51951568920&text=Hola,%20Cieneguilla" target="_blank" className='button-whatsapp'>
        <Image src='/icons/bi_whatsapp.svg' width={30} height={30} />
      </a>
      <style jsx>{`
        .button-whatsapp {
          display: flex;
          align-items: center;
          justify-content: center;
          position: fixed;
          bottom: 1.5rem;
          right: 1.5rem;
          background: #25D366;
          color: white;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          z-index: 100;
          box-shadow: 2px 2px 5px -3px black;
        }

        @media (min-width: 768px) {
          bottom: 2.5rem;
          right: 2.5rem;
        }
      `}</style>
    </>
  )
}

export default ButtonWhatsapp