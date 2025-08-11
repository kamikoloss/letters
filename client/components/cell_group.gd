class_name CellGroup
extends Control
## 呪文の文字群

## Cell のシーン元
@export var _cell_scene: PackedScene

## 呪文の文字列
var letters := ""
## 呪文の形を表現する二次元配列 (1 = セルあり, 0 = セルなし)
## 例 (T 字型): [[1,1,1],[0,1,0]]
var shape := []
## ドラッグできるかどうか
var can_drag := true
## ドロップできるかどうか
var can_drop := true
## ドラッグ中かどうか
var is_dragging := false

## 自身を構成する呪文の文字のリスト
var _cells: Array[Cell] = []
## ドラッグを開始した座標
var _drag_start_global_position: Vector2
## 自身の中央の座標
var _center_position: Vector2


func _ready() -> void:
    _init_cells()


func _process(delta: float) -> void:
    # ドラッグ中の場合
    if is_dragging:
        global_position = get_global_mouse_position() - _center_position


## 呪文の文字列と形状を元に初期化する
func _init_cells() -> void:
    var index := 0
    var cell_x := 0
    var cell_y := 0
    for row in shape:
        cell_x = 0
        for col in row:
            if col == 1:
                # Cell を作成する
                var cell: Cell = _cell_scene.instantiate()
                cell.position = Vector2(cell_x, cell_y)
                cell.letter = letters[index]
                add_child(cell)
                _cells.push_back(cell)
                index += 1
                # Cell の signal に接続する
                cell.hovered.connect(_on_hovered)
                cell.dragged.connect(_on_dragged)
                cell.cell_entered.connect(_on_cell_entered)
            cell_x += Cell.CELL_SIZE.x
        cell_y += Cell.CELL_SIZE.y
    # 自身の中央の座標を算出する
    _center_position = Vector2(cell_x, cell_y) / 2


func _on_hovered(on: bool) -> void:
    if not can_drag or is_dragging:
        return

    #print("_on_hovered(on: %s)" % [on])
    for cell in _cells:
        if on:
            cell.modulate = Color(1, 1, 1, 0.8)
        else:
            cell.modulate = Color(1, 1, 1, 1)


func _on_dragged(on: bool) -> void:
    print("_on_dragged(on: %s)" % [on])
    is_dragging = on
    # TODO: 自身の位置を調整する 全体の中央を算出するとか？

    # ドラッグを開始したとき
    if on:
        _drag_start_global_position = global_position
    # ドラッグを終了したとき
    else:
        # ドロップできるとき
        # TODO: tween で移動する
        if can_drop:
            global_position = snapped(global_position, Cell.CELL_SIZE)
        else:
            global_position = _drag_start_global_position


func _on_cell_entered(on: bool) -> void:
    #print("_on_cell_entered(on: %s, area: %s)" % [on, area])
    # TODO: 衝突先の cell 情報見る
    can_drop = _cells.all(func(cell: Cell): return cell.can_drop)
