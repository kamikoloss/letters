class_name Cell
extends Control
## 呪文の文字の1マス分

@export var _label: Label
@export var _bg: ColorRect

## 呪文の1文字
var letter := "":
    set(v):
        letter = v
        _label.text = v
