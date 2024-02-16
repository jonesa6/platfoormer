namespace SpriteKind {
    export const coin = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile6`, function (sprite, location) {
    myCorg.maxJump = 3
    tiles.setCurrentTilemap(tilemap`level24`)
})
scene.onOverlapTile(SpriteKind.Player, sprites.builtin.forestTiles12, function (sprite5, location5) {
    statusbar.value += -2
})
scene.onOverlapTile(SpriteKind.Player, sprites.builtin.forestTiles0, function (sprite2, location2) {
    statmax_amount += 50
    textSprite.setText("")
    level += 1
    tiles.setCurrentTilemap(tilemap`level2`)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile7`, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`transparency8`)
    game.showLongText("make it to the End.", DialogLayout.Bottom)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile9`, function (sprite, location) {
    game.setGameOverMessage(true, "you completed the game in " + game.runtime() + " MS")
    game.gameOver(true)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile4`, function (sprite4, location4) {
    statmax_amount += 50
    level += 1
    tiles.setCurrentTilemap(tilemap`level10`)
})
statusbars.onZero(StatusBarKind.Health, function (status) {
    game.reset()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile8`, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`level25`)
})
scene.onOverlapTile(SpriteKind.Player, sprites.swamp.swampTile1, function (sprite3, location3) {
    statmax_amount += 50
    level += 1
    myCorg.maxJump = 9
    tiles.setCurrentTilemap(tilemap`level4`)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile2`, function (sprite, location) {
    statusbar.value += -1
})
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    blockSettings.clear()
    if (blockSettings.exists("coin")) {
        myCorg.sayText("delete_save_failed", 2000, true)
    } else if (blockSettings.exists("level")) {
        myCorg.sayText("delete_save_failed", 2000, true)
    } else if (blockSettings.exists("statmax")) {
        myCorg.sayText("delete_save_failed", 2000, true)
    } else if (blockSettings.exists("Corg-y")) {
    	
    } else if (blockSettings.exists("Corg-x")) {
    	
    } else {
        myCorg.sayText("delete_save_success", 2000, true)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile3`, function (sprite6, location6) {
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
    tiles.setTileAt(location6, assets.tile`transparency16`)
    info.changeScoreBy(1)
    coins += 1
})
let statusbar: StatusBarSprite = null
let coins = 0
let textSprite: TextSprite = null
let myCorg: Corgio = null
let level_check = blockSettings.readNumber("level")
let coin_save = blockSettings.readNumber("coin")
myCorg = corgio.create(SpriteKind.Player, blockSettings.readNumber("corg-x"), blockSettings.readNumber("Corg-y"))
textSprite = textsprite.create("level 1", 0, 1)
myCorg.verticalMovement(true)
myCorg.horizontalMovement(true)
myCorg.updateSprite(true)
let mySprite = sprites.create(img`
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
    `, SpriteKind.Player)
mySprite.follow(myCorg, 300)
myCorg.maxJump = 9
myCorg.gravity = 500
myCorg.setStayInScreen(false)
if (blockSettings.exists("coin")) {
    info.setScore(coin_save)
    coins = coin_save
} else {
    info.setScore(0)
    coins = 0
}
let level = 1
scene.cameraFollowSprite(mySprite)
if (level_check == 1) {
    tiles.setCurrentTilemap(tilemap`level1`)
} else if (level_check == 2) {
    tiles.setCurrentTilemap(tilemap`level2`)
} else if (level_check == 3) {
    myCorg.maxJump = 7
    tiles.setCurrentTilemap(tilemap`level4`)
} else if (level_check == 4) {
    myCorg.maxJump = 9
    tiles.setCurrentTilemap(tilemap`level10`)
} else {
    tiles.setCurrentTilemap(tilemap`level1`)
}
let statmax_amount = 50
statusbar = statusbars.create(20, 4, StatusBarKind.Health)
statusbar.max = blockSettings.readNumber("statmax")
statusbar.value = 50
statusbar.attachToSprite(myCorg, 5, 0)
game.onUpdateInterval(500, function () {
    statusbar.value += 5
})
game.onUpdateInterval(10000, function () {
    timer.after(10, function () {
        blockSettings.writeNumber("Corg-x", myCorg.x)
        blockSettings.writeNumber("Cory-y", myCorg.y)
        blockSettings.writeNumber("statmax", statmax_amount)
        blockSettings.writeNumber("coin", coins)
        blockSettings.writeNumber("level", level)
        if (blockSettings.exists("coin")) {
            myCorg.sayText("game_save_success", 2000, true)
        } else if (blockSettings.exists("level")) {
            myCorg.sayText("game_save_success", 2000, true)
        } else if (blockSettings.exists("statmax")) {
            myCorg.sayText("game_save_success", 2000, true)
        } else if (blockSettings.exists("Corg-y")) {
            mySprite.sayText("Game_save_sucess")
        } else if (blockSettings.exists("Corg-x")) {
            mySprite.sayText("Game_save_sucess")
        } else {
            myCorg.sayText("game_save_failed", 2000, true)
        }
    })
})
