/// <reference path="../Shared/Utils.ts"/>

Package.Require('Utils.lua')

const teamColours: string[] = ['Red', 'Yellow', 'Pink', 'Green', 'Blue', 'Orange', 'Black', 'White', 'Purple', 'Brown']
const unavailableTeams: string[] = []
const gameStarted: boolean = false

// Assign player a character and team on spawn
Player.Subscribe('Spawn', function (player: Player): void {
    SpawnPlayer(player)
    SelectRandomTeam(player)
    Server.BroadcastChatMessage(`${player.GetName()} joined and is team ${player.GetValue('Team', 'Penis')}`)
})

// Removes character and team when player leaves
Player.Subscribe('Destroy', function (player: Player): void {
    const character = player.GetControlledCharacter()
    if (character) {
        const currentTeam = player.GetValue('Team', null)
        if (currentTeam) {
            const teamid = unavailableTeams.indexOf(currentTeam)
            unavailableTeams.splice(teamid, 1)
            Package.Log(`Removed ${currentTeam}: ${unavailableTeams.length} teams taken.`)
        }
        character.Destroy()
    }
})

function SelectRandomTeam(player: Player): void {
    const randomColour = teamColours[Math.floor(Math.random() * teamColours.length)]
    if (unavailableTeams.includes(randomColour)) {
        print('Team colour taken, picking a random one again.')
        SelectRandomTeam(player)
    } else {
        unavailableTeams.push(randomColour)
        player.SetValue('Team', randomColour, true)
    }
}
