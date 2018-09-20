# ppcat
Bongo cat stream overlay for OBS.
Supports both mouse and tablet.

## IMPORTANT
Set the Compatibility setting to "Windows 8" if you're on Windows 10 in order to avoid bugs like white screen or black screen in OBS.

## config.json
The configuration file (generated on start-up, located in the same folder as the .exe) contains 8 options:
```json
{
  "resX": 1680,
  "resY": 1050,
  "mouse": false,
  "keyLeft": 90,
  "keyRight": 88,
  "letterboxing": false,
  "lbResX": 1280,
  "lbResY": 960
}
```
`resX` - your screen resolution width  
`resY` - your screen resolution height  
`mouse` - `true` uses mouse sprites, `false` uses tablet sprites  
`keyLeft` - your Left Click button in osu!. Z by default  
`keyRight` - your Right Click button in osu!. X by default  
`letterboxing` - whether to use a letterbox resolution  
`lbResX` - your letterbox resolution width  
`lbResY` - your letterbox resolution height
Please use a tool such as http://keycode.info/ to find keycodes for your own keys.
