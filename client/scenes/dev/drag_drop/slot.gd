extends ColorRect

@export var droppable := false


func _can_drop_data(at_position: Vector2, data: Variant) -> bool:
    print("_can_drop_data", at_position, data)
    return droppable


func _drop_data(at_position: Vector2, data: Variant) -> void:
    print("_drop_data", at_position, data)
    if data is Control:
        data.global_position = self.global_position
