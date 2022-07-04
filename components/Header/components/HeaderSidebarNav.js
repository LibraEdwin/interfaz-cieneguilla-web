import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { generateUrlName } from '@/lib/util';

const HeaderSidebarNav = props => {
  const {
    isOpen,
    onToggle,
    links,
    campañas
  } = props;

  return (
    <>
      <nav className="sidebar-nav">
        <div className="sidebar-nav__content">
          <div className="sidebar-nav__header">
            <button className="sidebar-nav__close" onClick={onToggle}>
              <svg viewBox="0 0 50 50">
                <line x2="50" y2="50" />
                <line x1="50" y2="50" />
              </svg>
            </button>
          </div>
          <ul className="sidebar-nav__items">
            {links?.map((item, key) => (
              <li className="sidebar-nav__item" key={key}>
                <Link href={item.to}>
                  <a className="sidebar-nav__link" href="" onClick={onToggle}>
                    {item.label}
                  </a>
                </Link>
              </li>
            ))}
            {campañas.length > 0 && (
              <li className="sidebar-nav__item" key='campaña-key'>
                <a className="sidebar-nav__link">
                  Campañas
                </a>
                <ul className='sidebar-nav__children'>
                  {campañas?.map(campaña => (
                    <li className="sidebar-nav__subitem" key={campaña._id}>
                      <Link href={`/campanias/${generateUrlName(campaña._id, campaña.nombreCampaña)}`}>
                        <a className="sidebar-nav__sublink" onClick={onToggle}>
                          <img src='/icons/chevron-right.svg' /> {campaña.nombreCampaña}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            )}
          </ul>
        </div>
        <div className="sidebar-nav__bg" onClick={onToggle} />
      </nav>

      <style jsx>{`
        .sidebar-nav {
          position: fixed;
          top: 0;
          z-index: 9999;
          visibility: ${isOpen ? 'visible' : 'hidden'};
          transition: all .3s ease-in-out;
        }

        .sidebar-nav__content {
          background: var(--main-color);
          padding: 2rem;
          width: 85vw;
          height: 100vh;
          transition: all .3s ease-in-out;
          position: relative;
          z-index: 9999;
          left: ${isOpen ? 0 : '-100%'};
        }

        .sidebar-nav__bg {
          position: absolute;
          background-color: rgba(0, 0, 0, 0.35);
          width: 100vw;
          height: 100vh;
          z-index: 9998;
          top: 0;
          left: 0;
          transition: all .1s;
        }

        .sidebar-nav__header {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-bottom: 2rem;
        }

        .sidebar-nav__items {
        }

        .sidebar-nav__item {
          margin-bottom: 2rem;
          transform: translateY(${isOpen ? '-20px' : 0});
          opacity: ${isOpen ? 1 : 0};
          transition: all .3s ease-in-out;
        }

        .sidebar-nav__item:nth-child(1) {
          transition-delay: .1s;
        }

        .sidebar-nav__item:nth-child(2) {
          transition-delay: .3s;
        }

        .sidebar-nav__item:nth-child(3) {
          transition-delay: .5s;
        }

        .sidebar-nav__item:nth-child(4) {
          transition-delay: .7s;
        }

        .sidebar-nav__item:nth-child(5) {
          transition-delay: .9s;
        }

        .sidebar-nav__link {
          color: #fff;
          font-size: 24px;
          font-weight: 500;
        }

        .sidebar-nav__close {
          background: transparent;
          border: none;
          appearance: none;
          font-size: 0;
        }

        .sidebar-nav__close svg {
          cursor: pointer;
          width: 20px;
          height: 20px;
          stroke: #fff;
          stroke-width: 8px;
          overflow: visible;
          margin-left: auto;
        }

        @media screen and (min-width: 768px) {
          .sidebar-nav {
            display: none;
          }
        }

        .sidebar-nav__children {
          margin-top: 1.4rem;
          padding-left: 1rem;
        }

        .sidebar-nav__sublink {
          color: rgba(255,255,255,.9);
          font-size: 1.2rem;
          display: flex;
          gap: 1rem;
          padding: 0.5rem 0;
          font-weight: 600;
        }
      `}</style>
    </>
  );
};

HeaderSidebarNav.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  links: PropTypes.array.isRequired,
};

export default HeaderSidebarNav;
