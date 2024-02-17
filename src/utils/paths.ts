export const homePath = () => '/';

export const signUpPath = () => '/sign-up';
export const signInPath = () => '/sign-in';
export const forgotPasswordPath = () => '/forgot-password';

export const dashboardPath = () => '/dashboard';

export const settingsPath = () => '/settings';

export const ticketsPath = () => '/tickets';

export const ticketsCreatePath = () => '/tickets/create';

export const ticketPath = (ticketId: string) =>
  `/tickets/${ticketId}`;
