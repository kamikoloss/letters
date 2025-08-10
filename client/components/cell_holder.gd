class_name CellHolder
extends Control
## 呪文の文字群を格納するマス目


func _can_drop_data(at_position: Vector2, data: Variant) -> bool:
    print("_can_drop_data", at_position, data)
    return true


func _drop_data(at_position: Vector2, data: Variant) -> void:
    print("_drop_data", at_position, data)
    if data["node"] is Control:
        data["node"].position = self.position + snapped(at_position, Vector2(40, 40))
