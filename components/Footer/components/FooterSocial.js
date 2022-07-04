import React from "react";
import Image from "next/image";
import SectionFooter from "@/components/sections/SectionFooter";

const SectionFooterSocial = () => {
  return (
    <>
      <SectionFooter title="Redes Sociales" align="left" padding={{ xs: 1 }}>
        <div className="redes">
          <a href="https://www.facebook.com/Cieneguillatraveltours" target="_blank">
            <Image src="/images/facebook_footer.png" width={19} height={19} />
          </a>
          <a href="https://www.instagram.com/cieneguillatraveltours" target="_blank">
            <Image src="/images/instagram_footer.png" width={19} height={19} />
          </a>
          <a href="https://www.tiktok.com/@cieneguillatraveltours" target="_blank">
            <Image src="/images/tiktok_footer.png" width={19} height={19} />
          </a>
          <a href="https://www.youtube.com/channel/UC3psM156vmMd4qymw5zomzg" target="_blank">
            <Image src="/images/youtube_footer.png" width={19} height={19} />
          </a>
        </div>
      </SectionFooter>

      <style jsx>{
        /*css*/ `
          .redes {
            display: flex;
            justify-content: center;
            column-gap: 2rem;
            padding-top: 0.5rem;
          }

          @media screen and (min-width: 720px) {
            .redes {
              justify-content: left;
            }
          }
          @media screen and (min-width: 960px) {
            .redes {
              // justify-content: left;
            }
          }
        `
      }</style>
    </>
  );
};

export default SectionFooterSocial;
