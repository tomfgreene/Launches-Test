import { Flex, Title, Text } from '@mantine/core';

//Function Component - Renders error information using the Error type as a prop
export function ErrorObject(error: Error) {
    return (
        <Flex
            gap='md'
            justify='flex-start'
            align='flex-start'
            direction='column'
        >
            <Title size='h4'>{error.name}</Title>
            <Text>{error.message}</Text>
        </Flex>
    );
}