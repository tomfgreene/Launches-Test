import { IPastLaunchResponse } from '@/hooks/usePastLaunches';
import { createStyles, UnstyledButton, Image, Text, Badge, Flex, BackgroundImage } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks'
import { motion } from 'framer-motion';
import { ModalObject } from '../ModalObject';

interface ICardObject {
    data: IPastLaunchResponse
}

const useStyles = createStyles((theme) => ({
    root: {
        shadow: 'md',
        radius: 'md',
        padding: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: theme.radius.md,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        transition: 'box-shadow 150ms ease, transform 100ms ease',

        '&:hover': {
            boxShadow: theme.shadows.md,
            transform: 'scale(1.05)',
        },
    },
    headerRoot: {
        alignContent: 'center',
        justifyContent: 'space-between'
    },
    socialLinkContainer: {
        justifyContent: 'flex-start',
        alignContent: 'center',
        flexDirection: 'column',
        width: 50
    },
    accordianDetail: {
        justifyContent: 'flex-start',
        flexDirection: 'row'
    }
}));


//Function Component - Renders individual past launch information returned from parent
export function CardObject({ data }: ICardObject) {

    const { classes } = useStyles()
    //Toggles modal state using disclosure from Mantine
    //--Modal object contains further details regarding the past launch 
    const [modalOpen, { close, open }] = useDisclosure(false);

    return (
        <>
            <UnstyledButton className={classes.root} onClick={open}>
                <BackgroundImage
                    src='https://sxcontent9668.azureedge.us/cms-assets/assets/CRS_27_astronautrd_streak_desktop_90cbf7ea69.jpg'
                    radius='sm'
                >
                    <Flex className={classes.headerRoot}>
                        <Flex p='sm' align='center'>
                            <Image
                                src={data.links.patch.small}
                                alt={`${data.name} launch image`}
                                height={100}
                                width={100}
                                display='contents'
                                p='sm'
                                fit='contain'
                            />
                            <Flex p='lg' direction='column' align='flex-start' justify='flex-start'>
                                <Text component={motion.p} initial={{ opacity: 0 }} animate={{ opacity: 1 }} size='xl' tt='capitalize' fw={600} color='white'>{data.name.toLocaleUpperCase()}</Text>
                                <Badge color={data.success ? 'green' : 'red'} variant='filled'>
                                    {data.success ? 'Success' : 'Failure'}
                                </Badge>
                            </Flex>
                        </Flex>
                    </Flex>
                </BackgroundImage>
            </UnstyledButton>
            <ModalObject modalProps={{ opened: modalOpen, onClose: close, title: data.name }} data={data} />
        </>
    );
}