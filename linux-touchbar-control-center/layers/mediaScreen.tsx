import React from 'react';
import { Box, Button, KEY } from 'react-drm';
import {
  MdClose,
  MdBrightness4, MdBrightness7,
  MdMicOff,
  MdSearch,
  MdSkipPrevious, MdPlayArrow, MdSkipNext,
  MdVolumeOff, MdVolumeDown, MdVolumeUp,
  MdApps,
} from 'react-icons/md';
import { BackButton } from '../components/BackButton';
import { keys } from '../services/keyInjector';
import { ICON_SIZES } from '../config';

interface IconProps {
  style?: React.CSSProperties;
  fill?: string;
  stroke?: string;
}

function MdKeyboardIllumDown({ style, fill = '#cccccc' }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="11 25 76 48" style={style}>
      <g fill={fill} stroke="none">
        <path d="M82.804,58.125l2.841-1.177c2.087-0.864,3.078-3.257,2.213-5.345c-0.865-2.087-3.258-3.077-5.345-2.212l-2.841,1.177c-2.087,0.864-3.078,3.257-2.213,5.345C78.324,58,80.717,58.991,82.804,58.125z"/>
        <path d="M33.268,37.608c0.865,2.088,3.258,3.079,5.345,2.214c2.087-0.865,3.078-3.258,2.213-5.345l-1.177-2.84c-0.865-2.088-3.258-3.079-5.345-2.214c-2.087,0.865-3.078,3.258-2.213,5.345L33.268,37.608z"/>
        <path d="M14.357,56.96l0-0.001l2.812,1.165c1.009,0.418,2.146,0.414,3.153-0.009l0.057-0.024c2.082-0.877,3.059-3.276,2.182-5.357c-0.469-1.113-1.382-1.877-2.441-2.244L17.488,49.4c-2.088-0.865-4.481,0.126-5.346,2.214C11.278,53.702,12.269,56.095,14.357,56.96z"/>
        <path d="M59.081,37.578c0.839,2.097,3.22,3.118,5.318,2.28l0-0.001l0.057-0.023c1.029-0.413,1.836-1.21,2.26-2.233l1.165-2.812c0.864-2.088-0.127-4.481-2.214-5.343c-2.087-0.864-4.48,0.126-5.343,2.214l-1.081,2.607C58.746,35.272,58.632,36.456,59.081,37.578z"/>
        <path d="M29.508,70.89h40.938c2.259,0,4.09-1.832,4.09-4.09c0-2.26-1.832-4.09-4.09-4.09H29.508c-2.259,0-4.09,1.831-4.09,4.09C25.418,69.057,27.249,70.89,29.508,70.89z"/>
      </g>
    </svg>
  );
}

function MdKeyboardIllumUp({ style, fill = '#cccccc' }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="4 24 90 52" style={style}>
      <g fill={fill} stroke="none">
        <path d="M82.928,61.265l9.546-3.955c2.087-0.866,3.078-3.259,2.214-5.345c-0.865-2.088-3.258-3.079-5.345-2.215l-9.546,3.955c-2.087,0.866-3.078,3.259-2.214,5.345C78.448,61.139,80.841,62.13,82.928,61.265z"/>
        <path d="M33.205,40.624c0.865,2.088,3.258,3.079,5.345,2.215c2.087-0.866,3.078-3.259,2.214-5.345l-3.931-9.492c-0.865-2.088-3.258-3.079-5.345-2.215c-2.087,0.866-3.078,3.259-2.214,5.345L33.205,40.624z"/>
        <path d="M7.511,57.26l9.511,3.986c2.084,0.874,4.481-0.108,5.354-2.192c0.873-2.084-0.108-4.481-2.192-5.355l-9.511-3.986c-2.084-0.874-4.481,0.108-5.354,2.192C4.446,53.989,5.427,56.386,7.511,57.26z"/>
        <path d="M61.415,42.806c2.087,0.864,4.48-0.127,5.345-2.215l3.93-9.488c0.865-2.087-0.127-4.48-2.214-5.345c-2.087-0.864-4.48,0.127-5.345,2.215l-3.93,9.488C58.337,39.548,59.328,41.941,61.415,42.806z"/>
        <path d="M29.53,74.554h40.941c2.259,0,4.091-1.832,4.091-4.091c0-2.26-1.832-4.091-4.091-4.091H29.53c-2.259,0-4.091,1.831-4.091,4.091C25.439,72.722,27.27,74.554,29.53,74.554z"/>
      </g>
    </svg>
  );
}

// ── Actions ────────────────────────────────────────────────────────────────────

type Action =
  | 'Macro1'
  | 'BrightnessDown' | 'BrightnessUp'
  | 'MicMute'
  | 'Search'
  | 'IllumDown' | 'IllumUp'
  | 'PreviousSong' | 'PlayPause' | 'NextSong'
  | 'Mute' | 'VolumeDown' | 'VolumeUp'
  | 'AllApplications'
  | 'Unknown';

