@namespace
class SpriteKind:
    coin = SpriteKind.create()

def on_overlap_tile(sprite, location):
    game.show_long_text("you completed the game in " + str(game.runtime()) + " MS",
        DialogLayout.BOTTOM)
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile6
    """),
    on_overlap_tile)

def on_overlap_tile2(sprite2, location2):
    global level
    level += 1
    tiles.set_current_tilemap(tilemap("""
        level2
    """))
scene.on_overlap_tile(SpriteKind.player,
    sprites.builtin.forest_tiles0,
    on_overlap_tile2)

def on_overlap_tile3(sprite3, location3):
    global level
    if coins == 20:
        level += 1
        myCorg.max_jump = 7
        tiles.set_current_tilemap(tilemap("""
            level4
        """))
scene.on_overlap_tile(SpriteKind.player,
    sprites.swamp.swamp_tile1,
    on_overlap_tile3)

def on_overlap_tile4(sprite4, location4):
    global level
    level += 1
    tiles.set_current_tilemap(tilemap("""
        level10
    """))
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile4
    """),
    on_overlap_tile4)

def on_overlap_tile5(sprite5, location5):
    game.reset()
scene.on_overlap_tile(SpriteKind.player,
    sprites.builtin.forest_tiles12,
    on_overlap_tile5)

def on_overlap_tile6(sprite6, location6):
    global coins
    music.play(music.melody_playable(music.ba_ding),
        music.PlaybackMode.IN_BACKGROUND)
    tiles.set_tile_at(location6, assets.tile("""
        transparency16
    """))
    info.change_score_by(1)
    coins += 1
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile3
    """),
    on_overlap_tile6)

def on_menu_pressed():
    blockSettings.clear()
    if blockSettings.exists("coin"):
        myCorg.say_text("delete_save_failed", 2000, True)
    elif blockSettings.exists("level"):
        myCorg.say_text("delete_save_failed", 2000, True)
    else:
        myCorg.say_text("delete_save_success", 2000, True)
controller.menu.on_event(ControllerButtonEvent.PRESSED, on_menu_pressed)

coins = 0
myCorg: Corgio = None
level_check = blockSettings.read_number("level")
coin_save = blockSettings.read_number("coin")
myCorg = corgio.create(SpriteKind.player)
myCorg.vertical_movement(True)
myCorg.horizontal_movement(True)
myCorg.update_sprite(True)
mySprite = sprites.create(img("""
        . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . .
    """),
    SpriteKind.player)
mySprite.follow(myCorg, 300)
myCorg.max_jump = 9
myCorg.gravity = 500
myCorg.set_stay_in_screen(False)
if blockSettings.exists("coin"):
    info.set_score(coin_save)
    coins = coin_save
else:
    info.set_score(0)
    coins = 0
level = 1
scene.camera_follow_sprite(mySprite)
if level_check == 1:
    tiles.set_current_tilemap(tilemap("""
        level1
    """))
elif level_check == 2:
    tiles.set_current_tilemap(tilemap("""
        level2
    """))
elif level_check == 3:
    myCorg.max_jump = 7
    tiles.set_current_tilemap(tilemap("""
        level4
    """))
elif level_check == 4:
    myCorg.max_jump = 7
    tiles.set_current_tilemap(tilemap("""
        level10
    """))
else:
    tiles.set_current_tilemap(tilemap("""
        level1
    """))

def on_update_interval():
    blockSettings.remove("level")
    blockSettings.remove("coin")
    
    def on_after():
        blockSettings.write_number("coin", coins)
        blockSettings.write_number("level", level)
        myCorg.say_text("game_save_success", 2000, True)
    timer.after(10, on_after)
    
game.on_update_interval(10000, on_update_interval)
