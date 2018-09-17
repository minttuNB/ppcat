# ppcat
Bongo cat stream overlay for OBS.
Supports both mouse and tablet.

## IMPORTANT
Set the Compatibility setting to "Windows 8" if you're on Windows 10 in order to avoid bugs like a white screen.

## config.json
The configuration file (generated on start-up, located in the same folder as the .exe) contains 5 options:
```json
{
  "resX": 1680,
  "resY": 1050,
  "mouse": false,
  "keyLeft": 90,
  "keyRight": 88
}
```
`resX` - your screen resolution width  
`resY` - your screen resolution height  
`mouse` - `true` uses mouse sprites, `false` uses tablet sprites  
`keyLeft` - your Left Click button in osu!. Z by default  
`keyRight` - your Right Click button in osu!. X by default  
Please use a tool such as http://keycode.info/ to find keycodes for your own keys.
