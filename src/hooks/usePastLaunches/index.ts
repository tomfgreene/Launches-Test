import { useQuery } from '@tanstack/react-query';

interface Fairings {
    reused?: boolean
    recovery_attempt?: boolean
    recovered?: boolean
    ships: string[]
}

interface SocialLinks {
    patch: {
        small: string
        large: string
    }
    reddit: {
        campaign?: string
        launch?: string
        media?: string
        recovery?: string
    }
    flickr: {
        small: any[]
        original: string[]
    }
    presskit?: string
    webcast?: string
    youtube_id?: string
    article?: string
    wikipedia?: string
}

interface Failure {
    time: number
    altitude?: number
    reason: string
}

interface Crew {
    crew: string
    role: string
}

interface Core {
    core: string
    flight: number
    gridfins: boolean
    legs: boolean
    reused: boolean
    landing_attempt: boolean
    landing_success?: boolean
    landing_type?: string
    landpad?: string
}

export interface IPastLaunchResponse {
    fairings?: Fairings
    links: SocialLinks
    static_fire_date_utc?: string
    static_fire_date_unix?: number
    net: boolean
    window?: number
    rocket: string
    success?: boolean
    failures: Failure[]
    details?: string
    crew: Crew[]
    ships: string[]
    capsules: string[]
    payloads: string[]
    launchpad: string
    flight_number: number
    name: string
    date_utc: string
    date_unix: number
    date_local: string
    date_precision: string
    upcoming: boolean
    cores: Core[]
    auto_update: boolean
    tbd: boolean
    launch_library_id?: string
    id: string
}

//Fetcher which will return the information from launches past in the type interface provided
const getPastLaunches = async (max: number) => {
    const reqUrl = 'https://api.spacexdata.com/v5/launches/past';
    const data = await fetch(reqUrl)
        .then((response) => response.json())
        .then((data: IPastLaunchResponse[]) => data.slice(0, max))
    return data
}

//Use past launches react-query that will provide a status and data
//--Settings configured to refresh data and handle how errors should be returned which is why catch isn't used in the above fetcher
export const usePastLaunches = (max: number) => {
    return useQuery({
        queryKey: ['PastLaunches', max],
        queryFn: () => getPastLaunches(max),
        refetchOnWindowFocus: true,
        onError: (error: Error) => error,
    })
}