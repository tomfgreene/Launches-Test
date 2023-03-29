import { IPastLaunchResponse } from '@/hooks/usePastLaunches';
import { Flex, Modal, ModalProps, Accordion, Text, createStyles, Paper, Image } from '@mantine/core'
import { IconRocket, IconSettings, IconAlertCircle } from '@tabler/icons-react'

interface IModalObject {
    modalProps: ModalProps
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
    mainDetails: {
        width: '70%',
        flexDirection: 'column'
    },
    launchFailure: {
        display: 'flex',
        flexDirection: 'column',
    },
    socialLinkContainer: {
        justifyContent: 'flex-start',
        alignContent: 'center',
        flexDirection: 'column',
        h: '100%',
        w: 40
    },
    accordianDetail: {
        justifyContent: 'flex-start',
        flexDirection: 'row'
    }
}));

interface IAccordDetails {
    title: string
    info: string | number
}

//Function Component - Modal object contains futher details regarding the past launch. Visibility is triggered by parent
export function ModalObject({ data, modalProps }: IModalObject) {

    const { classes } = useStyles()

    //Component renders the default template for accordian details
    const AccordianDetails = ({ title, info }: IAccordDetails) => {

        return (
            <Flex direction='column' w='49%' p='xs'>
                <Text fz='sm' fw={600}>{title}</Text>
                <Text fz='sm'>{info}</Text>
            </Flex>
        )
    }

    return (
        <Modal {...modalProps} size='lg'>
            <Flex justify='space-between' wrap='wrap'>
                <Flex justify='center' w='30%'>
                    <Image
                        src={data.links.patch.small}
                        alt={`${data.name} launch image`}
                        height={120}
                        width={120}
                        display='contents'
                        p='sm'
                        fit='contain'
                    />
                </Flex>
                <Flex className={classes.mainDetails}>
                    <Text fw={600}>{`Id: ${data.id}`}</Text>
                    <Text fw={600}>{`Rocket: ${data.rocket}`}</Text>
                    <Text fw={600}>{`Launched on: ${new Date(data.date_utc).toLocaleString().replace(',', ' @ ')}`}</Text>
                    {!data.success &&
                        <Paper radius='md' shadow='sm' bg='red' variant='light' p='sm' className={classes.launchFailure} mt='sm' mb='sm'>
                            <Text fz='md' fw={600}>Launch Failure</Text>
                            <Text fz='sm'>{data.details}</Text>
                        </Paper>
                    }
                </Flex>
                <Accordion variant='default' w='100%' pt='sm' pb='sm'>
                    {data.failures.length > 0 &&
                        <Accordion.Item value='failures'>
                            <Accordion.Control icon={<IconAlertCircle size='25px' fill='red' />}>Failures</Accordion.Control>
                            <Accordion.Panel>
                                <Accordion variant='default'>
                                    {data.failures.map((failureObj, index) =>
                                        <Accordion.Item key={index} value={failureObj.reason} p={0}>
                                            <Accordion.Control>{`Failure ${index}`}</Accordion.Control>
                                            <Accordion.Panel>
                                                <Flex direction='row' wrap='wrap' w='100%' display='space-between'>
                                                    <AccordianDetails title='Reason' info={failureObj.reason} />
                                                    <AccordianDetails title='Time' info={failureObj.time} />
                                                    {failureObj.altitude &&
                                                        <AccordianDetails title='Altitude' info={failureObj.altitude} />
                                                    }
                                                </Flex>
                                            </Accordion.Panel>
                                        </Accordion.Item>
                                    )
                                    }
                                </Accordion>
                            </Accordion.Panel>
                        </Accordion.Item>

                    }
                    <Accordion.Item value='launchinfo'>
                        <Accordion.Control icon={<IconRocket size='25px' color='lightblue' />}>Launch Information</Accordion.Control>
                        <Accordion.Panel>
                            <Flex direction='row' wrap='wrap' w='100%' display='space-between'>
                                <AccordianDetails title='Flight Number' info={data.flight_number} />
                                <AccordianDetails title='Launchpad' info={data.launchpad} />
                                <AccordianDetails title='Ships' info={data.ships.length ? data.ships.join(' | ') : 'None'} />
                                <AccordianDetails title='Payloads' info={data.payloads.length ? data.payloads.join(' | ') : 'None'} />
                            </Flex>
                        </Accordion.Panel>
                    </Accordion.Item>
                    <Accordion.Item value='cores'>
                        <Accordion.Control icon={<IconSettings size='25px' color='orange' />}>Cores</Accordion.Control>
                        <Accordion.Panel>
                            <Accordion variant='default'>
                                {data.cores.map((coreObj, index) =>
                                    <Accordion.Item key={index} value={coreObj.core}>
                                        <Accordion.Control>{`Core ${index}`}</Accordion.Control>
                                        <Accordion.Panel>
                                            <Flex direction='row' wrap='wrap' w='100%' display='space-between'>
                                                {Object.entries(coreObj).map(([key, val]) =>
                                                    <AccordianDetails key={key} title={key.replace('_', ' ')} info={val !== null ? val === true ? 'Yes' : val === false ? 'No' : val : 'N/A'} />
                                                )
                                                }
                                            </Flex>
                                        </Accordion.Panel>
                                    </Accordion.Item>
                                )
                                }
                            </Accordion>
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
            </Flex>
        </Modal>
    );
}