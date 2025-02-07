import type { LevelToDisplay } from "../import/main";
import {DB_URL} from "$env/static/private";

const levels: LevelToDisplay[] = [
    {
        level: { sections: 8, width: 80 },
        name: "foo",
        version: 1
    },
    {
        level: { sections: 8, width: 80 },
        name: "bar",
        version: 1
    },
    {
        level: { sections: 8, width: 80 },
        name: "grim",
        version: 1
    }
]

export function getLevels(): LevelToDisplay[] {
    connectToDB();
    return levels;
}

function connectToDB() {
    console.log(DB_URL);
}