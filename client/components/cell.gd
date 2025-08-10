class_name Cell
extends Control
## 呪文の文字の1マス分

## Cell の大きさ (px)
## TODO: 決め打ちでいいのだろうか？
const CELL_SIZE = Vector2(40, 40)

@export var _label: Label
@export var _bg: ColorRect

## 呪文の1文字
var letter := "":
    set(v):
        letter = v
        _label.text = v
