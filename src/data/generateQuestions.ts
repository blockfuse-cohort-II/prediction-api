import path from "path";
import fs from "fs";
import runGemini from "../config/gemini-config";

async function main () {
    const getQuestion = await runGemini();
    const filePath = path.join(__dirname, 'questions.json');
    fs.writeFileSync(filePath, JSON.stringify(getQuestion, null, 2)); 
}

main().catch(() => {
    throw new Error("something went wrong")
})
  