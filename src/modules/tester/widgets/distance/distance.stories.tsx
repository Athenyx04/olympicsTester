import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { DistanceWidget } from './distance.widget'

const meta: Meta<typeof DistanceWidget> = {
    title: 'DistanceWidget',
    component: DistanceWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof DistanceWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('distance-widget')

        expect(container).toBeTruthy()
    },
}
