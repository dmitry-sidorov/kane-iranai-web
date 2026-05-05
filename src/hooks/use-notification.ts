import { notifications } from '@mantine/notifications';

export const useNotification = () => {
  const addSuccessNotification = (title: string, message: string) => {
    notifications.show({
      color: 'green',
      title,
      message,
    });
  };

  const addFailureNotification = (title: string, message: string) => {
    notifications.show({
      color: 'red',
      title,
      message,
    });
  };

  return {
    addSuccessNotification,
    addFailureNotification,
  };
};
