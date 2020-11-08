# winmojilib

A Collection of lightweight, up-to-date emojis supported by Windows for use in winmoji
These emojis are generated from the most up-to-date resource based on the
[Unicode Data](https://unicode.org/emoji/).

## Installation

**npm**

```shell
npm install winmojilib
```

**yarn**

```shell
yarn add winmojilib
```

Exmaple object

```json
{
  "grinning_face": {
    "char": "😀",
    "keywords": [
      "face",
      "grin",
      "grinning face"
    ],
    "name": "grinning_face",
    "group": "smileys-emotion",
    "hexcode": "1F600",
    "subgroup": "face-smiling"
  },
  "grinning_face_with_big_eyes": {
    "char": "😃",
    "keywords": [
      "face",
      "grinning face with big eyes",
      "mouth",
      "open",
      "smile"
    ],
    "name": "grinning_face_with_big_eyes",
    "group": "smileys-emotion",
    "hexcode": "1F603",
    "subgroup": "face-smiling"
  },
  "grinning_face_with_smiling_eyes": {
    "char": "😄",
    "keywords": [
      "eye",
      "face",
      "grinning face with smiling eyes",
      "mouth",
      "open",
      "smile"
    ],
    "name": "grinning_face_with_smiling_eyes",
    "group": "smileys-emotion",
    "hexcode": "1F604",
    "subgroup": "face-smiling"
  },
```

# For maintainers

## Development Quick start

```shell
yarn && yarn start
```

This will then build you an emoji json data file.
