import type { Pagination } from '@/hookey'

export type Track = {
    trackId: TrackId
    name: string
    distance: number
    location: string
    trackPoints: TrackPoint[]
}

export type TrackPoint = {
    latitude: number
    longitude: number
    elevation?: number
}

// TODO: Set the id type
export type TrackId = string | number

export type TrackApiResult = {
    // TODO: Replace with actual get api result
    results: Track
}

export type TrackPaginatedApiResult = {
    // TODO: Replace with actual list api result
    results: Track[]
    count: number
}

export type TrackListApiParams = Pagination.UsePaginatedQueryParams<{
    // TODO: Add other params here
}>

export type TrackGetApiParams = {
    resourceId: TrackId
    // TODO: Add other params here
}

export type TrackCreateApiParams = {
    newResource: Omit<Track, 'trackId'>
    // TODO: Add other params here
}

export type TrackUpdateApiParams = {
    updatedResource: Track
    // TODO: Switch params if the api requires an id in the url for updates
    // updatedResource: Omit<Track, 'trackId'>
    // resourceId: TrackId
    // TODO: Add other params here
}

export type TrackDeleteApiParams = {
    resourceId: TrackId
    // TODO: Add other params here
}
