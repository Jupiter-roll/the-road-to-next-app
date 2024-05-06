"use server";

import { cookies } from "next/headers";

export const getCookieByKey = async (key: string) => {
  const cookie = cookies().get(key);

  if (!cookie) {
    return null;
  }

  return cookie.value;
};

export const setCookieByKey = (key: string, value: string) => {
  cookies().set(key, value);
};

export const deleteCookieByKey = (key: string) => {
  cookies().delete(key);
};
