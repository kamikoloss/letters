class_name Cell
extends Control
## 呪文の1マス分 (= 1文字分)
## 呪文ホルダー側も呪文オブジェクト側もこのクラスの集まりで表現する

## マウスポインタが 入った/外れた とき
signal hovered # (on: bool)
## ドラッグを 開始/終了 したとき
## 呪文オブジェクト側のみ使用する
signal dragged # (on: bool)
## 他の Cell に 入った/外れた とき
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
var is_holder := false
## 呪文ホルダーとして有効かどうか
## 呪文オブジェクトが置かれたあとや表示用では無効になる
var is_holder_active := false

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
    # Area の重なり: オブジェクト側のみ
    if not is_holder:
        area.area_entered.connect(_on_area_entered)
        area.area_exited.connect(_on_area_exited)

    bg_color = COLOR_DEFAULT


func _gui_input(event: InputEvent) -> void:
    if event is InputEventMouseButton:
        if event.button_index == MOUSE_BUTTON_LEFT:
            dragged.emit(event.pressed)


func _on_mouse_entered() -> void:
    hovered.emit(true)


func _on_mouse_exited() -> void:
    hovered.emit(false)


func _on_area_entered(_other_area: Area2D) -> void:
    cell_entered.emit(true)


func _on_area_exited(_other_area: Area2D) -> void:
    cell_entered.emit(false)
