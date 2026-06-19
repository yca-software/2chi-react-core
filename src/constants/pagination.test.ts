import { describe, expect, it } from 'vitest';
import { flattenPaginatedItems, normalizePaginatedList } from './pagination';

describe('pagination', () => {
  it('normalizes API list payloads', () => {
    expect(normalizePaginatedList({ items: [{ id: 1 }], hasNext: true })).toEqual({
      items: [{ id: 1 }],
      hasNext: true,
    });
    expect(normalizePaginatedList({ Items: [{ id: 2 }], HasNext: false })).toEqual({
      items: [{ id: 2 }],
      hasNext: false,
    });
    expect(normalizePaginatedList(null)).toEqual({ items: [], hasNext: false });
  });

  it('flattens infinite-query pages', () => {
    expect(
      flattenPaginatedItems([
        { items: [{ id: 1 }], hasNext: true },
        { items: [null, { id: 2 }], hasNext: false },
      ]),
    ).toEqual([{ id: 1 }, { id: 2 }]);
  });
});
