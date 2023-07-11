/* eslint-disable no-useless-escape */
import { json, redirect } from '@remix-run/node';
import axiosClient from '../API/axiosClient';

const REGISTER_URL = '/signup';

export const action = async ({ request }) => {
  const form = await request.formData();

  const email = form.get('email');
  const fullname = form.get('fullname');
  const password = form.get('password');
  const phone = form.get('phone');

  const errors = validateFormSignup(email, password, phone, fullname);

  if (
    errors.email !== undefined ||
    errors.password !== undefined ||
    errors.fullName !== undefined ||
    errors.phone !== undefined
  ) {
    return json({ errors });
  }
  try {
    const res = await signupRequest(email, password, phone, fullname);
    if (res.success) {
      return redirect('/signin');
    }
    return json({ ...res });
  } catch (error) {
    return json({ error });
  }
};

//validate
const validateEmail = (email) => {
  const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/;
  return validEmail.test(String(email).toLowerCase());
};

const validatePhoneNumber = (phone) => {
  const validPhone = /^(\+84|0)\d{9,10}$/;
  return validPhone.test(phone);
};

const validatePassword = (password) => {
  const validPassword = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/;
  return validPassword.test(password);
};

const validateFormSignup = (email, password, phone, fullName) => {
  const errors = {};

  if (!fullName) {
    errors.fullName = 'Tên không được để trống!';
  }

  if (!email) {
    errors.email = 'Email không được để trống!';
  } else if (!validateEmail(email)) {
    errors.email = 'Email không hợp lệ!';
  }

  if (!password) {
    errors.password = 'Mật khẩu không được để trống!';
  } else if (!validatePassword(password)) {
    errors.password = 'Mật khẩu phải từ 7-19 ký tự, ít nhất một chữ cái, một chữ số và một ký tự đặc biệt!';
  }

  if (!phone) {
    errors.phone = 'Số điện thoại không được để trống!';
  } else if (!validatePhoneNumber(phone)) {
    errors.phone = 'Số điện thoại không hợp lệ!';
  }

  return errors;
};

const signupRequest = async (email, password, phone, fullName) => {
  const response = {
    success: undefined,
    errorGlobal: undefined,
  };
  const data = {
    email,
    password,
    phone,
    fullName,
  };
  try {
    const res = await axiosClient.post(REGISTER_URL, data);
    response.success = true;
  } catch (error) {
    response.errorGlobal = true;
  }
  return response;
};
