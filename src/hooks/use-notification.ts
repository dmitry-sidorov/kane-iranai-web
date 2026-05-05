import { notifications } from '@mantine/notifications';

export const useNotification = () => {
  const onSuccess = (title: string, message: string) => {
    notifications.show({
      color: 'green',
      title,
      message,
    });
  };

  const onFailure = (title: string, message: string) => {
    notifications.show({
      color: 'red',
      title,
      message,
    });
  };

  return {
    onSuccess,
    onFailure,
  };
};