function run(action: Action) {
  switch (action) {
    case 'BrightnessDown':   return keys.pressKey(KEY.BRIGHTNESSDOWN);
    case 'BrightnessUp':     return keys.pressKey(KEY.BRIGHTNESSUP);
    case 'MicMute':          return keys.pressKey(KEY.MICMUTE);
    case 'Search':           return keys.pressKey(KEY.SEARCH);
    case 'IllumDown':        return keys.pressKey(KEY.KBDILLUMDOWN);
    case 'IllumUp':          return keys.pressKey(KEY.KBDILLUMUP);
    case 'PreviousSong':     return keys.pressKey(KEY.PREVIOUSSONG);
    case 'PlayPause':        return keys.pressKey(KEY.PLAYPAUSE);
    case 'NextSong':         return keys.pressKey(KEY.NEXTSONG);
    case 'Mute':             return keys.pressKey(KEY.MUTE);
    case 'VolumeDown':       return keys.pressKey(KEY.VOLUMEDOWN);
    case 'VolumeUp':         return keys.pressKey(KEY.VOLUMEUP);
    case 'AllApplications':  return keys.pressKey(KEY.LEFTMETA);
  }
}

// ── Component ──────────────────────────────────────────────────────────────────

const BTN_SIZE  = 60;
const ICON_SIZE = ICON_SIZES.mediaScreen;

export function MediaScreen({ width, height }: { width: number; height: number }) {
  return (
    <Box style={{ flex: 1,gap: 30 }}>

      <BackButton animation="slide-right" />



      <Box style={{flexGrow:2 , gap:6}} >

      <Button
       
             color="#444444"
          activeColor="#555555"
        style={{flex:1, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}
        onClick={() => run('BrightnessDown')}
      >
        <MdBrightness4 style={{ width: ICON_SIZE, height: ICON_SIZE }} fill="#cccccc" stroke="none" />
      </Button>

      <Button
       
             color="#444444"
          activeColor="#555555"
        style={{flex:1, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}
        onClick={() => run('BrightnessUp')}
      >
        <MdBrightness7 style={{ width: ICON_SIZE, height: ICON_SIZE }} fill="#cccccc" stroke="none" />
      </Button>
</Box>
      <Box style={{flexGrow:1}} >

      <Button
       
             color="#444444"
          activeColor="#555555"
        style={{flex:1, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}
        onClick={() => run('MicMute')}
      >
        <MdMicOff style={{ width: ICON_SIZE, height: ICON_SIZE }} fill="#cccccc" stroke="none" />
      </Button>
</Box>
      <Box style={{flexGrow:1}} >

      <Button
       
             color="#444444"
          activeColor="#555555"
        style={{flex:1, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}
        onClick={() => run('Search')}
      >
        <MdSearch style={{ width: ICON_SIZE, height: ICON_SIZE }} fill="#cccccc" stroke="none" />
      </Button>
</Box>

      <Box style={{flexGrow:2 , gap:6}}   >

      <Button
             color="#444444"
          activeColor="#555555"
        style={{flex:1, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}
        onClick={() => run('IllumDown')}
      >
        <MdKeyboardIllumDown style={{ width: ICON_SIZE, height: ICON_SIZE }} fill="#cccccc" stroke="none" />
      </Button>

      <Button
             color="#444444"
          activeColor="#555555"
        style={{flex:1, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}
        onClick={() => run('IllumUp')}
      >
        <MdKeyboardIllumUp style={{ width: ICON_SIZE, height: ICON_SIZE }} fill="#cccccc" stroke="none" />
      </Button>
</Box>

      <Box style={{flexGrow:3 , gap:6}} >

      <Button
       
             color="#444444"
          activeColor="#555555"
        style={{flex:1, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}
        onClick={() => run('PreviousSong')}
      >
        <MdSkipPrevious style={{ width: ICON_SIZE, height: ICON_SIZE }} fill="#cccccc" stroke="none" />
      </Button>

      <Button
       
             color="#444444"
          activeColor="#555555"
        style={{flex:1, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}
        onClick={() => run('PlayPause')}
      >
        <MdPlayArrow style={{ width: ICON_SIZE, height: ICON_SIZE }} fill="#cccccc" stroke="none" />
      </Button>

      <Button
       
             color="#444444"
          activeColor="#555555"
        style={{flex:1, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}
        onClick={() => run('NextSong')}
      >
        <MdSkipNext style={{ width: ICON_SIZE, height: ICON_SIZE }} fill="#cccccc" stroke="none" />
      </Button>
</Box>

      <Box style={{flexGrow:3 , gap:6}} >

      <Button
       
             color="#444444"
          activeColor="#555555"
        style={{flex:1, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}
        onClick={() => run('Mute')}
      >
        <MdVolumeOff style={{ width: ICON_SIZE, height: ICON_SIZE }} fill="#cccccc" stroke="none" />
      </Button>

      <Button
       
             color="#444444"
          activeColor="#555555"
        style={{flex:1, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}
        onClick={() => run('VolumeDown')}
      >
        <MdVolumeDown style={{ width: ICON_SIZE, height: ICON_SIZE }} fill="#cccccc" stroke="none" />
      </Button>

      <Button
       
             color="#444444"
          activeColor="#555555"
        style={{flex:1, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}
        onClick={() => run('VolumeUp')}
      >
        <MdVolumeUp style={{ width: ICON_SIZE, height: ICON_SIZE }} fill="#cccccc" stroke="none" />
      </Button>
</Box>

      <Box style={{flexGrow: 1}} >

      <Button
       
             color="#444444"
          activeColor="#555555"
        style={{flex:1, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}
        onClick={() => run('AllApplications')}
      >
        <MdApps style={{ width: ICON_SIZE, height: ICON_SIZE }} fill="#cccccc" stroke="none" />
      </Button>
</Box> 

    </Box>
  );
}
