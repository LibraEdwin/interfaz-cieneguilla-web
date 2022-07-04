import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'next/image';

const HeaderBrand = props => {
  const {
    imgSrc,
    imgAlt,
    to,
  } = props;

  return (
    <>
      <figure className="brand">
        <Link href={to}>
          <a className="brand__link" ref='.'>
            <Image src={imgSrc} alt={imgAlt} width={98} height={103}/>
          </a>
        </Link>
      </figure>

      <style jsx>{`
        .brand {
          padding: .5rem 0;
        }

        .brand__link {
          display: block;
          height: 100%;
        }

        .brand__img {
          height: 80px;
        }

        @media screen and (min-width: 768px) {
          .brand__img {
            height: 103px;
          }
        }
      `}</style>
    </>
  );
};

HeaderBrand.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default HeaderBrand;
