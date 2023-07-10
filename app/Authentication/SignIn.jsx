import { Form, Link, useActionData } from '@remix-run/react';
import React, { useEffect, useState, useTransition } from 'react';
import { AiFillEye, AiFillEyeInvisible, AiOutlineLock, AiOutlineUser } from 'react-icons/ai';
import { toast } from 'react-toastify';
import './Auth.css';

function SignIn() {
  // Show/hide password
  const [typePassWord, setTypePassWord] = useState('password');

  const actionData = useActionData();

  const transition = useTransition();
  const isSubmitting = Boolean(transition.submission);

  useEffect(() => {
    if (!isSubmitting && actionData?.errorGlobal) {
      toast('Email hoặc mật khẩu sai, vui lòng thử lại', { type: 'warning' });
    }
  }, [actionData, actionData?.errorGlobal, isSubmitting]);

  return (
    <Form method="post">
      <div className="limiter">
        <div className="container-login100 main-login">
          <div className="col-md-12 col-xl-4"></div>
          <div className="wrap-login100 signInForm p-l-55 p-r-55 p-t-55 p-b-50 col-md-12 col-xl-8">
            <span className="login100-form-title">Đăng nhập</span>
            <div className="wrap-input100 validate-input">
              <AiOutlineUser className="icon-form" />
              <input className="input100" type="email" placeholder="Email hoặc Số Điện Thoại" name="email" />
            </div>
            {actionData?.errors?.email && <p className="text-danger">{actionData?.errors?.email}</p>}
            <div className="wrap-input100 validate-input">
              <AiOutlineLock className="icon-form" />
              <input className="input100" type={typePassWord} placeholder="Mật khẩu" name="password" />
              {typePassWord === 'password' ? (
                <button type="button" className="show-password" onClick={() => setTypePassWord('text')}>
                  <AiFillEye />
                </button>
              ) : (
                <button type="button" className="show-password" onClick={() => setTypePassWord('password')}>
                  <AiFillEyeInvisible />
                </button>
              )}
            </div>
            {actionData?.errors?.password && <p className="text-danger">{actionData?.errors?.password}</p>}

            <div className="login-box">
              {/* <div className="container-login100-form-btn m-t-20"> */}
              {/* <button className="login100-form-btn btn-form" type='submit'> */}
              <button type="submit">Đăng nhập</button>
            </div>

            <div className="text-center p-t-45 p-b-4">
              <span className="txt1">Tạo một tài khoản?</span>
              &nbsp;
              <Link to="/signup" className="txt2 hov1">
                Đăng ký
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default SignIn;
