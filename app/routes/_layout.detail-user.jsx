/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import UserProfile from '../Authentication/UserProfile';
import { HOST } from '../domain/host/host';
import { json } from '@remix-run/node';

export default function Index() {
  return <UserProfile />;
}
// DEV: dataUser gồm có gì thì nhập hàm form.get(``) như id
export const action = async ({ request }) => {
  const form = await request.formData();
  const type = form.get('type');

  if (type === 'updateUser') {
    const id = form.get('id');
    const avatar = form.get('avatar');
    const fullname = form.get('fullname');
    const address = form.get('address');
    const birthday = form.get('birthday');
    const sex = form.get('sex');
    const phone = form.get('phone');
    const email = form.get('email');
    const password = form.get('password');
    const URL_UPDATEUSER = `${HOST}/updateUser`;
    try {
      await axios.put(`${URL_UPDATEUSER}/${id}`, {
        avatar,
        fullname,
        address,
        birthday,
        sex,
        phone,
        email,
        password,
      });

      return json({ message: 'Bạn Đã cập nhật thông tin Thành Công!' });
    } catch (error) {
      return json({ error: 'Cập Nhật Thông Tin Thất Bại!' });
    }
  }

  if (type === 'updateImage') {
    const formData = new FormData();
    const avatarUpload = form.get('avatar');
    formData.append('file', avatarUpload);
    try {
      const response = await axios.post(`${HOST}/upload-cloud`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return json({ avatar: response.data.avatar });
    } catch (error) {
      return json({ error: 'Cập nhật thất bại' });
    }
  }
};
