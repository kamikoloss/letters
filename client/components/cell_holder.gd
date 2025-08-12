class_name CellHolder
extends Control
## 呪文ホルダー

@export var _cells_parent: Control

var cells: Array[Cell]


func _ready() -> void:
    for node in _cells_parent.get_children():
        if node is Cell:
            cells.push_back(node)
