/* eslint-disable no-useless-escape */
import { Headers, json, redirect } from '@remix-run/node';
import { ID_USER, parseIdFromHeader } from '../utils/sessions-storage/parse-user-id';
import axiosClient from '../API/axiosClient';

const SIGNIN_URL = '/login';

export const action = async ({ request }) => {
  const form = await request.formData();
  const email = form.get('email');
  const password = form.get('password');

  const errors = validateFormSignin(email, password);

  if (errors.email !== undefined || errors.password !== undefined) {
    return json({ errors });
  }

  const res = await signinRequest(email, password);

  if (res.data?._id !== undefined) {
    const headers = new Headers();
    const { idSessions, sessions } = await parseIdFromHeader(request);
    idSessions.idUser.set(ID_USER, res.data._id);
    headers.append('Set-Cookie', await sessions.idUserSessions.commitSession(idSessions.idUser));
    return redirect('/', { headers });
  }

  return json({ ...res });
};

//validate
const validateEmail = (email) => {
  const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/;
  return validEmail.test(email.toLowerCase());
};

const validateFormSignin = (email, password) => {
  const errors = {};

  if (!email) {
    errors.email = 'Email không được để trống!';
  } else if (!validateEmail(email)) {
    errors.email = 'Email không hợp lệ!';
  }

  if (!password) {
    errors.password = 'Mật khẩu không được để trống!';
  }

  return errors;
};

const signinRequest = async (email, password) => {
  const response = {
    data: undefined,
    errorGlobal: undefined,
  };
  const data = {
    email: isNaN(email) ? email : undefined,
    password: password,
    phone: !isNaN(email) ? email : undefined,
  };
  try {
    const res = await axiosClient.post(SIGNIN_URL, data);
    response.data = res.data;
  } catch (error) {
    console.log(error);
    response.errorGlobal = true;
  }
  return response;
};
