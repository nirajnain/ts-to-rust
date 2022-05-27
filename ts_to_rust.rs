type RobotName = String;

enum Status {
    Waiting,
    Playing,
    BootedOut,
}

struct GamePlayer {
    pub name: String,
    pub score: i32,
    key: i32,
    pub status: Status,
}

impl GamePlayer {
    fn new(name: &str, score: i32, status: Status) -> Self {
        Self {
            name: name.to_string(),
            key: 10,
            score,
            status,
        }
    }

    fn get_double_score(&self) -> i32 {
        self.score * 2
    }

    fn print(&self)  {
        println!("{} has a score of {}", self.name, self.score);
    }

    fn play(&mut self, num: i32, robot: RobotName, round: i32) {
        match self.status {
            Status::Playing => {
                if num == self.key {
                   self.score += 10;
                } else {
                    self.score -= 2;
                }
            },
            _ => return
        }
    }
}

const names: [&str; 17] = [
    "Niraj",
    "Lewis",
    "Ryan",
    "Miguel",
    "Samuel",
    "Hu",
    "Jorden",
    "Guillermo",
    "Sarika",
    "Aurora",
    "Tommy",
    "Ai-Chi",
    "Josh",
    "Toby",
    "Carlos",
    "Matthew",
    "Matteo"
];

fn get_random_name() -> Option<String> {
    Some(names[3].to_string())
}

fn some_func(player: &mut Player) {

}

pub fn play() {
    let mut player = GamePlayer {
        name: "Gareth".to_string(),
        score: 100,
        key: 10,
        status: Status::Waiting,
    };

    some_func(&mut player);
}


