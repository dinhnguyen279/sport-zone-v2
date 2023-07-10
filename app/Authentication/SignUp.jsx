import { Form, Link, useActionData } from '@remix-run/react';
import React, { useEffect, useState, useTransition } from 'react';
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineLock,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineUser,
} from 'react-icons/ai';
import { toast } from 'react-toastify';
import './Auth.css';
SignUp.propTypes = {};

function SignUp() {
  const [typePassWord, setTypePassWord] = useState('password');
  const actionData = useActionData();
  const transition = useTransition();
  const isSubmitting = Boolean(transition.submission);

  useEffect(() => {
    if (!isSubmitting && actionData?.error) {
      toast(actionData?.error, { type: 'warning' });
    }
  }, [actionData, actionData?.error, isSubmitting]);

  // Show/hide password

  return (
    <Form method="post">
      <div className="limiter">
        <div className="container-login100 row">
          <div className="col-md-12 col-xl-4"></div>
          <div className="wrap-login100 signUpForm p-l-55 p-r-55 p-t-65 p-b-50 col-md-12 col-xl-8">
            <span className="signup100-form-title">Đăng ký</span>
            <div className="wrap-input100 validate-input">
              <AiOutlineUser className="icon-form" />
              <input className="input100" name="fullname" type="text" placeholder="Họ và Tên" />
            </div>
            {actionData?.errors?.fullName && <p className="text-danger">{actionData?.errors?.fullName}</p>}

            <div className="wrap-input100 rs1 validate-input">
              <AiOutlineMail className="icon-form" />
              <input className="input100" name="email" type="text" placeholder="Email" />
            </div>
            {actionData?.errors?.email && <p className="text-danger">{actionData?.errors?.email}</p>}

            <div className="wrap-input100 rs1 validate-input">
              <AiOutlineLock className="icon-form" />
              <input className="input100" name="password" type={typePassWord} placeholder="Mật khẩu" />
              {typePassWord === 'password' ? (
                <button type="button" className="show-password" onClick={() => setTypePassWord('text')}>
                  <AiFillEyeInvisible />
                </button>
              ) : (
                <button type="button" className="show-password" onClick={() => setTypePassWord('password')}>
                  <AiFillEye />
                </button>
              )}
            </div>
            {actionData?.errors?.password && <p className="text-danger">{actionData?.errors?.password}</p>}

            <div className="wrap-input100 rs1 validate-input">
              <AiOutlinePhone className="icon-form" />
              <input className="input100" name="phone" type="text" placeholder="Số điện thoại" />
            </div>
            {actionData?.errors?.phone && <p className="text-danger">{actionData?.errors?.phone}</p>}

            {/* <div className="container-login100-form-btn m-t-20"> */}
            <div className="login-box">
              <button type="submit">
                {/* <button className="login100-form-btn" type='submit'> */}
                Đăng ký
              </button>
            </div>

            <div className="text-center p-t-45 p-b-4">
              <span className="txt1">Đăng nhập?</span>
              &nbsp;
              <Link to="/signin" className="txt2 hov1">
                Click
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default SignUp;
