class_name CellHolder
extends Control
## 呪文ホルダー

@export var _cells_parent: Control

## 自身を構成する Cell のリスト
var cells: Array[Cell]


func _ready() -> void:
    for node in _cells_parent.get_children():
        if node is Cell:
            node.is_holder = true
            node.is_holder_active = true # TODO: ロード
            cells.push_back(node)
