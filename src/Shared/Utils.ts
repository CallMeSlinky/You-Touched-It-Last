const CHARACTER_MESHES: string[] = [
    'nanos-world::SK_Male',
    'nanos-world::SK_Female',
    'nanos-world::SK_Mannequin',
    'nanos-world::SK_Mannequin_Female',
    'nanos-world::SK_ClassicMale',
    'nanos-world::SK_PostApocalyptic',
]

const SK_MALE_HAIR_MESHES: string[] = ['', 'nanos-world::SM_Hair_Long', 'nanos-world::SM_Hair_Short']
const SK_FEMALE_HAIR_MESHES: string[] = ['', 'nanos-world::SM_Hair_Kwang']

const SK_MALE_BEARD_MESHES: string[] = [
    '',
    'nanos-world::SM_Beard_Extra',
    'nanos-world::SM_Beard_Middle',
    'nanos-world::SM_Beard_Mustache_01',
    'nanos-world::SM_Beard_Mustache_02',
    'nanos-world::SM_Beard_Side',
]

const MALE_DEATH_SOUNDS: string[] = [
    'nanos-world::A_Male_01_Death',
    'nanos-world::A_Male_02_Death',
    'nanos-world::A_Male_03_Death',
    'nanos-world::A_Male_04_Death',
    'nanos-world::A_Male_05_Death',
    'nanos-world::A_Male_06_Death',
    'nanos-world::A_Wilhelm_Scream',
]

const MALE_PAIN_SOUNDS: string[] = [
    'nanos-world::A_Male_01_Pain',
    'nanos-world::A_Male_02_Pain',
    'nanos-world::A_Male_03_Pain',
    'nanos-world::A_Male_04_Pain',
    'nanos-world::A_Male_05_Pain',
    'nanos-world::A_Male_06_Pain',
    'nanos-world::A_Male_07_Pain',
    'nanos-world::A_Male_06_Pain',
]

const FEMALE_DEATH_SOUNDS: string[] = [
    'nanos-world::A_Female_01_Death',
    'nanos-world::A_Female_02_Death',
    'nanos-world::A_Female_03_Death',
    'nanos-world::A_Female_04_Death',
    'nanos-world::A_Female_05_Death',
]

const FEMALE_PAIN_SOUNDS: string[] = [
    'nanos-world::A_Female_01_Pain',
    'nanos-world::A_Female_02_Pain',
    'nanos-world::A_Female_03_Pain',
    'nanos-world::A_Female_04_Pain',
    'nanos-world::A_Female_05_Pain',
    'nanos-world::A_Female_06_Pain',
    'nanos-world::A_Female_07_Pain',
    'nanos-world::A_Female_06_Pain',
]

const HUMAN_MORPH_TARGETS: string[] = [
    'nose1',
    'nose2',
    'brows',
    'mouth',
    'fat',
    'nose3',
    'chin',
    'face',
    'nose4',
    'skinny',
    'jaw',
    'brows2',
    'angry',
    'smirk',
    'smirk2',
    'smirk3',
    'smile',
    'nose6',
    'jaw_forward',
    'lips',
    'lips2',
    'mouth_wide',
    'eyes1',
    'eyes2',
    'eyes3',
    'eyes4',
    'eyes_retraction',
    'lips3',
    'eyes5',
    'nose7',
    'forehead',
    'bodyfat',
]

const HUMAN_SKIN_TONES: Color[] = [
    new Color(1.0, 1.0, 1.0),
    new Color(1.0, 0.926933, 0.820785),
    new Color(0.984375, 0.854302, 0.661377),
    new Color(1.0, 0.866979, 0.785255),
    new Color(0.890625, 0.768996, 0.658135),
    new Color(0.880208, 0.706081, 0.588818),
    new Color(0.526042, 0.340051, 0.221689),
    new Color(0.244792, 0.185846, 0.15172),
    new Color(0.791667, 0.573959, 0.42882),
    new Color(0.947917, 0.655642, 0.399902),
    new Color(0.583333, 0.406594, 0.261284),
    new Color(0.645833, 0.465268, 0.36073),
    new Color(1.0, 0.917535, 0.739583),
    new Color(0.932292, 0.825388, 0.670085),
    new Color(0.817708, 0.710384, 0.549398),
    new Color(0.765625, 0.620475, 0.45459),
    new Color(0.05, 0.05, 0.08),
]

const HAIR_TINTS: Color[] = [
    new Color(0.067708, 0.030797, 0.001471),
    new Color(0.983483, 1.0, 0.166667),
    new Color(0.01, 0.01, 0.01),
    new Color(1.0, 0.129006, 0.0),
]

function GetRandomSpawnPoint(): any {
    const SPAWN_POINTS = Server.GetMapSpawnPoints()
    const randomSpawn = Math.floor(Math.random() * SPAWN_POINTS.length)
    return SPAWN_POINTS.length > 0 && SPAWN_POINTS[randomSpawn]
}

