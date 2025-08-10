extends TextureRect


func _get_drag_data(at_position: Vector2) -> Variant:
    print("_get_drag_data", at_position)
    var preview := TextureRect.new()
    preview.size = self.size
    preview.texture = self.texture
    preview.expand_mode = TextureRect.EXPAND_IGNORE_SIZE
    preview.position = -at_position # ドラッグ開始位置との差分を設定してカーソル位置を維持する
    set_drag_preview(preview)
    #self.visible = false
    return self
