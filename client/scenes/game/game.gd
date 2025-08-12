class_name Game
extends Node2D

@export var _cell_group_scene: PackedScene


func _ready() -> void:
    # debug
    var a: CellGroup = _cell_group_scene.instantiate()
    a.letters = "LETTERS"
    a.shape = [[1,1,1],[0,1,0],[0,1,0]]
    var b: CellGroup = _cell_group_scene.instantiate()
    b.letters = "LETTERS"
    b.shape = [[1,1,1,1]]

    add_child(a)
    add_child(b)
