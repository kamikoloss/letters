class_name CellGroup
extends Control
## 呪文オブジェクト

## Cell のシーン元
@export var _cell_scene: PackedScene

## 自身を構成する Cell のリスト
var cells: Array[Cell] = []
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

## 自身の中央のオフセット
var _center_offset: Vector2
## ドラッグを開始した座標
var _drag_start_global_position: Vector2
## 直前に重なっていたホルダー Cell のリスト
var _prev_overrapping_cells: Array[Cell] = []


func _ready() -> void:
    _init_cells()


func _process(delta: float) -> void:
    # ドラッグ中の場合
    if is_dragging:
        global_position = get_global_mouse_position() - _center_offset


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
                cell.is_holder = false
                cell.is_holder_active = false
                add_child(cell)
                cells.push_back(cell)
                index += 1
                # Cell の signal に接続する
                cell.hovered.connect(_on_hovered)
                cell.dragged.connect(_on_dragged)
                cell.cell_entered.connect(_on_cell_entered)
            cell_x += Cell.CELL_SIZE.x
        cell_y += Cell.CELL_SIZE.y
    # 自身の中央のオフセットを算出する
    _center_offset = Vector2(cell_x, cell_y) / 2


func _on_hovered(on: bool) -> void:
    if not can_drag or is_dragging:
        return

    #print("_on_hovered(on: %s)" % [on])
    for cell in cells:
        if on:
            cell.modulate = Color(1, 1, 1, 0.6)
        else:
            cell.modulate = Color(1, 1, 1, 1)


func _on_dragged(on: bool) -> void:
    #print("_on_dragged(on: %s)" % [on])
    is_dragging = on

    # ドラッグを開始したとき
    if on:
        # ドラッグを開始した座標を保持しておく
        _drag_start_global_position = global_position
        # 配置していたホルダーを有効に戻す
        for overrapping_cell in _prev_overrapping_cells:
            overrapping_cell.is_holder_active = true
    # ドラッグを終了したとき
    else:
        # ドロップできるとき
        if can_drop:
            # オブジェクトを配置する
            # TODO: tween で移動する
            global_position = _prev_overrapping_cells[0].global_position
            # 置いたホルダーを無効にする
            # TODO: 1文字まで重ねられるようにする
            for overrapping_cell in _prev_overrapping_cells:
                overrapping_cell.is_holder_active = false # 色は Cell 側で自動リセット
        # ドロップできないとき
        else:
            # オブジェクトをドラッグ開始時の座標に戻す
            # TODO: tween で移動する
            global_position = _drag_start_global_position
            # ホルダーの色リセットは Cell 側で自動化されている


func _on_cell_entered(on: bool) -> void:
    #print("_on_cell_entered(on: %s)" % [on])
    # この処理の発火タイミングとなる "他の Cell に 入った/外れた" タイミングで更新する
    # TODO: マス目分見てるので一気に複数発火する？まあいいか

    if not is_dragging:
        return # ドラッグ中でなければ処理しない

    # 色のリセットは Cell 側で行うためここでは不要
    _prev_overrapping_cells.clear()

    # 自身の Cell ごとに重なっている最寄りのホルダー Cell を取得する
    var overrapping_cells: Array[Cell] = [] # 重なっている Cell
    for cell in cells:
        if cell is Cell:
            var nearest_cell := cell.get_nearest_overrapping_holder()
            if nearest_cell:
                overrapping_cells.push_back(nearest_cell)
    _prev_overrapping_cells = overrapping_cells
    #print("overrapping_cells", overrapping_cells)

    # 重なっているホルダー Cell がない場合: ドロップ不可
    if overrapping_cells.is_empty():
        can_drop = false
        return
    # すべての Cell が重なっていいない場合: ドロップ不可
    if cells.size() != overrapping_cells.size():
        # TODO: なんかはみ出ても置けることがある？外周におけない Holder を配置する？
        can_drop = false
        return
    # 配置処理は _on_dragged でやる
    # ここではドロップできるかできないかの判断のみ行う
    can_drop = overrapping_cells.all(func(cell: Cell): return cell.is_holder_active)
