import React from 'react';
import { Button } from 'react-drm';
import { MdCancel } from 'react-icons/md';
import { useLayers } from '../layers';
import type { LayerAnimation, SwitchOptions } from '../layers';
import { ICON_SIZES } from '../config';

export function BackButton({
  to = 'splitted',
  animation,
  switchOptions,
}: {
  to?: string;
  animation?: LayerAnimation;
  switchOptions?: SwitchOptions;
}) {
  const { go } = useLayers();
  return (
    <Button
      width={60} height={60}
      color="#000" activeColor="#000"
      style={{ alignItems: 'center', justifyContent: 'center' }}
      onClick={() => go(to, switchOptions ?? animation)}
    >
      <MdCancel style={{ width: ICON_SIZES.backButton, height: ICON_SIZES.backButton }} fill="#cccccc" stroke="none" />
    </Button>
  );
}
