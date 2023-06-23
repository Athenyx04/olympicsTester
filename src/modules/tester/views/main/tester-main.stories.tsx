import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { TesterMainView } from './tester-main.view'

const meta: Meta<typeof TesterMainView> = {
    title: 'MainView',
    component: TesterMainView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof TesterMainView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('main-view')

        expect(container).toBeTruthy()
    },
}
