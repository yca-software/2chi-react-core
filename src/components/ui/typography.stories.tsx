import type { Meta, StoryObj } from '@storybook/react';
import { H3, Heading, Paragraph } from './typography';

const meta = {
  title: 'UI/Typography',
  component: Heading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof Heading>;

export const Headings: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading level="h1" as="h1">
        Heading 1
      </Heading>
      <Heading level="h2" as="h2">
        Heading 2
      </Heading>
      <Heading level="h3" as="h3">
        Heading 3
      </Heading>
      <Heading level="h4" as="h4">
        Heading 4
      </Heading>
    </div>
  ),
};

export const Paragraphs: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Paragraph size="lg">
        Large paragraph text. This is useful for introductory text or important content that needs
        to stand out.
      </Paragraph>
      <Paragraph size="default">
        Default paragraph text. This is the standard size for body text in most applications. It
        provides good readability while maintaining a clean appearance.
      </Paragraph>
      <Paragraph size="sm">
        Small paragraph text. This is useful for captions, metadata, or secondary information that
        doesn't need as much emphasis.
      </Paragraph>
    </div>
  ),
};

export const H3Component: Story = {
  render: () => (
    <div className="space-y-4">
      <H3>Section Title</H3>
      <Paragraph>
        This is content under an H3 heading. The H3 component is a convenience wrapper for the
        Heading component with level="h3".
      </Paragraph>
    </div>
  ),
};

export const Combined: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <Heading level="h1" as="h1">
        Article Title
      </Heading>
      <Paragraph size="lg">
        This is the introduction paragraph that sets the context for the article.
      </Paragraph>
      <H3>First Section</H3>
      <Paragraph>
        This is the content for the first section. It contains detailed information about the topic.
      </Paragraph>
      <H3>Second Section</H3>
      <Paragraph>
        This is the content for the second section. It continues the discussion with more details.
      </Paragraph>
    </div>
  ),
};
