import { Center, Image } from '@mantine/core';

export const NotFoundPage = () => {
  return <Center h={500}>
    <Image
      radius="md"
      src="/src/assets/images/not-found.jpg"
      alt="Not Found"
      h={400}
      w={600}
    />
  </Center>;
};