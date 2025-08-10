class_name Cell
extends Control
## ドラッグする呪文の1文字分に該当するクラス

## ホバー時
signal hovered

@export var label: Label
@export var bg: ColorRect

@export var is_holder := false


# ドラッグ中かどうか
var is_draggins := false




func _get_drag_data(at_position: Vector2) -> Variant:
    set_drag_preview(self)
    return self
