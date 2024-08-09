# Based on the work of [@Asvarox/allkaraoke](https://github.com/Asvarox/allkaraoke)

## Misc docs

Documentation about specific topics can be found in [docs/](docs/) folder.

### Terminology:

- `frequency` - a frequency of player's voice in Hz
- `frequencyRecord` - object containing frequency and timestamp (of the song) when it was recorded
- `pitch` - an actual sound (eg A, C, F#) as a number where `0` = C0
- `section` - either a verse (containing notes) or a "pause section" - A.K.A instrumental part of the song when nothing's sung
- `note` - a single singable syllabe with assigned target `pitch`, starting beat, length and lyric. Is also one of several types (see below)
- `distance` - a number of pitches between player's note pitch and target note pitch, disregarding the octave (so for example player's note C0 has distance 0 to note's target pitch of C4). Note a tolerance can apply - eg with tolerance of 1, distance between pitches 66 and 65 will be 0 (while between 67 and 65 would be 2)
- `playerNote` - group of `frequencyRecords` recorded directly after eachother, matched (by time) to a note with the same distance to it. Basically represents the player sung lines shown in the game

### Note types

- `normal` - regular note
- `star` - golden note, gives bonus points
- `rap` / `freestyle` - notes that are always hit if any singing is detected. Gives reduced points
