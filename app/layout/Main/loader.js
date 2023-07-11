import { json } from '@remix-run/node';
import { ID_USER_CLIENTAGE, parseIdFromHeader } from '../../utils/sessions-storage/parse-user-id';
import { nanoid } from 'nanoid';

export const loader = async ({ request }) => {
  const { user_id, idSessions, sessions, id_user_clientage } = await parseIdFromHeader(request);
  const headers = new Headers();
  const fakeId = nanoid();
  if (user_id === undefined && id_user_clientage === undefined) {
    idSessions.idUserClientage.set(ID_USER_CLIENTAGE, fakeId);
    headers.append(
      'Set-Cookie',
      await sessions.idUserClientageSessions.commitSession(idSessions.idUserClientage, {
        expires: tokenExpiresAfter1Month(),
      }),
    );
  }
  return json({ user_id, id_user_clientage }, { headers });
};

const tokenExpiresAfter1Month = () => {
  const date = new Date();
  date.setMonth(date.getMonth() + 1);
  return date;
};
