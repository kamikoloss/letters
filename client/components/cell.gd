class_name Cell
extends Control
## 呪文の1マス分 (= 1文字分)
## 呪文ホルダー側も呪文オブジェクト側もこのクラスの集まりで表現する

## マウスポインタが 入った/外れた とき
signal hovered # (on: bool)
## ドラッグを 開始/終了 したとき
## 呪文オブジェクト側のみ使用する
signal dragged # (on: bool)
## 他の Cell が 入った/外れた とき
signal cell_entered # (on: bool)

## Cell の大きさ (px)
## TODO: 決め打ちでいいのだろうか？
const CELL_SIZE = Vector2(40, 40)

const COLOR_DEFAULT = Color(Color.BLACK, 0.2)
const COLOR_SUCCESS = Color(Color.GREEN, 0.2)
const COLOR_DANGER = Color(Color.RED, 0.2)

@export var area: Area2D

@export var _label: Label
@export var _bg: ColorRect

## 呪文ホルダー側かどうか
## true: 呪文ホルダー側, false: 呪文オブジェクト側
var is_holder := false:
    set(v):
        is_holder = v
        _update_debug()
## 呪文ホルダーとして有効かどうか
## 呪文オブジェクトが置かれたあとや表示用では無効になる
var is_holder_active := false:
    set(v):
        is_holder_active = v
        _update_debug()
        # 有効状態が変わったら色を初期化する
        bg_color = COLOR_DEFAULT

## 呪文の1文字
var letter := "":
    set(v):
        letter = v
        _label.text = v
##
var bg_color := COLOR_DEFAULT:
    get():
        return _bg.color
    set(v):
        _bg.color = v


func _ready() -> void:
    mouse_entered.connect(_on_mouse_entered)
    mouse_exited.connect(_on_mouse_exited)
    # ホルダー側も重なりを検知するため常に接続する
    area.area_entered.connect(_on_area_entered)
    area.area_exited.connect(_on_area_exited)

    bg_color = COLOR_DEFAULT


func _gui_input(event: InputEvent) -> void:
    if event is InputEventMouseButton:
        if event.button_index == MOUSE_BUTTON_LEFT:
            dragged.emit(event.pressed)


## 自身に重なっているホルダー Cell のうち最寄りを取得する
## 重なっているホルダー Cell がない場合は null を返す
func get_nearest_overrapping_holder() -> Cell:
    var overrapping_areas := area.get_overlapping_areas()
    if overrapping_areas.is_empty():
        return null

    var nearest_area := overrapping_areas[0]
    var nearest_distance := INF
    for overrapping_area in overrapping_areas:
        var distance := overrapping_area.global_position.distance_to(global_position)
        if distance < nearest_distance:
            nearest_area = overrapping_area
            nearest_distance = distance

    var nearest_cell := nearest_area.get_parent()
    if nearest_cell is Cell:
        return nearest_cell
    return null



func _on_mouse_entered() -> void:
    hovered.emit(true)


func _on_mouse_exited() -> void:
    hovered.emit(false)


func _on_area_entered(_other_area: Area2D) -> void:
    if is_holder:
        var other_cell := _other_area.get_parent()
        if other_cell is Cell:
            # 自身が最寄りのホルダー Cell のときのみ色を変更する
            #var nearest_cell := other_cell.get_nearest_overrapping_holder()
            var nearest_cell = other_cell.get_nearest_overrapping_holder()
            if nearest_cell is Cell:
                # 置けるかどうかで色を分ける
                if is_holder_active:
                    bg_color = COLOR_SUCCESS
                else:
                    bg_color = COLOR_DANGER
    else:
        cell_entered.emit(true)


func _on_area_exited(_other_area: Area2D) -> void:
    if is_holder:
        # 重なりがなくなったら元の色に戻す
        bg_color = COLOR_DEFAULT
    else:
        cell_entered.emit(false)


func _update_debug() -> void:
    var is_holder_active_lamp: ColorRect = get_node("Debug/is_holder_active")
    if is_holder:
        is_holder_active_lamp.color = Color.GREEN if is_holder_active else Color.RED
    else:
        is_holder_active_lamp.visible = false
