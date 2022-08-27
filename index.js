const axios = require("axios");
const prompt = require("prompt-sync");
const readline = require("readline");
const colors = require("colors");
const rl = readline.createInterface({input: process.stdin, output: process.stdout});
const ps = prompt();
async function simsim(text, level) {
    try {
        let res = await axios({
            url: "https://beta-bumcoming.simsimi.com/simtalk/get_talk_set",
            method: "POST",
            data: {
                "av": "8.2.5",
                "os": "a",
                "lc": "ko",
                "cc": "KR",
                "tz": "Asia/Seoul",
                "message": text,
                "free_level": level
            },
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Authkey": "NTQwNzQwMTc2YzM5OTlhNmZkYThkNTAxNGUxMmM5NzlmOGY2MWU0ZTU1ODYxOTIxMThhY2QwYjM4ZTE2M2I5Ng",
                "Os": "a",
                "Av": "8.2.5",
                "Content-Type": "application/json",
                "Host": "beta-bumcoming.simsimi.com",
                "Accept-Encoding": "gzip",
                "User-Agent": "okhttp/4.9.1"
            }
        });
        return res.data.origin_sentence;
    } catch (e) {
        return e;
    }
}
function shouldIncludeTippy() {
    rl.question("질문: ".green, async (text) => {
        await simsim(text, level).then(r => console.log(colors.yellow("[ 심심이 ]:", r)));
        shouldIncludeTippy();
    })
}
let level = ps("레벨 (숫자): ".red);
shouldIncludeTippy();
