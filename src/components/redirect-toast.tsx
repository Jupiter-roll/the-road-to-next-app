'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

import { deleteCookieByKey,getCookieByKey } from '@/actions/cookies';

const RedirectToast = () => {
  useEffect(() => {
    const fetchCookieToast = async () => {
      const message = await getCookieByKey('toast');

      if (message) {
        toast.success(message);
        deleteCookieByKey('toast');
      }
    };

    fetchCookieToast();
  }, []);

  return null;
};

export { RedirectToast };
