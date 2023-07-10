import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="main-404">
      <div className="container py-4">
        <h1>
          {' '}
          <b>404</b> Error Page
        </h1>
        <p className="zoom-area">
          <b>Sports Zone</b> Xin chân thành tài trợ trang 404 này.{' '}
        </p>
        <section className="error-container">
          <span className="four">
            <span className="screen-reader-text">4</span>
          </span>
          <span className="zero">
            <span className="screen-reader-text">0</span>
          </span>
          <span className="four">
            <span className="screen-reader-text">4</span>
          </span>
        </section>
        <div className="text-center">
          <button type="button" className="more-link">
            <Link target="_parent" to={'/'}>
              Trở Về Trang Chủ
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
