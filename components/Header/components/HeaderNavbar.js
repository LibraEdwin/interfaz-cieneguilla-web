import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { generateUrlName } from '@/lib/util';


const HeaderNavbar = ({ links, campañas }) => {
  const router = useRouter();

  return (
    <>
      <nav className="navbar">
        <ul className="navbar__items">
          {
            links.map((item, key) => (
              <li className={`navbar__item ${router.pathname === item.to ? 'navbar__item--active' : null}`} key={key}>
                <Link href={item.to}>
                  <a className="navbar__link" href="">
                    {item.label}
                  </a>
                </Link>
              </li>
            ))
          }
          {campañas.length > 0 && (
            <li className={`navbar__item nav__item--has-children`} key='campaña-key'>
              <a className="navbar__link" href="">
                Campañas
              </a>
              <ul className='navbar__children'>
                {campañas?.map(campaña => (
                  <li className={`navbar__subitem`} key={campaña._id}>
                    <Link href={`/campanias/${generateUrlName(campaña._id, campaña.nombreCampaña)}`}>
                      <a className="navbar__link">
                        {campaña.nombreCampaña}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          )}
        </ul>
      </nav>

      <style jsx>{`
        .navbar {
          display: none;
        }

        .navbar__items {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        .navbar__item {
          margin-left: 1rem;
          position: relative;
        }

        .navbar__item::before {
          content: "";
          display: block;
          background-color: var(--fourth-color);
          height: 2px;
          width: 100%;
          position: absolute;
          left: 0;
          bottom: -1rem;
          opacity: 0;
          transition: all .3s;
        }

        .navbar__item:hover.navbar__item::before {
          opacity: 1;
          bottom: -.5rem;
        }

        .navbar__item--active.navbar__item::before {
          opacity: 1;
          bottom: -.5rem;
        }

        .navbar__item:first-child {
          margin-left: 0;
        }

        .navbar__link {
          color: var(--fourth-color);
          font-weight: 700;
          font-size: 16px;
        }

        @media screen and (min-width: 768px) {
          .navbar {
            display: inline-block;
          }

          .navbar__item {
            margin-left: 1.25rem;
          }

          .navbar__link {
            font-size: 18px;
          }
        }

        @media screen and (min-width: 992px) {
          .navbar__item {
            margin-left: 3.2rem;
          }
        }

        .nav__item--has-children:hover.nav__item--has-children::before {
          display: none;
          position: relative;
        }

        .nav__item--has-children:hover ul {
          opacity: 1;
          visibility: visible;
          border-radius: 0.25rem;
        }

        .nav__item--has-children li::before {
          display: none;
        }
        .navbar__children::before {
          content: '';
          border-top: 10px solid transparent;
          border-bottom: 10px solid var(--main-color);
          border-right: 10px solid transparent;
          border-left: 10px solid transparent;
          display: block;
          position: absolute;
          top: -20px;
          right: 40px;
        }
        .navbar__children {
          border-radius: 0.25rem;
          position: absolute;
          right: 0;
          top: 250%;
          background: var(--main-color);
          padding: 0.75rem 1rem;
          margin: 0;
          opacity: 0;
          visibility: hidden;
          transition: 0.3s ease;
          box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.75);
        }

        .navbar__children a {
          white-space: nowrap;
          color: white;
          display: flex;
          gap: 0.5rem;
          padding: 0.5rem 0;
        }
      `}</style>
    </>
  );
};

HeaderNavbar.propTypes = {
  links: PropTypes.array.isRequired,
}

export default HeaderNavbar;
