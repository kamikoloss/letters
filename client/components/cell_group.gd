class_name CellGroup
extends Control
## 呪文オブジェクト

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
var can_drop := false
## ドラッグ中かどうか
var is_dragging := false

## 自身を構成する呪文の文字のリスト
var _cells: Array[Cell] = []
## ドラッグを開始した座標
var _drag_start_global_position: Vector2
## 自身の中央の座標
var _center_position: Vector2
## 直前に重なっていた Cell のリスト
var _prev_overrapping_cells: Array[Cell] = []


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
            cell.modulate = Color(1, 1, 1, 0.6)
        else:
            cell.modulate = Color(1, 1, 1, 1)


func _on_dragged(on: bool) -> void:
    #print("_on_dragged(on: %s)" % [on])
    is_dragging = on

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
    #print("_on_cell_entered(on: %s)" % [on])
    # この処理の発火タイミングとなる "他の Cell に 入った/外れた" タイミングで更新する
    # TODO: マス目分見てるので一気に複数発火する？まあいいか

    # 直前に重なっていた Cell の色を戻す
    for cell in _prev_overrapping_cells:
        if cell is Cell:
            cell.bg_color = Cell.COLOR_DEFAULT
    _prev_overrapping_cells.clear()

    var overrapping_cells: Array[Cell] = [] # 重なっている Cell
    for cell in _cells:
        if cell is Cell:
            # 自身を構成する Cell が重なっているホルダー Area の中で最寄りを取得する
            var overrapping_areas := cell.area.get_overlapping_areas() # 重なっている Area[]
            if overrapping_areas.is_empty():
                continue
            var nearest_area := overrapping_areas[0] # 最寄りの Area (現時点では候補)
            var nearest_distance := INF # 最寄りの Area への距離 (現時点では候補)
            for overrapping_area in overrapping_areas:
                var distance := overrapping_area.global_position.distance_to(cell.global_position)
                if distance < nearest_distance:
                    nearest_area = overrapping_area
                    nearest_distance = distance
            # 最寄りのホルダー Area を元にホルダー Cell を取得する
            var nearest_cell := nearest_area.get_parent()
            if nearest_cell is Cell:
                overrapping_cells.push_back(nearest_cell)
                # 置けるかどうかの色を設定する
                if nearest_cell.is_holder:
                    nearest_cell.bg_color = Cell.COLOR_SUCCESS
    _prev_overrapping_cells = overrapping_cells
    #print("overrapping_cells", overrapping_cells)

    if overrapping_cells.is_empty():
        can_drop = false
    elif _cells.size() != overrapping_cells.size():
        # TODO: なんかはみ出ても置けるときがある 外周におけない Holder を配置する？
        can_drop = false
    else:
        # TODO: 1文字まで重ねられるようにする
        can_drop = overrapping_cells.all(func(cell: Cell): return cell.letter == "")
