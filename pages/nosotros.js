import React from "react";
import Section from "@/components/Section/Section";

const Nosotros = () => {
  return (
    <>
      <section>
        <div className="container">
          <figure className="container__img">
            <img className="nosotros-img" src="/images/team.jpg" />
          </figure>
          <p className="info__nosotros">
            <h4>DISFRUTA TU VIAJE</h4><br/>
            Bienvenido(a) a nuestro portal donde encontrarás los mejores paquetes turísticos.
            Estamos totalmente capacitados y aptos para que tu viaje sea seguro y solo te dediques a disfrutar
            tu travesía.
            Nuestro objetivo es promover el turismo en el Perú, promover la conservación de las zonas
            turísticas, medio ambiente y que disfrutes tu viaje en familia, con amigos, compañeros de estudios
            o de trabajo. Más que un viaje, brindamos la experiencia gracias a nuestra excelente atención de
            principio a fin, gracias a nuestros guías altamente calificados para hacer de tu tour un momento
            inolvidable.<br/><br/>
            <h4>MÁS QUE UNA AGENCIA, UNA FAMILIA</h4><br/>
            Tenemos 5 años de experiencia en el rubro, la familia Cieneguilla Travel Tours ha ido creciendo
            gracias a su equipo, por ello estamos en constante capacitación para seguir mejorando y
            brindarles un excelente servicio.
          </p>
        </div>
      </section>
      <Section
        title="¡Síguenos en!"
        align={{
          xs: "center",
          md: "center",
        }}
        bg="var(--gray-color)"
        padding={{
          xs: "29px 0 28px 0",
          md: "45px 0 45px 0",
          xxl: "56px 0 124px 0",
        }}
      >
        <div className="redes">
          <a href="https://www.facebook.com/Cieneguillatraveltours" target="_blank">
            <img src="/images/facebook_nosotros.svg" />
          </a>
          <a href="https://www.instagram.com/cieneguillatraveltours" target="_blank">
            <img src="/images/instagram_nosotros.svg" />
          </a>
          <a href="https://www.tiktok.com/@cieneguillatraveltours" target="_blank">
            <img src="/images/tiktok_nosotros.svg" />
          </a>
        </div>
      </Section>

      <style jsx>{
        /*css*/ `
          .container {
            margin-top: 2rem;
            padding: 0rem 1rem;
          }

          .container__img {
            padding: 0rem;
            display: flex;
            justify-content: center;
            margin: auto;
          }

          .nosotros-img {
            height: 21.1rem;
            width: 90%;
            object-fit: cover;
          }

          .info__nosotros {
            font-size: 14px;
            color: var(--fourth-color);
            text-align: justify;
            line-height: 24.03px;
            margin-top: 2rem;
            margin-bottom: 3rem;
            padding: 0 1.5rem;
          }

          .redes {
            display: flex;
            justify-content: center;
            column-gap: 4rem;
          }

          .redes img {
            height: 29px;
            width: 29px;
            margin: 0rem;
          }

          @media screen and (min-width: 576px) {
            .nosotros-img {
              height: 24rem;
            }

            .info__nosotros {
              font-size: 16px;
              padding: 0 2rem;
            }

            .redes {
              margin-top: 3rem;
            }
          }

          @media screen and (min-width: 768px) {
            .info__nosotros {
              font-size: 18px;
              padding: 0 3rem;
            }

            .redes img {
              height: 54px;
              width: 54px;
            }

            .nosotros-img {
              width: 90%;
            }
          }

          @media screen and (min-width: 992px) {
            .container {
              margin: 1rem auto;
            }

            .info__nosotros {
              padding: 0 4rem;
            }

            .redes {
              column-gap: 6rem;
              margin-top: 4rem;
              margin-bottom: 2rem;
            }

            .redes img {
              height: 74px;
              width: 74px;
            }
          }

          @media screen and (min-width: 1200px) {
            .container {
              padding: 0rem 3rem;
            }

            .nosotros-img {
              height: 30rem;
              width: 100%;
            }

            .info__nosotros {
              padding: 0 1rem;
            }

            .redes {
              column-gap: 8rem;
              margin-top: 5rem;
              margin-bottom: 3rem;
            }
          }

          @media screen and (min-width: 1400px) {
            .container {
              margin: 1.5rem auto;
              padding: 0rem;
            }

            .redes {
              margin-top: 7rem;
              margin-bottom: 5rem;
            }
          }
        `
      }</style>
    </>
  );
};

export default Nosotros;
