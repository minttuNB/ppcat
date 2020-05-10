# ppcat
Bongo cat stream overlay for OBS.
Supports both mouse and tablet.

## IMPORTANT
Set the Compatibility setting to "Windows 8" if you're on Windows 10 in order to avoid bugs like white screen or black screen in OBS.  
**This is no longer needed in version v1.2.0 and up.**

## config.json
The configuration file (generated on start-up, located in the same folder as the .exe) contains a variety of options:
```json
{
  "resX": 1600,
  "resY": 900,
  "letterboxing": false,
  "lbResX": 1280,
  "lbResY": 960,
  "mode": "osu",
  "modes":{
    "osu":{
      "keyLeft": 90,
      "keyRight": 88,
      "mouse": false
    },
    "taiko":{
      "keyLeftBlue": 90,
      "keyLeftRed": 88,
      "keyRightRed": 67,
      "keyRightBlue": 86
    }
  }
}
```
* `resX` - your screen resolution width  
* `resY` - your screen resolution height  
* `letterboxing` - whether to use a letterbox resolution  
* `lbResX` - your letterbox resolution width  
* `lbResY` - your letterbox resolution height  
* `mode` - your preferred gamemode
  * `osu` for OSU-related key presses
  * `taiko` for taiko-related key presses
  * `keyboard` for any key press
* `modes` - contains mode-specific settings:  

**osu!std specific**:  
  * `modes.osu.mouse` - `true` uses mouse sprites, `false` uses tablet sprites  
  * `modes.osu.keyLeft` - your Left Click button in osu!. Z by default  
  * `modes.osu.keyRight` - your Right Click button in osu!. X by default  
  
**osu!taiko specific**:  
  * `modes.taiko.keyLeftBlue` - left outer drum key. Z by default
  * `modes.taiko.keyLeftRed` - left inner drum key. X by default
  * `modes.taiko.keyRightRed` - right inner drum key. C by default
  * `modes.taiko.keyRightBlue` - right outer drum key. V by default  
Please use a tool such as http://keycode.info/ to find keycodes for your own keys.
