import { describe, expect, test } from '@jest/globals';
import { isValidMoveKnight } from '../utils/helpers';
import { Piece } from '@/app/components/chess/types/types';

describe('isValidMoveKnight', () => {
  test('should return true for valid knight moves', () => {
    const piece: Piece = {
      id: 1,
      isAlive: true,
      isMoved: false,
      type: 'knight',
      color: 'white',
      coordinate: {
        x: 'A',
        y: 1,
        xIndex: 0,
        yIndex: 0,
      },
    };

    expect(
      isValidMoveKnight(piece, {
        x: 'B',
        y: 3,
        xIndex: 1,
        yIndex: 2,
      }),
    ).toBe(true);
  });
});
