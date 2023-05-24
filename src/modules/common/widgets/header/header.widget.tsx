import React from 'react'
import styles from './header.module.css'
import { AccountWidget } from '../account'
import Link from 'next/link'

export type HeaderWidgetProps = {}

export function HeaderWidget(props: HeaderWidgetProps) {
    return (
        <div
            data-testid="header-widget"
            className="flex bg-secondary text-primary p-4"
        >
            <Link href="/" className={styles.logo}>
                Logo
            </Link>
            <AccountWidget className="ml-auto" />
        </div>
    )
}
