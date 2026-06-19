import type { Meta, StoryObj } from '@storybook/react';
import { VideoShowcase } from './VideoShowcase';

const meta = {
  title: 'Marketing/VideoShowcase',
  component: VideoShowcase,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof VideoShowcase>;

export default meta;
type Story = StoryObj<typeof VideoShowcase>;

export const Embed: Story = {
  render: () => (
    <VideoShowcase
      title="See it in action"
      description="Product walkthrough (sample embed)."
      embedUrl="https://www.youtube.com/embed/ScMzIvxBSi4"
      titleAttr="Product demo"
    />
  ),
};

export const NativeVideo: Story = {
  render: () => (
    <VideoShowcase
      title="Looping background (muted)"
      description="Use a short clip for atmosphere—keep files small for LCP."
      video={{
        src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
        controls: true,
        muted: true,
        loop: true,
        playsInline: true,
      }}
    />
  ),
};
