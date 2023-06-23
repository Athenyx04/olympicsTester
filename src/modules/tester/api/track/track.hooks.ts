import { useQuery } from '@tanstack/react-query'
import { Pagination } from '@/hookey'
import { useApiContext } from '@/common/providers/api-context'
import { trackApi } from './track.api'
import { TrackGetApiParams } from './track.types'

export const useTracks = Pagination.makePaginationHook({
    cacheKey: 'track-api-list',
    clientFn: trackApi.list,
    useApiContext: useApiContext,
    // TODO: Connect getCount and getPageData with the list response data
    getCount: (data) => data.count,
    getPageData: (data) => data.results,
})

export const useTrack = (params: TrackGetApiParams) => {
    return useQuery(
        ['track-api-get', params] as [string, typeof params],
        ({ queryKey: [_key, params] }) => trackApi.get(params)
    )
}
