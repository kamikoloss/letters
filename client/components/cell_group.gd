class_name CellGroup
extends Control
## 呪文の文字群

## Cell の一辺の長さ (px)
const CELL_LENGTH = 40

## Cell のシーン元
@export var _cell_scene: PackedScene

## 呪文の文字列
var letters := ""
## 呪文の形を表現する二次元配列 (1 = セルあり, 0 = セルなし)
## 例 (T 字型): [[1,1,1],[0,1,0]]
var shape := []
## ドラッグ中かどうか
var is_dragging := false


func _ready() -> void:
    # debug
    letters = "LETTERS"
    shape = [[1,1,1],[0,1,0]]

    _init_shape()


func _notification(what: int) -> void:
    match what:
        # ドラッグ開始時
        NOTIFICATION_DRAG_BEGIN:
            modulate.a = 0.8
        # ドラッグ終了時
        NOTIFICATION_DRAG_END:
            # ドラッグ失敗時
            if not get_viewport().gui_is_drag_successful():
                modulate.a = 1.0


## マウスカーソルがオブジェクト内にあるかどうか
## この結果により _get_drag_data() が発火するかどうかが決まる
func _has_point(point: Vector2) -> bool:
    # `point` は CellGroup 内でのローカル座標
    # 子供の Cell のどれかにカーソルがあるかを判定する
    for child in get_children():
        if child is Cell:
            var rect := Rect2(child.position, Vector2(CELL_LENGTH, CELL_LENGTH))
            if rect.has_point(point):
                return true
    return false


func _get_drag_data(at_position: Vector2) -> Variant:
    #print("_get_drag_data", at_position)
    var preview := duplicate() as Control
    set_drag_preview(preview)
    return { "node": self }


## 自身の形状を初期化する
func _init_shape() -> void:
    var index := 0
    var cell_x := 0
    var cell_y := 0
    for row in shape:
        cell_x = 0
        for col in row:
            if col == 1:
                var cell := _cell_scene.instantiate()
                cell.letter = letters[index]
                cell.position = Vector2(cell_x, cell_y)
                add_child(cell)
                index += 1
            cell_x += CELL_LENGTH
        cell_y += CELL_LENGTH
