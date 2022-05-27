type TimeMs = number
type PlayerName = string
type RobotName = string

const genTimeMs = (): TimeMs => new Date().getTime()

type Status =
    | { type: "Waiting " }
    | { type: "Playing", started: TimeMs }
    | { type: "BootedOut", by: RobotName, atRound: number }

class Player {
    protected key: number = rndNum(3)

    constructor(
        public name: string,
        public score: number,
        public status: Status) {
    }

    play(num: number, robot: RobotName, round: number) {
        if (this.status.type !== 'Playing')
            return

        if (num === this.key) {
            this.score += 10
        } else {
            this.score -= 2

            if (this.score < 0) {
                this.status = {
                    type: 'BootedOut',
                    by: robot,
                    atRound: round
                }
            }
        }
    }

    print() {
        let statusText = ''
        let now = new Date().getTime()

        switch (this.status.type) {
            case 'BootedOut':
                statusText = `Booted Out by ${this.status.by} at Round: ${this.status.atRound}`
                break

            case 'Playing':
                statusText = `Playing for ${now - this.status.started}ms`
                break
        }

        console.log(`${this.name}: ${this.score} pts => ${statusText}`)
    }
}

const rndNum = (upto: number): number => {
    return Math.floor(Math.random() * upto)
}

const randomPlayerName = (players: PlayerName[]): PlayerName | null => {
    let num = rndNum(2);
    if (num === 1) return null

    return players[rndNum(players.length)]
}

const names = [
    "Niraj", "Lewis", "Ryan", "Miguel", "Samuel", "Hu", "Jorden", "Guillermo", "Sarika", "Aurora", "Tommy", "Ai-Chi", "Josh", "Toby", "Carlos", "Matthew", "Matteo"
]

const robotNames = [
    "Theodore",
    "Leonardo"
]

const getPlayers = (tryPlayerCount: number): Player[] => {
    const players = [] as Player[];

    for (let i = 0; i < tryPlayerCount; ++i) {
        let rndPlayer = randomPlayerName(names)

        if (rndPlayer !== null) {
            if (players.some(p => p.name === rndPlayer)) continue
            players.push(new Player(rndPlayer, 0, { type: 'Waiting ' }))
        }
    }

    return players
}

const playRounds = (players: Player[], rounds: number): Player[] => {
    for (let i = 0; i < rounds; ++i) {
        let key = rndNum(3)
        let robot = robotNames[rndNum(2)]

        for (const p of players) {
            p.play(key, robot, i + 1)
        }

        if (!players.some(p => p.status.type === 'Playing'))
            break
    }

    return players
        .sort((a, b) => b.score - a.score)
}

const play_game = (tryPlayerCount: number, rounds: number) => {
    const players = getPlayers(tryPlayerCount)

    if (players.length < 2) {
        console.log("Sorry not enough players!")
        return
    }

    const now = genTimeMs()

    for (const p of players) {
        p.status = { type: 'Playing', started: now }
    }

    playRounds(players, rounds)

    console.log("Final Scores")

    for (const p of players) {
        p.print()
    }

}

play_game(5, 10)