function SpawnCharacterRandomized(location?: Vector, rotation?: Rotator, asset?: string): Character {
    const randomMesh = Math.floor(Math.random() * CHARACTER_MESHES.length)
    const selected_mesh: string = asset || CHARACTER_MESHES[randomMesh]
    const spawn_point = GetRandomSpawnPoint()
    print(spawn_point.location)
    const character = new Character(location || spawn_point.location, rotation || spawn_point.rotation, selected_mesh)

    if (selected_mesh == 'nanos-world::SK_Male') {
        const randomMaleHair: string = SK_MALE_HAIR_MESHES[Math.floor(Math.random() * SK_MALE_HAIR_MESHES.length)]
        const randomMaleBeard: string = SK_MALE_BEARD_MESHES[Math.floor(Math.random() * SK_MALE_BEARD_MESHES.length)]

        if (randomMaleHair != '') {
            character.AddStaticMeshAttached('hair', randomMaleHair, 'hair_male')
        }
        if (randomMaleBeard != '') {
            character.AddStaticMeshAttached('beard', randomMaleBeard, 'beard')
        }
    }
    if (selected_mesh == 'nanos-world::SK_Male' || selected_mesh == 'nanos-world::SK_Mannequin') {
        const randomMaleDeathSFX: string = MALE_DEATH_SOUNDS[Math.floor(Math.random() * MALE_DEATH_SOUNDS.length)]
        const randomMalePainSFX: string = MALE_PAIN_SOUNDS[Math.floor(Math.random() * MALE_PAIN_SOUNDS.length)]

        character.SetDeathSound(randomMaleDeathSFX)
        character.SetPainSound(randomMalePainSFX)
    }
    if (selected_mesh == 'nanos-world::SK_Female') {
        const randomFemaleHair: string = SK_FEMALE_HAIR_MESHES[Math.floor(Math.random() * SK_FEMALE_HAIR_MESHES.length)]

        if (randomFemaleHair != '') {
            character.AddStaticMeshAttached('hair', randomFemaleHair, 'hair_female')
        }
        character.SetMaterialColorParameter('BlushTint', new Color(0.52, 0.12, 0.15))
        character.SetMaterialColorParameter('EyeShadowTint', new Color(0.24, 0.05, 0.07))
        character.SetMaterialColorParameter('LipstickTint', new Color(0.31, 0.03, 0.1))
    }
    if (selected_mesh == 'nanos-world::SK_Female' || selected_mesh == 'nanos-world::SK_Mannequin_Female') {
        const randomFemaleDeathSFX: string = FEMALE_DEATH_SOUNDS[Math.floor(Math.random() * FEMALE_DEATH_SOUNDS.length)]
        const randomFemalePainSFX: string = FEMALE_PAIN_SOUNDS[Math.floor(Math.random() * FEMALE_PAIN_SOUNDS.length)]
        character.SetDeathSound(randomFemaleDeathSFX)
        character.SetPainSound(randomFemalePainSFX)
    }
    if (selected_mesh == 'nanos-world::SK_Male' || selected_mesh == 'nanos-world::SK_Female') {
        const randomHairTints: Color = HAIR_TINTS[Math.floor(Math.random() * HAIR_TINTS.length)]
        const randomSkinTones: Color = HUMAN_SKIN_TONES[Math.floor(Math.random() * HUMAN_SKIN_TONES.length)]

        character.SetMaterialColorParameter('HairTint', randomHairTints)
        character.SetMaterialColorParameter('Tint', randomSkinTones)

        character.AddStaticMeshAttached('eye_left', 'nanos-world::SM_Eye', 'eye_left')
        character.AddStaticMeshAttached('eye_right', 'nanos-world::SM_Eye', 'eye_right')

        character.SetMaterialScalarParameter('Muscular', math.random(100) / 100)
        character.SetMaterialScalarParameter('BaseColorPower', math.random(2) + 0.5)

        HUMAN_MORPH_TARGETS.forEach((target) => {
            character.SetMorphTarget(target, math.random(200) / 100 - 1)
        })
    }
    return character
}

function SpawnPlayer(player: Player, location?: Vector, rotation?: Rotator): void {
    const character = SpawnCharacterRandomized(location, rotation)
    player.Possess(character)

    Player.Subscribe(
        'Death',
        function (
            character: Character,
            last_damage_taken: number,
            last_bone_damaged: string,
            damage_type_reason: DamageType,
            hit_from_directon: Vector,
            instigator: Player,
            causer: any
        ) {
            if (instigator) {
                if (instigator == player) {
                    Server.BroadcastChatMessage(`${instigator.GetName()} committed suicide`)
                } else {
                    Server.BroadcastChatMessage(`${instigator.GetName()} got killed by ${player.GetName()}`)
                }
            } else {
                Server.BroadcastChatMessage(`${player.GetName()} died`)
            }

            // Respawns the Character after 5 seconds, we Bind the Timer to the Character, this way if the Character gets destroyed in the meanwhile, this Timer never gets destroyed
            // Edit functionality later on
        }
    )
}
