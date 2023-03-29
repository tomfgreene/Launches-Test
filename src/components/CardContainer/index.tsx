import { usePastLaunches } from '@/hooks/usePastLaunches';
import { Flex, Grid, Skeleton, SkeletonProps } from '@mantine/core';
import { CardObject } from '../CardObject';
import { ErrorObject } from '../ErrorObject';

//Function Component - Calls the use past launches hook and renders a card for each piece of data returned from the API

export function CardContainer() {

    // Calls the react-query function and returns the max amount specified in the dependency
    // -- Error handling is in place to catch and display any errors encountered during fetch
    const pastLaunches = usePastLaunches(10)
    
    // Loading skeletion default props to mitigate repetition
    const defaultLoadingSkel: SkeletonProps = {
        h: 150,
        w: '33%',
        radius: 'sm'
    }

    return (
        <Flex
            gap='md'
            justify='flex-start'
            align='flex-start'
            direction='column'
        >
            {pastLaunches.status === 'success' ?
                <Grid>
                    {pastLaunches.data.map(launch =>
                        <Grid.Col key={launch.id} xs={12} sm={12} md={6} lg={4} xl={4}>
                            <CardObject data={launch} />
                        </Grid.Col>
                    )}
                </Grid>
                :
                pastLaunches.status === 'error' ?
                    <ErrorObject {...pastLaunches.error} />
                    :
                    <Flex display='flex'>
                        <Skeleton {...defaultLoadingSkel} />
                    </Flex>
            }
        </Flex>
    );
}