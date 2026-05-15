import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'review',
    title: 'Review',
    type: 'document',
    groups: [
        { name: 'core', title: 'Core', default: true },
        { name: 'meta', title: 'Meta & Sponsorship' },
        { name: 'content', title: 'Content' },
        { name: 'media', title: 'Media' },
    ],
    fields: [
        defineField({ name: 'app_name', title: 'App name', type: 'string', group: 'core', validation: (R) => R.required() }),
        defineField({ name: 'slug', title: 'Slug', type: 'slug', group: 'core', options: { source: 'app_name', maxLength: 96 }, validation: (R) => R.required() }),
        defineField({ name: 'logo', title: 'Logo', type: 'image', group: 'core', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', title: 'Alt text' }] }),
        defineField({ name: 'score', title: 'Score (0–10)', type: 'number', group: 'core', validation: (R) => R.min(0).max(10) }),
        defineField({ name: 'region', title: 'Region', type: 'string', group: 'core' }),
        defineField({ name: 'date_tested', title: 'Date tested', type: 'date', group: 'core', description: 'Used to sort the reviews list (newest first, after sponsored).' }),

        defineField({
            name: 'sponsored',
            title: '💰 Sponsored',
            type: 'boolean',
            group: 'meta',
            initialValue: false,
            options: { layout: 'switch' },
            description: 'Shows a "$ Sponsored" badge and pins to the top of /reviews and the homepage.',
        }),
        defineField({ name: 'referral_link', title: 'Referral link', type: 'url', group: 'meta' }),
        defineField({ name: 'hidden_gotcha', title: 'Hidden gotcha', type: 'text', group: 'meta', rows: 2 }),

        defineField({ name: 'tldr_top', title: 'TL;DR (top)', type: 'text', group: 'content', rows: 2 }),
        defineField({ name: 'tldr_bottom', title: 'TL;DR (bottom)', type: 'text', group: 'content', rows: 2 }),
        defineField({ name: 'context', title: 'Context', type: 'text', group: 'content', rows: 3 }),
        defineField({ name: 'pros', title: 'Pros', type: 'array', group: 'content', of: [{ type: 'string' }] }),
        defineField({ name: 'cons', title: 'Cons', type: 'array', group: 'content', of: [{ type: 'string' }] }),
        defineField({ name: 'narrative', title: 'Narrative', type: 'array', group: 'content', of: [{ type: 'block' }, { type: 'image' }] }),
        defineField({ name: 'ux_ui', title: 'UX / UI', type: 'array', group: 'content', of: [{ type: 'block' }, { type: 'image' }] }),
        defineField({ name: 'onboarding', title: 'Onboarding', type: 'array', group: 'content', of: [{ type: 'block' }, { type: 'image' }] }),
        defineField({ name: 'fees', title: 'Fees', type: 'array', group: 'content', of: [{ type: 'block' }, { type: 'image' }] }),
        defineField({ name: 'card_experience', title: 'Card experience', type: 'array', group: 'content', of: [{ type: 'block' }, { type: 'image' }] }),
        defineField({ name: 'crypto_stablecoin', title: 'Crypto / Stablecoin', type: 'array', group: 'content', of: [{ type: 'block' }, { type: 'image' }] }),

        defineField({ name: 'images', title: 'Images', type: 'array', group: 'media', of: [{ type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string' }] }] }),
        defineField({ name: 'tweets', title: 'Tweet URLs', type: 'array', group: 'media', of: [{ type: 'url' }] }),
        defineField({ name: 'video_url', title: 'Video URL', type: 'url', group: 'media' }),
    ],
    orderings: [
        {
            title: 'Site order (Sponsored first, then newest)',
            name: 'siteOrder',
            by: [
                { field: 'sponsored', direction: 'desc' },
                { field: 'date_tested', direction: 'desc' },
                { field: '_createdAt', direction: 'desc' },
            ],
        },
    ],
    preview: {
        select: { title: 'app_name', score: 'score', sponsored: 'sponsored', media: 'logo' },
        prepare: ({ title, score, sponsored, media }) => ({
            title: `${sponsored ? '💰 ' : ''}${title}`,
            subtitle: `${sponsored ? 'Sponsored · ' : ''}Score ${score ?? '—'}/10`,
            media,
        }),
    },
})
