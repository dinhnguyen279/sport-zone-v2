/* eslint-disable @typescript-eslint/no-explicit-any */
import { idUserClientageSessions } from './id_user_clientage.server';

import { idUserSessions } from './id_user.server';

export const ID_USER = 'user_id';

export const ID_USER_CLIENTAGE = 'id_user_clientage';

export const parseIdFromHeader = async (request) => {
  const idUser = await idUserSessions.getSession(request.headers.get('Cookie'));
  const idUserClientage = await idUserClientageSessions.getSession(request.headers.get('Cookie'));
  return {
    user_id: idUser.get(ID_USER),
    id_user_clientage: idUserClientage.get(ID_USER_CLIENTAGE),
    idSessions: {
      idUser,
      idUserClientage,
    },
    sessions: {
      idUserSessions,
      idUserClientageSessions,
    },
  };
};
