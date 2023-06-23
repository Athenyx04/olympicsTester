import React from 'react'
import styles from './tester-main.module.css'
import { DistanceWidget } from '@/tester/widgets/distance'

type TesterMainViewProps = {
    // query parameters
    searchParams: { [key: string]: string | string[] | undefined }
    // url parameters
    params: { [key: string]: string | undefined }
}

export function TesterMainView(props: TesterMainViewProps) {
    return (
        <div data-testid="main-view" className={styles.container}>
            <DistanceWidget />
        </div>
    )
}
