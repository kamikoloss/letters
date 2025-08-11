class_name Cell
extends Control
## 呪文の1マス分 (= 1文字分)
## 格納側もこのクラスの集まりで表現する

## マウスポインタが 入った/外れた とき
signal hovered # (on: bool)
## ドラッグを 開始/終了 したとき
signal dragged # (on: bool)
## 他の Cell に 入った/外れた とき
signal cell_entered # (on: bool)

## Cell の大きさ (px)
## TODO: 決め打ちでいいのだろうか？
const CELL_SIZE = Vector2(40, 40)

## 格納側かどうか
## true: 呪文格納側, false: 呪文側
@export var is_holder := false

@export var _label: Label
@export var _bg: ColorRect
@export var _area: Area2D

## ドロップできるかどうか (1マス分)
var can_drop := false
## 呪文の1文字
var letter := "":
    set(v):
        letter = v
        _label.text = v


func _ready() -> void:
    mouse_entered.connect(_on_mouse_entered)
    mouse_exited.connect(_on_mouse_exited)
    _area.area_entered.connect(_on_area_entered)
    _area.area_exited.connect(_on_area_exited)


func _gui_input(event: InputEvent) -> void:
    if event is InputEventMouseButton:
        if event.button_index == MOUSE_BUTTON_LEFT:
            dragged.emit(event.pressed)


func _on_mouse_entered() -> void:
    hovered.emit(true)


func _on_mouse_exited() -> void:
    hovered.emit(false)


func _on_area_entered(area: Area2D) -> void:
    # TODO: 情報見る
    can_drop = true
    cell_entered.emit(true)
    if is_holder:
        if can_drop:
            _bg.color = Color(Color.GREEN, 0.2)
        else:
            _bg.color = Color(Color.RED, 0.2)


func _on_area_exited(area: Area2D) -> void:
    # TODO: 入っても無効になることがある
    can_drop = false
    cell_entered.emit(false)
    if is_holder:
        _bg.color = Color(Color.BLACK, 0.2)
