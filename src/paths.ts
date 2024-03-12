export const homePath = () => '/';

export const signUpPath = () => '/sign-up';
export const signInPath = () => '/sign-in';
export const forgotPasswordPath = () => '/forgot-password';

export const changePasswordPath = () => '/account/change-password';

export const ticketsPath = () => '/tickets';

export const ticketPath = (ticketId: string) =>
  `/tickets/${ticketId}`;

export const ticketEditPath = (ticketId: string) =>
  `/tickets/${ticketId}/edit`;
